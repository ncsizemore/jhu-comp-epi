export default function StatsSection() {
  const stats = [
    { label: "Cities Modeled", value: "23" },
    { label: "Publications", value: "47" },
    { label: "Team Members", value: "12" },
    { label: "Active Models", value: "3" },
  ];

  return (
    <section className="relative z-10 -mt-16 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`px-8 py-10 text-center ${
                index < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-200' : ''
              }`}
            >
              <div className="text-4xl font-bold text-teal-700 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}