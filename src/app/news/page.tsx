import MainLayout from '@/components/layout/MainLayout';
import { HeroBackground } from '@/components/ui/HeroBackground';

export const metadata = {
  title: 'News & Media | The Computational Epidemiology Lab',
  description: 'Latest news, media coverage, and research highlights from the Computational Epidemiology Lab at Johns Hopkins University',
};

// News items data - can be moved to a separate data file later
const newsItems = [
  {
    id: 1,
    date: 'September 2025',
    source: 'NBC News',
    title: 'Experts warn of consequences from proposed HIV funding cuts',
    description: 'Dr. Anthony Fojo discusses how eliminating the CDC\'s HIV-prevention division could disrupt critical functions as models project over 213,000 additional infections through 2030.',
    url: 'https://www.nbcnews.com/health/sexual-health/republicans-seek-deep-cuts-hiv-prevention-treatment-funding-rcna233776',
    featured: true,
    category: 'Media Coverage'
  },
  // Add more news items here as they come in
];

export default function NewsPage() {
  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              News & Media
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-hopkins-gold via-amber-400 to-orange-400 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Research highlights, media coverage, and public health impact
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured</h2>
              <p className="text-gray-600">Latest news and media coverage</p>
            </div>

            <div className="space-y-6">
              {featuredNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-red-400/40 p-6 hover:shadow-2xl hover:border-red-500/60 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Attention badge */}
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    ⚡ Featured in the News
                  </div>

                  <div className="flex items-start gap-4 mt-2">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gray-600">{item.source}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="text-sm text-red-700 font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read full article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News Archive */}
      {regularNews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">News Archive</h2>
              <p className="text-gray-600">Previous coverage and highlights</p>
            </div>

            <div className="space-y-4">
              {regularNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-hopkins-blue to-hopkins-spirit-blue rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-600">{item.source}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                        {item.category && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-hopkins-blue font-medium">{item.category}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-hopkins-blue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      <span className="text-xs text-hopkins-blue font-semibold inline-flex items-center gap-1">
                        Read more
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State - if no regular news */}
      {regularNews.length === 0 && featuredNews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-gray-500">More news coming soon...</p>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
