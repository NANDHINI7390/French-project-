/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroCarousel } from './components/HeroCarousel';
import { StoreSelector } from './components/StoreSelector';
import { TodayMarket } from './components/TodayMarket';
import { PromotionsSection } from './components/PromotionsSection';
import { ValueProps } from './components/ValueProps';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StoreModal } from './components/StoreModal';
import { AccountModal } from './components/AccountModal';
import { NotificationToast } from './components/NotificationToast';

// Full UI Pages
import { AllCategoriesPage } from './components/pages/AllCategoriesPage';
import { CategoryListingPage } from './components/pages/CategoryListingPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { SearchResultsPage } from './components/pages/SearchResultsPage';
import { PromotionsPage } from './components/pages/PromotionsPage';
import { StoresPage } from './components/pages/StoresPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { AccountPage } from './components/pages/AccountPage';
import { AboutServicesPage } from './components/pages/AboutServicesPage';
import { ContactHelpPage } from './components/pages/ContactHelpPage';

import { ALL_PRODUCTS, INITIAL_CART_ITEMS, PROMOTION_PRODUCTS, MOCK_ORDERS } from './data/storeData';
import { CartItem, Product, StoreId, PageType, Order } from './types';
import { ShoppingBag, Heart, MapPin, Search, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Routing State
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('fruits-legumes');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [accountInitialTab, setAccountInitialTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('profile');
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>(MOCK_ORDERS);

  // Store & Cart & Wishlist state
  const [selectedStore, setSelectedStore] = useState<StoreId>('goussainville');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<Product[]>([PROMOTION_PRODUCTS[0]]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, activeCategorySlug, activeProduct]);

  // Cart operations
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const wishlistIds = useMemo(() => {
    return new Set(wishlist.map((item) => item.id));
  }, [wishlist]);

  const wishlistStringArray = useMemo(() => {
    return wishlist.map((item) => item.id);
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
  const handleToggleWishlist = (productOrId: Product | string) => {
    const targetProduct =
      typeof productOrId === 'string'
        ? ALL_PRODUCTS.find((p) => p.id === productOrId)
        : productOrId;

    if (!targetProduct) return;

    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === targetProduct.id);
      if (exists) {
        showToast(`« ${targetProduct.name} » retiré des favoris`, 'wishlist');
        return prev.filter((p) => p.id !== targetProduct.id);
      } else {
        showToast(`« ${targetProduct.name} » ajouté aux favoris !`, 'wishlist');
        return [...prev, targetProduct];
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

  // Navigation callbacks
  const navigateToHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
  };

  const navigateToAllCategories = () => {
    setCurrentPage('all-categories');
  };

  const navigateToCategory = (categorySlug: string) => {
    setActiveCategorySlug(categorySlug);
    setCurrentPage('category');
  };

  const navigateToProductDetail = (product: Product) => {
    setActiveProduct(product);
    setCurrentPage('product-detail');
  };

  const navigateToSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const navigateToPromotions = () => {
    setCurrentPage('promotions');
  };

  const navigateToStores = () => {
    setCurrentPage('stores');
  };

  const navigateToCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Votre panier est vide pour le moment !', 'cart');
      return;
    }
    setCurrentPage('checkout');
  };

  const navigateToAccount = (tab: 'profile' | 'orders' | 'wishlist' | 'addresses' = 'profile') => {
    setAccountInitialTab(tab);
    setCurrentPage('account');
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
  };

  const navigateToHelp = () => {
    setCurrentPage('help');
  };

  const handleOrderCompleted = (order: Order) => {
    setLatestOrder(order);
    setUserOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setCurrentPage('order-confirmation');
    showToast('Commande validée avec succès !', 'success');
  };

  const handleHeroCtaClick = (categorySlug?: string) => {
    if (categorySlug) {
      navigateToCategory(categorySlug);
    } else {
      navigateToPromotions();
    }
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
        onOpenAccount={() => navigateToAccount('profile')}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectProduct={(product) => navigateToProductDetail(product)}
        onSelectNavCategory={(cat) => navigateToCategory(cat)}
        onNavigateHome={navigateToHome}
        onNavigateAllCategories={navigateToAllCategories}
        onNavigatePromotions={navigateToPromotions}
        onNavigateStores={navigateToStores}
        onNavigateSearch={navigateToSearch}
      />

      {/* 2. Horizontally scrollable Category Navigation */}
      <CategoryNav
        activeCategory={activeCategorySlug}
        onSelectCategory={(catSlug) => {
          if (catSlug) {
            navigateToCategory(catSlug);
          } else {
            navigateToAllCategories();
          }
        }}
      />

      {/* Page Routing Switcher */}
      <main className="flex-1 w-full pb-12">
        
        {/* HOMEPAGE */}
        {currentPage === 'home' && (
          <div className="pt-2 sm:pt-4">
            {/* 3. Promotional Hero Banner */}
            <HeroCarousel onCtaClick={handleHeroCtaClick} />

            {/* 4. Votre Magasin (Store Selector) */}
            <StoreSelector
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
            />

            {/* 5. Aujourd'hui au Marché (Chalkboard with Torn Deckle Cards) */}
            <TodayMarket
              onAddToCart={handleAddToCart}
              onQuickView={(product) => navigateToProductDetail(product)}
              cartProductIds={new Set(cartItems.map((i) => i.product.id))}
            />

            {/* 6. Nos Offres du Moment (Promotions Carousel with Cards) */}
            <PromotionsSection
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(product) => navigateToProductDetail(product)}
              getCartQuantity={getCartQuantity}
              wishlistIds={wishlistIds}
            />

            {/* 7. Value Propositions Banner */}
            <ValueProps />
          </div>
        )}

        {/* ALL CATEGORIES */}
        {currentPage === 'all-categories' && (
          <AllCategoriesPage
            onSelectCategory={navigateToCategory}
            onNavigateHome={navigateToHome}
          />
        )}

        {/* CATEGORY PRODUCT LISTING */}
        {currentPage === 'category' && (
          <CategoryListingPage
            categorySlug={activeCategorySlug}
            selectedStore={selectedStore}
            cartItems={cartItems}
            wishlist={wishlistStringArray}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleWishlist={(pId) => handleToggleWishlist(pId)}
            onSelectProduct={navigateToProductDetail}
            onNavigateHome={navigateToHome}
            onNavigateCategory={navigateToCategory}
            onNavigateAllCategories={navigateToAllCategories}
          />
        )}

        {/* PRODUCT DETAIL PAGE */}
        {currentPage === 'product-detail' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            selectedStore={selectedStore}
            cartItems={cartItems}
            wishlist={wishlistStringArray}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleWishlist={(pId) => handleToggleWishlist(pId)}
            onSelectProduct={navigateToProductDetail}
            onNavigateHome={navigateToHome}
            onNavigateCategory={navigateToCategory}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* SEARCH RESULTS PAGE */}
        {currentPage === 'search' && (
          <SearchResultsPage
            searchQuery={searchQuery}
            selectedStore={selectedStore}
            cartItems={cartItems}
            wishlist={wishlistStringArray}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleWishlist={(pId) => handleToggleWishlist(pId)}
            onSelectProduct={navigateToProductDetail}
            onNavigateHome={navigateToHome}
            onNavigateCategory={navigateToCategory}
          />
        )}

        {/* PROMOTIONS & BONS PLANS */}
        {currentPage === 'promotions' && (
          <PromotionsPage
            selectedStore={selectedStore}
            cartItems={cartItems}
            wishlist={wishlistStringArray}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleWishlist={(pId) => handleToggleWishlist(pId)}
            onSelectProduct={navigateToProductDetail}
            onNavigateHome={navigateToHome}
            onNavigateCategory={navigateToCategory}
          />
        )}

        {/* STORES & SERVICES */}
        {currentPage === 'stores' && (
          <StoresPage
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
            onNavigateHome={navigateToHome}
          />
        )}

        {/* CHECKOUT 4-STEP FLOW */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
            onNavigateHome={navigateToHome}
            onOrderCompleted={handleOrderCompleted}
          />
        )}

        {/* ORDER CONFIRMATION */}
        {currentPage === 'order-confirmation' && (
          <OrderConfirmationPage
            order={
              latestOrder || {
                id: 'EXO-2026-89412',
                date: 'Aujourd’hui',
                items: cartItems.length > 0 ? cartItems : [{ product: ALL_PRODUCTS[0], quantity: 1 }],
                subtotal: 35.8,
                discount: 0,
                deliveryFee: 0,
                total: 35.8,
                status: 'en_preparation',
                deliveryMethod: 'delivery',
                store: selectedStore,
                timeSlot: 'Aujourd’hui (18h00 - 20h00)',
                customer: {
                  firstName: 'Jean',
                  lastName: 'Dupont',
                  email: 'jean.dupont@email.fr',
                  phone: '06 12 34 56 78',
                  address: '14 Rue de Paris',
                  postalCode: '95190',
                  city: 'Goussainville',
                },
                paymentMethod: 'Carte Bancaire (**** 4242)',
              }
            }
            onNavigateHome={navigateToHome}
            onNavigateOrders={() => navigateToAccount('orders')}
          />
        )}

        {/* ACCOUNT / ORDERS / WISHLIST / ADDRESSES */}
        {currentPage === 'account' && (
          <AccountPage
            ordersList={userOrders}
            wishlist={wishlistStringArray}
            selectedStore={selectedStore}
            onAddToCart={handleAddToCart}
            onToggleWishlist={(pId) => handleToggleWishlist(pId)}
            onSelectProduct={navigateToProductDetail}
            onNavigateHome={navigateToHome}
            initialTab={accountInitialTab}
          />
        )}

        {/* ABOUT & COMMITMENTS */}
        {currentPage === 'about' && (
          <AboutServicesPage
            onNavigateHome={navigateToHome}
            onNavigateStores={navigateToStores}
            onNavigateAllCategories={navigateToAllCategories}
          />
        )}

        {/* HELP & FAQ */}
        {currentPage === 'help' && (
          <ContactHelpPage
            onNavigateHome={navigateToHome}
            onNavigateStores={navigateToStores}
          />
        )}

      </main>

      {/* 8. Footer (5 Columns with fully wired navigation) */}
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateCategories={navigateToAllCategories}
        onNavigateStores={navigateToStores}
        onNavigateAbout={navigateToAbout}
        onNavigateHelp={navigateToHelp}
        onNavigateAccount={(tab) => navigateToAccount(tab || 'profile')}
        onNavigatePromotions={navigateToPromotions}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        selectedStore={selectedStore}
        onNavigateCheckout={() => {
          setIsCartOpen(false);
          navigateToCheckout();
        }}
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
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        selectedStore={selectedStore}
      />

      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        selectedStore={selectedStore}
        onSelectStore={(store) => {
          setSelectedStore(store);
          setIsStoreModalOpen(false);
        }}
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
            const input = document.getElementById('mobile-search-input');
            if (input) {
              input.focus();
            } else {
              navigateToSearch('');
            }
          }}
          className="flex flex-col items-center gap-1 text-[#16332A] cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Recherche</span>
        </button>

        <button
          onClick={navigateToPromotions}
          className="flex flex-col items-center gap-1 text-[#16332A] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#C6A468]" />
          <span className="text-[10px] font-medium">Promos</span>
        </button>

        <button
          onClick={() => setIsStoreModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[#16332A] cursor-pointer"
        >
          <MapPin className="w-5 h-5 text-[#C6A468]" />
          <span className="text-[10px] font-medium">Magasin</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[#16332A] relative cursor-pointer"
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
          className="flex flex-col items-center gap-1 text-[#16332A] relative cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-[#6B2E3B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold">Panier</span>
        </button>
      </div>
    </div>
  );
}
