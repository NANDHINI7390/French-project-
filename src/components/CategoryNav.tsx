import React from 'react';
import { CATEGORIES } from '../data/storeData';

interface CategoryNavProps {
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory = 'fruits-legumes',
  onSelectCategory,
}) => {
  // Default to fruits-legumes if nothing is selected to match the screenshot
  const currentActive = activeCategory || 'fruits-legumes';

  return (
    <nav aria-label="Catégories de produits" className="w-full bg-[#FAF7F0] border-b border-[#E8E2D5] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Categories Horizontal Track */}
        <div className="flex items-start justify-between gap-3 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isActive = currentActive === category.id;
            return (
              <button
                key={category.id}
                id={`category-btn-${category.id}`}
                onClick={() => onSelectCategory(category.id)}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group transition-all select-none min-w-[72px] sm:min-w-[84px]"
              >
                {/* Circular image container with clean arched frame */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center overflow-hidden mb-2 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'ring-2 ring-[#C6A468] ring-offset-2 ring-offset-[#FAF7F0]' : ''
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
                  className={`text-xs sm:text-sm text-center leading-snug font-sans max-w-[88px] ${
                    isActive
                      ? 'font-bold text-[#16332A]'
                      : 'text-[#232420] font-medium group-hover:text-[#16332A]'
                  }`}
                >
                  {category.name}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <div className="w-full h-0.5 bg-[#16332A] mt-1.5 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

