import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { TODAY_MARKET_PRODUCTS } from '../data/storeData';
import { Product } from '../types';

interface TodayMarketProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  cartProductIds: Set<string>;
}

export const TodayMarket: React.FC<TodayMarketProps> = ({
  onAddToCart,
  onQuickView,
  cartProductIds,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Aujourd'hui au marché"
      className="relative w-full bg-[#16332A] text-[#F8F4EA] py-10 sm:py-14 my-4 overflow-hidden border-y border-[#C6A468]/30 shadow-2xl"
    >
      {/* Decorative Botanical Foliage Watermark Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none market-board-pattern" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#A8BFAE]/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C6A468]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="text-[#C6A468] text-lg select-none">🌾</span>
              <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl text-[#F8F4EA] font-semibold tracking-wide uppercase">
                Aujourd’hui au marché
              </h2>
              <span className="text-[#C6A468] text-lg select-none">🌾</span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8BFAE] mt-1 font-light">
              Les arrivages les plus frais du petit matin, sélectionnés avec passion par nos primeurs et artisans
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => scroll('left')}
              aria-label="Voir les produits précédents du marché"
              className="w-10 h-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Voir les produits suivants du marché"
              className="w-10 h-10 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Torn Paper Deckle-Edge Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2 -mx-2"
        >
          {TODAY_MARKET_PRODUCTS.map((product) => {
            const inCart = cartProductIds.has(product.id);
            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] group flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Torn-paper card container */}
                <div className="torn-paper flex-1 flex flex-col p-4 sm:p-5 text-[#232420] relative rounded-sm">
                  
                  {/* Subtle Stamp/Origin tag */}
                  {product.origin && (
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#16332A]/70 mb-2 truncate">
                      {product.origin}
                    </div>
                  )}

                  {/* Product Image */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative w-full h-36 sm:h-40 my-1 overflow-hidden cursor-pointer rounded-lg bg-white/60 p-2 flex items-center justify-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#16332A] text-[#F8F4EA]">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Name and handwritten/italic style subtitle */}
                  <div className="mt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-fraunces font-bold text-base sm:text-lg text-[#16332A] cursor-pointer hover:text-[#C6A468] transition-colors leading-tight"
                      >
                        {product.name}
                      </h3>
                      {product.subtitle && (
                        <p className="text-xs italic text-[#232420]/75 font-serif mt-0.5 line-clamp-1">
                          {product.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Price and Unit Row matching screenshot */}
                    <div className="mt-4 pt-2 border-t border-[#16332A]/10 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono-price font-bold text-xl sm:text-2xl text-[#16332A]">
                          {product.price.toFixed(2).replace('.', ',')}€
                        </span>
                        <span className="text-xs text-[#232420]/70 font-serif italic">
                          {product.unit}
                        </span>
                      </div>

                      {/* Add Button */}
                      <button
                        id={`market-add-btn-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        aria-label={`Ajouter ${product.name} au panier`}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          inCart
                            ? 'bg-[#16332A] text-[#C6A468]'
                            : 'bg-[#16332A] text-white hover:bg-[#C6A468] hover:text-[#16332A] shadow'
                        }`}
                        title="Ajouter au panier"
                      >
                        {inCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
