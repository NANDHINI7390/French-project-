import React, { useState } from 'react';
import { X, Plus, Minus, Check, Heart, ShieldCheck, MapPin, Truck, Sparkles } from 'lucide-react';
import { Product, StoreId } from '../types';
import { STORES } from '../data/storeData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  selectedStore: StoreId;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  selectedStore,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentStore = STORES.find((s) => s.id === selectedStore) || STORES[0];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
        <div className="inline-block w-full max-w-2xl bg-[#F8F4EA] rounded-3xl overflow-hidden text-left shadow-2xl transform transition-all border border-[#16332A]/20 relative animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fermer la vue produit"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image side */}
            <div className="relative p-6 sm:p-8 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-[#16332A]/10">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-72 w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-lg bg-[#6B2E3B] text-white shadow-sm font-mono-price">
                  {product.badge}
                </span>
              )}

              {product.nutriScore && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#F8F4EA] px-2 py-1 rounded-lg border border-[#16332A]/10 text-xs font-bold">
                  <span className="text-[#16332A]/60">Nutri-Score :</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white font-mono">
                    {product.nutriScore}
                  </span>
                </div>
              )}
            </div>

            {/* Details side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                {product.origin && (
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#C6A468] bg-[#16332A] px-2 py-0.5 rounded-full inline-block mb-2">
                    {product.origin}
                  </span>
                )}

                <h3 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#16332A] leading-tight">
                  {product.name}
                </h3>

                {product.subtitle && (
                  <p className="text-xs italic text-[#232420]/75 font-serif mt-1">
                    {product.subtitle}
                  </p>
                )}

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="font-mono-price font-bold text-2xl sm:text-3xl text-[#16332A]">
                    {product.price.toFixed(2).replace('.', ',')} €
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono-price text-sm text-[#232420]/40 line-through">
                      {product.originalPrice.toFixed(2).replace('.', ',')} €
                    </span>
                  )}
                  <span className="text-xs text-[#232420]/60">
                    / {product.unit}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#232420]/80 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Store Availability Indicator */}
                <div className="mt-4 p-3 rounded-xl bg-white border border-[#16332A]/10 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#16332A] font-medium">
                    <MapPin className="w-4 h-4 text-[#C6A468]" />
                    <span>Disponibilité à <strong>{currentStore.name}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>En stock pour retrait immédiat ou livraison</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Add Action */}
              <div className="pt-3 border-t border-[#16332A]/10 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-white border border-[#16332A]/20 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-[#F8F4EA] text-[#16332A] flex items-center justify-center hover:bg-[#16332A] hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono-price font-bold text-sm px-2 min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-[#16332A] text-white flex items-center justify-center hover:bg-[#234d40] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
                      isWishlisted
                        ? 'border-[#6B2E3B] text-[#6B2E3B] bg-[#F9ECEE]'
                        : 'border-[#16332A]/20 text-[#232420]/60 hover:text-[#6B2E3B]'
                    }`}
                    title="Ajouter aux favoris"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#16332A] hover:bg-[#234d40] text-[#F8F4EA]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>
                        Ajouter au panier • {(product.price * quantity).toFixed(2).replace('.', ',')} €
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
