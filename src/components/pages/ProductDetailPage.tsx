import React, { useState } from 'react';
import { Product, StoreId } from '../../types';
import { CATEGORIES, ALL_PRODUCTS } from '../../data/storeData';
import {
  ChevronRight,
  Heart,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Store,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  selectedStore: StoreId;
  cartItems: { product: Product; quantity: number }[];
  wishlist: string[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory?: (categorySlug: string) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (categorySlug: string) => void;
  onOpenCart?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  selectedStore,
  cartItems,
  wishlist,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onSelectProduct,
  onSelectCategory,
  onNavigateHome,
  onNavigateCategory,
  onOpenCart,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutri' | 'conserv'>('desc');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const inWishlist = wishlist.includes(product.id);
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const categoryObj = CATEGORIES.find((c) => c.slug === product.category) || CATEGORIES[0];

  // Related products from the same category
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, selectedQuantity);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 2500);
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
          <button
            onClick={() => onNavigateCategory(product.category)}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            {categoryObj.name}
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => onNavigateCategory(product.category)}
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#16332A] hover:text-[#6B2E3B] mb-4 sm:mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Retour au rayon {categoryObj.name}</span>
        </button>

        {/* Main Product Presentation Grid */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D5] shadow-xs p-4 sm:p-8 lg:p-10 mb-8 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#E8E2D5]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.discountPercentage && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#6B2E3B] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md">
                  -{product.discountPercentage}% REMISE
                </span>
              )}

              {product.badge && !product.discountPercentage && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#16332A] text-[#E7CF9B] text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Ajouter aux favoris"
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  inWishlist
                    ? 'bg-[#6B2E3B] text-white shadow-lg'
                    : 'bg-white text-[#232420] hover:text-[#6B2E3B] shadow-md'
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quality & Freshness Guarantee badges */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 w-full mt-3 sm:mt-4">
              <div className="p-2 sm:p-3 rounded-xl bg-[#FAF7F0] text-center border border-[#E8E2D5]">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16332A] mx-auto mb-0.5 sm:mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-[#16332A] block leading-tight">Livraison 24h</span>
                <span className="text-[8px] sm:text-[9px] text-[#232420]/60 hidden sm:block">ou Click & Collect 2h</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-[#FAF7F0] text-center border border-[#E8E2D5]">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16332A] mx-auto mb-0.5 sm:mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-[#16332A] block leading-tight">Fraîcheur 100%</span>
                <span className="text-[8px] sm:text-[9px] text-[#232420]/60 hidden sm:block">Chaîne du froid</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-[#FAF7F0] text-center border border-[#E8E2D5]">
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16332A] mx-auto mb-0.5 sm:mb-1" />
                <span className="text-[9px] sm:text-[10px] font-bold text-[#16332A] block leading-tight">Qualité Garantie</span>
                <span className="text-[8px] sm:text-[9px] text-[#232420]/60 hidden sm:block">Service réactif</span>
              </div>
            </div>
          </div>

          {/* Right: Info, Price, Store Availability & Add to Cart */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="text-[11px] sm:text-xs font-bold text-[#C6A468] uppercase tracking-wider">
                  {categoryObj.name}
                </span>
                {product.origin && (
                  <span className="text-[11px] sm:text-xs text-[#232420]/60 font-medium">
                    • 📍 {product.origin}
                  </span>
                )}
              </div>

              <h1 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16332A] mb-1.5 sm:mb-2 leading-tight">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs sm:text-sm text-[#232420]/75 font-light leading-relaxed mb-3 sm:mb-4">
                  {product.subtitle}
                </p>
              )}

              {/* Nutri-Score & Unit */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                {product.nutriScore && (
                  <span className="inline-flex items-center gap-1.5 bg-[#16332A] text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                    <span>Nutri-Score</span>
                    <strong className="text-[#C6A468]">{product.nutriScore}</strong>
                  </span>
                )}

                <span className="bg-[#FAF7F0] border border-[#E8E2D5] text-[#232420] text-[11px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                  Format : {product.unit}
                </span>
              </div>

              {/* Price Box */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] mb-4 sm:mb-6 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="font-mono-price text-2xl sm:text-3xl font-bold text-[#16332A]">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono-price text-xs sm:text-base line-through text-gray-400">
                        {product.originalPrice.toFixed(2).replace('.', ',')} €
                      </span>
                    )}
                  </div>
                  {product.unitPriceComparison && (
                    <span className="text-[10px] sm:text-xs text-[#232420]/60 font-medium mt-0.5 block">
                      Soit {product.unitPriceComparison}
                    </span>
                  )}
                </div>

                <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  TTC inclus
                </span>
              </div>

              {/* Store Availability Checker */}
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E2D5] mb-4 sm:mb-6 space-y-2">
                <h4 className="text-[11px] sm:text-xs font-bold text-[#16332A] uppercase tracking-wider flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#C6A468]" />
                  <span>Disponibilité en magasin</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs pt-1">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF7F0]">
                    <span className="font-medium text-[#232420]">Goussainville</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3" /> En stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF7F0]">
                    <span className="font-medium text-[#232420]">Sarcelles</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3" /> En stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between sm:justify-start border border-[#16332A]/20 bg-[#FAF7F0] rounded-xl p-1">
                  <button
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white text-[#16332A] flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <span className="font-mono-price font-bold text-xs sm:text-sm px-4 text-[#16332A]">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity((q) => q + 1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white text-[#16332A] flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C6A468]" />
                  <span>
                    Ajouter au panier • {(product.price * selectedQuantity).toFixed(2).replace('.', ',')} €
                  </span>
                </button>
              </div>

              {isAddedAnimation && (
                <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between gap-2 mb-4 animate-in fade-in">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{selectedQuantity} article(s) ajouté(s) au panier !</span>
                  </div>
                  {onOpenCart && (
                    <button
                      onClick={onOpenCart}
                      className="underline font-bold text-emerald-900 cursor-pointer"
                    >
                      Voir mon panier
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Product Details Tabs (Description, Nutrition, Conservation) */}
            <div className="border-t border-[#E8E2D5] pt-4 sm:pt-6">
              <div className="flex border-b border-[#E8E2D5] gap-3 sm:gap-4 mb-3 sm:mb-4 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'desc'
                      ? 'border-[#16332A] text-[#16332A]'
                      : 'border-transparent text-gray-400 hover:text-[#16332A]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('nutri')}
                  className={`pb-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'nutri'
                      ? 'border-[#16332A] text-[#16332A]'
                      : 'border-transparent text-gray-400 hover:text-[#16332A]'
                  }`}
                >
                  Valeurs Nutritionnelles
                </button>
                <button
                  onClick={() => setActiveTab('conserv')}
                  className={`pb-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'conserv'
                      ? 'border-[#16332A] text-[#16332A]'
                      : 'border-transparent text-gray-400 hover:text-[#16332A]'
                  }`}
                >
                  Conservation
                </button>
              </div>

              <div className="text-xs text-[#232420]/80 leading-relaxed font-light">
                {activeTab === 'desc' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <p>
                      Sélectionné avec soin par les équipes d'EXO ISLAND pour garantir fraîcheur et traçabilité irréprochables.
                    </p>
                  </div>
                )}

                {activeTab === 'nutri' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span>Énergie :</span>
                      <strong>320 kJ / 76 kcal</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span>Matières grasses :</span>
                      <strong>0.2 g (dont saturés &lt; 0.1g)</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span>Glucides :</span>
                      <strong>16.2 g (dont sucres 14.8g)</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Protéines :</span>
                      <strong>0.9 g</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'conserv' && (
                  <div className="space-y-2">
                    <p>
                      Conserver dans un endroit frais et sec. Pour les produits frais, maintenir entre 0°C et +4°C au réfrigérateur.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-fraunces text-lg sm:text-2xl font-bold text-[#16332A]">
                Vous aimerez aussi
              </h3>
              <button
                onClick={() => onNavigateCategory(product.category)}
                className="text-xs font-bold text-[#6B2E3B] hover:underline"
              >
                Voir tout →
              </button>
            </div>

            {/* Responsive grid for related products */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => onSelectProduct(relProduct)}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FAF7F0]">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-fraunces font-bold text-xs sm:text-sm text-[#16332A] group-hover:text-[#6B2E3B] truncate mb-1">
                        {relProduct.name}
                      </h4>
                      <span className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A] block mb-2">
                        {relProduct.price.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(relProduct, 1);
                      }}
                      className="w-full py-1.5 sm:py-2 rounded-xl bg-[#16332A] text-white text-[11px] sm:text-xs font-bold hover:bg-[#234d40] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#C6A468]" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
