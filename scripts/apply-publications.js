#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Publication Apply CLI Script
 * 
 * This script reads the reviewed publications from the review file
 * and applies approved changes to the publications.ts file.
 */

const CONFIG = {
  REVIEW_FILE_PATH: path.join(__dirname, '../src/data/publications-review.json'),
  PUBLICATIONS_PATH: path.join(__dirname, '../src/data/publications.ts'),
  BACKUP_PATH: path.join(__dirname, '../src/data/publications.ts.backup')
};

class PublicationApplier {
  constructor() {
    this.reviewData = null;
    this.currentPublications = [];
    this.approvedPublications = [];
  }

  async run() {
    console.log('⚡ Applying publication changes...\n');
    
    try {
      // Load review file
      await this.loadReviewFile();
      
      // Validate review file
      await this.validateReviewFile();
      
      // Load current publications
      await this.loadCurrentPublications();
      
      // Create backup
      await this.createBackup();
      
      // Process approved publications
      await this.processApprovedPublications();
      
      // Update publications file
      await this.updatePublicationsFile();
      
      console.log('\n✅ Publications updated successfully!');
      console.log(`📁 Backup saved: ${CONFIG.BACKUP_PATH}`);
      console.log(`📊 Added ${this.approvedPublications.filter(p => p.action === 'new').length} new publications`);
      console.log(`🔧 Enhanced ${this.approvedPublications.filter(p => p.action === 'enhance').length} existing publications`);
      
    } catch (error) {
      console.error('❌ Error applying changes:', error);
      process.exit(1);
    }
  }

