import React, { useRef } from 'react';
import { ChevronRight, ArrowRight, Heart, Plus, Minus, Check } from 'lucide-react';
import { PROMOTION_PRODUCTS } from '../data/storeData';
import { Product } from '../types';

interface PromotionsSectionProps {
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  getCartQuantity: (productId: string) => number;
  wishlistIds: Set<string>;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onQuickView,
  getCartQuantity,
  wishlistIds,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // 5 exact products matching the screenshot
  const promoItems = PROMOTION_PRODUCTS.slice(0, 5);

  return (
    <section aria-label="Nos offres du moment" className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      
      {/* Header: Centered Title with Wheat + Right Link */}
      <div className="relative mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="text-[#C6A468] text-lg sm:text-2xl select-none">🌾</span>
            <h2 className="font-fraunces text-2xl sm:text-3xl text-[#16332A] font-bold tracking-wider uppercase">
              NOS OFFRES DU MOMENT
            </h2>
            <span className="text-[#C6A468] text-lg sm:text-2xl select-none">🌾</span>
          </div>
        </div>

        {/* Right side 'Voir toutes les offres ->' */}
        <div className="sm:absolute right-0 top-1/2 sm:-translate-y-1/2 text-center sm:text-right mt-2 sm:mt-0">
          <a
            href="#promotions"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B263E] hover:text-[#16332A] transition-colors"
          >
            <span>Voir toutes les offres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Product Cards Row with Right Navigation Arrow */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar py-2"
        >
          {promoItems.map((product) => {
            const qty = getCartQuantity(product.id);
            const isWishlisted = wishlistIds.has(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#EBE5DA] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top: Red Discount Badge + Wishlist Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#B92A3E] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {product.badge || `-${product.discountPercentage}%`}
                    </span>

                    <button
                      type="button"
                      aria-label="Ajouter aux favoris"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className={`p-1.5 rounded-full transition-colors ${
                        isWishlisted
                          ? 'text-[#6B2E3B] bg-[#6B2E3B]/10'
                          : 'text-gray-400 hover:text-[#6B2E3B] hover:bg-gray-100'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="w-full aspect-square bg-white flex items-center justify-center p-2 rounded-lg cursor-pointer mb-2 overflow-hidden relative"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Name & Unit */}
                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-sans font-bold text-xs sm:text-sm text-[#16332A] leading-snug cursor-pointer hover:text-[#C6A468] transition-colors line-clamp-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#787870] mt-0.5">
                    {product.unit}
                  </p>
                </div>

                {/* Price & Add / Quantity Button */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono-price font-bold text-base sm:text-lg text-[#B92A3E]">
                      {product.price.toFixed(2).replace('.', ',')}€
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono-price text-xs text-[#9E9E95] line-through">
                        {product.originalPrice.toFixed(2).replace('.', ',')}€
                      </span>
                    )}
                  </div>

                  {/* Dynamic Add / Quantity Controller */}
                  {qty > 0 ? (
                    <div className="flex items-center justify-between bg-[#16332A] text-white rounded-lg p-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(product.id, -1);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/20 transition-colors text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold font-mono px-2">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateQuantity(product.id, 1);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/20 transition-colors text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`promo-add-btn-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2 px-3 rounded-lg bg-[#16332A] hover:bg-[#234d40] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          aria-label="Faire défiler vers la droite"
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white text-[#16332A] shadow-lg border border-[#E0D8C8] items-center justify-center hover:bg-[#16332A] hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </section>
  );
};


