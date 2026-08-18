import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onAddAllToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F4EA] shadow-2xl flex flex-col border-l border-[#16332A]/20 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#16332A] text-[#F8F4EA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#234d40] text-[#6B2E3B] flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current text-[#DFCA9B]" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-white">Mes Favoris</h3>
                <span className="text-xs text-[#A8BFAE]">
                  {wishlistProducts.length} produit(s) sauvegardé(s)
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer les favoris"
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#16332A]/10">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center text-[#232420]/70 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#6B2E3B]/10 text-[#6B2E3B] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#6B2E3B]/60" />
                </div>
                <h4 className="font-fraunces font-bold text-lg text-[#16332A]">Aucun favori</h4>
                <p className="text-xs text-[#232420]/60 max-w-xs mt-1">
                  Cliquez sur le cœur d’un produit pour l’enregistrer dans votre liste de souhaits.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#16332A] text-[#F8F4EA] text-xs font-semibold hover:bg-[#234d40] transition-colors"
                >
                  Découvrir les produits
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white border border-[#16332A]/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#16332A] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#232420]/60 truncate">
                      {product.unit}
                    </p>
                    <div className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A] mt-1">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-lg bg-[#16332A] text-white hover:bg-[#234d40] transition-colors"
                      title="Ajouter au panier"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-2 rounded-lg text-[#232420]/40 hover:text-[#6B2E3B] transition-colors"
                      title="Retirer des favoris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Action */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-white border-t border-[#16332A]/15 shadow-lg">
              <button
                onClick={onAddAllToCart}
                className="w-full py-3 px-4 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-[#F8F4EA] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Tout ajouter à mon panier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
