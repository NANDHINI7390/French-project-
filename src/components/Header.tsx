import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Phone, Truck, X, Menu, MapPin, ChevronDown } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const activeStoreObj = STORES.find((s) => s.id === selectedStore) || STORES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0] border-b border-[#E8E2D5] shadow-xs">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Dark Forest Green #16332A) */}
      <div className="bg-[#16332A] text-[#F8F4EA] text-xs py-1.5 sm:py-2 px-3 sm:px-8 border-b border-[#16332A]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left item */}
          <div className="flex items-center gap-2 text-[#F8F4EA] font-normal text-[11px] sm:text-xs">
            <Truck className="w-3.5 h-3.5 text-[#C6A468] flex-shrink-0" />
            <span>
              Livraison offerte dès <strong className="font-bold text-[#C6A468]">40€</strong> d'achat
            </span>
          </div>

          {/* Center slogan */}
          <div className="hidden lg:flex items-center gap-2 text-[#E2EBE5] text-xs font-light">
            <span>Produits frais</span>
            <span className="text-[#C6A468]">•</span>
            <span>Qualité premium</span>
            <span className="text-[#C6A468]">•</span>
            <span>Prix justes</span>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <button
              onClick={onOpenStoreModal}
              className="flex items-center gap-1.5 text-[#E2EBE5] hover:text-[#C6A468] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C6A468]" />
              <span className="font-medium underline decoration-dotted">{activeStoreObj.name}</span>
            </button>

            <a
              href="tel:0134501212"
              className="hidden sm:flex items-center gap-1 text-[#F8F4EA] hover:text-[#C6A468] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A468]" />
              <span>01 34 50 12 12</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Mobile Menu Button & Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-[#16332A] hover:bg-black/5 cursor-pointer"
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={LOGO_URL}
                alt="EXO ISLAND Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-fraunces text-xl sm:text-3xl font-bold tracking-tight text-[#16332A] leading-none block">
                EXO ISLAND
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#C6A468] uppercase block mt-0.5">
                SUPERMARCHÉ
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Search Bar */}
        <div className="relative flex-1 max-w-xl hidden md:block" ref={searchRef}>
          <div className="relative">
            <input
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Rechercher un produit (fruits, viande, épices...)"
              className="w-full pl-5 pr-11 py-2.5 bg-white border border-[#DDD6C8] rounded-full text-sm text-[#232420] placeholder-[#8A8A85] focus:outline-none focus:border-[#16332A] shadow-xs transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4B46] pointer-events-none">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </div>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Live Search dropdown results */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#FAF7F0] rounded-2xl shadow-2xl border border-[#16332A]/15 overflow-hidden z-50 max-h-[380px] overflow-y-auto">
              <div className="p-3 bg-[#16332A]/5 border-b border-[#16332A]/10 text-xs font-semibold text-[#16332A] flex justify-between items-center">
                <span>Résultats pour « {searchQuery} »</span>
                <span className="text-[#232420]/60">{searchResults.length} produit(s)</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-sm text-[#232420]/70">
                  <p className="font-medium text-[#16332A]">Aucun produit trouvé pour « {searchQuery} ».</p>
                  <p className="text-xs text-[#232420]/50 mt-1">Essayez avec « Tomates », « Huile », « Nutella » ou « Baguette »</p>
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
                        className="w-12 h-12 rounded-lg object-contain bg-white border border-[#16332A]/10 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#16332A] truncate">{product.name}</h4>
                        <p className="text-xs text-[#232420]/60 truncate">{product.subtitle || product.unit}</p>
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

        {/* Right: Actions (Favoris, Mon panier, Mon compte) */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          
          {/* Favoris */}
          <button
            id="header-wishlist-btn"
            onClick={onOpenWishlist}
            className="flex flex-col items-center justify-center text-[#232420] hover:text-[#16332A] transition-colors group cursor-pointer relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-[#232420] group-hover:scale-110 transition-transform stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#6B2E3B] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-[11px] font-medium text-[#232420] mt-1">Favoris</span>
          </button>

          {/* Mon panier */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="flex flex-col items-center justify-center text-[#232420] hover:text-[#16332A] transition-colors group cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#232420] group-hover:scale-110 transition-transform stroke-[1.8]" />
              <span className="absolute -top-1.5 -right-2 bg-[#932537] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-xs">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:block text-[11px] font-medium text-[#232420] mt-1">Mon panier</span>
          </button>

          {/* Mon compte */}
          <button
            id="header-account-btn"
            onClick={onOpenAccount}
            className="flex flex-col items-center justify-center text-[#232420] hover:text-[#16332A] transition-colors group cursor-pointer"
          >
            <User className="w-5 h-5 text-[#232420] group-hover:scale-110 transition-transform stroke-[1.8]" />
            <span className="hidden sm:block text-[11px] font-medium text-[#232420] mt-1">Mon compte</span>
          </button>

        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-3 pb-2.5" ref={mobileSearchRef}>
        <div className="relative">
          <input
            id="mobile-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Rechercher un produit..."
            className="w-full pl-4 pr-10 py-2 bg-white border border-[#DDD6C8] rounded-full text-xs text-[#232420] placeholder-[#8A8A85] focus:outline-none focus:border-[#16332A] shadow-xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4A4B46]">
            <Search className="w-4 h-4 stroke-[2.2]" />
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#FAF7F0] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="p-4 bg-[#16332A] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded-full" />
                  <div>
                    <span className="font-fraunces font-bold text-lg leading-none block">EXO ISLAND</span>
                    <span className="text-[9px] text-[#C6A468] tracking-widest uppercase">SUPERMARCHÉ</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Store Switcher in Drawer */}
              <div className="p-4 border-b border-[#16332A]/10 bg-white/60">
                <div className="text-xs font-bold uppercase tracking-wider text-[#16332A] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A468]" />
                  <span>Magasin sélectionné</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STORES.slice(0, 2).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectStore(s.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-2 rounded-lg text-xs font-bold text-left transition-all ${
                        selectedStore === s.id
                          ? 'bg-[#16332A] text-white'
                          : 'bg-[#EDE6DA] text-[#232420] hover:bg-[#E2D9CA]'
                      }`}
                    >
                      <div>{s.name}</div>
                      <div className="text-[10px] font-normal opacity-80">Ouvert 8h30-20h</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Departments Navigation Links */}
              <div className="p-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#73736C] mb-2">
                  Rayons du supermarché
                </div>
                {[
                  { name: 'Fruits & Légumes', id: 'fruits-legumes' },
                  { name: 'Boucherie & Volailles', id: 'boucherie' },
                  { name: 'Produits Frais & Crémerie', id: 'produits-frais' },
                  { name: 'Poissonnerie', id: 'poissons' },
                  { name: 'Boulangerie & Pâtisserie', id: 'boulangerie' },
                  { name: 'Épicerie Sucrée & Salée', id: 'epicerie' },
                  { name: 'Boissons & Cave', id: 'boissons' },
                  { name: 'Surgelés', id: 'surgeles' },
                  { name: 'Bio & Équitable', id: 'bio' },
                ].map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => {
                      if (onSelectNavCategory) {
                        onSelectNavCategory(dept.id);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#16332A] font-medium hover:bg-black/5 transition-colors"
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer in Drawer */}
            <div className="p-4 border-t border-[#16332A]/10 bg-[#EDE6DA]/50 space-y-2 text-xs">
              <a href="tel:0134501212" className="flex items-center gap-2 text-[#16332A]">
                <Phone className="w-4 h-4 text-[#C6A468]" />
                <span>Service client: 01 34 50 12 12</span>
              </a>
              <div className="text-[10px] text-[#73736C]">
                Livraison à domicile & Click & Collect disponibles
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


