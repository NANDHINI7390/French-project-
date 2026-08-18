import React, { useState } from 'react';
import { Product, StoreId, DeliveryMethod, TimeSlot, CustomerInfo, Order } from '../../types';
import { STORES, AVAILABLE_TIME_SLOTS } from '../../data/storeData';
import {
  ChevronRight,
  Truck,
  Store,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Tag,
  Lock,
  Calendar,
  MapPin,
  Check,
} from 'lucide-react';

interface CheckoutPageProps {
  cartItems: { product: Product; quantity: number }[];
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
  onNavigateHome: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  selectedStore,
  onSelectStore,
  onNavigateHome,
  onOrderCompleted,
}) => {
  // Stepper state: 1: Mode, 2: Slot, 3: Address, 4: Payment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(AVAILABLE_TIME_SLOTS[0].id);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.fr',
    phone: '06 12 34 56 78',
    address: '14 Avenue des Roses',
    apartment: 'Bâtiment B, 3ème étage',
    postalCode: '95190',
    city: 'Goussainville',
    instructions: 'Sonner à l’interphone Dupont',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'on_collect'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 40.0;
  const deliveryFee = deliveryMethod === 'collect' || subtotal >= freeShippingThreshold ? 0 : 4.9;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const chosenSlot = AVAILABLE_TIME_SLOTS.find((s) => s.id === selectedSlotId) || AVAILABLE_TIME_SLOTS[0];
  const chosenStoreObj = STORES.find((s) => s.id === selectedStore) || STORES[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'EXO10') {
      setDiscountPercent(10);
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'BIENVENUE') {
      setDiscountPercent(15);
      setPromoCode('');
    } else {
      setPromoError('Code promo invalide. Utilisez "EXO10" pour -10%');
    }
  };

  const handleFinalizeOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrder: Order = {
        id: `EXO-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        deliveryFee,
        total: grandTotal,
        status: deliveryMethod === 'collect' ? 'prete_retrait' : 'en_preparation',
        deliveryMethod,
        store: selectedStore,
        timeSlot: `${chosenSlot.day} ${chosenSlot.date} (${chosenSlot.timeRange})`,
        customer: { ...customer },
        paymentMethod:
          paymentMethod === 'card'
            ? 'Carte Bancaire (**** 4242)'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : 'Paiement au retrait',
      };

      onOrderCompleted(generatedOrder);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-2 text-xs text-[#232420]/60 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#16332A] font-bold">Commande & Paiement</span>
        </nav>

        {/* 4-Step Progress Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8E2D5] shadow-xs mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 1
                  ? 'bg-[#16332A] text-white shadow-md'
                  : currentStep > 1
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-[#FAF7F0] text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 1
                    ? 'bg-[#C6A468] text-[#16332A]'
                    : currentStep > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-300 text-white'
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold block opacity-75">Étape 1</span>
                <strong className="text-xs">Mode & Magasin</strong>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 2
                  ? 'bg-[#16332A] text-white shadow-md'
                  : currentStep > 2
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-[#FAF7F0] text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 2
                    ? 'bg-[#C6A468] text-[#16332A]'
                    : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-300 text-white'
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold block opacity-75">Étape 2</span>
                <strong className="text-xs">Créneau horaire</strong>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 3
                  ? 'bg-[#16332A] text-white shadow-md'
                  : currentStep > 3
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-[#FAF7F0] text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 3
                    ? 'bg-[#C6A468] text-[#16332A]'
                    : currentStep > 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-300 text-white'
                }`}
              >
                {currentStep > 3 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold block opacity-75">Étape 3</span>
                <strong className="text-xs">Coordonnées</strong>
              </div>
            </button>

            {/* Step 4 */}
            <button
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 4
                  ? 'bg-[#16332A] text-white shadow-md'
                  : 'bg-[#FAF7F0] text-gray-500'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 4
                    ? 'bg-[#C6A468] text-[#16332A]'
                    : 'bg-gray-300 text-white'
                }`}
              >
                4
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold block opacity-75">Étape 4</span>
                <strong className="text-xs">Paiement</strong>
              </div>
            </button>

          </div>
        </div>

        {/* Main Content: Left Step Form + Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Step Forms (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: Mode & Store Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-fraunces text-2xl font-bold text-[#16332A] mb-1">
                    1. Choisissez votre mode de réception
                  </h2>
                  <p className="text-xs text-[#232420]/70 font-light">
                    Recevez vos courses à votre porte ou retirez-les sans attente en magasin.
                  </p>
                </div>

                {/* Delivery vs Collect Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#16332A] bg-[#FAF7F0] shadow-md'
                        : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#16332A] bg-white px-2.5 py-1 rounded-full border border-black/10">
                        {subtotal >= freeShippingThreshold ? 'Offerte' : '4,90 €'}
                      </span>
                    </div>
                    <div>
                      <strong className="font-fraunces text-base text-[#16332A] block mb-1">
                        Livraison à Domicile
                      </strong>
                      <p className="text-xs text-[#232420]/70 font-light">
                        Livré chez vous dans le créneau de votre choix par camion frigorifique.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('collect')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      deliveryMethod === 'collect'
                        ? 'border-[#16332A] bg-[#FAF7F0] shadow-md'
                        : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center">
                        <Store className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        Gratuit 2h
                      </span>
                    </div>
                    <div>
                      <strong className="font-fraunces text-base text-[#16332A] block mb-1">
                        Click & Collect en Magasin
                      </strong>
                      <p className="text-xs text-[#232420]/70 font-light">
                        Prêt en 2 heures à l'accueil de votre supermarché EXO ISLAND.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supermarket Store Picker */}
                <div className="pt-4 border-t border-[#E8E2D5]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#16332A] block mb-3">
                    Supermarché préparateur :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STORES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => onSelectStore(s.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedStore === s.id
                            ? 'border-[#16332A] bg-[#16332A] text-white shadow-md'
                            : 'border-[#E8E2D5] bg-[#FAF7F0] text-[#232420] hover:border-[#16332A]/40'
                        }`}
                      >
                        <div>
                          <strong className="text-sm font-bold block">{s.name}</strong>
                          <span className={`text-xs block ${selectedStore === s.id ? 'text-[#A8BFAE]' : 'text-gray-500'}`}>
                            {s.address}, {s.city}
                          </span>
                        </div>
                        {selectedStore === s.id && <Check className="w-5 h-5 text-[#C6A468]" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="py-3.5 px-8 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuer vers le créneau horaire</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A468]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Time Slot Picker */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-fraunces text-2xl font-bold text-[#16332A] mb-1">
                    2. Choisissez votre créneau de {deliveryMethod === 'delivery' ? 'livraison' : 'retrait'}
                  </h2>
                  <p className="text-xs text-[#232420]/70 font-light">
                    Sélectionnez la tranche horaire de 2 heures qui vous convient le mieux.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {AVAILABLE_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#16332A] bg-[#FAF7F0] shadow-md'
                            : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-[#16332A] bg-white px-2 py-0.5 rounded-md border border-black/10">
                            {slot.day} {slot.date}
                          </span>
                          {slot.isRushHour && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              Forte demande
                            </span>
                          )}
                        </div>

                        <div>
                          <strong className="font-mono-price text-sm text-[#16332A] block mb-1">
                            {slot.timeRange}
                          </strong>
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Disponible
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D5]">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="py-3 px-5 rounded-xl bg-[#FAF7F0] text-[#16332A] text-xs font-bold hover:bg-[#EFE6D5] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-3.5 px-8 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuer vers les coordonnées</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A468]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Customer Details & Address */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-fraunces text-2xl font-bold text-[#16332A] mb-1">
                    3. Vos coordonnées et adresse
                  </h2>
                  <p className="text-xs text-[#232420]/70 font-light">
                    Informations nécessaires pour la préparation et la remise de votre commande.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#16332A] block mb-1.5">Prénom *</label>
                    <input
                      type="text"
                      value={customer.firstName}
                      onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#16332A] block mb-1.5">Nom *</label>
                    <input
                      type="text"
                      value={customer.lastName}
                      onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#16332A] block mb-1.5">Adresse email *</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#16332A] block mb-1.5">Téléphone portable *</label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#16332A] block mb-1.5">
                      {deliveryMethod === 'delivery' ? 'Adresse de livraison *' : 'Adresse de facturation *'}
                    </label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#16332A] block mb-1.5">Complément d'adresse / Bâtiment</label>
                    <input
                      type="text"
                      value={customer.apartment || ''}
                      onChange={(e) => setCustomer({ ...customer, apartment: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-[#16332A] block mb-1.5">Code postal *</label>
                      <input
                        type="text"
                        value={customer.postalCode}
                        onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#16332A] block mb-1.5">Ville *</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#16332A] block mb-1.5">Instructions pour le préparateur ou livreur</label>
                    <input
                      type="text"
                      value={customer.instructions || ''}
                      onChange={(e) => setCustomer({ ...customer, instructions: e.target.value })}
                      placeholder="Code portail, interphone, étage..."
                      className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D5]">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="py-3 px-5 rounded-xl bg-[#FAF7F0] text-[#16332A] text-xs font-bold hover:bg-[#EFE6D5] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="py-3.5 px-8 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuer vers le paiement</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A468]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Secure Payment */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6 animate-in fade-in">
                <div>
                  <h2 className="font-fraunces text-2xl font-bold text-[#16332A] mb-1">
                    4. Paiement sécurisé
                  </h2>
                  <p className="text-xs text-[#232420]/70 font-light flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Chiffrement SSL 256 bits et authentification 3D Secure</span>
                  </p>
                </div>

                {/* Payment Option Tabs */}
                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-[#16332A] bg-[#FAF7F0] shadow-sm'
                        : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#16332A]" />
                      <div>
                        <strong className="text-xs font-bold text-[#16332A] block">
                          Carte Bancaire (CB, Visa, Mastercard)
                        </strong>
                        <span className="text-[11px] text-gray-500">Paiement immédiat 100% sécurisé</span>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-[#16332A] flex items-center justify-center">
                      {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#16332A]" />}
                    </div>
                  </label>

                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-[#16332A] block mb-1">Numéro de carte</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-white border border-[#16332A]/20 font-mono-price"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#16332A] block mb-1">Date d'expiration</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-white border border-[#16332A]/20 font-mono-price"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#16332A] block mb-1">Code de sécurité (CVV)</label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-white border border-[#16332A]/20 font-mono-price"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <label
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#16332A] bg-[#FAF7F0] shadow-sm'
                        : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs">
                        
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-[#16332A] block">
                          Apple Pay / Google Pay
                        </strong>
                        <span className="text-[11px] text-gray-500">Paiement biométrique rapide en 1 clic</span>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-[#16332A] flex items-center justify-center">
                      {paymentMethod === 'apple_pay' && <div className="w-2 h-2 rounded-full bg-[#16332A]" />}
                    </div>
                  </label>

                  {deliveryMethod === 'collect' && (
                    <label
                      onClick={() => setPaymentMethod('on_collect')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === 'on_collect'
                          ? 'border-[#16332A] bg-[#FAF7F0] shadow-sm'
                          : 'border-[#E8E2D5] hover:border-[#16332A]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-[#16332A]" />
                        <div>
                          <strong className="text-xs font-bold text-[#16332A] block">
                            Paiement au retrait en magasin
                          </strong>
                          <span className="text-[11px] text-gray-500">Espèces, Carte, ou Titres-Restaurant</span>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-[#16332A] flex items-center justify-center">
                        {paymentMethod === 'on_collect' && <div className="w-2 h-2 rounded-full bg-[#16332A]" />}
                      </div>
                    </label>
                  )}
                </div>

                {/* Final Order Confirmation Button */}
                <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D5]">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-3 px-5 rounded-xl bg-[#FAF7F0] text-[#16332A] text-xs font-bold hover:bg-[#EFE6D5] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    onClick={handleFinalizeOrder}
                    disabled={isProcessing}
                    className="py-4 px-8 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white text-xs sm:text-sm font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Validation en cours...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-[#C6A468]" />
                        <span>Confirmer & Payer {grandTotal.toFixed(2).replace('.', ',')} €</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right: Sticky Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs sticky top-24 space-y-5">
              <h3 className="font-fraunces text-xl font-bold text-[#16332A] pb-3 border-b border-[#E8E2D5]">
                Récapitulatif ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} articles)
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="text-xs text-[#16332A] block truncate">
                        {item.product.name}
                      </strong>
                      <span className="text-[11px] text-gray-500">
                        Qté : {item.quantity} × {item.product.price.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                    <span className="font-mono-price font-bold text-xs text-[#16332A]">
                      {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code input */}
              <form onSubmit={handleApplyPromo} className="pt-3 border-t border-[#E8E2D5] space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code promo (ex: EXO10)"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 text-xs uppercase font-mono-price focus:outline-none focus:border-[#C6A468]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#16332A] text-white text-xs font-bold hover:bg-[#234d40] transition-colors cursor-pointer"
                  >
                    Appliquer
                  </button>
                </div>
                {discountPercent > 0 && (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Remise de {discountPercent}% appliquée !
                  </span>
                )}
                {promoError && (
                  <span className="text-[11px] text-red-600 font-medium block">{promoError}</span>
                )}
              </form>

              {/* Price Calculation breakdown */}
              <div className="pt-3 border-t border-[#E8E2D5] space-y-2 text-xs text-[#232420]/80">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-mono-price font-semibold">{subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#6B2E3B] font-semibold">
                    <span>Remise fidélité / promo</span>
                    <span className="font-mono-price">- {discountAmount.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frais de {deliveryMethod === 'delivery' ? 'livraison' : 'retrait'}</span>
                  <span className="font-mono-price font-semibold">
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-700">GRATUIT</strong>
                    ) : (
                      `${deliveryFee.toFixed(2).replace('.', ',')} €`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E8E2D5] flex justify-between items-baseline text-[#16332A]">
                  <strong className="font-fraunces text-base">Total TTC à payer</strong>
                  <strong className="font-mono-price text-2xl font-bold text-[#16332A]">
                    {grandTotal.toFixed(2).replace('.', ',')} €
                  </strong>
                </div>
              </div>

              {/* Selected store badge */}
              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] text-[11px] text-[#232420]/75 space-y-1">
                <span className="font-bold text-[#16332A] block flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-[#C6A468]" />
                  Magasin : EXO ISLAND {chosenStoreObj.name}
                </span>
                <span className="block text-gray-500">
                  Créneau : {chosenSlot.day} ({chosenSlot.timeRange})
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
