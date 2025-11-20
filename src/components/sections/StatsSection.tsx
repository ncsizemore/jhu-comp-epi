export default function StatsSection() {
  const stats = [
    { 
      label: "Cities Modeled", 
      value: "23", 
      description: "Across US metro areas",
      accent: "bg-hopkins-blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-hopkins-blue mx-auto group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ) 
    },
    { 
      label: "Publications", 
      value: "47", 
      description: "In peer-reviewed journals",
      accent: "bg-hopkins-spirit-blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-hopkins-spirit-blue mx-auto group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ) 
    },
    { 
      label: "Team Members", 
      value: "12", 
      description: "Researchers and developers",
      accent: "bg-hopkins-gold",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-hopkins-gold mx-auto group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ) 
    },
    {
      label: "Active Models",
      value: "2",
      description: "JHEEM, SHIELD",
      accent: "bg-hopkins-blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-hopkins-blue mx-auto group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ) 
    },
  ];

  return (
    <section className="relative z-10 -mt-5 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Accent line on top */}
              <div className={`h-1 w-full ${stat.accent} absolute top-0 left-0`}></div>
              
              <div className="px-6 py-8 text-center relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full -mt-12 -mr-12 opacity-10"></div>
                
                <div className="flex flex-col items-center relative">
                  {stat.icon}
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-hopkins-blue transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-400 max-w-[80%]">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}