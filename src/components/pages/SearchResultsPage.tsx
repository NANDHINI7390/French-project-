import React, { useState, useMemo } from 'react';
import { ALL_PRODUCTS, CATEGORIES } from '../../data/storeData';
import { Product, StoreId } from '../../types';
import {
  Search,
  ChevronRight,
  SlidersHorizontal,
  Heart,
  Plus,
  Minus,
  ArrowUpDown,
} from 'lucide-react';

interface SearchResultsPageProps {
  searchQuery: string;
  selectedStore: StoreId;
  cartItems: { product: Product; quantity: number }[];
  wishlist: string[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (categorySlug: string) => void;
  onSearchAgain?: (newQuery: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchQuery,
  selectedStore,
  cartItems,
  wishlist,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome,
  onNavigateCategory,
  onSearchAgain,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'discount'>('relevance');

  // Filter products based on search query
  const searchResults = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return ALL_PRODUCTS;

    return ALL_PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchSubtitle = product.subtitle?.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchOrigin = product.origin?.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));

      return matchName || matchSubtitle || matchDesc || matchOrigin || matchCategory || matchTags;
    });
  }, [searchQuery]);

  // Apply secondary filters
  const displayedResults = useMemo(() => {
    let list = [...searchResults];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (onlyInStock) {
      list = list.filter((p) => p.inStock && p.storeAvailability[selectedStore]);
    }

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
  }, [searchResults, selectedCategory, onlyInStock, sortBy, selectedStore]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim() && onSearchAgain) {
      onSearchAgain(localQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#232420]/60 mb-3 sm:mb-5 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold">Recherche</span>
          {searchQuery && (
            <>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[#6B2E3B] italic truncate max-w-[150px]">« {searchQuery} »</span>
            </>
          )}
        </nav>

        {/* Search Header Banner */}
        <div className="bg-[#16332A] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl">
            <h1 className="font-fraunces text-2xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2 leading-tight">
              Résultats de recherche
            </h1>
            <p className="text-xs sm:text-sm text-[#A8BFAE] font-light mb-4 sm:mb-6">
              {displayedResults.length} produit(s) trouvé(s) pour votre requête{' '}
              {searchQuery && <strong className="text-[#E7CF9B]">« {searchQuery} »</strong>}
            </p>

            {/* In-page search bar */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Nouvelle recherche..."
                  className="w-full pl-3 sm:pl-4 pr-8 py-2 sm:py-2.5 rounded-xl bg-white text-[#232420] text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A468] shadow-md"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#C6A468] hover:bg-[#d9b87b] text-[#16332A] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Rechercher
              </button>
            </form>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E2D5] shadow-xs mb-6 sm:mb-8 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#16332A] font-semibold focus:outline-none focus:border-[#C6A468]"
            >
              <option value="all">Tous les rayons</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#16332A] cursor-pointer select-none bg-[#FAF7F0] px-2.5 py-1.5 sm:py-2 rounded-xl border border-[#16332A]/10">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-[#16332A] cursor-pointer"
              />
              <span>En stock uniquement</span>
            </label>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
            <div className="flex items-center gap-1 text-xs text-[#232420]/70 font-semibold whitespace-nowrap">
              <ArrowUpDown className="w-3 h-3 text-[#C6A468]" />
              <span>Trier :</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/15 text-xs text-[#16332A] font-semibold focus:outline-none focus:border-[#C6A468]"
            >
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant (€ → €€€)</option>
              <option value="price-desc">Prix décroissant (€€€ → €)</option>
              <option value="discount">Meilleures promotions (%)</option>
            </select>
          </div>
        </div>

        {/* Results Grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
        {displayedResults.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#E8E2D5] shadow-xs">
            <SlidersHorizontal className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-fraunces text-lg sm:text-xl font-bold text-[#16332A]">
              Aucun résultat pour cette recherche
            </h3>
            <p className="text-xs text-[#232420]/60 max-w-md mx-auto mt-1 mb-6">
              Vérifiez l’orthographe ou essayez avec des termes plus génériques comme « Banane », « Poulet », « Tomates », « Jus ».
            </p>
            <button
              onClick={onNavigateHome}
              className="px-5 py-2.5 rounded-xl bg-[#16332A] text-white text-xs font-bold hover:bg-[#234d40] transition-colors cursor-pointer"
            >
              Retour à l’accueil
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {displayedResults.map((product) => {
              const inWishlist = wishlist.includes(product.id);
              const cartItem = cartItems.find((item) => item.product.id === product.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;
              const isAvailable = product.storeAvailability[selectedStore];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
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
