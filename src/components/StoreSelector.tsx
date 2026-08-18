import React from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { STORES } from '../data/storeData';
import { StoreId } from '../types';

interface StoreSelectorProps {
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
  onOpenStoreModal?: () => void;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  selectedStore,
  onSelectStore,
}) => {
  return (
    <section aria-label="Sélection du magasin" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Editorial Title with Champagne Wheat flourishes */}
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="text-[#C6A468] text-base sm:text-lg select-none">🌾</span>
          <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl text-[#16332A] font-medium tracking-tight">
            Choisissez votre magasin
          </h2>
          <span className="text-[#C6A468] text-base sm:text-lg select-none">🌾</span>
        </div>
        <p className="text-xs sm:text-sm text-[#232420]/60 mt-1 font-sans">
          Sélectionnez votre magasin pour voir les disponibilités en temps réel et préparer votre retrait
        </p>
      </div>

      {/* Segmented Store Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {STORES.map((store) => {
          const isSelected = selectedStore === store.id;
          return (
            <button
              key={store.id}
              id={`store-card-btn-${store.id}`}
              onClick={() => onSelectStore(store.id)}
              className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer text-left border ${
                isSelected
                  ? 'bg-[#16332A] text-[#F8F4EA] border-[#16332A] shadow-xl ring-2 ring-[#C6A468]/50 transform sm:-translate-y-0.5'
                  : 'bg-white/80 hover:bg-white text-[#232420] border-[#16332A]/15 hover:border-[#16332A]/30 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Map Pin Icon Badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#234d40] text-[#C6A468]'
                      : 'bg-[#F8F4EA] text-[#16332A] group-hover:bg-[#16332A] group-hover:text-[#C6A468]'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-fraunces text-lg sm:text-xl font-bold ${isSelected ? 'text-white' : 'text-[#16332A]'}`}>
                      {store.name}
                    </h3>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C6A468] text-[#16332A]">
                        <CheckCircle2 className="w-3 h-3" /> Sélectionné
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className={isSelected ? 'text-[#A8BFAE]' : 'text-[#232420]/70'}>
                      {store.status} • {store.hours}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${isSelected ? 'text-[#F8F4EA]/70' : 'text-[#232420]/50'}`}>
                    {store.address}, {store.postalCode} {store.city}
                  </p>
                </div>
              </div>

              {/* Right Store Building Preview Thumbnail */}
              <div className="hidden sm:block flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-white/20 shadow-inner ml-3">
                <img
                  src={store.image}
                  alt={`Magasin EXO ISLAND ${store.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
