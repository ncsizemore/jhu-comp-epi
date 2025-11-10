import { useState, useEffect, useCallback } from 'react';

export interface UseCarouselOptions {
  /** Number of items in the carousel */
  itemCount: number;
  /** Auto-play interval in milliseconds (default: 6000) */
  autoPlayInterval?: number;
  /** Duration to pause auto-play after manual interaction in milliseconds (default: 10000) */
  pauseDuration?: number;
}

export interface UseCarouselResult {
  /** Current slide index */
  currentSlide: number;
  /** Whether auto-play is currently active */
  isAutoPlaying: boolean;
  /** Navigate to a specific slide */
  goToSlide: (index: number) => void;
  /** Navigate to the next slide */
  nextSlide: () => void;
  /** Navigate to the previous slide */
  prevSlide: () => void;
  /** Pause auto-play */
  pause: () => void;
  /** Resume auto-play */
  resume: () => void;
  /** Toggle auto-play on/off */
  toggleAutoPlay: () => void;
}

/**
 * Custom hook for managing carousel/slideshow functionality
 *
 * Provides auto-play, navigation controls, and interaction handling for carousels.
 * Automatically pauses when user interacts and resumes after a delay.
 *
 * @param options - Configuration options for the carousel
 * @returns Carousel state and control functions
 */
export function useCarousel({
  itemCount,
  autoPlayInterval = 6000,
  pauseDuration = 10000,
}: UseCarouselOptions): UseCarouselResult {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying || itemCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % itemCount);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemCount, autoPlayInterval]);

  // Memoize callback functions to prevent unnecessary re-renders
  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), pauseDuration);
    },
    [pauseDuration]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % itemCount);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), pauseDuration);
  }, [itemCount, pauseDuration]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + itemCount) % itemCount);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), pauseDuration);
  }, [itemCount, pauseDuration]);

  const pause = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  return {
    currentSlide,
    isAutoPlaying,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    toggleAutoPlay,
  };
}
