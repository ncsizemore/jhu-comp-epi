/**
 * HeroBackground Component
 *
 * Provides consistent decorative background patterns for hero sections.
 * Eliminates code duplication across multiple pages (team, projects, publications, home).
 */

interface HeroBackgroundProps {
  variant?: 'default' | 'dark' | 'light';
  className?: string;
}

export function HeroBackground({ variant: _variant = 'default', className = '' }: HeroBackgroundProps) {
  return (
    <>
      {/* Gradient orb backgrounds */}
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-hopkins-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-hopkins-gold/10 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-hopkins-gold/20 to-amber-400/30 transform rotate-45 rounded-2xl shadow-lg"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-emerald-400/25 to-teal-500/35 rounded-full shadow-md"></div>
        <div className="absolute top-1/2 left-20 w-16 h-64 bg-gradient-to-b from-hopkins-blue/15 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12"></div>
      </div>
    </>
  );
}
