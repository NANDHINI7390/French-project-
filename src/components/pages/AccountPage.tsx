import React, { useState } from 'react';
import { Product, Order, StoreId } from '../../types';
import { ALL_PRODUCTS, MOCK_ORDERS } from '../../data/storeData';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Award,
  ChevronRight,
  Plus,
  Minus,
  Check,
  RotateCcw,
  Truck,
  Store,
} from 'lucide-react';

interface AccountPageProps {
  ordersList: Order[];
  wishlist: string[];
  selectedStore: StoreId;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  initialTab?: 'profile' | 'orders' | 'wishlist' | 'addresses';
}

export const AccountPage: React.FC<AccountPageProps> = ({
  ordersList,
  wishlist,
  selectedStore,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome,
  initialTab = 'profile',
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'loyalty'>(
    initialTab
  );

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  // User details state
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.fr',
    phone: '06 12 34 56 78',
    newsletter: true,
  });

  const allOrders = [...ordersList, ...MOCK_ORDERS];

  // Wishlist products
  const wishlistProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2500);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      onAddToCart(item.product);
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#232420]/60 mb-3 sm:mb-5">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold">Mon Espace Client</span>
        </nav>

        {/* Profile Header Banner */}
        <div className="bg-[#16332A] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#C6A468] text-[#16332A] flex items-center justify-center font-fraunces text-xl sm:text-2xl font-bold shadow-md flex-shrink-0">
              {profileData.firstName[0]}
              {profileData.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-fraunces text-xl sm:text-3xl font-bold text-white">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <span className="bg-[#C6A468]/30 border border-[#C6A468]/40 text-[#E7CF9B] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Membre Privilège
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#A8BFAE] mt-0.5 sm:mt-1 font-light">
                {profileData.email} • Magasin : Goussainville
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-xs p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-white/15 w-full sm:w-auto justify-between sm:justify-start">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A468]" />
            <div>
              <span className="text-[9px] sm:text-[10px] text-[#A8BFAE] uppercase font-bold block">Solde Fidélité</span>
              <strong className="font-mono-price text-sm sm:text-lg font-bold text-white">
                340 points <span className="text-xs text-[#C6A468]">(15 €)</span>
              </strong>
            </div>
          </div>
        </div>

        {/* Account Tabs Bar */}
        <div className="flex border-b border-[#E8E2D5] bg-white rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-xs mb-6 sm:mb-8 overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 sm:py-3 px-3 sm:px-5 text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'text-[#232420]/70 hover:bg-[#FAF7F0] hover:text-[#16332A]'
            }`}
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Mon Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 sm:py-3 px-3 sm:px-5 text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'text-[#232420]/70 hover:bg-[#FAF7F0] hover:text-[#16332A]'
            }`}
          >
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Commandes ({allOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-2 sm:py-3 px-3 sm:px-5 text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'text-[#232420]/70 hover:bg-[#FAF7F0] hover:text-[#16332A]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Favoris ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-2 sm:py-3 px-3 sm:px-5 text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'text-[#232420]/70 hover:bg-[#FAF7F0] hover:text-[#16332A]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Adresses</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-2 sm:py-3 px-3 sm:px-5 text-xs font-bold rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              activeTab === 'loyalty'
                ? 'bg-[#16332A] text-white shadow-md'
                : 'text-[#232420]/70 hover:bg-[#FAF7F0] hover:text-[#16332A]'
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Fidélité</span>
          </button>
        </div>

        {/* TAB 1: Mon Profil */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#E8E2D5] shadow-xs max-w-3xl">
            <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#16332A] mb-4 sm:mb-6">
              Informations Personnelles
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="font-semibold text-[#16332A] block mb-1">Prénom</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    required
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1">Nom</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    required
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1">Adresse email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    required
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={profileData.newsletter}
                    onChange={(e) => setProfileData({ ...profileData, newsletter: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#16332A]"
                  />
                  <span className="text-[#232420]/80 text-[11px] sm:text-xs">
                    Je souhaite recevoir les promotions hebdomadaires et offres fidélité par email
                  </span>
                </label>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white font-bold transition-all shadow-md cursor-pointer text-xs sm:text-sm text-center"
                >
                  Enregistrer mes modifications
                </button>

                {isSavedFeedback && (
                  <span className="text-emerald-700 font-bold flex items-center justify-center gap-1.5 animate-in fade-in text-xs">
                    <Check className="w-4 h-4" /> Modifications enregistrées !
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: Mes Commandes */}
        {activeTab === 'orders' && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#16332A]">
              Historique de vos commandes
            </h2>

            {allOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D5] shadow-xs overflow-hidden transition-all"
                >
                  {/* Order summary bar */}
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F0] border-b border-[#E8E2D5]">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold block">N° Commande</span>
                        <strong className="font-mono-price text-xs sm:text-sm text-[#16332A]">{order.id}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold block">Date</span>
                        <span className="text-xs text-[#232420]">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold block">Mode</span>
                        <span className="text-xs font-semibold text-[#16332A] flex items-center gap-1">
                          {order.deliveryMethod === 'delivery' ? <Truck className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
                          {order.deliveryMethod === 'delivery' ? 'Livraison' : 'Click & Collect'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      {order.status === 'en_preparation' && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          En préparation
                        </span>
                      )}
                      {order.status === 'prete_retrait' && (
                        <span className="bg-emerald-100 text-emerald-900 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Prête au retrait
                        </span>
                      )}
                      {order.status === 'livree' && (
                        <span className="bg-gray-100 text-gray-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 text-gray-600" />
                          Livrée
                        </span>
                      )}

                      <span className="font-mono-price text-base sm:text-lg font-bold text-[#16332A]">
                        {order.total.toFixed(2).replace('.', ',')} €
                      </span>

                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="py-1.5 px-2.5 rounded-xl bg-white border border-[#16332A]/20 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        {isExpanded ? 'Masquer' : 'Détails'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 space-y-4 animate-in fade-in">
                      <div className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover bg-gray-50 border border-gray-100"
                              />
                              <div>
                                <strong className="text-xs text-[#16332A] block line-clamp-1">{item.product.name}</strong>
                                <span className="text-[10px] sm:text-[11px] text-gray-500">
                                  {item.quantity} × {item.product.price.toFixed(2).replace('.', ',')} €
                                </span>
                              </div>
                            </div>
                            <span className="font-mono-price font-bold text-xs text-[#16332A] whitespace-nowrap">
                              {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">Créneau : {order.timeSlot}</span>
                        <button
                          onClick={() => handleReorder(order)}
                          className="py-2 px-3.5 rounded-xl bg-[#16332A] text-white text-xs font-bold hover:bg-[#234d40] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#C6A468]" />
                          <span>Recommander ces articles</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Mes Favoris */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#16332A] mb-4 sm:mb-6">
              Mes Produits Favoris ({wishlistProducts.length})
            </h2>

            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-[#E8E2D5] shadow-xs">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-fraunces text-lg sm:text-xl font-bold text-[#16332A]">
                  Aucun produit favori pour le moment
                </h3>
                <p className="text-xs text-[#232420]/60 max-w-md mx-auto mt-1 mb-4 sm:mb-6">
                  Cliquez sur l'icône cœur présente sur n'importe quel produit pour le retrouver facilement ici.
                </p>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-[#16332A] text-white text-xs font-bold hover:bg-[#234d40] transition-colors cursor-pointer"
                >
                  Découvrir le catalogue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-square overflow-hidden bg-[#FAF7F0] cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6B2E3B] text-white flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-fraunces font-bold text-xs sm:text-sm text-[#16332A] truncate mb-1">
                          {product.name}
                        </h4>
                        <span className="font-mono-price font-bold text-xs sm:text-sm text-[#16332A] block mb-2">
                          {product.price.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full py-1.5 sm:py-2 rounded-xl bg-[#16332A] text-white text-[11px] sm:text-xs font-bold hover:bg-[#234d40] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-[#C6A468]" />
                        <span>Ajouter au panier</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Mes Adresses & Paiements */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                <h3 className="font-fraunces text-base sm:text-lg font-bold text-[#16332A] flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A468]" />
                  <span>Adresses Enregistrées</span>
                </h3>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-[#16332A]">Domicile (Par défaut)</strong>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Actif
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Jean Dupont<br />
                  14 Avenue des Roses, Bâtiment B<br />
                  95190 Goussainville<br />
                  06 12 34 56 78
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                <h3 className="font-fraunces text-base sm:text-lg font-bold text-[#16332A] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A468]" />
                  <span>Cartes de Paiement</span>
                </h3>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-[#16332A]">Visa Infinite</strong>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Par défaut
                  </span>
                </div>
                <p className="text-gray-600 font-mono-price">
                  •••• •••• •••• 4242<br />
                  Expire : 12/28
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Fidélité & Bons */}
        {activeTab === 'loyalty' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#E8E2D5] shadow-xs max-w-3xl space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#C6A468]" />
              <div>
                <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#16332A]">
                  Programme Fidélité EXO ISLAND
                </h2>
                <p className="text-xs text-[#232420]/70 font-light">
                  Cumulez 1 point par euro d’achat en magasin ou en ligne.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#16332A] text-white space-y-3 sm:space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#A8BFAE]">Votre cagnotte :</span>
                <strong className="font-mono-price text-2xl sm:text-3xl text-[#C6A468]">340 points</strong>
              </div>

              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#C6A468] h-full rounded-full" style={{ width: '85%' }} />
              </div>

              <p className="text-xs text-[#E2EBE5] font-light">
                Plus que 60 points pour débloquer votre prochain bon d’achat de <strong>10 €</strong> !
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <strong className="text-xs font-bold text-[#16332A] block">Bon d’achat disponible : 15 €</strong>
                <span className="text-[11px] text-gray-500">Code promo à saisir : <strong className="font-mono-price text-[#6B2E3B]">BIENVENUE</strong></span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
                Prêt à l'emploi
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
