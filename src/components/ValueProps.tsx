import React from 'react';
import { Truck, ShoppingBag, Award, ShieldCheck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: Truck,
      title: 'Livraison à domicile',
      subtitle: 'Rapide et fiable',
      desc: 'Créneaux flexibles 6j/7',
    },
    {
      icon: ShoppingBag,
      title: 'Click & Collect',
      subtitle: 'Retirez en magasin',
      desc: 'Prêt en 2h chrono',
    },
    {
      icon: Award,
      title: 'Qualité premium',
      subtitle: 'Produits sélectionnés',
      desc: 'Frais garantis chaque matin',
    },
    {
      icon: ShieldCheck,
      title: 'Paiement sécurisé',
      subtitle: '100% sécurisé',
      desc: 'Cartes bancaires, Apple Pay',
    },
  ];

  return (
    <section aria-label="Engagements et services" className="w-full bg-[#F8F4EA] border-t border-[#16332A]/10 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((val, index) => {
            const Icon = val.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-[#16332A]/5 hover:bg-white hover:border-[#16332A]/15 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#16332A]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#232420]/75 font-medium mt-0.5">
                    {val.subtitle}
                  </p>
                  <p className="text-[11px] text-[#232420]/50 mt-0.5">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
