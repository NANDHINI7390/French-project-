import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';

interface CategoryNavProps {
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Catégories de produits" className="relative w-full bg-[#F8F4EA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        
        {/* Left Scroll Arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Défiler vers la gauche"
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white text-[#16332A] shadow-xs border border-gray-200 items-center justify-center hover:bg-[#16332A] hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Categories Scrollable Container (Matches Exact Design HTML structure) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar py-3 px-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                id={`category-btn-${category.id}`}
                onClick={() => onSelectCategory(isActive ? null : category.id)}
                className={`flex flex-col items-center space-y-1 min-w-[80px] flex-shrink-0 cursor-pointer transition-all duration-200 outline-none select-none ${
                  isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {/* Circular container */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all overflow-hidden p-0.5 ${
                    isActive
                      ? 'bg-[#A8BFAE] border-2 border-[#C6A468] shadow-sm'
                      : 'bg-gray-200 border border-gray-200'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Category label */}
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold text-center leading-tight transition-colors ${
                    isActive ? 'text-[#16332A]' : 'text-gray-600'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Défiler vers la droite"
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white text-[#16332A] shadow-xs border border-gray-200 items-center justify-center hover:bg-[#16332A] hover:text-white transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
