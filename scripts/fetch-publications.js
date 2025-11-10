#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Publication Fetcher CLI Script
 * 
 * This script fetches publications from PubMed and Crossref APIs based on 
 * team member names from the centralized team data, then creates a review
 * file for manual approval before applying changes.
 */

// Configuration
const CONFIG = {
  // APIs
  PUBMED_BASE_URL: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/',
  CROSSREF_BASE_URL: 'https://api.crossref.org/works',
  
  // Search parameters
  MAX_RESULTS_PER_AUTHOR: 50,
  YEARS_BACK: 10, // Search back 10 years
  
  // File paths
  TEAM_DATA_PATH: path.join(__dirname, '../src/data/team-data.json'),
  CURRENT_PUBLICATIONS_PATH: path.join(__dirname, '../src/data/publications.ts'),
  REVIEW_FILE_PATH: path.join(__dirname, '../src/data/publications-review.json'),
  
  // JHU domains for additional matching
  JHU_DOMAINS: ['@jhu.edu', '@jhsph.edu', '@jhmi.edu']
};

class PublicationFetcher {
  constructor() {
    this.teamMembers = [];
    this.currentPublications = [];
    this.foundPublications = [];
    this.errors = [];
  }

  async run() {
    console.log('🔍 Starting publication fetch...\n');
    
    try {
      // Load team data and current publications
      await this.loadData();
      
      // Search for publications
      await this.searchPublications();
      
      // Process and deduplicate results
      await this.processResults();
      
      // Create review file
      await this.createReviewFile();
      
      console.log(`\n✅ Fetch complete!`);
      console.log(`📄 Found ${this.foundPublications.length} potential new publications`);
      console.log(`📝 Review file created: ${CONFIG.REVIEW_FILE_PATH}`);
      console.log(`\n🔍 Please review the file and edit the "approved" field for each publication.`);
      console.log(`⚡ Then run: npm run apply-publications`);
      
    } catch (error) {
      console.error('❌ Error during fetch:', error);
      process.exit(1);
    }
  }

  async loadData() {
    console.log('📂 Loading team data and current publications...');
    
    // Load team members
    const teamData = JSON.parse(fs.readFileSync(CONFIG.TEAM_DATA_PATH, 'utf8'));
    this.teamMembers = teamData.teamMembers.filter(member => member.status === 'current');
    
    // Load current publications (parse the TypeScript file)
    const publicationsContent = fs.readFileSync(CONFIG.CURRENT_PUBLICATIONS_PATH, 'utf8');
    this.currentPublications = this.parsePublicationsFromTS(publicationsContent);
    
    console.log(`👥 Found ${this.teamMembers.length} active team members`);
    console.log(`📚 Current publications: ${this.currentPublications.length}`);
  }

  parsePublicationsFromTS(content) {
    // Extract publications array from TypeScript file
    // This is a simple parser - could be more robust
    const match = content.match(/export const publications.*?=.*?\[(.*?)\];/s);
    if (!match) return [];
    
    // Extract publication objects (simplified)
    const publicationsText = match[1];
    const publications = [];
    
    // Find all publication objects
    const pubMatches = publicationsText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    
    if (pubMatches) {
      pubMatches.forEach(pubText => {
        try {
          const pub = this.parsePublicationObject(pubText);
          if (pub && pub.id) {
            publications.push(pub);
          }
        } catch (error) {
          // Skip malformed publications
        }
      });
    }
    
    return publications;
  }

  parsePublicationObject(pubText) {
    // Simple field extraction
    const extractField = (field) => {
      const regex = new RegExp(`${field}:\\s*["']([^"']+)["']`);
      const match = pubText.match(regex);
      return match ? match[1] : null;
    };
    
    return {
      id: extractField('id'),
      title: extractField('title'),
      authors: extractField('authors'),
      journal: extractField('journal'),
      year: extractField('year'),
      doi: extractField('doi'),
      url: extractField('url')
    };
  }

  async searchPublications() {
    console.log('\n🔍 Searching for publications...');
    
    for (const member of this.teamMembers) {
      console.log(`\n👤 Searching for: ${member.name}`);
      
      try {
        // Search PubMed
        const pubmedResults = await this.searchPubMed(member);
        console.log(`   📄 PubMed: ${pubmedResults.length} results`);
        
        // Search Crossref (if needed for additional coverage)
        // const crossrefResults = await this.searchCrossref(member);
        // console.log(`   📄 Crossref: ${crossrefResults.length} results`);
        
        this.foundPublications.push(...pubmedResults);
        
        // Rate limiting
        await this.sleep(200);
        
      } catch (error) {
        console.error(`   ❌ Error searching for ${member.name}:`, error.message);
        this.errors.push(`${member.name}: ${error.message}`);
      }
    }
  }

