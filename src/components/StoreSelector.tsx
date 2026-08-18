import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { STORES } from '../data/storeData';
import { StoreId } from '../types';

interface StoreSelectorProps {
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  selectedStore,
  onSelectStore,
}) => {
  return (
    <section aria-label="Sélection du magasin" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
      {/* Title */}
      <div className="text-center mb-4 sm:mb-5">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="text-[#C6A468] text-lg sm:text-xl select-none">🌾</span>
          <h2 className="font-fraunces text-2xl sm:text-3xl text-[#16332A] font-bold tracking-wider uppercase">
            VOTRE MAGASIN
          </h2>
          <span className="text-[#C6A468] text-lg sm:text-xl select-none">🌾</span>
        </div>
      </div>

      {/* 2 Store Cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {STORES.slice(0, 2).map((store) => {
          const isSelected = selectedStore === store.id;
          return (
            <div
              key={store.id}
              onClick={() => onSelectStore(store.id)}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#16332A] text-white border-[#16332A] shadow-md'
                  : 'bg-white text-[#232420] border-[#E5DEC9] hover:border-[#16332A]/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#C6A468] text-[#16332A]'
                        : 'bg-[#16332A]/10 text-[#16332A]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-sans text-base sm:text-lg font-bold leading-snug ${isSelected ? 'text-white' : 'text-[#16332A]'}`}>
                      {store.name}
                    </h3>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#A8BFAE]' : 'text-[#73736C]'}`}>
                      {store.address}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className={`text-xs font-medium ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        Ouvert aujourd'hui • {store.hours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Store Thumbnail */}
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-black/5">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id={`select-store-${store.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStore(store.id);
                }}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2 ${
                  isSelected
                    ? 'bg-[#C6A468] text-[#16332A] hover:bg-[#d9b87b]'
                    : 'bg-[#16332A] text-white hover:bg-[#234d40]'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Magasin actif</span>
                  </>
                ) : (
                  <span>Choisir ce magasin</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};


