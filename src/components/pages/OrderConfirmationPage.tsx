import React from 'react';
import { Order } from '../../types';
import { STORES } from '../../data/storeData';
import {
  CheckCircle2,
  Package,
  Truck,
  Store,
  Clock,
  MapPin,
  Printer,
  ArrowRight,
  ShoppingBag,
  HeartHandshake,
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigateHome: () => void;
  onNavigateOrders: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigateHome,
  onNavigateOrders,
}) => {
  const storeInfo = STORES.find((s) => s.id === order.store) || STORES[0];

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-xl text-center mb-8 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="inline-block bg-[#16332A] text-[#E7CF9B] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Commande Confirmée
          </span>

          <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#16332A] mb-2">
            Merci pour votre commande, {order.customer.firstName} !
          </h1>

          <p className="text-xs sm:text-sm text-[#232420]/70 max-w-lg mx-auto font-light leading-relaxed mb-6">
            Votre commande <strong className="font-mono-price font-bold text-[#16332A]">n° {order.id}</strong> a bien été enregistrée. Un email de confirmation détaillé vous a été envoyé à <u>{order.customer.email}</u>.
          </p>

          {/* Stepper tracking */}
          <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] max-w-2xl mx-auto mb-6">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                  ✓
                </div>
                <strong className="text-[#16332A] block">1. Validée</strong>
                <span className="text-[10px] text-gray-500">Paiement accepté</span>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#C6A468] text-[#16332A] flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                  2
                </div>
                <strong className="text-[#16332A] block">2. En préparation</strong>
                <span className="text-[10px] text-gray-500">Par nos artisans</span>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto text-xs font-bold">
                  3
                </div>
                <strong className="text-gray-400 block">
                  {order.deliveryMethod === 'delivery' ? '3. En livraison' : '3. Prête au retrait'}
                </strong>
                <span className="text-[10px] text-gray-400">{order.timeSlot}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handlePrintReceipt}
              className="py-3 px-5 rounded-xl bg-[#FAF7F0] hover:bg-[#EFE6D5] text-[#16332A] border border-[#16332A]/20 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le reçu</span>
            </button>

            <button
              onClick={onNavigateOrders}
              className="py-3 px-5 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Package className="w-4 h-4 text-[#C6A468]" />
              <span>Suivre mes commandes</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="py-3 px-5 rounded-xl bg-[#C6A468] hover:bg-[#d9b87b] text-[#16332A] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>

        {/* Order Details Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Left: Fulfillment info */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs space-y-4">
            <h3 className="font-fraunces text-lg font-bold text-[#16332A] pb-3 border-b border-[#E8E2D5] flex items-center gap-2">
              {order.deliveryMethod === 'delivery' ? (
                <>
                  <Truck className="w-5 h-5 text-[#C6A468]" />
                  <span>Détails de la Livraison</span>
                </>
              ) : (
                <>
                  <Store className="w-5 h-5 text-[#C6A468]" />
                  <span>Détails du Retrait Click & Collect</span>
                </>
              )}
            </h3>

            <div className="space-y-3 text-xs text-[#232420]">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#16332A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#16332A]">Créneau choisi :</strong>
                  <span>{order.timeSlot}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Store className="w-4 h-4 text-[#16332A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#16332A]">Supermarché de préparation :</strong>
                  <span>EXO ISLAND {storeInfo.name} ({storeInfo.address}, {storeInfo.city})</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#16332A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#16332A]">Destinataire & Adresse :</strong>
                  <span>{order.customer.firstName} {order.customer.lastName}</span>
                  <span className="block text-gray-500">{order.customer.address}, {order.customer.postalCode} {order.customer.city}</span>
                  <span className="block text-gray-500">Tél : {order.customer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment info */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs space-y-4">
            <h3 className="font-fraunces text-lg font-bold text-[#16332A] pb-3 border-b border-[#E8E2D5]">
              Paiement & Facturation
            </h3>

            <div className="space-y-2.5 text-xs text-[#232420]">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Mode de paiement :</span>
                <strong>{order.paymentMethod}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Sous-total articles :</span>
                <span className="font-mono-price font-semibold">{order.subtotal.toFixed(2).replace('.', ',')} €</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between py-1 border-b border-gray-100 text-[#6B2E3B] font-semibold">
                  <span>Remise appliquée :</span>
                  <span className="font-mono-price">- {order.discount.toFixed(2).replace('.', ',')} €</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Frais de service :</span>
                <span className="font-mono-price font-semibold">
                  {order.deliveryFee === 0 ? 'Offerts' : `${order.deliveryFee.toFixed(2).replace('.', ',')} €`}
                </span>
              </div>
              <div className="flex justify-between pt-2 items-baseline text-[#16332A]">
                <strong className="font-fraunces text-base">Total réglé TTC :</strong>
                <strong className="font-mono-price text-xl font-bold">
                  {order.total.toFixed(2).replace('.', ',')} €
                </strong>
              </div>
            </div>
          </div>

        </div>

        {/* Ordered items table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
          <h3 className="font-fraunces text-xl font-bold text-[#16332A] mb-4">
            Articles commandés ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
          </h3>

          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-[#16332A] block truncate">
                      {item.product.name}
                    </strong>
                    <span className="text-[11px] text-gray-500">
                      Quantité : {item.quantity} • {item.product.unit}
                    </span>
                  </div>
                </div>

                <span className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A]">
                  {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
