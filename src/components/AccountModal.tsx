import React, { useState } from 'react';
import { X, User, Package, MapPin, Award, CreditCard, LogOut, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'loyalty'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
        <div className="inline-block w-full max-w-xl bg-[#F8F4EA] rounded-3xl overflow-hidden text-left shadow-2xl transform transition-all border border-[#16332A]/20 relative animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#16332A] text-[#F8F4EA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#C6A468] text-[#16332A] flex items-center justify-center font-bold font-fraunces text-lg">
                JD
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg sm:text-xl text-white">
                  Jean Dupont
                </h3>
                <span className="text-xs text-[#A8BFAE]">
                  Client Privilège • 340 points fidélité
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer le profil"
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#16332A]/10 bg-white px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-[#16332A] text-[#16332A]'
                  : 'border-transparent text-[#232420]/60 hover:text-[#16332A]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Mon Profil</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-[#16332A] text-[#16332A]'
                  : 'border-transparent text-[#232420]/60 hover:text-[#16332A]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Mes Commandes (2)</span>
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'loyalty'
                  ? 'border-[#16332A] text-[#16332A]'
                  : 'border-transparent text-[#232420]/60 hover:text-[#16332A]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Fidélité & Bons</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs text-[#232420]">
                <div className="p-4 bg-white rounded-2xl border border-[#16332A]/10 space-y-3">
                  <h4 className="font-bold text-sm text-[#16332A]">Informations personnelles</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[#232420]/50 block">Nom complet</span>
                      <strong className="text-sm">Jean Dupont</strong>
                    </div>
                    <div>
                      <span className="text-[#232420]/50 block">Email</span>
                      <strong className="text-sm">jean.dupont@email.fr</strong>
                    </div>
                    <div>
                      <span className="text-[#232420]/50 block">Téléphone</span>
                      <strong className="font-mono">06 12 34 56 78</strong>
                    </div>
                    <div>
                      <span className="text-[#232420]/50 block">Magasin préféré</span>
                      <strong>Goussainville (95190)</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#16332A]/10 space-y-2">
                  <h4 className="font-bold text-sm text-[#16332A]">Adresse de livraison par défaut</h4>
                  <p className="text-[#232420]/80">
                    12 Allée des Tilleuls, 95190 Goussainville
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-[#16332A]/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-[#16332A]">CMD-2026-8941</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Livrée le 14 Août
                    </span>
                  </div>
                  <p className="text-[#232420]/60">8 articles • Magasin Goussainville</p>
                  <div className="flex justify-between font-bold text-[#16332A] pt-2 border-t border-[#16332A]/5">
                    <span>Total payé</span>
                    <span className="font-mono">48,90 €</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#16332A]/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-[#16332A]">CMD-2026-7812</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Livrée le 2 Août
                    </span>
                  </div>
                  <p className="text-[#232420]/60">12 articles • Click & Collect Sarcelles</p>
                  <div className="flex justify-between font-bold text-[#16332A] pt-2 border-t border-[#16332A]/5">
                    <span>Total payé</span>
                    <span className="font-mono">67,40 €</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16332A] to-[#234d40] text-white space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-[#C6A468] font-bold">
                      Carte EXO CLUB Privilège
                    </span>
                    <Award className="w-5 h-5 text-[#C6A468]" />
                  </div>
                  <div className="font-fraunces text-3xl font-bold text-[#F8F4EA]">
                    340 <span className="text-base font-sans font-normal text-[#A8BFAE]">points</span>
                  </div>
                  <p className="text-xs text-[#F8F4EA]/80">
                    Plus que 60 points pour débloquer votre prochain bon d'achat de 10 € !
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#16332A]/10 space-y-2 text-xs">
                  <h4 className="font-bold text-[#16332A]">Vos bons d'achat disponibles :</h4>
                  <div className="p-3 rounded-xl bg-[#F8F4EA] border border-[#C6A468]/30 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#16332A]">-5 € sur les Produits Frais</div>
                      <div className="text-[10px] text-[#232420]/50">Code : FRAIS5 (Valable jusqu'au 31/08)</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#16332A] text-[#C6A468] font-bold text-[10px]">
                      Actif
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