  async searchPubMed(member) {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - CONFIG.YEARS_BACK;
    
    // Create search terms for this member
    const searchTerms = this.createSearchTerms(member);
    const results = [];
    
    for (const searchTerm of searchTerms) {
      try {
        console.log(`     Searching: "${searchTerm}"`);
        
        // Step 1: Search for publication IDs
        const searchUrl = `${CONFIG.PUBMED_BASE_URL}esearch.fcgi?` +
          `db=pubmed&term=${encodeURIComponent(searchTerm)}&` +
          `mindate=${startYear}&maxdate=${currentYear}&` +
          `retmax=${CONFIG.MAX_RESULTS_PER_AUTHOR}&retmode=json`;

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
          throw new Error(`PubMed search failed: HTTP ${searchResponse.status}`);
        }
        const searchData = await searchResponse.json();
        
        if (!searchData.esearchresult?.idlist?.length) {
          console.log(`     No results for "${searchTerm}"`);
          continue;
        }
        
        const ids = searchData.esearchresult.idlist.slice(0, 20); // Limit to prevent overwhelming
        console.log(`     Found ${searchData.esearchresult.count} total, processing ${ids.length}`);
        
        // Step 2: Fetch detailed information
        const detailUrl = `${CONFIG.PUBMED_BASE_URL}esummary.fcgi?` +
          `db=pubmed&id=${ids.join(',')}&retmode=json`;

        const detailResponse = await fetch(detailUrl);
        if (!detailResponse.ok) {
          throw new Error(`PubMed detail fetch failed: HTTP ${detailResponse.status}`);
        }
        const detailData = await detailResponse.json();
        
        // Process results
        let relevantCount = 0;
        for (const id of ids) {
          const article = detailData.result?.[id];
          if (article) {
            if (this.isRelevantArticle(article, member)) {
              const publication = this.formatPubMedResult(article, member);
              if (publication) {
                results.push(publication);
                relevantCount++;
              }
            }
          }
        }
        
        console.log(`     Added ${relevantCount} relevant publications from this search`);
        
        await this.sleep(100); // Rate limiting between queries
        
      } catch (error) {
        console.error(`   Error with search term "${searchTerm}":`, error.message);
      }
    }
    
