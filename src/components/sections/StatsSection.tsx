export default function StatsSection() {
  const stats = [
    { label: "Cities Modeled", value: "23", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-hopkins-blue mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ) },
    { label: "Publications", value: "47", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-hopkins-blue mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ) },
    { label: "Team Members", value: "12", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-hopkins-blue mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ) },
    { label: "Active Models", value: "3", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-hopkins-blue mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ) },
  ];

  return (
    <section className="relative z-10 -mt-5 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden border border-gray-100">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`px-8 py-6 text-center group ${index < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''} hover:bg-hopkins-blue/5 transition-colors duration-300`}
            >
              <div className="flex flex-col items-center">
                {stat.icon}
                <div className="text-4xl font-bold text-hopkins-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}