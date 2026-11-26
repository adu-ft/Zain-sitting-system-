import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CATEGORY_TILES,
  IMG_HERO_LIVING,
  IMG_RECLINER_SOFA,
  IMG_SOFA_CUM_BED,
} from '../data/catalog';
import type { CategoryKey } from '../types';

interface HeroSlideData {
  id: string;
  topScript: string;
  mainTitle: string;
  categorySubline: string;
  startingLabel: string;
  targetCategory: CategoryKey;
  image: string;
}

const HERO_CAMPAIGNS: HeroSlideData[] = [
  {
    id: 'campaign-recliners',
    topScript: 'Factory Direct',
    mainTitle: 'RECLINERS',
    categorySubline: 'Manual Lever & Push-Button Motorized',
    startingLabel: 'Starting from ₹12,999',
    targetCategory: 'Motorized Recliners',
    image: IMG_RECLINER_SOFA,
  },
  {
    id: 'campaign-sofas',
    topScript: 'Made to Order',
    mainTitle: 'SOFA SETS',
    categorySubline: '100% Custom Colors, Fabrics & Sizes',
    startingLabel: 'Starting from ₹30,000',
    targetCategory: 'Sofa Sets',
    image: IMG_HERO_LIVING,
  },
  {
    id: 'campaign-electric-sofabed',
    topScript: 'Electric Glide',
    mainTitle: 'SOFA BEDS',
    categorySubline: 'Button-Operated Forward Extension',
    startingLabel: 'Starting from ₹49,500',
    targetCategory: 'Electric Sofa Beds',
    image: IMG_SOFA_CUM_BED,
  },
];

interface HeroAndPromoProps {
  onSelectCategory: (cat: CategoryKey) => void;
}

export const HeroAndPromo: React.FC<HeroAndPromoProps> = ({
  onSelectCategory,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    HERO_CAMPAIGNS.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_CAMPAIGNS.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  const current = HERO_CAMPAIGNS[slideIdx];

  return (
    <section id="top" className="bg-white w-full max-w-full overflow-x-clip">
      {/* Mobile-Only Top Horizontal Category Strip */}
      <div className="lg:hidden bg-white pt-2.5 pb-1 w-full max-w-full overflow-x-clip">
        <div className="flex items-start gap-3 overflow-x-auto overscroll-x-contain scrollbar-hide px-4 snap-x">
          {CATEGORY_TILES.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => onSelectCategory(tile.targetCategory)}
              className="snap-start shrink-0 w-[72px] flex flex-col items-center text-center group cursor-pointer focus:outline-none"
            >
              <div className="w-[68px] h-[68px] rounded-xl overflow-hidden bg-[#FAF4ED] border border-[#EFE6DA] shadow-2xs">
                <img
                  src={tile.image}
                  alt={tile.label}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className="w-full h-full object-cover group-active:scale-95 transition-transform"
                />
              </div>
              <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.03em] text-[#333333] leading-[1.2] line-clamp-2">
                {tile.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Hero Campaign Banner */}
      <div className="max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-10 pt-2 lg:pt-3 pb-2 lg:pb-3">
        <div className="relative overflow-hidden rounded-none sm:rounded-xl lg:rounded-lg bg-[#2A1D16] min-h-[260px] sm:min-h-[360px] lg:min-h-[460px] xl:min-h-[520px] flex items-center">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={current.id}
              src={current.image}
              alt={current.categorySubline}
              referrerPolicy="no-referrer"
              decoding="async"
              fetchPriority="high"
              onClick={() => onSelectCategory(current.targetCategory)}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 w-full h-full object-cover cursor-pointer ${
                current.id === 'campaign-recliners'
                  ? 'object-[center_58%]'
                  : 'object-center'
              }`}
            />
          </AnimatePresence>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#23140E]/58 via-[#23140E]/20 to-transparent"
            aria-hidden="true"
          />

          {/* Left Stacked Campaign Typography */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${current.id}-copy`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full sm:w-auto pl-5 pr-6 sm:pl-14 lg:pl-20 py-5 lg:py-7 flex flex-col items-start text-left max-w-[260px] sm:max-w-lg"
            >
              <p className="font-display text-sm sm:text-2xl lg:text-[26px] font-medium text-white tracking-tight leading-none drop-shadow-sm">
                {current.topScript}
              </p>
              <h1 className="font-display font-bold text-[30px] sm:text-5xl lg:text-[58px] text-white tracking-tight leading-[0.96] mt-1 drop-shadow-md">
                {current.mainTitle}
              </h1>
              <p className="font-display text-xs sm:text-lg lg:text-xl font-medium text-white/95 mt-1.5 sm:mt-2.5 tracking-tight">
                {current.categorySubline}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onSelectCategory(current.targetCategory)}
                className="mt-2.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-[4px] bg-[#741D25] hover:bg-[#8E252F] text-white font-display font-semibold text-xs sm:text-base tracking-tight tabular-nums shadow-lg transition-colors cursor-pointer"
              >
                {current.startingLabel}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Desktop/Tablet Slide Arrows & Internal Dots */}
          <button
            type="button"
            onClick={() =>
              setSlideIdx(
                (prev) => (prev - 1 + HERO_CAMPAIGNS.length) % HERO_CAMPAIGNS.length
              )
            }
            aria-label="Previous hero slide"
            className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-[#333333] items-center justify-center shadow transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setSlideIdx((prev) => (prev + 1) % HERO_CAMPAIGNS.length)}
            aria-label="Next hero slide"
            className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-[#333333] items-center justify-center shadow transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 items-center gap-2">
            {HERO_CAMPAIGNS.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`View slide ${idx + 1}`}
                onClick={() => setSlideIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === slideIdx
                    ? 'w-5 bg-[#E27A34]'
                    : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile External Pagination Dots */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 pt-2 pb-0.5">
          {HERO_CAMPAIGNS.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`View slide ${idx + 1}`}
              onClick={() => setSlideIdx(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === slideIdx ? 'w-5 bg-[#E27A34]' : 'w-2 bg-[#D9D1C7]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
