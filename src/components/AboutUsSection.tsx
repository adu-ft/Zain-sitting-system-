import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  FACTORY_ADDRESS,
  FACTORY_GSTIN,
  FACTORY_MOBILE_DISPLAY,
  FACTORY_MOBILE_RAW,
  IMG_DRV_CINEMA4_COGNAC,
  IMG_DRV_FACTORY_FLOOR,
  getWhatsAppUrl,
  storageImg,
} from '../data/catalog';

interface AboutUsSectionProps {
  onOpenCustomModal: () => void;
}

interface WorkshopSlide {
  id: string;
  shortLabel: string;
  headline: string;
  image: string;
  hasEmbeddedArtwork?: boolean;
}

export const WORKSHOP_SLIDES: WorkshopSlide[] = [
  {
    id: 'facility-overview',
    shortLabel: 'Facility Overview',
    headline: 'Facility',
    image: storageImg('uploads/WhatsApp_Image_2026-11-24_at_5.51.10_PM_b99fe8f3.jpeg'),
    hasEmbeddedArtwork: true,
  },
  {
    id: 'cutting-upholstery',
    shortLabel: 'Cutting & Tailoring',
    headline: 'Tailoring',
    image: storageImg('uploads/WhatsApp_Image_2026-11-24_at_5.56.42_PM_62674bca.jpeg'),
  },
  {
    id: 'frame-dispatch',
    shortLabel: 'Frame & Dispatch',
    headline: 'Finishing',
    image: storageImg('uploads/WhatsApp_Image_2026-11-24_at_5.56.13_PM_57c21926.jpeg'),
  },
  {
    id: 'quilting-cinema',
    shortLabel: 'Quilting & Foam',
    headline: 'Quilting',
    image: IMG_DRV_CINEMA4_COGNAC,
  },
  {
    id: 'ready-lineup',
    shortLabel: 'Ready Lineup',
    headline: 'Lineup',
    image: IMG_DRV_FACTORY_FLOOR,
  },
];

