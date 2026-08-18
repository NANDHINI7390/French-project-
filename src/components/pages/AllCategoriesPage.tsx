import React, { useState } from 'react';
import { CATEGORIES } from '../../data/storeData';
import { ArrowRight, ChevronRight, Sparkles, Search, Layers } from 'lucide-react';

interface AllCategoriesPageProps {
  onSelectCategory: (categorySlug: string) => void;
  onNavigateHome: () => void;
}

export const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({
  onSelectCategory,
  onNavigateHome,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#232420]/60 mb-4 sm:mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[#16332A] font-bold">Tous nos rayons</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-[#16332A] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#C6A468]/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#C6A468]/20 border border-[#C6A468]/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-[#E7CF9B] font-bold tracking-wider uppercase mb-2 sm:mb-3">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C6A468]" />
              <span>Supermarché & Produits Frais</span>
            </div>

            <h1 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              Tous nos <span className="italic text-[#C6A468] font-normal">rayons</span>
            </h1>

            <p className="text-[11px] sm:text-xs md:text-sm text-[#A8BFAE] font-light leading-relaxed mb-4 sm:mb-6">
              Explorez l’ensemble de notre catalogue : fruits et légumes du jour, boucherie artisanale, produits frais, épicerie du terroir et du monde entier.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filtrer un rayon (Fruits, Viandes, Bio...)"
                className="w-full pl-3 sm:pl-4 pr-9 sm:pr-10 py-2 sm:py-2.5 rounded-xl bg-white text-[#232420] text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A468] shadow-md"
              />
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Categories Count Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A468]" />
            <h2 className="font-fraunces text-lg sm:text-2xl text-[#16332A] font-bold">
              {filteredCategories.length} Rayons disponibles
            </h2>
          </div>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 sm:aspect-4/3 overflow-hidden bg-[#16332A]/5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-[#16332A]/85 backdrop-blur-xs text-white text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10">
                  {category.itemCount} prod.
                </span>
              </div>

              {/* Text Info */}
              <div className="p-3 sm:p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-fraunces text-xs sm:text-base md:text-lg font-bold text-[#16332A] group-hover:text-[#6B2E3B] transition-colors leading-snug line-clamp-1">
                    {category.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-[#232420]/60 font-light mt-0.5 hidden sm:block">
                    Arrivages quotidiens
                  </span>
                </div>

                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F0] text-[#16332A] group-hover:bg-[#16332A] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
