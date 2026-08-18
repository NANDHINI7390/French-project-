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
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 6 products matching screenshot
  const marketItems = TODAY_MARKET_PRODUCTS.slice(0, 6);

  return (
    <section
      aria-label="Aujourd'hui au marché"
      className="relative w-full bg-[#11241C] text-white py-10 sm:py-14 my-6 overflow-hidden shadow-2xl border-y border-[#C6A468]/30"
    >
      {/* Decorative Botanical Foliage Watermarks */}
      <div className="absolute left-0 top-0 bottom-0 w-48 opacity-20 pointer-events-none flex items-center">
        <svg className="w-36 h-64 text-[#A8BFAE]" fill="currentColor" viewBox="0 0 100 200">
          <path d="M10,100 Q40,30 80,20 Q60,80 30,100 Q60,120 80,180 Q40,170 10,100 Z" />
          <path d="M5,50 Q30,10 60,5 Q45,45 20,60 Z" />
          <path d="M5,150 Q30,190 60,195 Q45,155 20,140 Z" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-48 opacity-20 pointer-events-none flex items-center justify-end">
        <svg className="w-36 h-64 text-[#A8BFAE] transform scale-x-[-1]" fill="currentColor" viewBox="0 0 100 200">
          <path d="M10,100 Q40,30 80,20 Q60,80 30,100 Q60,120 80,180 Q40,170 10,100 Z" />
          <path d="M5,50 Q30,10 60,5 Q45,45 20,60 Z" />
          <path d="M5,150 Q30,190 60,195 Q45,155 20,140 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading with Golden Wheat Sheafs */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="text-[#C6A468] text-xl sm:text-2xl select-none">🌾</span>
            <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl text-[#C6A468] font-bold tracking-wider uppercase drop-shadow-md">
              AUJOURD'HUI AU MARCHÉ
            </h2>
            <span className="text-[#C6A468] text-xl sm:text-2xl select-none">🌾</span>
          </div>
          <p className="text-xs sm:text-sm text-[#A8BFAE] mt-1 font-light tracking-wide">
            Les arrivages frais sélectionnés à l'aube par nos primeurs
          </p>
        </div>

        {/* Relative Container with Carousel Arrows & Cards */}
        <div className="relative">
          
          {/* Carousel Left Arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Produits précédents"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#16332A]/90 hover:bg-[#C6A468] text-[#C6A468] hover:text-[#16332A] items-center justify-center transition-all cursor-pointer border border-[#C6A468]/50 shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Right Arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Produits suivants"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#16332A]/90 hover:bg-[#C6A468] text-[#C6A468] hover:text-[#16332A] items-center justify-center transition-all cursor-pointer border border-[#C6A468]/50 shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 6 Deckle Sandalwood Old Crushed Paper Cards */}
          <div
            ref={scrollRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar py-4 px-1"
          >
            {marketItems.map((product) => {
              const inCart = cartProductIds.has(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onQuickView(product)}
                  className="sandle-crushed-paper text-[#232420] p-3 sm:p-4 flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 group select-none shadow-xl"
                >
                  {/* Subtle Stamp Badge */}
                  <div className="relative z-10 flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A5826] bg-[#DBC49A]/60 px-1.5 py-0.5 rounded-xs border border-[#8C6430]/20">
                      FRAIS DU JOUR
                    </span>
                  </div>

                  {/* Product Image Frame */}
                  <div className="relative z-10 w-full aspect-square my-1.5 overflow-hidden rounded bg-[#FAF5E8]/80 flex items-center justify-center p-2 border border-[#CDB58A]/60 shadow-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Title in Italic Serif */}
                  <div className="relative z-10 text-center my-1.5 flex-1 flex flex-col justify-center">
                    <h3 className="font-fraunces italic font-semibold text-sm sm:text-base text-[#16332A] leading-tight group-hover:text-[#6B2E3B] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Unit */}
                  <div className="relative z-10 text-center mt-1 pt-2 border-t border-[#8C6430]/25 flex items-center justify-between">
                    <div className="inline-flex items-baseline gap-1 text-left">
                      <span className="font-mono-price font-bold text-base sm:text-lg text-[#16332A]">
                        {product.price.toFixed(2).replace('.', ',')}€
                      </span>
                      <span className="text-[11px] text-[#6B5538] font-medium">
                        {product.unit}
                      </span>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      type="button"
                      id={`market-add-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        inCart
                          ? 'bg-[#16332A] text-white shadow-xs'
                          : 'bg-[#C6A468] hover:bg-[#16332A] text-[#16332A] hover:text-white shadow-xs'
                      }`}
                      title="Ajouter au panier"
                    >
                      {inCart ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};



