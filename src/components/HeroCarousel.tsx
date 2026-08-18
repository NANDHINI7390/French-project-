import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/storeData';

interface HeroCarouselProps {
  onCtaClick: (categorySlug?: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onCtaClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic slide rotation every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Promotions et actualités EXO ISLAND"
      className="max-w-7xl mx-auto px-3 sm:px-8 py-3 sm:py-5 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Hero Banner Container - Vertical Rectangle on mobile, Horizontal on desktop */}
      <div className="relative w-full min-h-[520px] sm:min-h-[460px] md:min-h-[420px] aspect-[3/4] sm:aspect-[4/3] md:aspect-auto bg-[#11241C] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#1E4336] flex flex-col md:flex-row items-center justify-between">
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C6A468]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#285A48]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Navigation Left Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Diapositive précédente"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#16332A]/85 hover:bg-[#C6A468] text-white hover:text-[#16332A] flex items-center justify-center transition-all duration-200 cursor-pointer border border-[#C6A468]/30 shadow-lg active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Navigation Right Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Diapositive suivante"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#16332A]/85 hover:bg-[#C6A468] text-white hover:text-[#16332A] flex items-center justify-center transition-all duration-200 cursor-pointer border border-[#C6A468]/30 shadow-lg active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Dynamic Slide Background Image Layer with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={s.image}
                alt={s.eyebrow}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
                referrerPolicy="no-referrer"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Vertical Gradient for mobile, Horizontal for desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#11241C] via-[#11241C]/85 to-[#11241C]/50 md:bg-gradient-to-r md:from-[#11241C] md:via-[#11241C]/90 md:to-[#11241C]/40" />
            </div>
          ))}
        </div>

        {/* Hero Content with Vertical Poster Layout on Mobile, Grid on Desktop */}
        <div
          key={slide.id}
          className="w-full h-full flex flex-col md:grid md:grid-cols-12 items-center justify-between md:justify-center px-5 sm:px-12 md:px-16 py-6 sm:py-10 md:py-12 relative z-10 gap-4 sm:gap-6 transition-all duration-500"
        >
          
          {/* Top/Left: Headlines & CTA */}
          <div className="w-full md:col-span-7 lg:col-span-7 z-10 max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-500 pt-2 sm:pt-0">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 bg-[#C6A468]/20 border border-[#C6A468]/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C6A468]" />
              <span className="text-[#E7CF9B] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold">
                {slide.eyebrow}
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl text-white font-medium leading-[1.15] mb-2 sm:mb-3 drop-shadow-md">
              {slide.titleLight}{' '}
              <span className="italic text-[#C6A468] font-normal block sm:inline">
                {slide.titleAccent}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#C8D6CD] text-xs sm:text-sm max-w-sm sm:max-w-md mb-4 sm:mb-6 leading-relaxed font-light drop-shadow-xs line-clamp-2 sm:line-clamp-none">
              {slide.subtitle}
            </p>

            {/* CTA & Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                id={`hero-cta-btn-${slide.id}`}
                onClick={() => onCtaClick(slide.categorySlug)}
                className="bg-[#C6A468] hover:bg-[#D8B97C] active:scale-95 text-[#16332A] font-bold text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer shadow-xl hover:shadow-[#C6A468]/20"
              >
                {slide.ctaText}
              </button>

              <span className="text-[11px] sm:text-xs text-[#A8BFAE] font-light hidden sm:inline-block">
                • Arrivages quotidiens garantis
              </span>
            </div>
          </div>

          {/* Bottom/Right: Visual Feature & Stamp Badge */}
          <div className="w-full md:col-span-5 lg:col-span-5 relative flex items-center justify-center md:justify-end animate-in fade-in zoom-in-95 duration-500 pb-4 sm:pb-0">
            
            {/* Featured Image Card with Golden Frame */}
            <div className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-[380px] aspect-4/3 sm:aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C6A468]/40 bg-[#16332A]/50">
              <img
                src={slide.image}
                alt={`${slide.titleLight} ${slide.titleAccent}`}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Deckle / Scalloped Promo Stamp Badge */}
            {slide.badgeHighlight && (
              <div className="absolute -top-2.5 -right-1 sm:-right-4 bg-[#6B2E3B] text-white p-2.5 sm:p-4 rounded-lg sm:rounded-xl shadow-2xl border border-white/20 text-center max-w-[120px] sm:max-w-[150px] transform rotate-3 hover:rotate-0 transition-transform">
                <span className="font-fraunces text-xs sm:text-base md:text-lg font-bold text-white block leading-tight">
                  {slide.badgeHighlight}
                </span>
                {slide.badgeText && (
                  <span className="text-[8px] sm:text-[9px] leading-tight block text-[#F8F4EA]/90 mt-0.5 sm:mt-1 font-light">
                    {slide.badgeText}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination Dots at Bottom Center */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30 bg-[#11241C]/60 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
          {HERO_SLIDES.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Aller à la diapositive ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#C6A468]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};


