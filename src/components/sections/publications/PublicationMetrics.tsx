'use client';

import { useState, useEffect } from 'react';
import { Publication } from '@/data/publications';

interface PublicationMetricsProps {
  publication: Publication;
}

export default function PublicationMetrics({ }: PublicationMetricsProps) {
  const [animated, setAnimated] = useState(false);
  
  // Example impact data - would come from publication object in real implementation
  const impactData = {
    citations: Math.floor(Math.random() * 100) + 50,
    citationsGrowth: Math.floor(Math.random() * 40) + 20,
    fieldPercentile: Math.floor(Math.random() * 20) + 80, // e.g., 95th percentile
    altmetric: Math.floor(Math.random() * 100) + 20,
    reads: Math.floor(Math.random() * 5000) + 1000,
    downloads: Math.floor(Math.random() * 1000) + 200,
    implementedRegions: Math.floor(Math.random() * 10) + 5,
    implementedCases: Math.floor(Math.random() * 1000) + 500,
    policyImpact: Math.floor(Math.random() * 70) + 30
  };

  // Generate monthly citation data for the chart
  const generateMonthlyData = () => {
    const months = 6;
    const data = [];
    let trending = 0;
    
    for (let i = 0; i < months; i++) {
      // Create a growth trend with some randomness
      trending += Math.floor(impactData.citations / (months * 2) * (0.5 + Math.random()));
      data.push(trending);
    }
    
    return data;
  };
  
  const [monthlyData] = useState(generateMonthlyData);
  
  // Trigger animations on component mount
  useEffect(() => {
    // Short delay before starting animations
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm">Research Impact</h3>
        <div className="text-xs text-gray-500 flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
          Updated Recently
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        {/* Citation stats */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <h4 className="text-xs font-semibold text-gray-700">Citations</h4>
            <div className="text-xs text-gray-500">Field: <span className="font-medium text-hopkins-blue">{impactData.fieldPercentile}th</span></div>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="text-2xl font-bold text-gray-900 mr-2">{impactData.citations}</div>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {impactData.citationsGrowth}% growth
            </div>
          </div>
          
          {/* Modern chart */}
          <div className="bg-white rounded-lg border border-gray-100 p-2 h-16 flex items-end gap-1">
            {monthlyData.map((value, i) => (
              <div key={i} className="relative flex-1 flex flex-col items-center">
                <div 
                  className={`bg-gradient-to-t from-hopkins-blue to-hopkins-spirit-blue rounded-t w-full transition-all duration-1000 ${animated ? '' : 'h-0'}`}
                  style={{ 
                    height: animated ? `${(value / Math.max(...monthlyData)) * 100}%` : '0',
                    transitionDelay: `${i * 100}ms`
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <div>6 mo ago</div>
            <div>Current</div>
          </div>
        </div>
        
        {/* Alternative metrics */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Alternative Metrics</h4>
          
          <div className="grid grid-cols-3 gap-1">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-2 border border-amber-100">
              <div className="text-base font-bold text-amber-600">{impactData.altmetric}</div>
              <div className="text-xs text-gray-500">Altmetric</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-2 border border-blue-100">
              <div className="text-base font-bold text-blue-600">{impactData.reads.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Reads</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-2 border border-green-100">
              <div className="text-base font-bold text-green-600">{impactData.downloads.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Downloads</div>
            </div>
          </div>
        </div>
        
        {/* Real-world impact */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Real-World Impact</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold text-gray-900">{impactData.implementedRegions}</div>
                  <div className="text-xs text-gray-500">Regions Implemented</div>
                </div>
                <div className="p-1.5 rounded-full bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold text-gray-900">{impactData.implementedCases.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Cases Affected</div>
                </div>
                <div className="p-1.5 rounded-full bg-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Policy impact meter */}
          <div className="mt-2 bg-white rounded-lg border border-gray-100 p-3">
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs font-medium text-gray-700">Policy Impact</div>
              <div className="text-xs font-bold text-gray-900">{impactData.policyImpact}%</div>
            </div>
            
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-hopkins-spirit-blue to-hopkins-blue rounded-full transition-all duration-1000"
                style={{ width: animated ? `${impactData.policyImpact}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Data attribution */}
        <div className="mt-3 text-xs text-gray-400 text-right italic">
          Data from Web of Science & Altmetric
        </div>
      </div>
    </div>
  );
}
