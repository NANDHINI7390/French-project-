/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroCarousel } from './components/HeroCarousel';
import { MainBentoSection } from './components/MainBentoSection';
import { PromotionsSection } from './components/PromotionsSection';
import { ValueProps } from './components/ValueProps';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StoreModal } from './components/StoreModal';
import { AccountModal } from './components/AccountModal';
import { NotificationToast } from './components/NotificationToast';
import { ALL_PRODUCTS, INITIAL_CART_ITEMS, PROMOTION_PRODUCTS } from './data/storeData';
import { CartItem, Product, StoreId } from './types';
import { ShoppingBag, Heart, MapPin, Search } from 'lucide-react';

export default function App() {
  // State management
  const [selectedStore, setSelectedStore] = useState<StoreId>('goussainville');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<Product[]>([PROMOTION_PRODUCTS[0]]);
  const [activeCategory, setActiveCategory] = useState<string | null>('fruits-legumes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'cart' | 'wishlist' | 'success'>('cart');

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'success' = 'cart') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const wishlistIds = useMemo(() => {
    return new Set(wishlist.map((item) => item.id));
  }, [wishlist]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`« ${product.name} » ajouté au panier !`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Article retiré du panier', 'cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`« ${product.name} » retiré des favoris`, 'wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`« ${product.name} » ajouté aux favoris !`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddAllWishlistToCart = () => {
    wishlist.forEach((product) => {
      handleAddToCart(product, 1);
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast('Tous vos favoris ont été ajoutés au panier !', 'success');
  };

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCtaClick = (categorySlug?: string) => {
    if (categorySlug) {
      setActiveCategory(categorySlug);
    }
    const targetElement = document.querySelector('section[aria-label="Toutes nos promotions"]');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckoutSuccess = () => {
    showToast('Votre commande a été confirmée avec succès ! Merci de votre confiance.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] flex flex-col font-sans text-[#232420] selection:bg-[#C6A468]/30 selection:text-[#16332A]">
      
      {/* 1. Header with Search, Announcement bar and Cart/Wishlist actions */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectNavCategory={(cat) => setActiveCategory(cat)}
      />

      {/* 2. Horizontally scrollable Category Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full pt-4 sm:pt-6 pb-12">
        
        {/* 3. Promotional Hero Banner (Auto-sliding) */}
        <HeroCarousel onCtaClick={handleCtaClick} />

        {/* 4. Signature 12-Column Bento Showcase (Votre Magasin | Offres du Moment | Aujourd'hui au Marché) */}
        <MainBentoSection
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
          onOpenStoreModal={() => setIsStoreModalOpen(true)}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onQuickView={(product) => setSelectedProduct(product)}
          getCartQuantity={getCartQuantity}
        />

        {/* 5. Complete Promotions & Seasonal Catalog Section */}
        <PromotionsSection
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setSelectedProduct(product)}
          getCartQuantity={getCartQuantity}
          wishlistIds={wishlistIds}
        />

        {/* 6. Value Propositions Banner */}
        <ValueProps />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        selectedStore={selectedStore}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onAddAllToCart={handleAddAllWishlistToCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        selectedStore={selectedStore}
      />

      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      <NotificationToast message={toastMessage} type={toastType} />

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F8F4EA]/95 backdrop-blur-md border-t border-gray-200 py-2 px-6 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => {
            const input = document.getElementById('main-search-input');
            if (input) {
              input.focus();
              input.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-1 text-[#16332A]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Recherche</span>
        </button>

        <button
          onClick={() => setIsStoreModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[#16332A]"
        >
          <MapPin className="w-5 h-5 text-[#C6A468]" />
          <span className="text-[10px] font-medium">Magasin</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[#16332A] relative"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 bg-[#6B2E3B] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-medium">Favoris</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[#16332A] relative"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-[#6B2E3B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium font-bold">Panier</span>
        </button>
      </div>
    </div>
  );
}