  async loadReviewFile() {
    console.log('📂 Loading review file...');

    if (!fs.existsSync(CONFIG.REVIEW_FILE_PATH)) {
      throw new Error(`Review file not found: ${CONFIG.REVIEW_FILE_PATH}\nRun 'npm run fetch-publications' first.`);
    }

    try {
      const fileContent = fs.readFileSync(CONFIG.REVIEW_FILE_PATH, 'utf8');
      this.reviewData = JSON.parse(fileContent);

      if (!this.reviewData.publications || !Array.isArray(this.reviewData.publications)) {
        throw new Error('Invalid review file format: missing or invalid publications array');
      }

      console.log(`📄 Found ${this.reviewData.publications.length} publications to review`);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in review file: ${error.message}`);
      }
      throw error;
    }
  }

  async validateReviewFile() {
    console.log('✅ Validating review file...');
    
    let pendingReviews = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    
    for (const pub of this.reviewData.publications) {
      if (pub.approved === null || pub.approved === undefined) {
        pendingReviews++;
      } else if (pub.approved === true) {
        approvedCount++;
        this.approvedPublications.push(pub);
      } else if (pub.approved === false) {
        rejectedCount++;
      }
    }
    
    if (pendingReviews > 0) {
      console.log(`⚠️  Warning: ${pendingReviews} publications still need review (approved field is null)`);
      console.log('Please edit the review file and set approved: true/false for each publication');
      console.log('Proceeding with approved publications only...');
    }
    
    console.log(`✅ ${approvedCount} approved, ${rejectedCount} rejected, ${pendingReviews} pending`);
  }

  async loadCurrentPublications() {
    console.log('📚 Loading current publications...');
    
    const content = fs.readFileSync(CONFIG.PUBLICATIONS_PATH, 'utf8');
    this.currentPublications = this.parsePublicationsFromTS(content);
    
    console.log(`📊 Current publications: ${this.currentPublications.length}`);
  }

  parsePublicationsFromTS(content) {
    // Extract publications from TypeScript file
    const match = content.match(/export const publications.*?=.*?\[(.*?)\];/s);
    if (!match) return [];
    
    const publicationsText = match[1];
    const publications = [];
    
    // Find publication objects with proper nesting handling
    let depth = 0;
    let start = -1;
    let i = 0;
    
    while (i < publicationsText.length) {
      const char = publicationsText[i];
      
      if (char === '{') {
        if (depth === 0) start = i;
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0 && start !== -1) {
          const pubText = publicationsText.slice(start, i + 1);
          try {
            const pub = this.parsePublicationObject(pubText);
            if (pub && pub.id) {
              publications.push(pub);
            }
          } catch (error) {
            console.warn('Warning: Could not parse publication object');
          }
        }
      }
      i++;
    }
    
    return publications;
  }

  parsePublicationObject(pubText) {
    const extractField = (field) => {
      const regex = new RegExp(`${field}:\\s*["'\`]([^"'\`]+)["'\`]`);
      const match = pubText.match(regex);
      return match ? match[1] : null;
    };
    
    const extractArray = (field) => {
      const regex = new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`);
      const match = pubText.match(regex);
      if (!match) return [];
      
      return match[1].split(',').map(item => 
        item.trim().replace(/['"]/g, '')
      );
    };
    
    return {
      id: extractField('id'),
      title: extractField('title'),
      authors: extractField('authors'),
      journal: extractField('journal'),
      year: extractField('year'),
      doi: extractField('doi'),
      url: extractField('url'),
      abstract: extractField('abstract'),
      projects: extractArray('projects'),
      tags: extractArray('tags'),
      featured: pubText.includes('featured: true'),
      imageUrl: extractField('imageUrl'),
      attentionGrabber: extractField('attentionGrabber')
    };
  }

  async createBackup() {
    console.log('💾 Creating backup...');

    try {
      fs.copyFileSync(CONFIG.PUBLICATIONS_PATH, CONFIG.BACKUP_PATH);
      console.log(`✅ Backup created: ${CONFIG.BACKUP_PATH}`);
    } catch (error) {
      throw new Error(`Failed to create backup: ${error.message}`);
    }
  }

  async processApprovedPublications() {
    console.log('🔄 Processing approved publications...');
    
    for (const approvedPub of this.approvedPublications) {
      if (approvedPub.action === 'enhance') {
        // Find and update existing publication
        const existingIndex = this.currentPublications.findIndex(p => p.id === approvedPub.existingId);
        if (existingIndex !== -1) {
          this.currentPublications[existingIndex] = this.mergePublications(
            this.currentPublications[existingIndex],
            approvedPub
          );
          console.log(`🔧 Enhanced: ${approvedPub.title.substring(0, 50)}...`);
        }
      } else if (approvedPub.action === 'new') {
        // Add new publication
        const newPub = this.convertToPublicationFormat(approvedPub);
        this.currentPublications.push(newPub);
        console.log(`➕ Added: ${approvedPub.title.substring(0, 50)}...`);
      }
    }
  }

  mergePublications(existing, enhanced) {
    // Merge enhanced data into existing publication
    return {
      ...existing,
      authors: enhanced.authors && enhanced.authors !== 'Author list to be verified' ? enhanced.authors : existing.authors,
      abstract: enhanced.abstract || existing.abstract,
      doi: enhanced.doi || existing.doi,
      url: enhanced.url || existing.url,
      journal: enhanced.journal && enhanced.journal !== 'Journal to be verified' ? enhanced.journal : existing.journal,
      // Keep existing projects and tags
      projects: existing.projects || ['pearl'],
      tags: existing.tags || this.inferTags(enhanced)
    };
  }

  convertToPublicationFormat(pub) {
    // Convert API result to our publication format
    const id = this.generateId(pub);
    const projects = this.inferProjects(pub);
    const tags = this.inferTags(pub);
    
    return {
      id,
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year,
      doi: pub.doi || null,
      url: pub.url || null,
      abstract: pub.abstract || null,
      projects,
      tags,
      featured: false
    };
  }

  generateId(pub) {
    // Generate a unique ID for the publication
    const firstAuthor = pub.authors.split(',')[0].toLowerCase()
      .replace(/[^\w]/g, '')
      .replace(/^dr/, '');
    
    const yearSuffix = pub.year || 'unknown';
    const baseId = `${firstAuthor}-${yearSuffix}`;
    
    // Ensure uniqueness
    let id = baseId;
    let counter = 1;
    while (this.currentPublications.some(p => p.id === id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }
    
    return id;
  }

  inferProjects(pub) {
    // Infer project based on content
    const title = pub.title.toLowerCase();
    const abstract = (pub.abstract || '').toLowerCase();
    const content = `${title} ${abstract}`;

    if (content.includes('hiv') || content.includes('aids')) {
      if (content.includes('jheem')) return ['jheem'];
      if (content.includes('pearl')) return ['pearl'];
      if (content.includes('shield')) return ['shield'];
      return ['jheem']; // Default for HIV-related
    }

    return ['pearl']; // Default project
  }

  inferTags(pub) {
    // Infer tags based on content
    const title = pub.title.toLowerCase();
    const abstract = (pub.abstract || '').toLowerCase();
    const content = `${title} ${abstract}`;
    
    const tags = [];
    
    // Disease tags
    if (content.includes('hiv')) tags.push('HIV');
    if (content.includes('tuberculosis') || content.includes('tb ')) tags.push('tuberculosis');
    if (content.includes('covid')) tags.push('COVID-19');
    
    // Method tags
    if (content.includes('model')) tags.push('modeling');
    if (content.includes('simulation')) tags.push('simulation');
    if (content.includes('cost-effect')) tags.push('cost-effectiveness');
    if (content.includes('prevention')) tags.push('prevention');
    if (content.includes('treatment')) tags.push('treatment');
    
    // Population tags
    if (content.includes('children')) tags.push('children');
    if (content.includes('aging')) tags.push('aging');
    
    return tags.length > 0 ? tags : ['epidemiology'];
  }

  async updatePublicationsFile() {
    console.log('📝 Updating publications file...');

    try {
      // Sort publications by year (newest first)
      this.currentPublications.sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearB - yearA;
      });

      // Generate new TypeScript file content
      const newContent = this.generatePublicationsTS();

      // Write updated file
      fs.writeFileSync(CONFIG.PUBLICATIONS_PATH, newContent, 'utf8');

      console.log('✅ Publications file updated');
    } catch (error) {
      throw new Error(`Failed to update publications file: ${error.message}`);
    }
  }

  generatePublicationsTS() {
    // Generate the complete publications.ts file
    const publicationStrings = this.currentPublications.map(pub => {
      const parts = [
        `    id: "${pub.id}",`,
        `    title: "${this.escapeString(pub.title)}",`,
        `    authors: "${this.escapeString(pub.authors)}",`,
        `    journal: "${this.escapeString(pub.journal)}",`,
        `    year: "${pub.year}",`
      ];

      if (pub.doi) parts.push(`    doi: "${pub.doi}",`);
      if (pub.url) parts.push(`    url: "${pub.url}",`);
      if (pub.abstract) parts.push(`    abstract: "${this.escapeString(pub.abstract)}",`);
      
      parts.push(`    projects: [${pub.projects.map(p => `"${p}"`).join(', ')}],`);
      parts.push(`    tags: [${pub.tags.map(t => `"${t}"`).join(', ')}],`);
      parts.push(`    featured: ${pub.featured || false}`);
      
      if (pub.imageUrl) parts.push(`,\n    imageUrl: "${pub.imageUrl}"`);
      if (pub.attentionGrabber) parts.push(`,\n    attentionGrabber: "${this.escapeString(pub.attentionGrabber)}"`);

      return `  {\n${parts.join('\n')}\n  }`;
    });
    
    // Extract unique tags and years
    const allTags = [...new Set(this.currentPublications.flatMap(p => p.tags))].sort();
    const allYears = [...new Set(this.currentPublications.map(p => p.year))].sort().reverse();
    
    return `// Publication type definition
export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  projects: string[]; // Array of project IDs related to this publication
  tags: string[]; // Keywords or categories
  featured?: boolean;
  imageUrl?: string; // Optional image URL for the publication card
  attentionGrabber?: string; // Optional short text for the publication card
}

// Publications array - Updated by CLI script
export const publications: Publication[] = [
${publicationStrings.join(',\n\n')}
];

// Extract unique tags and years for filters
export const publicationTags: string[] = [
${allTags.map(tag => `  "${tag}"`).join(',\n')}
];

export const publicationYears: string[] = [
${allYears.map(year => `  "${year}"`).join(',\n')}
];

// Project mappings
export const projectsMap = {
  jheem: { name: "JHEEM", color: "bg-hopkins-blue" },
  shield: { name: "SHIELD", color: "bg-hopkins-gold" },
  pearl: { name: "PEARL", color: "bg-hopkins-spirit-blue" }
};
`;
  }

  escapeString(str) {
    if (!str) return '';
    if (typeof str !== 'string') return '';

    // Comprehensive escaping for TypeScript/JavaScript string literals
    // IMPORTANT: Backslash must be escaped first to prevent double-escaping
    return str
      .replace(/\\/g, '\\\\')      // Escape backslashes FIRST
      .replace(/"/g, '\\"')         // Escape double quotes
      .replace(/'/g, "\\'")         // Escape single quotes
      .replace(/\n/g, '\\n')        // Escape newlines
      .replace(/\r/g, '\\r')        // Escape carriage returns
      .replace(/\t/g, '\\t')        // Escape tabs
      .replace(/\f/g, '\\f')        // Escape form feeds
      .replace(/\v/g, '\\v')        // Escape vertical tabs
      .replace(/\u2028/g, '\\u2028') // Escape line separator
      .replace(/\u2029/g, '\\u2029') // Escape paragraph separator
      .replace(/\0/g, '\\0');       // Escape null character
  }
}

// Run the script
if (require.main === module) {
  const applier = new PublicationApplier();
  applier.run().catch(console.error);
}

module.exports = PublicationApplier;