const WORKSHOP_HIGHLIGHTS = [
  { metric: '100% In-House', label: 'Frame to Upholstery' },
  { metric: '40 kg/m³ HR', label: 'Foam & Pocket Coils' },
  { metric: '25,000+ Cycles', label: 'Tested Mechanisms' },
  { metric: '5-Year', label: 'Frame & Motor Backing' },
];

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onOpenCustomModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    WORKSHOP_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (!visible) {
          setSlideIdx(0);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused) return;
    const timer = window.setTimeout(() => {
      setSlideIdx((prev) => (prev + 1) % WORKSHOP_SLIDES.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [isInView, isPaused, slideIdx]);

  const current = WORKSHOP_SLIDES[slideIdx];

  const handlePrev = () => {
    setSlideIdx((prev) => (prev - 1 + WORKSHOP_SLIDES.length) % WORKSHOP_SLIDES.length);
  };

  const handleNext = () => {
    setSlideIdx((prev) => (prev + 1) % WORKSHOP_SLIDES.length);
  };

  return (
    <section
      ref={sectionRef}
      id="about-us"
      aria-labelledby="about-us-heading"
      className="py-10 lg:py-14 bg-white border-t border-[#ECE6DF] w-full max-w-full overflow-x-clip scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Compact Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 lg:mb-6">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#E27A34] tracking-wide mb-1">
              About Us <span aria-hidden="true">·</span> Jasola Village, New Delhi
            </p>
            <h2
              id="about-us-heading"
              className="font-display text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#131F2D] leading-tight tracking-tight text-balance"
            >
              Inside Our Manufacturing Unit
            </h2>
            <p className="text-xs sm:text-sm text-[#515151] mt-1 max-w-xl">
              Built directly on our own workshop floor — zero middlemen, custom sizes and shades made to order.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCustomModal}
              className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#131F2D] hover:bg-[#E27A34] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Palette className="w-4 h-4 shrink-0" />
              <span>Custom Order</span>
            </button>

            <a
              href={getWhatsAppUrl(
                'Hello Zain Seating System, I would like to visit or enquire about your Jasola Village manufacturing unit.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF4ED] hover:bg-[#F3E7D8] border border-[#E5D7C6] text-[#131F2D] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#E27A34] shrink-0" />
              <span>WhatsApp Factory</span>
            </a>
          </div>
        </div>

        {/* Hero-Style Interactive Workshop Preview Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden rounded-xl bg-[#181310] aspect-[16/9] sm:aspect-[2/1] max-h-[540px] w-full flex items-end border border-[#ECE6DF]"
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={current.id}
              src={current.image}
              alt={`${current.headline} — Zain Seating System manufacturing unit`}
              referrerPolicy="no-referrer"
              decoding="async"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 w-full h-full ${
                current.hasEmbeddedArtwork
                  ? 'object-contain sm:object-cover object-center'
                  : 'object-cover object-center'
              }`}
            />
          </AnimatePresence>

          {/* Subtle Scrim + Concise Caption (Skipped on Slide 0 which already contains its own clean layout) */}
          {!current.hasEmbeddedArtwork && (
            <>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131F2D]/82 via-[#131F2D]/20 to-transparent"
                aria-hidden="true"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.id}-copy`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full px-5 pb-5 sm:px-8 sm:pb-7 lg:px-10 lg:pb-8 flex items-end justify-between gap-4"
                >
                  <div className="max-w-lg">
                    <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-sm">
                      {current.headline}
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-semibold text-white/80 tabular-nums shrink-0">
                    0{slideIdx + 1} / 0{WORKSHOP_SLIDES.length}
                  </span>
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* Prev / Next Arrows (Matching Hero Controls) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous workshop photo"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#131F2D] flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next workshop photo"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#131F2D] flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Desktop Pagination Dots */}
          <div className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-20 items-center gap-2">
            {WORKSHOP_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`View ${slide.shortLabel}`}
                onClick={() => setSlideIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === slideIdx
                    ? 'w-6 bg-[#E27A34]'
                    : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Clickable Workshop Stage Preview Strip */}
        <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
          {WORKSHOP_SLIDES.map((slide, idx) => {
            const isActive = idx === slideIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setSlideIdx(idx)}
                aria-pressed={isActive}
                className={`group relative rounded-lg overflow-hidden text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27A34] ${
                  isActive
                    ? 'ring-2 ring-[#E27A34] ring-offset-1'
                    : 'opacity-75 hover:opacity-100 border border-[#ECE6DF]'
                }`}
              >
                <div className="aspect-[16/10] w-full bg-[#FAF4ED] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.shortLabel}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="hidden sm:block px-2.5 py-1.5 bg-[#FAF4ED]">
                  <p
                    className={`text-[11px] font-semibold truncate ${
                      isActive ? 'text-[#E27A34]' : 'text-[#333333]'
                    }`}
                  >
                    {slide.shortLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Compact Single-Strip Proof & Factory Visit Bar */}
        <div className="mt-6 rounded-xl bg-[#FAF4ED] border border-[#EAE0D4] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x divide-[#E6DACB]">
            {WORKSHOP_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="px-4 py-3.5 sm:px-5 sm:py-4">
                <p className="font-display text-base sm:text-lg font-bold text-[#131F2D] tabular-nums leading-tight">
                  {item.metric}
                </p>
                <p className="text-[11px] sm:text-xs text-[#515151] mt-0.5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="px-4 sm:px-5 py-3 bg-[#F4ECE1]/70 border-t border-[#E6DACB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#515151]">
            <p className="flex items-start sm:items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E27A34] shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="font-semibold text-[#131F2D]">{FACTORY_ADDRESS}</strong>{' '}
                <span aria-hidden="true">·</span> Mon–Sun, 10 AM – 8 PM
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums shrink-0">
              <a
                href={`tel:${FACTORY_MOBILE_RAW}`}
                className="inline-flex items-center gap-1 font-semibold text-[#131F2D] hover:text-[#E27A34] transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#E27A34]" />
                <span>{FACTORY_MOBILE_DISPLAY}</span>
              </a>
              <span className="text-[#C8B9A6]" aria-hidden="true">·</span>
              <span className="whitespace-nowrap">
                GSTIN: <strong className="font-semibold text-[#131F2D]">{FACTORY_GSTIN}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
