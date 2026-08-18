import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Heart, ArrowRight } from 'lucide-react';
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
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: 'all', label: 'Toutes les offres' },
    { id: 'epicerie', label: 'Épicerie fine' },
    { id: 'produits-frais', label: 'Produits Frais' },
    { id: 'boissons', label: 'Boissons & Cave' },
    { id: 'viandes', label: 'Boucherie' },
    { id: 'maison', label: 'Maison' },
  ];

  const filteredProducts =
    selectedFilter === 'all'
      ? PROMOTION_PRODUCTS
      : PROMOTION_PRODUCTS.filter((p) => p.category === selectedFilter);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section aria-label="Toutes nos promotions" className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-1">
            Sélection Privilège
          </span>
          <h2 className="font-fraunces text-2xl sm:text-3xl text-[#16332A] font-semibold tracking-tight">
            Toutes nos promotions de saison
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              id={`promo-tab-${tab.id}`}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#16332A] text-[#F8F4EA] shadow-xs'
                  : 'bg-white text-gray-600 hover:text-[#16332A] border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        <button
          onClick={() => scroll('left')}
          aria-label="Faire défiler vers la gauche"
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-[#16332A] shadow-md border border-gray-200 items-center justify-center hover:bg-[#16332A] hover:text-[#C6A468] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {filteredProducts.map((product) => {
            const qty = getCartQuantity(product.id);
            const isWishlisted = wishlistIds.has(product.id);

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[190px] sm:w-[220px] flex flex-col bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Top: Discount Badge & Wishlist Heart */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#6B2E3B] text-white text-[10px] font-bold font-mono-price shadow-xs">
                    {product.badge || `-${product.discountPercentage}%`}
                  </span>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label={`Ajouter ${product.name} aux favoris`}
                    className={`p-1 rounded-full transition-colors ${
                      isWishlisted
                        ? 'text-[#6B2E3B]'
                        : 'text-gray-400 hover:text-[#6B2E3B]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Product Image */}
                <div
                  onClick={() => onQuickView(product)}
                  className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center p-2 mb-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-sans font-bold text-xs sm:text-sm text-[#16332A] cursor-pointer hover:text-[#C6A468] transition-colors leading-snug line-clamp-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {product.unit}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <div className="mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono-price font-bold text-base sm:text-lg text-[#6B2E3B]">
                          {product.price.toFixed(2).replace('.', ',')}€
                        </span>
                        {product.originalPrice && (
                          <span className="font-mono-price text-xs text-gray-400 line-through">
                            {product.originalPrice.toFixed(2).replace('.', ',')}€
                          </span>
                        )}
                      </div>
                    </div>

                    {qty === 0 ? (
                      <button
                        id={`promo-add-btn-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#16332A] text-white text-xs font-bold uppercase hover:bg-[#C6A468] hover:text-[#16332A] transition-all flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    ) : (
                      <div className="w-full py-1 px-2 rounded-lg bg-[#F8F4EA] border border-[#16332A]/20 flex items-center justify-between">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded bg-white text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-price font-bold text-xs text-[#16332A]">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded bg-[#16332A] text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          aria-label="Faire défiler vers la droite"
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-[#16332A] shadow-md border border-gray-200 items-center justify-center hover:bg-[#16332A] hover:text-[#C6A468] transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
