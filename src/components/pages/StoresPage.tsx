import React, { useState } from 'react';
import { STORES } from '../../data/storeData';
import { StoreId } from '../../types';
import {
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Check,
  Navigation,
  Car,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
} from 'lucide-react';

interface StoresPageProps {
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
  onNavigateHome: () => void;
}

export const StoresPage: React.FC<StoresPageProps> = ({
  selectedStore,
  onSelectStore,
  onNavigateHome,
}) => {
  const [activeStoreTab, setActiveStoreTab] = useState<StoreId>(selectedStore);

  const activeStore = STORES.find((s) => s.id === activeStoreTab) || STORES[0];

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
          <span className="text-[#16332A] font-bold">Nos Supermarchés</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-[#16332A] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C6A468]/20 border border-[#C6A468]/30 px-3 py-1 rounded-full text-xs text-[#E7CF9B] font-bold tracking-wider uppercase mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#C6A468]" />
              <span>Île-de-France • Val d'Oise (95)</span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Nos Magasins & <span className="italic text-[#C6A468] font-normal">Services</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#A8BFAE] font-light leading-relaxed">
              Venez nous rendre visite à Goussainville et Sarcelles. Retrouvez des équipes passionnées, nos artisans bouchers et boulangers, ainsi que notre service Click & Collect express en 2h.
            </p>
          </div>
        </div>

        {/* Store Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {STORES.map((store) => {
            const isSelected = selectedStore === store.id;
            const isViewed = activeStoreTab === store.id;

            return (
              <div
                key={store.id}
                onClick={() => setActiveStoreTab(store.id)}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-xs ${
                  isViewed
                    ? 'border-[#16332A] ring-2 ring-[#16332A]/20 shadow-xl'
                    : 'border-[#E8E2D5] hover:border-[#16332A]/40'
                }`}
              >
                {/* Store Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-[#16332A]/10">
                  <img
                    src={store.image}
                    alt={`Supermarché EXO ISLAND ${store.name}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    {store.status} aujourd'hui
                  </span>

                  {isSelected && (
                    <span className="absolute top-4 right-4 bg-[#C6A468] text-[#16332A] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Votre magasin actif
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-fraunces text-2xl font-bold">
                      EXO ISLAND {store.name}
                    </h3>
                    <p className="text-xs text-white/80 font-light mt-0.5">
                      {store.address}, {store.postalCode} {store.city}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E8E2D5]">
                      <span className="text-[#232420]/60 block mb-1 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#16332A]" />
                        Horaires d'ouverture
                      </span>
                      <strong className="text-[#16332A] block font-mono-price">{store.hours}</strong>
                      <span className="text-[10px] text-[#232420]/50 block">7j/7 sans interruption</span>
                    </div>

                    <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E8E2D5]">
                      <span className="text-[#232420]/60 block mb-1 font-medium flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#16332A]" />
                        Téléphone direct
                      </span>
                      <strong className="text-[#16332A] block font-mono-price">{store.phone}</strong>
                      <span className="text-[10px] text-emerald-700 block">Accueil disponible</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStore(store.id);
                        setActiveStoreTab(store.id);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#16332A] text-white shadow-md'
                          : 'bg-[#FAF7F0] text-[#16332A] border border-[#16332A]/20 hover:bg-[#16332A] hover:text-white'
                      }`}
                    >
                      <Check className="w-4 h-4 text-[#C6A468]" />
                      <span>{isSelected ? 'Magasin sélectionné' : 'Choisir ce magasin'}</span>
                    </button>

                    <a
                      href={`https://maps.google.com/?q=EXO+ISLAND+${encodeURIComponent(store.address + ' ' + store.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[#FAF7F0] text-[#16332A] hover:bg-[#EFE6D5] border border-[#16332A]/15 transition-colors"
                      title="Itinéraire GPS"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Services of Viewed Store */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D5] shadow-xs mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <Sparkles className="w-5 h-5 text-[#C6A468]" />
            <h2 className="font-fraunces text-2xl font-bold text-[#16332A]">
              Services & Équipements disponibles à {activeStore.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Parking Gratuit 150 Places
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Accès facile pour vos grandes courses avec places réservées familles et bornes de recharge électrique.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Retrait Click & Collect 2h
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Commandez en ligne et retirez vos sacs prêts à l'accueil du magasin sans file d'attente.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Boucherie Halal & Tradition
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Découpes sur mesure par nos maîtres bouchers et conseils de préparation pour vos recettes.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Livraison Express à Domicile
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Livraison dans tout le Val d'Oise (95) et communes limitrophes dans le respect de la chaîne du froid.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Service Traiteur & Commandes Festives
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Plateaux de viandes, corbeilles de fruits exotiques et douceurs du monde pour vos réceptions.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-fraunces font-bold text-sm text-[#16332A] mb-1">
                  Fournée & Pains Chauds 7j/7
                </h4>
                <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                  Baguettes tradition et viennoiseries pur beurre cuites tout au long de la journée sur place.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
