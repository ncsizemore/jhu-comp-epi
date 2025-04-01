import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Our Team | JHU Computational Epidemiology',
  description: 'Meet the researchers and staff of the Johns Hopkins University Computational Epidemiology Research Group',
};

export default function TeamPage() {
  return (
    <MainLayout>
      {/* Enhanced header with visual interest and typography */}
      <section className="bg-hopkins-spirit-blue text-white py-12 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 bg-[url('/graph-pattern.svg')] bg-[length:24px_24px] opacity-[0.07] z-0"></div>
        
        {/* Geometric decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-white/[0.03] clip-path-polygon-tr z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-white/[0.03] clip-path-polygon-bl z-0"></div>
        
        {/* Abstract data visualization elements */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 opacity-20 z-0"></div>
        <div className="absolute right-24 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full border border-white/10 opacity-20 z-0"></div>
        <div className="absolute right-36 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full border border-white/10 opacity-20 z-0"></div>
        
        {/* Floating dots */}
        <div className="absolute right-20 top-1/3 w-2 h-2 bg-white rounded-full opacity-30 z-0"></div>
        <div className="absolute right-48 top-1/4 w-3 h-3 bg-white rounded-full opacity-20 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl relative">
            {/* Subtle highlight element */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-hopkins-gold opacity-70 rounded"></div>
            
            {/* Enhanced typography - more compact */}
            <div className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white/10 rounded-full mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-hopkins-gold rounded-full mr-2"></span>
              Research Group
            </div>
            
            <h1 className="text-4xl font-bold mb-3 leading-tight tracking-tight drop-shadow-sm">
              <span className="relative inline-block">
                Our Team
                <span className="absolute bottom-1 left-0 w-full h-1 bg-hopkins-gold/40 -z-10"></span>
              </span>
            </h1>
            
            <p className="text-lg text-white/90 leading-relaxed max-w-xl mb-0">
              The Computational Epidemiology Research Group brings together experts from 
              epidemiology, biostatistics, computer science, and clinical medicine.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Team member information will be added as the project develops.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}