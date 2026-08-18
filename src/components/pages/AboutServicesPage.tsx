import React from 'react';
import {
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Globe2,
  HeartHandshake,
  Truck,
  Store,
  Check,
  ShoppingBag,
  Award,
} from 'lucide-react';

interface AboutServicesPageProps {
  onNavigateHome: () => void;
  onNavigateStores: () => void;
  onNavigateAllCategories: () => void;
}

export const AboutServicesPage: React.FC<AboutServicesPageProps> = ({
  onNavigateHome,
  onNavigateStores,
  onNavigateAllCategories,
}) => {
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
          <span className="text-[#16332A] font-bold">À Propos & Nos Services</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-[#16332A] text-white rounded-3xl p-6 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C6A468]/20 border border-[#C6A468]/30 px-3 py-1 rounded-full text-xs text-[#E7CF9B] font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A468]" />
              <span>L'Esprit EXO ISLAND</span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Le meilleur du frais et des <span className="italic text-[#C6A468] font-normal">saveurs du monde</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#A8BFAE] font-light leading-relaxed mb-6">
              Né d’une passion pour la gastronomie métissée et les produits authentiques, EXO ISLAND réunit chaque jour sous un même toit la fraîcheur des terroirs français et les richesses culinaires des cinq continents.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onNavigateAllCategories}
                className="py-3 px-6 rounded-xl bg-[#C6A468] hover:bg-[#d9b87b] text-[#16332A] text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explorer nos rayons</span>
              </button>
              <button
                onClick={onNavigateStores}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Visiter nos supermarchés</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#16332A] mb-2">
              Nos 4 Engagements Fondamentaux
            </h2>
            <p className="text-xs sm:text-sm text-[#232420]/70 font-light">
              Des valeurs fortes au service de votre table et de votre bien-être.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mb-4 shadow-inner">
                <ShieldCheck className="w-7 h-7 text-[#C6A468]" />
              </div>
              <h3 className="font-fraunces font-bold text-lg text-[#16332A] mb-2">
                Fraîcheur Quotidienne
              </h3>
              <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                Arrivages matinaux directs de Rungis et des coopératives agricoles pour une qualité sans compromis.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mb-4 shadow-inner">
                <Globe2 className="w-7 h-7 text-[#C6A468]" />
              </div>
              <h3 className="font-fraunces font-bold text-lg text-[#16332A] mb-2">
                Saveurs des 5 Continents
              </h3>
              <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                Une sélection inégalée de produits exotiques, épices rares et spécialités créoles, africaines et asiatiques.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mb-4 shadow-inner">
                <Award className="w-7 h-7 text-[#C6A468]" />
              </div>
              <h3 className="font-fraunces font-bold text-lg text-[#16332A] mb-2">
                Artisans sur Place
              </h3>
              <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                Maîtres bouchers et artisans boulangers préparent vos découpes et cuisent vos pains à longueur de journée.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mb-4 shadow-inner">
                <HeartHandshake className="w-7 h-7 text-[#C6A468]" />
              </div>
              <h3 className="font-fraunces font-bold text-lg text-[#16332A] mb-2">
                Prix Justes & Accessibles
              </h3>
              <p className="text-xs text-[#232420]/70 font-light leading-relaxed">
                Des promotions chaque semaine et un programme fidélité généreux pour préserver votre pouvoir d'achat.
              </p>
            </div>

          </div>
        </div>

        {/* Detailed Artisanal Services Breakdown */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-xs space-y-8">
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#16332A]">
            Nos Services Dédiés en Supermarché
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-fraunces font-bold text-lg text-[#16332A]">
                  Boucherie Artisanale & Découpe sur Mesure
                </h4>
              </div>
              <p className="text-xs text-[#232420]/80 leading-relaxed font-light">
                Nos artisans bouchers réalisent vos découpes personnalisées (rôtis, côte de bœuf, émincés marinés) selon vos besoins et vos recettes familiales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#16332A] text-[#C6A468] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="font-fraunces font-bold text-lg text-[#16332A]">
                  Click & Collect Express 2h & Livraison
                </h4>
              </div>
              <p className="text-xs text-[#232420]/80 leading-relaxed font-light">
                Faites vos courses en 3 clics sur notre site et récupérez votre commande prête et emballée à l'accueil du magasin ou directement livrée chez vous.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
