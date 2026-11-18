import React from 'react';
import { motion } from 'motion/react';
import { CATEGORY_TILES } from '../data/catalog';
import type { CategoryKey } from '../types';

interface CategoryExplorerProps {
  onSelectCategory: (cat: CategoryKey) => void;
}

/* Crisp 5-column non-repetitive category showcase on desktop (mobile uses the top horizontal strip above Hero) */
export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="hidden lg:block py-8 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-between mb-5"
        >
          <h2 className="font-display text-xl font-semibold text-[#333333] tracking-tight">
            Manufactured Factory Lines
          </h2>
          <p className="text-xs text-[#515151]">
            Filter catalog by seating line &amp; mechanism
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORY_TILES.map((tile, idx) => (
            <motion.button
              key={tile.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectCategory(tile.targetCategory)}
              className="group text-center focus:outline-none cursor-pointer"
            >
              <div className="aspect-[5/4] w-full overflow-hidden rounded-lg bg-[#FAF4ED]">
                <img
                  src={tile.image}
                  alt={tile.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="mt-2.5 text-xs sm:text-[13px] font-medium tracking-[0.06em] uppercase text-[#333333] group-hover:text-[#E27A34] transition-colors">
                {tile.label}
              </p>
              <p className="text-[11px] text-[#78716A] mt-0.5">{tile.sublabel}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
