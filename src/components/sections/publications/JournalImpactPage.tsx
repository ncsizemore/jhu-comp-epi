'use client';

import { useEffect, useState } from 'react';
import { Publication } from '@/lib/data/publications';

interface JournalImpactPageProps {
  publication: Publication;
  isRightPage?: boolean;
}

export default function JournalImpactPage({ isRightPage = false }: JournalImpactPageProps) {
  const [animated, setAnimated] = useState(false);
  
  // Example impact data - would come from publication object in real implementation
  const impactData = {
    citations: Math.floor(Math.random() * 100) + 50,
    citationsGrowth: Math.floor(Math.random() * 40) + 20,
    fieldPercentile: Math.floor(Math.random() * 20) + 80, // e.g., 95th percentile
    policyImpact: [
      "Influenced CDC prevention guidelines",
      "Adopted by WHO for international policy",
      "Integrated into NIH research priorities"
    ][Math.floor(Math.random() * 3)],
    implementedIn: Math.floor(Math.random() * 10) + 5,
    impactMetric: Math.floor(Math.random() * 70) + 30,
    quote: [
      "This research represents a significant step forward in our understanding of epidemic dynamics.",
      "The methodological approach demonstrated here has transformative potential for public health interventions.",
      "Findings from this study have already begun to reshape how we approach disease prevention strategies."
    ][Math.floor(Math.random() * 3)],
    quoteAuthor: [
      "Director of Public Health, CDC",
      "WHO Chief Scientist",
      "NIH Research Director"
    ][Math.floor(Math.random() * 3)],
    altmetric: Math.floor(Math.random() * 100) + 20,
    reads: Math.floor(Math.random() * 5000) + 1000,
    downloads: Math.floor(Math.random() * 1000) + 200
  };

  // Generate monthly citation data for the chart
  const generateMonthlyData = () => {
    // Current trend with some randomness but overall growth
    const citationTrend = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    
    return citationTrend.map(value => {
      // Add some randomness, but ensure overall trend
      const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      return Math.floor(value * impactData.citations / 12 * randomFactor);
    });
  };
  
  const [monthlyData] = useState(generateMonthlyData());
  
  // Trigger animations on component mount
  useEffect(() => {
    // Short delay before starting animations
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`p-4 sm:p-6 md:p-8 bg-gray-50 relative h-full ${isRightPage ? 'rounded-r-lg' : ''}`}>
      {/* Subtle page shadow/fold effect */}
      <div className="absolute top-0 bottom-0 left-0 w-8 page-fold-left opacity-50"></div>
      
      {/* Page texture overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none"></div>
      
      {/* Journal header */}
      <div className="mb-6 relative z-10">
        <div className="text-xs text-gray-500 flex justify-between items-center mb-1 font-serif">
          <div>Impact & Applications</div>
          <div>Volume {Math.floor(Math.random() * 20) + 1}</div>
        </div>
        <div className="border-b border-gray-300 w-full"></div>
      </div>
      
      {/* Impact content */}
      <div className="pl-2 sm:pl-4 md:pl-6 relative z-10 journal-page">
        <h2 className="text-lg sm:text-xl font-bold text-hopkins-spirit-blue mb-3 sm:mb-5 font-serif journal-title">
          Research Impact
        </h2>
        
        {/* Citation metrics with visualization */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">Citation Metrics</h3>
          
          <div className="flex items-end gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-hopkins-spirit-blue">
                {impactData.citations}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Total Citations
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <div className="text-green-600 font-bold">
                {impactData.citationsGrowth}% growth <span className="text-xs font-normal">last year</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced citation chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
              <div>Monthly Citations</div>
              <div>Field: <span className="font-medium text-hopkins-spirit-blue">{impactData.fieldPercentile}th percentile</span></div>
            </div>
            
            <div className="h-20 w-full flex items-end gap-1 mb-1">
              {monthlyData.map((value, i) => (
                <div key={i} className="relative flex-1 flex flex-col items-center">
                  <div 
                    className={`bg-hopkins-spirit-blue bg-opacity-80 rounded-t w-full ${animated ? 'animate-grow-bar' : 'h-0'}`}
                    style={animated ? { height: `${(value / Math.max(...monthlyData)) * 100}%` } : {}}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 font-serif">
              <div>Jan</div>
              <div>Dec</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced altmetrics section */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider border-b border-gray-200 pb-1">Alternative Metrics</h3>
          
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
              <div className="text-lg sm:text-2xl font-bold text-hopkins-gold">{impactData.altmetric}</div>
              <div className="text-xs text-gray-500">Altmetric</div>
            </div>
            
            <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
              <div className="text-lg sm:text-2xl font-bold text-hopkins-blue">{impactData.reads.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Reads</div>
            </div>
            
            <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{impactData.downloads.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Downloads</div>
            </div>
          </div>
        </div>
        
        {/* Policy impact */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider border-b border-gray-200 pb-1">Policy Impact</h3>
          
          <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
            <div className="text-sm font-medium text-gray-900 mb-2">
              {impactData.policyImpact}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-600">
                <span className="font-semibold">{impactData.implementedIn} regions</span>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="text-xs text-gray-500">Impact</div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-hopkins-gold rounded-full ${animated ? 'animate-fill-width' : 'w-0'}`}
                    style={animated ? { width: `${impactData.impactMetric}%` } : {}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expert quote */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider border-b border-gray-200 pb-1">Expert Opinion</h3>
          
          <blockquote className="bg-white p-3 rounded-lg border-l-3 border-hopkins-gold relative">
            <p className="text-xs italic text-gray-700 mb-1 font-serif line-clamp-3">{impactData.quote}</p>
            <footer className="text-xs text-gray-500">— {impactData.quoteAuthor}</footer>
          </blockquote>
        </div>
        
        {/* Footnote */}
        <div className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-200">
          Impact metrics sourced from Web of Science, Altmetric, and policy reports.
        </div>
        
        {/* Page number */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-serif">
          {Math.floor(Math.random() * 100) + 1}
        </div>
      </div>
    </div>
  );
}
