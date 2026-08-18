import React from 'react';
import { Truck, ShoppingBag, Award, ShieldCheck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: Truck,
      title: 'Livraison à domicile',
      subtitle: 'Rapide et fiable',
    },
    {
      icon: ShoppingBag,
      title: 'Click & Collect',
      subtitle: 'Retirez en magasin',
    },
    {
      icon: Award,
      title: 'Qualité premium',
      subtitle: 'Produits sélectionnés',
    },
    {
      icon: ShieldCheck,
      title: 'Paiement sécurisé',
      subtitle: '100% sécurisé',
    },
  ];

  return (
    <section aria-label="Engagements et services" className="w-full bg-[#FAF7F0] border-t border-[#E8E2D5] py-8 sm:py-10 my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DDCF]">
          {values.map((val, index) => {
            const Icon = val.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 ${index > 0 ? 'sm:pl-6' : ''} pt-3 sm:pt-0`}
              >
                <div className="w-10 h-10 rounded-full bg-[#16332A] text-[#C6A468] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#16332A] leading-tight">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#787870] mt-0.5">
                    {val.subtitle}
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

