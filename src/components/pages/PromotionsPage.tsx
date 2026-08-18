import React, { useState, useEffect, useMemo } from 'react';
import { ALL_PRODUCTS, CATEGORIES } from '../../data/storeData';
import { Product, StoreId } from '../../types';
import {
  ChevronRight,
  Clock,
  Percent,
  Heart,
  Plus,
  Minus,
  Flame,
  ArrowUpDown,
} from 'lucide-react';

interface PromotionsPageProps {
  selectedStore: StoreId;
  cartItems: { product: Product; quantity: number }[];
  wishlist: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (categorySlug: string) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({
  selectedStore,
  cartItems,
  wishlist,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const [activeDiscountFilter, setActiveDiscountFilter] = useState<'all' | '30' | '20' | '15'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount-desc' | 'price-asc' | 'price-desc'>('discount-desc');

  // Flash promo timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter only products that have discounts or promotions
  const promoProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => (p.discountPercentage && p.discountPercentage > 0) || p.originalPrice);
  }, []);

  const displayedPromos = useMemo(() => {
    let list = [...promoProducts];

    if (activeDiscountFilter === '30') {
      list = list.filter((p) => (p.discountPercentage || 0) >= 30);
    } else if (activeDiscountFilter === '20') {
      list = list.filter((p) => (p.discountPercentage || 0) >= 20);
    } else if (activeDiscountFilter === '15') {
      list = list.filter((p) => (p.discountPercentage || 0) >= 15);
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'discount-desc':
        list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return list;
  }, [promoProducts, activeDiscountFilter, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#232420]/60 mb-3 sm:mb-5">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold">Promotions & Bons Plans</span>
        </nav>

        {/* Hero Banner with Countdown Timer */}
        <div className="bg-[#6B2E3B] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C6A468]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-[#F8F4EA] font-bold tracking-wider uppercase mb-2 sm:mb-3">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C6A468]" />
                <span>Offres Spéciales Semaine</span>
              </div>

              <h1 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                Le Grand Marché des <span className="italic text-[#C6A468] font-normal">Promotions</span>
              </h1>

              <p className="text-[11px] sm:text-xs md:text-sm text-[#F8F4EA]/80 font-light leading-relaxed">
                Faites le plein d'économies sur vos produits du quotidien et les arrivages d'exception. Jusqu'à -30% de remise immédiate !
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-[#16332A] border border-white/15 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center flex-shrink-0 shadow-lg self-start md:self-auto w-full sm:w-auto">
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-[#C6A468] font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Fin des offres dans :</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="bg-white/10 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-center min-w-[42px] sm:min-w-[50px]">
                  <span className="font-mono-price text-base sm:text-2xl font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A8BFAE] uppercase">Heures</span>
                </div>
                <span className="font-bold text-sm sm:text-lg text-[#C6A468]">:</span>
                <div className="bg-white/10 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-center min-w-[42px] sm:min-w-[50px]">
                  <span className="font-mono-price text-base sm:text-2xl font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A8BFAE] uppercase">Min</span>
                </div>
                <span className="font-bold text-sm sm:text-lg text-[#C6A468]">:</span>
                <div className="bg-white/10 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-center min-w-[42px] sm:min-w-[50px]">
                  <span className="font-mono-price text-base sm:text-2xl font-bold text-[#C6A468] block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-[#A8BFAE] uppercase">Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-6 no-scrollbar">
          <button
            onClick={() => setActiveDiscountFilter('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeDiscountFilter === 'all'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'bg-white text-[#232420] border border-[#E8E2D5] hover:border-[#16332A]'
            }`}
          >
            Toutes les réductions ({promoProducts.length})
          </button>
          <button
            onClick={() => setActiveDiscountFilter('30')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
              activeDiscountFilter === '30'
                ? 'bg-[#6B2E3B] text-white shadow-md'
                : 'bg-white text-[#6B2E3B] border border-[#E8E2D5] hover:border-[#6B2E3B]'
            }`}
          >
            <Percent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            -30% et plus
          </button>
          <button
            onClick={() => setActiveDiscountFilter('20')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
              activeDiscountFilter === '20'
                ? 'bg-[#6B2E3B] text-white shadow-md'
                : 'bg-white text-[#232420] border border-[#E8E2D5] hover:border-[#16332A]'
            }`}
          >
            -20% et plus
          </button>
          <button
            onClick={() => setActiveDiscountFilter('15')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
              activeDiscountFilter === '15'
                ? 'bg-[#6B2E3B] text-white shadow-md'
                : 'bg-white text-[#232420] border border-[#E8E2D5] hover:border-[#16332A]'
            }`}
          >
            -15% et plus
          </button>
        </div>

        {/* Toolbar with Department filter & Sorting */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E2D5] shadow-xs mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#16332A] whitespace-nowrap">Rayon :</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#16332A] font-semibold focus:outline-none focus:border-[#C6A468] w-full sm:w-auto"
            >
              <option value="all">Tous les rayons</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
            <div className="flex items-center gap-1 text-xs text-[#232420]/70 font-semibold whitespace-nowrap">
              <ArrowUpDown className="w-3 h-3 text-[#C6A468]" />
              <span>Trier :</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#16332A] font-semibold focus:outline-none focus:border-[#C6A468]"
            >
              <option value="discount-desc">Plus forte remise (%)</option>
              <option value="price-asc">Prix croissant (€ → €€€)</option>
              <option value="price-desc">Prix décroissant (€€€ → €)</option>
            </select>
          </div>
        </div>

        {/* Product Grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {displayedPromos.map((product) => {
            const inWishlist = wishlist.includes(product.id);
            const cartItem = cartItems.find((item) => item.product.id === product.id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;
            const isAvailable = product.storeAvailability[selectedStore];

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Top Image */}
                <div
                  className="relative aspect-square overflow-hidden bg-[#FAF7F0] cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {product.discountPercentage && (
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#6B2E3B] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                      -{product.discountPercentage}%
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#232420] hover:text-[#6B2E3B] transition-colors shadow-xs z-10 cursor-pointer"
                    title={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        inWishlist ? 'fill-[#6B2E3B] text-[#6B2E3B]' : 'text-[#232420]/70'
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {product.origin && (
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#C6A468] block tracking-wide">
                        {product.origin}
                      </span>
                    )}

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-fraunces text-xs sm:text-sm md:text-base font-bold text-[#16332A] group-hover:text-[#6B2E3B] transition-colors cursor-pointer line-clamp-2 mt-0.5 leading-snug"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-[#232420]/60 line-clamp-1 mt-0.5">
                      {product.subtitle || product.unit}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-gray-100">
                    <div className="flex items-baseline justify-between gap-1 mb-2">
                      <div>
                        <span className="font-mono-price font-bold text-sm sm:text-base md:text-lg text-[#6B2E3B]">
                          {product.price.toFixed(2).replace('.', ',')} €
                        </span>
                        {product.originalPrice && (
                          <span className="font-mono-price text-[10px] sm:text-xs text-gray-400 line-through ml-1">
                            {product.originalPrice.toFixed(2).replace('.', ',')} €
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-gray-500">{product.unit}</span>
                    </div>

                    {!isAvailable ? (
                      <div className="w-full py-1.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-medium text-center">
                        Indisponible
                      </div>
                    ) : quantityInCart === 0 ? (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full py-1.5 sm:py-2 px-2 rounded-xl bg-[#6B2E3B] hover:bg-[#833848] text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Profiter de l'offre</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-[#F8F4EA] border border-[#16332A]/20 rounded-xl p-0.5 sm:p-1">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A] px-1">
                          {quantityInCart}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#16332A] text-white flex items-center justify-center hover:bg-[#234d40] transition-colors cursor-pointer"
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

      </div>
    </div>
  );
};
