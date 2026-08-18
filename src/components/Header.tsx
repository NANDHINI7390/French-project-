import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, MapPin, X, Check } from 'lucide-react';
import { LOGO_URL, STORES } from '../data/storeData';
import { Product, StoreId } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  selectedStore: StoreId;
  onSelectStore: (store: StoreId) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenStoreModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectNavCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  selectedStore,
  onSelectStore,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenStoreModal,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectProduct,
  onSelectNavCategory,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const storeMenuRef = useRef<HTMLDivElement>(null);

  const currentStore = STORES.find((s) => s.id === selectedStore) || STORES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (storeMenuRef.current && !storeMenuRef.current.contains(event.target as Node)) {
        setIsStoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F4EA] border-b border-gray-200">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#16332A] text-[#F8F4EA] text-xs py-1.5 px-4 sm:px-8 border-b border-[#16332A]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left item */}
          <div className="flex items-center gap-2 text-[#F8F4EA]/90 font-medium text-[11px] sm:text-xs">
            <span>🚚</span>
            <span>Livraison offerte à domicile dès <strong className="text-[#C6A468] font-bold">40€</strong> d'achat</span>
          </div>

          {/* Center slogan */}
          <div className="hidden md:flex items-center gap-2 text-[#A8BFAE] text-[11px] uppercase tracking-wider">
            <span>Produits frais</span>
            <span className="text-[#C6A468]">•</span>
            <span>Qualité artisanale</span>
            <span className="text-[#C6A468]">•</span>
            <span>Prix justes</span>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:0134501212"
              className="flex items-center gap-1.5 text-[#F8F4EA]/90 hover:text-[#C6A468] transition-colors"
            >
              <span>📞</span>
              <strong className="font-mono-price font-medium">01 34 50 12 12</strong>
            </a>

            {/* Quick Store switcher in topbar */}
            <div className="relative" ref={storeMenuRef}>
              <button
                id="header-store-toggle-btn"
                onClick={() => setIsStoreMenuOpen(!isStoreMenuOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#234d40] text-[#F8F4EA] hover:bg-[#C6A468] hover:text-[#16332A] transition-all text-[11px] font-medium"
              >
                <MapPin className="w-3 h-3 text-[#C6A468]" />
                <span className="max-w-[100px] truncate">{currentStore.name}</span>
                <span className="text-[9px] opacity-75">▼</span>
              </button>

              {isStoreMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-[#F8F4EA] text-[#232420] rounded-xl shadow-xl border border-[#16332A]/15 py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#16332A]/60 border-b border-[#16332A]/10">
                    Changer de magasin
                  </div>
                  {STORES.map((store) => (
                    <button
                      key={store.id}
                      onClick={() => {
                        onSelectStore(store.id);
                        setIsStoreMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#16332A]/5 transition-colors ${
                        selectedStore === store.id ? 'font-bold text-[#16332A] bg-[#16332A]/10' : 'text-[#232420]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{store.name}</div>
                        <div className="text-[10px] text-[#232420]/60">{store.hours}</div>
                      </div>
                      {selectedStore === store.id && <Check className="w-4 h-4 text-[#16332A]" />}
                    </button>
                  ))}
                  <div className="p-2 border-t border-[#16332A]/10">
                    <button
                      onClick={() => {
                        setIsStoreMenuOpen(false);
                        onOpenStoreModal();
                      }}
                      className="w-full text-center text-[11px] text-[#16332A] font-medium hover:text-[#C6A468] py-1"
                    >
                      Voir tous nos supermarchés →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Matches Exact Sophisticated Dark Specification) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Left: Brand & Search */}
        <div className="flex items-center space-x-6 sm:space-x-10 flex-1">
          {/* Logo Title */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#C6A468]/40 shadow-xs flex items-center justify-center p-0.5 overflow-hidden">
              <img
                src={LOGO_URL}
                alt="EXO ISLAND Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-fraunces text-2xl sm:text-3xl font-bold tracking-tighter text-[#16332A] hover:text-[#16332A]/90 transition-colors">
              EXO ISLAND
            </span>
          </a>

          {/* Search Box */}
          <div className="relative w-full max-w-xs sm:max-w-md hidden md:block" ref={searchRef}>
            <div className="relative">
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-full text-sm text-[#232420] placeholder-gray-400 focus:outline-none focus:border-[#C6A468] shadow-xs"
              />
              <div className="absolute left-3.5 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search dropdown results */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#F8F4EA] rounded-2xl shadow-2xl border border-[#16332A]/15 overflow-hidden z-50 max-h-[380px] overflow-y-auto animate-in fade-in slide-in-from-top-2">
                <div className="p-3 bg-[#16332A]/5 border-b border-[#16332A]/10 text-xs font-semibold text-[#16332A] flex justify-between items-center">
                  <span>Résultats pour « {searchQuery} »</span>
                  <span className="text-[#232420]/60">{searchResults.length} produit(s)</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[#232420]/70">
                    <p className="font-medium text-[#16332A]">Aucun produit trouvé pour votre recherche.</p>
                    <p className="text-xs text-[#232420]/50 mt-1">Essayez avec « Tomates », « Huile », « Café » ou « Baguette »</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#16332A]/10">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 flex items-center gap-3.5 hover:bg-white cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-white border border-[#16332A]/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#16332A] truncate">{product.name}</h4>
                          <p className="text-xs text-[#232420]/60 truncate">{product.subtitle || product.unit}</p>
                          {product.origin && (
                            <span className="text-[10px] text-[#A8BFAE] bg-[#16332A] px-1.5 py-0.2 rounded inline-block mt-0.5">
                              {product.origin}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-mono-price font-bold text-sm text-[#16332A]">
                            {product.price.toFixed(2).replace('.', ',')} €
                          </div>
                          {product.originalPrice && (
                            <div className="text-[10px] text-[#232420]/40 line-through">
                              {product.originalPrice.toFixed(2).replace('.', ',')} €
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Navigation & Icon Buttons */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <div className="hidden lg:flex items-center space-x-6 text-[#232420]">
            <button
              onClick={() => onSelectNavCategory && onSelectNavCategory('epicerie')}
              className="hover:text-[#C6A468] transition-colors cursor-pointer"
            >
              Épicerie
            </button>
            <button
              onClick={() => onSelectNavCategory && onSelectNavCategory('produits-frais')}
              className="hover:text-[#C6A468] transition-colors cursor-pointer"
            >
              Frais
            </button>
            <button
              onClick={() => onSelectNavCategory && onSelectNavCategory('boissons')}
              className="hover:text-[#C6A468] transition-colors cursor-pointer"
            >
              Cave
            </button>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 pl-3 sm:pl-6 border-l border-gray-200">
            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#232420] hover:text-[#C6A468] transition-colors rounded-full hover:bg-gray-100"
              title="Favoris"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#6B2E3B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative bg-[#16332A] text-[#F8F4EA] p-2.5 rounded-full hover:bg-[#234d40] transition-colors shadow-sm"
              title="Mon Panier"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#6B2E3B] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </button>

            {/* Account */}
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-2 text-[#232420] hover:text-[#16332A] transition-colors rounded-full hover:bg-gray-100 hidden sm:block"
              title="Mon Compte"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
