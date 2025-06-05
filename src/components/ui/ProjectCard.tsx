'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ProjectStat {
  [key: string]: string | undefined;
}

interface ProjectCardProps {
  id: string;
  title: string;
  shortName: string;
  description: string;
  color: string;
  stats: ProjectStat;
  imageUrl?: string;
}

// Visual patterns for the cards when no image is provided
const patterns = {
  'bg-hopkins-blue': '/project-patterns/data-nodes-blue.svg',
  'bg-hopkins-gold': '/project-patterns/data-nodes-gold.svg',
  'bg-hopkins-spirit-blue': '/project-patterns/data-nodes-spirit.svg',
  'bg-emerald-600': '/project-patterns/data-nodes-emerald.svg',
};

export default function ProjectCard({ 
  id, 
  title, 
  shortName, 
  description, 
  color, 
  stats,
  imageUrl 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get default pattern if no image provided
  const backgroundPattern = imageUrl || patterns[color as keyof typeof patterns] || patterns['bg-hopkins-blue'];
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
      }}
    >
      {/* Card Header with Image/Pattern Background */}
      <div 
        className={`${color} h-48 relative overflow-hidden`}
      >
        {/* Background Image or Pattern */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `url(${backgroundPattern})`,
          opacity: 0.2
        }}></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/30 rounded-full"></div>
        <div className="absolute top-12 left-12 w-3 h-3 bg-white/20 rounded-full"></div>
        
        {/* Project Name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-10 text-center">
            <span className="text-4xl font-bold text-white drop-shadow-md">{shortName}</span>
            <div className="w-16 h-1 bg-white/70 mx-auto mt-2 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {/* Statistics */}
        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <span className="font-bold text-xl text-gray-800">{value}</span>
              <span className="text-xs text-gray-500 mt-1 capitalize">{key}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="px-6 pb-6">
        <Link 
          href={`/projects/${id}`} 
          className="text-hopkins-blue font-medium hover:text-hopkins-blue/70 transition-colors flex items-center"
        >
          Learn More 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}