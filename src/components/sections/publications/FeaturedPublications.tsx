'use client';

'use client';

import { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Publication } from '@/data/publications';
import JournalPage from './JournalPage';
import JournalImpactPage from './JournalImpactPage';
import FeaturedPublicationCard from './FeaturedPublicationCard'; // Import the new card component

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FeaturedPublicationsProps {
  publications: Publication[];
}

export default function FeaturedPublications({ publications }: FeaturedPublicationsProps) {
  const featuredPubs = publications.filter(pub => pub.featured).slice(0, 3); // Keep top 3 featured
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: featuredPubs.length > 1, // Only loop if more than 1 item
    speed: 500,
    slidesToShow: 1, // Show one large card at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, // Change slide every 8 seconds
    pauseOnHover: true,
    arrows: true, // Show navigation arrows
    className: "center", // Custom class for potential styling
    centerMode: true, // Enables center view with partial prev/next slides shown
    centerPadding: "20%", // Adjust padding to control how much of the next/prev slides are visible
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 1,
          centerPadding: "15%",
        }
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 1,
          centerPadding: "10%",
          arrows: false, // Hide arrows on smaller screens, rely on dots/swipe
        }
      },
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 1,
          centerPadding: "5%",
          arrows: false,
        }
      }
    ]
  };

  const handleCardClick = (publication: Publication) => {
    setSelectedPublication(publication);
  };

  const handleCloseDetailView = () => {
    setSelectedPublication(null);
  };

  // Ensure component only renders client-side where Slider works
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Optional: Render a placeholder or null on the server
    return null;
  }

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl border-b-2 border-hopkins-gold inline-block px-4 pb-1">
            Featured Research
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:mt-4 max-w-xl mx-auto">
            Explore some of our key publications driving innovation in computational epidemiology.
          </p>
        </div>

        {/* Conditional Rendering: Carousel or Detail View */}
        {!selectedPublication ? (
          /* Carousel View */
          <div className="featured-carousel-container"> {/* Added container for potential styling */}
            <Slider {...sliderSettings}>
              {featuredPubs.map((pub) => (
                <div key={pub.id} className="px-2 md:px-4"> {/* Add padding between slides */}
                  <FeaturedPublicationCard
                    publication={pub}
                    onClick={() => handleCardClick(pub)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          /* Detail View */
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={handleCloseDetailView}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-20"
              aria-label="Close publication details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Re-use Journal Layout */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left Side (Details) */}
              <div className="md:w-1/2">
                <JournalPage
                  publication={selectedPublication}
                  isLeftPage={true} // Keep prop for potential styling differences
                />
              </div>
              {/* Right Side (Impact/Metrics) */}
              <div className="md:w-1/2">
                <JournalImpactPage
                  publication={selectedPublication}
                  isRightPage={true} // Keep prop for potential styling differences
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom styles if needed, e.g., for arrow positioning or dots */}
      <style jsx global>{`
        .featured-carousel-container .slick-prev,
        .featured-carousel-container .slick-next {
          z-index: 10;
          width: 40px; /* Adjust size */
          height: 40px; /* Adjust size */
        }
        .featured-carousel-container .slick-prev {
          left: -50px; /* Adjust position */
        }
        .featured-carousel-container .slick-next {
          right: -50px; /* Adjust position */
        }
        .featured-carousel-container .slick-prev:before,
        .featured-carousel-container .slick-next:before {
          font-size: 30px; /* Adjust icon size */
          color: #4B5563; /* Gray-600 */
          opacity: 0.75;
        }
        .featured-carousel-container .slick-prev:hover:before,
        .featured-carousel-container .slick-next:hover:before {
           opacity: 1;
           color: #1F2937; /* Gray-800 */
        }
        
        /* Responsive arrow positioning */
        @media (max-width: 1280px) {
          .featured-carousel-container .slick-prev { left: -25px; }
          .featured-carousel-container .slick-next { right: -25px; }
        }
         @media (max-width: 768px) {
          .featured-carousel-container .slick-prev,
          .featured-carousel-container .slick-next {
             display: none !important; /* Hide arrows on smaller screens as configured */
          }
        }

        .featured-carousel-container .slick-dots li button:before {
          font-size: 10px; /* Adjust dot size */
          color: #9CA3AF; /* Gray-400 */
          opacity: 0.5;
        }
        .featured-carousel-container .slick-dots li.slick-active button:before {
          color: #FDB913; /* Hopkins Gold */
          opacity: 1;
        }
        .featured-carousel-container .slick-dots {
          bottom: -30px; /* Position dots below the carousel */
        }

        /* Fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
