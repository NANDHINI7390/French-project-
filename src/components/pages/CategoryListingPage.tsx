import React, { useState, useMemo } from 'react';
import { CATEGORIES, ALL_PRODUCTS } from '../../data/storeData';
import { Product, StoreId } from '../../types';
import {
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Heart,
  Plus,
  Minus,
  Check,
  Eye,
  Store,
  Sparkles,
  ArrowUpDown,
  Search,
} from 'lucide-react';

interface CategoryListingPageProps {
  categorySlug: string;
  selectedStore: StoreId;
  cartItems: { product: Product; quantity: number }[];
  wishlist: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory?: (categorySlug: string) => void;
  onNavigateHome: () => void;
  onNavigateAllCategories: () => void;
  onNavigateCategory?: (categorySlug: string) => void;
}

export const CategoryListingPage: React.FC<CategoryListingPageProps> = ({
  categorySlug,
  selectedStore,
  cartItems,
  wishlist,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onSelectProduct,
  onSelectCategory,
  onNavigateHome,
  onNavigateAllCategories,
  onNavigateCategory,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'discount'>('popular');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];

  const handleCategoryChange = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else if (onNavigateCategory) {
      onNavigateCategory(slug);
    }
  };

  // Filter products belonging to this category or matching slug
  const baseCategoryProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.category === currentCategory.slug || p.category === currentCategory.id);
  }, [currentCategory]);

  // Unique origins
  const origins = useMemo(() => {
    const list = baseCategoryProducts
      .map((p) => p.origin)
      .filter((o): o is string => Boolean(o));
    return ['all', ...Array.from(new Set(list))];
  }, [baseCategoryProducts]);

  // Applied filtered and sorted products
  const displayedProducts = useMemo(() => {
    let list = [...baseCategoryProducts];

    if (onlyInStock) {
      list = list.filter((p) => p.inStock && p.storeAvailability[selectedStore]);
    }

    if (selectedOrigin !== 'all') {
      list = list.filter((p) => p.origin === selectedOrigin);
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        break;
      default:
        break;
    }

    return list;
  }, [baseCategoryProducts, onlyInStock, selectedOrigin, searchFilter, sortBy, selectedStore]);

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#232420]/60 mb-4 sm:mb-6 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <button
            onClick={onNavigateAllCategories}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Rayons
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold truncate max-w-[160px] sm:max-w-none">{currentCategory.name}</span>
        </nav>

        {/* Category Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 shadow-xl bg-[#16332A] text-white">
          <div className="absolute inset-0">
            <img
              src={currentCategory.image}
              alt={currentCategory.name}
              className="w-full h-full object-cover opacity-35 filter blur-xs scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16332A] via-[#16332A]/90 to-[#16332A]/50" />
          </div>

          <div className="relative z-10 p-4 sm:p-8 md:p-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#C6A468]/20 border border-[#C6A468]/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-[#E7CF9B] font-bold tracking-wider uppercase mb-2 sm:mb-3">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C6A468]" />
              <span>Rayon Frais & Sélection Gourmande</span>
            </div>

            <h1 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-2">
              {currentCategory.name}
            </h1>

            <p className="text-[11px] sm:text-xs md:text-sm text-[#A8BFAE] font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
              Tous nos produits du rayon {currentCategory.name.toLowerCase()} préparés et sélectionnés chaque jour avec les plus hauts standards de fraîcheur et d'origine.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-white/80">
              <span className="bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                {displayedProducts.length} produit(s)
              </span>
              <span className="flex items-center gap-1 bg-[#C6A468]/20 text-[#E7CF9B] px-2.5 py-1 rounded-lg border border-[#C6A468]/30">
                <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Magasin de {selectedStore === 'goussainville' ? 'Goussainville' : 'Sarcelles'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Category Switcher Horizontal Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = cat.slug === currentCategory.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#16332A] text-white shadow-md'
                    : 'bg-white text-[#232420] border border-[#E8E2D5] hover:border-[#16332A]/40'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter and Sorting Toolbar */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-xs mb-6 sm:mb-8 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Left: Search within category & In-stock switch */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Rechercher dans ce rayon...`}
                className="w-full pl-3 pr-8 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#232420] placeholder-gray-400 focus:outline-none focus:border-[#C6A468]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#16332A] cursor-pointer select-none bg-[#FAF7F0] px-2.5 py-1.5 sm:py-2 rounded-xl border border-[#16332A]/10">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-[#16332A] cursor-pointer"
              />
              <span>En stock uniquement</span>
            </label>

            {origins.length > 2 && (
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#232420] focus:outline-none focus:border-[#C6A468]"
              >
                <option value="all">Toutes provenances</option>
                {origins
                  .filter((o) => o !== 'all')
                  .map((origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* Right: Sorting */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            <div className="flex items-center gap-1 text-xs text-[#232420]/70 font-semibold whitespace-nowrap">
              <ArrowUpDown className="w-3 h-3 text-[#C6A468]" />
              <span>Trier par :</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#16332A] font-semibold focus:outline-none focus:border-[#C6A468]"
            >
              <option value="popular">Recommandations</option>
              <option value="price-asc">Prix croissant (€ → €€€)</option>
              <option value="price-desc">Prix décroissant (€€€ → €)</option>
              <option value="discount">Meilleures promotions (%)</option>
            </select>
          </div>

        </div>

        {/* Product Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#E8E2D5] shadow-xs">
            <SlidersHorizontal className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-fraunces text-lg sm:text-xl font-bold text-[#16332A]">
              Aucun produit ne correspond à vos filtres
            </h3>
            <p className="text-xs text-[#232420]/60 max-w-md mx-auto mt-1 mb-6">
              Essayez de réinitialiser la recherche ou de désactiver le filtre de stock pour voir l’ensemble du catalogue.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setOnlyInStock(false);
                setSelectedOrigin('all');
                setSortBy('popular');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#16332A] text-white text-xs font-bold hover:bg-[#234d40] transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {displayedProducts.map((product) => {
              const inWishlist = wishlist.includes(product.id);
              const cartItem = cartItems.find((item) => item.product.id === product.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;
              const isAvailable = product.storeAvailability[selectedStore];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  {/* Top Image & Badges */}
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

                    {/* Promo badge */}
                    {product.discountPercentage && (
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#6B2E3B] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-md">
                        -{product.discountPercentage}%
                      </span>
                    )}

                    {product.badge && !product.discountPercentage && (
                      <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#16332A] text-[#E7CF9B] text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
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

                  {/* Product Information */}
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

                    {/* Price and Cart controls */}
                    <div className="mt-2.5 pt-2 border-t border-gray-100">
                      <div className="flex items-baseline justify-between gap-1 mb-2">
                        <div>
                          <span className="font-mono-price font-bold text-sm sm:text-base md:text-lg text-[#16332A]">
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

                      {/* Stock availability */}
                      {!isAvailable ? (
                        <div className="w-full py-1.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-medium text-center">
                          Indisponible
                        </div>
                      ) : quantityInCart === 0 ? (
                        <button
                          onClick={() => onAddToCart(product)}
                          className="w-full py-1.5 sm:py-2 px-2 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Ajouter</span>
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
        )}

      </div>
    </div>
  );
};