    return results;
  }

  createSearchTerms(member) {
    const terms = [];
    
    // Full name variations
    const name = member.name.replace(/^Dr\.?\s*/, ''); // Remove Dr. prefix
    
    // Last name only (most reliable for PubMed)
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      const lastName = nameParts[nameParts.length - 1];
      terms.push(`${lastName}[Author]`);
      
      // Last name + first initial
      const firstInitial = nameParts[0][0];
      terms.push(`${lastName} ${firstInitial}[Author]`);
    }
    
    // Add JHU affiliation constraint to reduce noise
    const jhuTerms = terms.map(term => 
      `${term} AND ("Johns Hopkins"[Affiliation] OR "JHSPH"[Affiliation])`
    );
    
    // Return both with and without affiliation
    return [...terms.slice(0, 2), ...jhuTerms.slice(0, 1)]; // Limit to avoid too many requests
  }

  isRelevantArticle(article, member) {
    // Check if article is relevant to this team member
    const authors = article.authors || [];
    const memberName = member.name.toLowerCase().replace(/^dr\.?\s*/, '');
    const nameParts = memberName.split(' ');
    
    if (nameParts.length < 2) return false;
    
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    
    // Check each author in the article
    for (const author of authors) {
      const authorName = (author.name || '').toLowerCase();
      
      // Match patterns like "Dowdy DW", "Kasaie P", etc.
      if (authorName.includes(lastName)) {
        // If last name matches, check if first initial matches
        if (authorName.includes(firstName[0])) {
          return true; // Found a match
        }
        // Also check for full first name
        if (authorName.includes(firstName)) {
          return true;
        }
      }
    }
    
    return false;
  }

  formatPubMedResult(article, member) {
    try {
      const year = article.pubdate ? article.pubdate.match(/\d{4}/)?.[0] : null;
      const pmid = article.uid;
      
      // Extract DOI from articleids array
      let doi = null;
      if (article.articleids) {
        const doiRecord = article.articleids.find(id => id.idtype === 'doi');
        if (doiRecord) {
          doi = doiRecord.value;
        }
      }
      
      // Fallback: extract DOI from elocationid
      if (!doi && article.elocationid) {
        const doiMatch = article.elocationid.match(/doi:\s*([^\s,]+)/);
        if (doiMatch) {
          doi = doiMatch[1];
        }
      }
      
      return {
        source: 'pubmed',
        pmid: pmid,
        title: article.title || '',
        authors: (article.authors || []).map(a => a.name).join(', '),
        journal: article.fulljournalname || article.source || '',
        year: year || 'Unknown',
        doi: doi,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        abstract: '', // Will be filled later if needed
        foundFor: member.name,
        matchedTerms: [], // Could track which search terms matched
        confidence: 0.8, // Could implement confidence scoring
        approved: null, // For manual review
        action: 'new' // new, enhance, skip
      };
    } catch (error) {
      console.error('Error formatting PubMed result:', error);
      return null;
    }
  }

  async processResults() {
    console.log('\n🔄 Processing and deduplicating results...');
    
    // Remove duplicates
    const uniqueResults = [];
    const seen = new Set();
    
    for (const pub of this.foundPublications) {
      const key = this.createPublicationKey(pub);
      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(pub);
      }
    }
    
    console.log(`   📊 Removed ${this.foundPublications.length - uniqueResults.length} duplicates`);
    
    // Check against existing publications
    const newPublications = [];
    const enhancePublications = [];
    
    for (const pub of uniqueResults) {
      const existing = this.findExistingPublication(pub);
      if (existing) {
        // Mark for enhancement if missing data
        if (this.needsEnhancement(existing, pub)) {
          pub.action = 'enhance';
          pub.existingId = existing.id;
          enhancePublications.push(pub);
        }
      } else {
        pub.action = 'new';
        newPublications.push(pub);
      }
    }
    
    this.foundPublications = [...newPublications, ...enhancePublications];
    
    console.log(`   ✨ ${newPublications.length} new publications found`);
    console.log(`   🔧 ${enhancePublications.length} existing publications can be enhanced`);
  }

  createPublicationKey(pub) {
    // Create a key for deduplication
    if (pub.doi) return `doi:${pub.doi}`;
    if (pub.pmid) return `pmid:${pub.pmid}`;
    
    // Title-based key (simplified)
    const titleKey = pub.title.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50);
    
    return `title:${titleKey}`;
  }

  findExistingPublication(pub) {
    return this.currentPublications.find(existing => {
      // Match by DOI
      if (pub.doi && existing.doi && 
          pub.doi.toLowerCase() === existing.doi.toLowerCase()) {
        return true;
      }
      
      // Match by title similarity (simple)
      if (pub.title && existing.title) {
        const similarity = this.calculateTitleSimilarity(pub.title, existing.title);
        if (similarity > 0.85) return true;
      }
      
      return false;
    });
  }

  calculateTitleSimilarity(title1, title2) {
    // Prevent ReDoS attacks by limiting input length
    const MAX_TITLE_LENGTH = 1000;

    const safeTrim = (str) => {
      if (!str || typeof str !== 'string') return '';
      return str.length > MAX_TITLE_LENGTH
        ? str.substring(0, MAX_TITLE_LENGTH)
        : str;
    };

    // Simple title similarity calculation with safe input handling
    const normalize = (str) => {
      const safe = safeTrim(str);
      return safe
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const norm1 = normalize(title1);
    const norm2 = normalize(title2);

    if (norm1 === norm2) return 1.0;

    // Calculate Jaccard similarity on words
    const words1 = new Set(norm1.split(' '));
    const words2 = new Set(norm2.split(' '));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return union.size === 0 ? 0 : intersection.size / union.size;
  }

  needsEnhancement(existing, found) {
    // Check if existing publication could be enhanced with new data
    return !existing.abstract || 
           !existing.doi || 
           existing.authors === 'Author list to be verified' ||
           existing.journal === 'Journal to be verified';
  }

  async createReviewFile() {
    console.log('\n📝 Creating review file...');
    
    const reviewData = {
      metadata: {
        createdAt: new Date().toISOString(),
        totalFound: this.foundPublications.length,
        newPublications: this.foundPublications.filter(p => p.action === 'new').length,
        enhancePublications: this.foundPublications.filter(p => p.action === 'enhance').length,
        errors: this.errors
      },
      instructions: {
        message: "Review each publication below and set 'approved' to true/false",
        workflow: [
          "1. Review each publication for relevance and accuracy",
          "2. Set 'approved': true for publications to include",
          "3. Set 'approved': false for publications to reject", 
          "4. You can edit any fields (title, authors, journal, etc.)",
          "5. Run: npm run apply-publications"
        ]
      },
      publications: this.foundPublications.map(pub => ({
        ...pub,
        approved: null, // Must be set to true/false
        notes: "" // Space for your notes
      }))
    };
    
    fs.writeFileSync(
      CONFIG.REVIEW_FILE_PATH, 
      JSON.stringify(reviewData, null, 2),
      'utf8'
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the script
if (require.main === module) {
  const fetcher = new PublicationFetcher();
  fetcher.run().catch(console.error);
}

module.exports = PublicationFetcher;
