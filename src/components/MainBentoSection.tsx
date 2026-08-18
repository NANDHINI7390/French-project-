import React, { useState } from 'react';
import { Check, Plus, Minus, ChevronLeft, ChevronRight, MapPin, Store, Clock, Phone, Sparkles } from 'lucide-react';
import { STORES, PROMOTION_PRODUCTS, TODAY_MARKET_PRODUCTS } from '../data/storeData';
import { Product, StoreId } from '../types';

interface MainBentoSectionProps {
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
  onOpenStoreModal: () => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onQuickView: (product: Product) => void;
  getCartQuantity: (productId: string) => number;
}

export const MainBentoSection: React.FC<MainBentoSectionProps> = ({
  selectedStore,
  onSelectStore,
  onOpenStoreModal,
  onAddToCart,
  onUpdateQuantity,
  onQuickView,
  getCartQuantity,
}) => {
  // Current featured promo index
  const [promoIndex, setPromoIndex] = useState(0);
  const featuredPromo = PROMOTION_PRODUCTS[promoIndex % PROMOTION_PRODUCTS.length];
  const promoQty = getCartQuantity(featuredPromo.id);

  // Market items
  const [marketCategory, setMarketCategory] = useState<'all' | 'boulangerie' | 'primeur'>('all');
  const marketItems = TODAY_MARKET_PRODUCTS.slice(0, 4);

  const nextPromo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromoIndex((prev) => (prev + 1) % PROMOTION_PRODUCTS.length);
  };

  const prevPromo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromoIndex((prev) => (prev - 1 + PROMOTION_PRODUCTS.length) % PROMOTION_PRODUCTS.length);
  };

  return (
    <section aria-label="Aperçu des magasins et offres" className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        
        {/* ========================================================= */}
        {/* 1. LEFT COLUMN: VOTRE MAGASIN (col-span-12 lg:col-span-3) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                Votre Magasin
              </h2>
              <button
                onClick={onOpenStoreModal}
                className="text-[10px] text-[#C6A468] hover:text-[#16332A] font-semibold underline"
              >
                Tous les détails
              </button>
            </div>

            <div className="space-y-3">
              {STORES.map((store) => {
                const isSelected = selectedStore === store.id;
                return (
                  <div
                    key={store.id}
                    id={`bento-store-${store.id}`}
                    onClick={() => onSelectStore(store.id)}
                    className={`p-4 rounded-xl transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-2 border-[#C6A468] bg-white shadow-xs'
                        : 'border border-gray-200 bg-white opacity-65 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Store className="w-4 h-4 text-[#16332A]" />
                        <span className="font-bold text-[#16332A] text-sm">{store.name}</span>
                      </div>
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? 'bg-[#A8BFAE]' : 'bg-gray-300'
                        }`}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C6A468]" />
                      <span>{store.hours}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {store.address}, {store.city}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick store perks banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/70 border border-gray-200/80 text-[11px] text-gray-600 space-y-2">
              <div className="flex items-center gap-2 text-[#16332A] font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A468]" />
                <span>Services en magasin</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16332A]" />
                <span>Retrait Drive & Click & Collect 2h</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16332A]" />
                <span>Boucherie traditionnelle & Traiteur</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. MIDDLE COLUMN: NOS OFFRES DU MOMENT (col-span-12 md:col-span-6 lg:col-span-4) */}
        {/* ================================================================= */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex flex-col relative shadow-xs">
          
          {/* Top Fig Wine Discount Badge */}
          <div className="absolute top-0 right-0 p-4 flex items-center gap-1.5 z-10">
            <span className="bg-[#6B2E3B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-xs">
              {featuredPromo.badge || `-${featuredPromo.discountPercentage || 25}%`}
            </span>
          </div>

          {/* Product Image Area with quick arrows */}
          <div
            onClick={() => onQuickView(featuredPromo)}
            className="h-40 sm:h-44 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative cursor-pointer group p-3"
          >
            <img
              src={featuredPromo.image}
              alt={featuredPromo.name}
              className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Quick previous / next arrows */}
            <button
              onClick={prevPromo}
              aria-label="Offre précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 text-[#16332A] shadow-xs flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextPromo}
              aria-label="Offre suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 text-[#16332A] shadow-xs flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Heading */}
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">
            Nos offres du moment
          </h3>
          <h4
            onClick={() => onQuickView(featuredPromo)}
            className="font-bold text-[#16332A] text-lg leading-snug cursor-pointer hover:text-[#C6A468] transition-colors"
          >
            {featuredPromo.name}
          </h4>
          <p className="text-xs text-gray-500 italic mb-4">
            {featuredPromo.subtitle || featuredPromo.unit}
          </p>

          {/* Pricing & Add button matching reference */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="font-mono-price text-xl font-bold text-[#6B2E3B] block">
                {featuredPromo.price.toFixed(2).replace('.', ',')} €
              </span>
              {featuredPromo.unitPriceComparison && (
                <span className="font-mono text-[10px] text-gray-400 block">
                  {featuredPromo.unitPriceComparison}
                </span>
              )}
            </div>

            {promoQty === 0 ? (
              <button
                id={`bento-promo-add-btn-${featuredPromo.id}`}
                onClick={() => onAddToCart(featuredPromo)}
                className="bg-[#16332A] text-[#F8F4EA] px-6 py-2 rounded-lg text-xs font-bold uppercase hover:bg-[#C6A468] hover:text-[#16332A] transition-colors cursor-pointer shadow-xs"
              >
                Ajouter
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#F8F4EA] border border-[#16332A]/20 px-2 py-1 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(featuredPromo.id, -1)}
                  className="w-6 h-6 rounded bg-white text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono-price font-bold text-xs text-[#16332A]">
                  {promoQty}
                </span>
                <button
                  onClick={() => onUpdateQuantity(featuredPromo.id, 1)}
                  className="w-6 h-6 rounded bg-[#16332A] text-white flex items-center justify-center"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. RIGHT COLUMN: AUJOURD'HUI AU MARCHÉ (col-span-12 md:col-span-6 lg:col-span-5) */}
        {/* ===================================================================== */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-[#16332A]/5 rounded-2xl p-5 sm:p-6 border border-dashed border-[#C6A468]/50 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="font-fraunces text-2xl text-[#16332A] mb-1 font-semibold">
              Aujourd'hui au Marché
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-tight mb-5">
              Sélection de notre artisan boulanger & primeur
            </p>

            {/* Grid of 2 Market Products */}
            <div className="grid grid-cols-2 gap-4">
              {marketItems.slice(0, 2).map((item) => {
                const itemQty = getCartQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
                  >
                    <div
                      onClick={() => onQuickView(item)}
                      className="aspect-video bg-gray-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center p-2 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p
                        onClick={() => onQuickView(item)}
                        className="text-sm font-bold text-[#16332A] truncate cursor-pointer hover:text-[#C6A468] transition-colors"
                      >
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono-price text-xs text-[#C6A468] font-bold">
                          {item.price.toFixed(2).replace('.', ',')} €
                        </span>
                        <button
                          id={`bento-market-add-btn-${item.id}`}
                          onClick={() => onAddToCart(item)}
                          className="w-6 h-6 rounded-full bg-[#16332A] text-white flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-colors text-xs"
                          title="Ajouter au panier"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Market Slogan */}
          <div className="mt-4 pt-3 border-t border-[#16332A]/10 flex items-center justify-between text-[11px] text-[#16332A]/70">
            <span>Arrivage direct chaque matin à 5h30</span>
            <span className="font-semibold text-[#16332A]">100% Fraîcheur</span>
          </div>
        </div>

      </div>
    </section>
  );
};
