import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/storeData';

interface HeroCarouselProps {
  onCtaClick: (categorySlug?: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onCtaClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isPaused) {
      slideIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [isPaused, currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Promotions et actualités EXO ISLAND"
      className="max-w-7xl mx-auto px-4 sm:px-8 h-[300px] sm:h-[340px] mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container matching Design HTML */}
      <div className="h-full w-full bg-[#16332A] rounded-2xl relative overflow-hidden flex items-center shadow-lg border border-[#C6A468]/20">
        
        {/* Background Image with soft dark blend */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src={slide.image}
            alt={slide.titleLight}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Gradient flourish on right from reference HTML */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 bg-gradient-to-l from-[#C6A468] to-transparent pointer-events-none" />

        {/* Text Content */}
        <div className="z-10 pl-6 sm:pl-16 max-w-xl pr-4">
          <span className="text-[#C6A468] uppercase tracking-[0.2em] text-xs font-bold block">
            {slide.eyebrow || 'Nouveauté'}
          </span>
          <h1 className="font-fraunces text-3xl sm:text-5xl text-[#F8F4EA] mt-2 mb-3 sm:mb-4 leading-tight font-medium">
            {slide.titleLight}{' '}
            <span className="italic text-[#DFCA9B]">
              {slide.titleAccent}
            </span>
          </h1>
          <p className="text-[#A8BFAE] text-sm sm:text-base mb-5 sm:mb-6 line-clamp-2 max-w-md">
            {slide.subtitle}
          </p>
          <button
            id={`hero-cta-btn-${slide.id}`}
            onClick={() => onCtaClick(slide.categorySlug)}
            className="bg-[#C6A468] text-[#16332A] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#F8F4EA] transition-all cursor-pointer shadow-md hover:scale-105"
          >
            {slide.ctaText || "Découvrir l'offre"}
          </button>
        </div>

        {/* Pagination Dots at Bottom Right */}
        <div className="absolute bottom-6 right-8 sm:right-12 flex space-x-3 z-10">
          {HERO_SLIDES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setCurrentSlide(dotIndex)}
              aria-label={`Aller à la diapositive ${dotIndex + 1}`}
              className={`rounded-full transition-all duration-300 ${
                dotIndex === currentSlide
                  ? 'w-3 h-3 bg-[#F8F4EA]'
                  : 'w-2.5 h-2.5 bg-[#F8F4EA]/30 hover:bg-[#F8F4EA]/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
