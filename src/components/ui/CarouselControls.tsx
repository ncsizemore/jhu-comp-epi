'use client';

import { memo } from 'react';

interface CarouselControlsProps {
  currentIndex: number;
  totalItems: number;
  isAutoPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  onToggleAutoPlay: () => void;
}

function CarouselControls({
  currentIndex,
  totalItems,
  isAutoPlaying,
  onPrevious,
  onNext,
  onGoToSlide,
  onToggleAutoPlay
}: CarouselControlsProps) {
  if (totalItems <= 1) return null;

  return (
    <>
      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group/nav"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group/nav"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-8 right-8 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-hopkins-gold to-amber-400 rounded-full transition-all duration-6000 ease-linear"
          style={{
            width: `${(currentIndex + 1) / totalItems * 100}%`
          }}
        ></div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-3 mt-12">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`group relative transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 h-4'
                : 'w-4 h-4 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-hopkins-gold to-amber-400 shadow-2xl shadow-hopkins-gold/50'
                : 'bg-white/40 group-hover:bg-white/60'
            }`}></div>

            {/* Active slide progress indicator */}
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-white/30 to-transparent rounded-full transition-all duration-6000 ease-linear"
                  style={{
                    width: isAutoPlaying ? '100%' : '0%',
                    transitionDuration: isAutoPlaying ? '6000ms' : '300ms'
                  }}
                ></div>
              </div>
            )}
          </button>
        ))}

        {/* Auto-play Toggle */}
        <button
          onClick={onToggleAutoPlay}
          className={`ml-4 w-8 h-8 rounded-full border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/50 ${
            isAutoPlaying ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
          }`}
          title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default memo(CarouselControls);
