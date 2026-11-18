import React from 'react';
import { MessageCircle, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  IMG_SHOWROOM_NIGHT,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from '../data/catalog';

interface ShowroomBannerProps {
  onOpenCustomModal: () => void;
}

export const ShowroomBanner: React.FC<ShowroomBannerProps> = ({
  onOpenCustomModal,
}) => {
  return (
    <section className="py-5 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-xl overflow-hidden bg-[#131F2D] text-white min-h-[155px] sm:min-h-[175px] flex items-center"
        >
          <img
            src={IMG_SHOWROOM_NIGHT}
            alt="Zain Seating System custom seating production showcase"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#131F2D]/95 via-[#131F2D]/85 to-[#131F2D]/50"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full p-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E27A34] mb-1">
                ZAIN SEATING SYSTEM · OWN MANUFACTURING UNIT
              </p>
              <h2 className="font-display text-lg sm:text-2xl font-semibold leading-snug tracking-tight text-white">
                Custom Colors, Fabrics &amp; Sizes — Built Directly in Our Factory
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF4ED]/80 leading-relaxed mt-1">
                Need exact wall dimensions, custom leatherette/bouclé shade, or a multi-seat recliner row? Connect directly with our workshop.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={getWhatsAppUrl(
                  'Hello Zain Seating System, I would like to customize a sofa set / recliner directly from your manufacturing unit.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Factory ({WHATSAPP_DISPLAY})
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onOpenCustomModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/12 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <Palette className="w-4 h-4" />
                Submit Custom Spec
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
