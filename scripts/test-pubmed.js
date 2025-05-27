#!/usr/bin/env node

// Simple test of PubMed API
const https = require('https');

async function testPubMedAPI() {
  console.log('Testing PubMed API...');
  
  // Test search
  const searchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=Dowdy%5BAuthor%5D&retmax=3&retmode=json';
  
  console.log('Search URL:', searchUrl);
  
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    console.log('Search Response:', JSON.stringify(data, null, 2));
    
    if (data.esearchresult?.idlist?.length > 0) {
      console.log('\n✅ Found publications!');
      
      // Test detail fetch
      const ids = data.esearchresult.idlist.slice(0, 2);
      const detailUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      
      console.log('Detail URL:', detailUrl);
      
      const detailResponse = await fetch(detailUrl);
      const detailData = await detailResponse.json();
      
      console.log('Detail Response:', JSON.stringify(detailData, null, 2));
    } else {
      console.log('❌ No publications found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testPubMedAPI();
