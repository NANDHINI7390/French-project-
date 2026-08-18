import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Store, Check, Tag } from 'lucide-react';
import { CartItem, StoreId } from '../types';
import { STORES } from '../data/storeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  selectedStore: StoreId;
  onCheckoutSuccess?: () => void;
  onNavigateCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedStore,
  onCheckoutSuccess,
  onNavigateCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'collect'>('delivery');

  if (!isOpen) return null;

  const currentStore = STORES.find((s) => s.id === selectedStore) || STORES[0];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 40.0;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const deliveryFee = deliveryMode === 'collect' || subtotal >= freeShippingThreshold ? 0 : 4.9;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'EXO10') {
      setAppliedDiscount(10);
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'BIENVENUE') {
      setAppliedDiscount(15);
      setPromoCode('');
    } else {
      setPromoError('Code promo invalide. Essayez "EXO10" pour -10%');
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    if (onNavigateCheckout) {
      onNavigateCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F4EA] shadow-2xl flex flex-col border-l border-[#16332A]/20 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#16332A] text-[#F8F4EA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#234d40] text-[#C6A468] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-white">Mon Panier</h3>
                <span className="text-xs text-[#A8BFAE]">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} article(s)
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer le panier"
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Gauge */}
          <div className="bg-[#EFE6D5] p-3.5 border-b border-[#16332A]/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#16332A] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#16332A]" />
                {missingForFreeShipping === 0 ? (
                  <span className="text-emerald-800 font-bold">Livraison offerte félicitations ! 🎉</span>
                ) : (
                  <span>
                    Plus que <strong className="font-mono-price text-[#6B2E3B]">{missingForFreeShipping.toFixed(2).replace('.', ',')} €</strong> pour la livraison offerte
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#232420]/60 font-mono-price font-bold">
                {subtotal.toFixed(2).replace('.', ',')} / {freeShippingThreshold} €
              </span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16332A] transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#16332A]/10">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-[#232420]/70 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#16332A]/10 text-[#16332A] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#16332A]/60" />
                </div>
                <h4 className="font-fraunces font-bold text-lg text-[#16332A]">Votre panier est vide</h4>
                <p className="text-xs text-[#232420]/60 max-w-xs mt-1">
                  Découvrez nos produits frais du jour et profitez de nos offres exceptionnelles.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#16332A] text-[#F8F4EA] text-xs font-semibold hover:bg-[#234d40] transition-colors cursor-pointer"
                >
                  Commencer mes courses
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white border border-[#16332A]/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#16332A] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#232420]/60 truncate">
                      {item.product.unit}
                    </p>
                    <div className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A] mt-1">
                      {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#232420]/40 hover:text-[#6B2E3B] p-1 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-white border border-[#16332A]/20 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded bg-[#F8F4EA] text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono-price font-bold text-xs px-1 min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded bg-[#16332A] text-white flex items-center justify-center hover:bg-[#234d40] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#16332A]/15 space-y-3.5 shadow-lg">
              
              {/* Delivery / Click & Collect mode toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F8F4EA] rounded-xl border border-[#16332A]/10 text-xs">
                <button
                  onClick={() => setDeliveryMode('delivery')}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryMode === 'delivery'
                      ? 'bg-[#16332A] text-[#F8F4EA] shadow-xs'
                      : 'text-[#232420]/70 hover:text-[#16332A]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Livraison</span>
                </button>
                <button
                  onClick={() => setDeliveryMode('collect')}
                  className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryMode === 'collect'
                      ? 'bg-[#16332A] text-[#F8F4EA] shadow-xs'
                      : 'text-[#232420]/70 hover:text-[#16332A]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Click & Collect</span>
                </button>
              </div>

              {deliveryMode === 'collect' && (
                <div className="text-[11px] text-[#16332A] bg-[#EFE6D5] p-2 rounded-lg flex items-center justify-between">
                  <span>Retrait magasin : <strong>{currentStore.name}</strong></span>
                  <span className="text-emerald-700 font-bold">Gratuit</span>
                </div>
              )}

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#232420]/40" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Code promo (ex: EXO10)"
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#F8F4EA] border border-[#16332A]/15 focus:outline-none focus:border-[#16332A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#16332A] text-[#F8F4EA] text-xs font-semibold hover:bg-[#234d40] transition-colors cursor-pointer"
                  >
                    Appliquer
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-[#6B2E3B]">{promoError}</p>
                )}
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Code appliqué : -{appliedDiscount}% de réduction !
                  </p>
                )}
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-[#232420]/80 pt-2 border-t border-[#16332A]/10">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-mono-price">{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#6B2E3B] font-medium">
                    <span>Remise ({appliedDiscount}%)</span>
                    <span className="font-mono-price">- {discountAmount.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span className="font-mono-price">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">Offert</span>
                    ) : (
                      `${deliveryFee.toFixed(2).replace('.', ',')} €`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#16332A] pt-2 border-t border-[#16332A]/10">
                  <span>Total TTC</span>
                  <span className="font-mono-price text-lg text-[#16332A]">
                    {grandTotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C6A468] hover:bg-[#d9b87b] text-[#16332A] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
