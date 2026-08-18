import React from 'react';
import { X, MapPin, Phone, Clock, Check, Navigation, Car, ShoppingBag } from 'lucide-react';
import { STORES } from '../data/storeData';
import { StoreId } from '../types';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStore: StoreId;
  onSelectStore: (storeId: StoreId) => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  isOpen,
  onClose,
  selectedStore,
  onSelectStore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
        <div className="inline-block w-full max-w-3xl bg-[#F8F4EA] rounded-3xl overflow-hidden text-left shadow-2xl transform transition-all border border-[#16332A]/20 relative animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#16332A] text-[#F8F4EA] flex items-center justify-between">
            <div>
              <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-white">
                Nos Supermarchés EXO ISLAND
              </h3>
              <p className="text-xs text-[#A8BFAE] mt-0.5">
                Sélectionnez votre magasin de rattachement en Île-de-France
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer la liste des magasins"
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store List */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STORES.map((store) => {
                const isSelected = selectedStore === store.id;
                return (
                  <div
                    key={store.id}
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                      isSelected
                        ? 'border-[#16332A] ring-2 ring-[#C6A468] shadow-lg bg-white'
                        : 'border-[#16332A]/15 bg-white/70 hover:bg-white hover:border-[#16332A]/30'
                    }`}
                  >
                    {/* Store Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <span className="font-fraunces font-bold text-lg">{store.name}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C6A468] text-[#16332A] text-[10px] font-bold uppercase tracking-wider">
                            Actif
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Store Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2 text-xs text-[#232420]/80">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#16332A] flex-shrink-0 mt-0.5" />
                          <span>
                            {store.address}, {store.postalCode} {store.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#16332A] flex-shrink-0" />
                          <span>{store.status} • Du lundi au samedi {store.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#16332A] flex-shrink-0" />
                          <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="font-mono hover:underline">
                            {store.phone}
                          </a>
                        </div>
                      </div>

                      {/* Services badges */}
                      <div className="pt-2 border-t border-[#16332A]/10 flex items-center gap-2 text-[10px] text-[#16332A]">
                        <span className="px-2 py-0.5 rounded bg-[#F8F4EA] font-semibold">Boucherie Halal</span>
                        <span className="px-2 py-0.5 rounded bg-[#F8F4EA] font-semibold">Poissonnerie</span>
                        <span className="px-2 py-0.5 rounded bg-[#F8F4EA] font-semibold">Parking gratuit</span>
                      </div>

                      {/* Select Button */}
                      <button
                        onClick={() => {
                          onSelectStore(store.id);
                          onClose();
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-[#16332A] text-[#F8F4EA]'
                            : 'bg-[#F8F4EA] text-[#16332A] hover:bg-[#16332A] hover:text-[#F8F4EA]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 text-[#C6A468]" />
                            <span>Magasin actuellement sélectionné</span>
                          </>
                        ) : (
                          <span>Choisir ce magasin</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
