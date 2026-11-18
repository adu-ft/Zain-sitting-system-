import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Factory,
  Layers,
  MessageCircle,
  Palette,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  BRAND_LOGO_COMPACT,
  DELIVERY_CITIES,
  POPULAR_SEARCHES,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from '../data/catalog';
import type { CategoryKey } from '../types';
import type { UtilityModalType } from './Header';

interface BuyingGuideAndFooterProps {
  onSelectCategory: (cat: CategoryKey) => void;
  onOpenUtilityModal: (modal: UtilityModalType) => void;
}

type MaterialLayerKey = 'upholstery' | 'foam' | 'hardware' | 'frame';

interface RawMaterialSpec {
  id: MaterialLayerKey;
  step: string;
  title: string;
  metric: string;
  body: string;
}

const RAW_MATERIALS: RawMaterialSpec[] = [
  {
    id: 'frame',
    step: '01 · Structural Skeleton',
    title: 'Seasoned Meranti & Teak Frames',
    metric: '8–10% Kiln Moisture · Zero Warping',
    body: 'Kiln-dried solid hardwood frames joined with bolted corner blocks prevent monsoon warping, creaking, or joint loosening under heavy daily loads.',
  },
  {
    id: 'foam',
    step: '02 · Core Cushioning',
    title: '40-Density HR Foam + Pocket Springs',
    metric: '40 kg/m³ HR Foam · Tempered Coils',
    body: 'Individually wrapped tempered pocket coils topped with plush 40-density high-resilience foam deliver responsive bounce without permanent sagging.',
  },
  {
    id: 'hardware',
    step: '03 · Motion Hardware',
    title: '24V Okin Actuators & Steel Levers',
    metric: '25,000+ Cycle Tested · Silent Glide',
    body: 'Whisper-quiet German-spec 24V motors for electric recliners & sofa beds, alongside powder-coated heavy steel linkages for manual lever chairs.',
  },
  {
    id: 'upholstery',
    step: '04 · Bespoke Outer Skin',
    title: 'Custom Leatherette, Bouclé & Velvet',
    metric: '50,000+ Rub Count · 20+ Custom Colors',
    body: 'High-abrasion upholstery fabrics, breathable micro-perforated leatherette, and spill-guard weaves tailored in any shade you pick.',
  },
];

const UPHOLSTERY_SWATCHES = [
  { name: 'Saddle Cognac Leatherette', hex: '#B66338', shadeDark: '#8D4926', spec: 'Breathable Pro Vegan Hide' },
  { name: 'Oatmeal Bouclé', hex: '#DFD4C3', shadeDark: '#BCAE98', spec: 'Heavyweight Loop Weave' },
  { name: 'Sage Matte Velvet', hex: '#5E7560', shadeDark: '#455847', spec: '380 GSM Spill-Guard' },
  { name: 'Charcoal Suede', hex: '#3D4249', shadeDark: '#272A2F', spec: 'Soft-Touch Molfino Suede' },
];

export const BuyingGuideAndFooter: React.FC<BuyingGuideAndFooterProps> = ({
  onSelectCategory,
  onOpenUtilityModal,
}) => {
  const [openAccordion, setOpenAccordion] = useState<'why' | 'about' | 'searches' | null>(
    'why'
  );
  const [activeLayer, setActiveLayer] = useState<MaterialLayerKey>('foam');
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);

  const toggleAccordion = (key: 'why' | 'about' | 'searches') => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const activeSwatch = UPHOLSTERY_SWATCHES[selectedSwatchIdx];
  const activeMaterial =
    RAW_MATERIALS.find((m) => m.id === activeLayer) ?? RAW_MATERIALS[1];

  return (
    <>
      {/* Dedicated Factory Quality & Raw Materials Visual Section (Hidden for now) */}
      <section
        id="materials"
        aria-hidden="true"
        className="hidden py-12 lg:py-16 bg-white border-b border-[#ECE6DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mb-8 lg:mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E27A34] mb-1.5">
              INSIDE OUR MANUFACTURING UNIT · QUALITY &amp; MATERIALS
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#333333] tracking-tight">
              See What Goes Inside Every Zain Seating Piece
            </h2>
            <p className="text-sm sm:text-base text-[#515151] leading-relaxed mt-2">
              Tap any layer below to inspect the kiln-seasoned timber frame, 40-density HR foam + pocket coil core, silent motion hardware, and custom upholstery skin built inside our unit.
            </p>
          </motion.div>

          {/* Interactive Exploded Seat & Chassis Cutaway Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-[#FAF4ED] border border-[#ECE2D5] p-5 sm:p-7 lg:p-9 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center"
          >
            {/* Visual Interactive Cross-Section Diagram */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-[#ECE2D5] p-4 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#515151]">
                    4-Layer Cutaway Blueprint
                  </span>
                  <span className="text-xs font-semibold text-[#E27A34]">
                    Tap layer to inspect
                  </span>
                </div>

                {/* Exploded Isometric-Style SVG Cross-Section */}
                <svg
                  viewBox="0 0 460 300"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Interactive 4-layer cutaway showing upholstery, 40-density HR foam and pocket springs, steel recliner mechanism, and hardwood frame"
                >
                  {/* Layer 4 (Top): Upholstery Cover */}
                  <motion.g
                    onClick={() => setActiveLayer('upholstery')}
                    animate={{ y: activeLayer === 'upholstery' ? -8 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="cursor-pointer"
                  >
                    <path
                      d="M70 52 Q230 30 390 52 L408 74 Q230 92 52 74 Z"
                      fill={activeSwatch.hex}
                      stroke={activeLayer === 'upholstery' ? '#131F2D' : activeSwatch.shadeDark}
                      strokeWidth={activeLayer === 'upholstery' ? '2.5' : '1.5'}
                    />
                    {/* Stitching seam highlight */}
                    <path
                      d="M90 56 Q230 40 370 56"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeOpacity="0.45"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <text
                      x="230"
                      y="71"
                      textAnchor="middle"
                      fill={selectedSwatchIdx === 1 ? '#131F2D' : '#FFFFFF'}
                      fontSize="11"
                      fontWeight="700"
                    >
                      04. Custom Upholstery Skin ({activeSwatch.name.split(' ')[0]})
                    </text>
                  </motion.g>

                  {/* Layer 3: 40-Density HR Foam + Pocket Springs */}
                  <motion.g
                    onClick={() => setActiveLayer('foam')}
                    animate={{ y: activeLayer === 'foam' ? -4 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="cursor-pointer"
                  >
                    <rect
                      x="58"
                      y="96"
                      width="344"
                      height="62"
                      rx="10"
                      fill={activeLayer === 'foam' ? '#FFF4E8' : '#F8EFE4'}
                      stroke={activeLayer === 'foam' ? '#E27A34' : '#D6C7B6'}
                      strokeWidth={activeLayer === 'foam' ? '2.5' : '1.5'}
                    />
                    {/* Top Plush HR Foam Band */}
                    <rect x="64" y="101" width="332" height="18" rx="6" fill="#F3D6B6" />
                    <text
                      x="230"
                      y="114"
                      textAnchor="middle"
                      fill="#5B3618"
                      fontSize="10"
                      fontWeight="700"
                    >
                      40-Density Super-Soft HR Foam Cushion
                    </text>
                    {/* Pocket Coil Springs Row */}
                    {[92, 138, 184, 230, 276, 322, 368].map((cx) => (
                      <g key={cx}>
                        <rect
                          x={cx - 16}
                          y="122"
                          width="32"
                          height="30"
                          rx="4"
                          fill="#FFFFFF"
                          stroke="#C8B8A6"
                          strokeWidth="1"
                        />
                        <path
                          d={`M${cx - 8} 127 L${cx + 8} 133 L${cx - 8} 139 L${cx + 8} 145 L${cx - 6} 149`}
                          fill="none"
                          stroke="#E27A34"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    ))}
                  </motion.g>

                  {/* Layer 2: Motion Hardware (Steel Scissor Linkage & 24V Actuator) */}
                  <motion.g
                    onClick={() => setActiveLayer('hardware')}
                    animate={{ y: activeLayer === 'hardware' ? -2 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="cursor-pointer"
                  >
                    <rect
                      x="74"
                      y="174"
                      width="312"
                      height="44"
                      rx="8"
                      fill={activeLayer === 'hardware' ? '#EBF1F6' : '#F2F4F7'}
                      stroke={activeLayer === 'hardware' ? '#131F2D' : '#CBD3DC'}
                      strokeWidth={activeLayer === 'hardware' ? '2.5' : '1.5'}
                    />
                    {/* Steel Scissor Arms + Motor Cylinder */}
                    <line x1="100" y1="208" x2="152" y2="184" stroke="#3B4A59" strokeWidth="4" strokeLinecap="round" />
                    <line x1="152" y1="208" x2="100" y2="184" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
                    <rect x="180" y="186" width="108" height="18" rx="4" fill="#131F2D" />
                    <rect x="288" y="191" width="56" height="8" rx="3" fill="#94A3B8" />
                    <circle cx="192" cy="195" r="3" fill="#E27A34" />
                    <text
                      x="234"
                      y="198"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8.5"
                      fontWeight="600"
                    >
                      24V ACTUATOR / LEVER
                    </text>
                  </motion.g>

                  {/* Layer 1 (Base): Seasoned Meranti & Teak Frame */}
                  <motion.g
                    onClick={() => setActiveLayer('frame')}
                    animate={{ y: activeLayer === 'frame' ? 2 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="cursor-pointer"
                  >
                    <rect
                      x="46"
                      y="232"
                      width="368"
                      height="32"
                      rx="6"
                      fill={activeLayer === 'frame' ? '#7E4521' : '#965A33'}
                      stroke={activeLayer === 'frame' ? '#131F2D' : '#6A3A1B'}
                      strokeWidth={activeLayer === 'frame' ? '2.5' : '1.5'}
                    />
                    {/* Solid Hardwood Legs */}
                    <rect x="66" y="264" width="18" height="22" rx="3" fill="#5D3217" />
                    <rect x="376" y="264" width="18" height="22" rx="3" fill="#5D3217" />
                    {/* Wood grain & dowel joinery marks */}
                    <circle cx="76" cy="248" r="3.5" fill="#DFB28C" />
                    <circle cx="384" cy="248" r="3.5" fill="#DFB28C" />
                    <text
                      x="230"
                      y="252"
                      textAnchor="middle"
                      fill="#FFF8F0"
                      fontSize="11"
                      fontWeight="700"
                    >
                      01. Kiln-Seasoned Meranti &amp; Solid Teak Frame
                    </text>
                  </motion.g>
                </svg>

                {/* Live Upholstery Swatch Switcher */}
                <div className="mt-4 pt-3.5 border-t border-[#F0EAE2] flex flex-wrap items-center justify-between gap-2.5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#78716A]">
                      Preview Skin Material
                    </p>
                    <p className="text-xs font-semibold text-[#333333]">
                      {activeSwatch.name} · <span className="font-normal text-[#515151]">{activeSwatch.spec}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {UPHOLSTERY_SWATCHES.map((sw, idx) => (
                      <button
                        key={sw.name}
                        type="button"
                        title={sw.name}
                        aria-label={`Preview ${sw.name}`}
                        onClick={() => {
                          setSelectedSwatchIdx(idx);
                          setActiveLayer('upholstery');
                        }}
                        className={`w-7 h-7 rounded-full border transition-transform cursor-pointer ${
                          selectedSwatchIdx === idx
                            ? 'ring-2 ring-offset-2 ring-[#131F2D] scale-105'
                            : 'border-black/15 hover:scale-105'
                        }`}
                        style={{ backgroundColor: sw.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Layer Inspection Detail + Selector Tabs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RAW_MATERIALS.map((mat) => {
                  const selected = activeLayer === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setActiveLayer(mat.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#131F2D] border-[#131F2D] text-white shadow-sm'
                          : 'bg-white border-[#E4D9CB] text-[#333333] hover:border-[#E27A34]'
                      }`}
                    >
                      <span
                        className={`block text-[10px] font-semibold uppercase tracking-wider ${
                          selected ? 'text-[#E27A34]' : 'text-[#78716A]'
                        }`}
                      >
                        {mat.step.split(' · ')[0]}
                      </span>
                      <span className="block text-xs font-semibold truncate mt-0.5">
                        {mat.id === 'frame'
                          ? 'Timber Frame'
                          : mat.id === 'foam'
                          ? 'Foam & Coils'
                          : mat.id === 'hardware'
                          ? 'Motor / Lever'
                          : 'Outer Fabric'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white rounded-xl border border-[#ECE2D5] p-5 sm:p-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E27A34]">
                  {activeMaterial.step}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#333333]">
                  {activeMaterial.title}
                </h3>
                <p className="text-xs font-semibold text-[#131F2D] tabular-nums">
                  {activeMaterial.metric}
                </p>
                <p className="text-sm text-[#515151] leading-relaxed">
                  {activeMaterial.body}
                </p>
                <div className="pt-2 border-t border-[#F2ECE4] flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#333333]">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF4F]" />
                    Built In-House (No Outsourcing)
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF4F]" />
                    5-Year Structural Warranty
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4 Visual Material Layer Cards with Custom Diagram Headers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {RAW_MATERIALS.map((mat, idx) => {
              const isSelected = activeLayer === mat.id;
              return (
                <motion.button
                  key={mat.step}
                  type="button"
                  onClick={() => setActiveLayer(mat.id)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className={`text-left rounded-xl border overflow-hidden transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FAF4ED] border-[#E27A34] shadow-sm'
                      : 'bg-[#FAFAFA] border-[#ECE6DF] hover:border-[#D6C7B6]'
                  }`}
                >
                  {/* Visual Diagram Header per Card */}
                  <div className="w-full h-28 bg-[#F4ECE1] border-b border-[#EAE0D3] flex items-center justify-center px-4">
                    {mat.id === 'frame' && (
                      <svg viewBox="0 0 180 80" className="w-40 h-20" fill="none">
                        <rect x="20" y="30" width="140" height="18" rx="3" fill="#8B502B" />
                        <rect x="26" y="16" width="16" height="46" rx="2" fill="#6A3A1B" />
                        <rect x="138" y="16" width="16" height="46" rx="2" fill="#6A3A1B" />
                        <circle cx="34" cy="39" r="3" fill="#E6C3A1" />
                        <circle cx="146" cy="39" r="3" fill="#E6C3A1" />
                        <text x="90" y="68" textAnchor="middle" fill="#5B3618" fontSize="9" fontWeight="700">
                          8–10% KILN MOISTURE
                        </text>
                      </svg>
                    )}
                    {mat.id === 'foam' && (
                      <svg viewBox="0 0 180 80" className="w-40 h-20" fill="none">
                        <rect x="22" y="14" width="136" height="18" rx="5" fill="#E27A34" fillOpacity="0.25" stroke="#E27A34" strokeWidth="1.5" />
                        {[42, 74, 106, 138].map((cx) => (
                          <path
                            key={cx}
                            d={`M${cx - 8} 36 L${cx + 8} 43 L${cx - 8} 50 L${cx + 8} 57`}
                            stroke="#131F2D"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                        <text x="90" y="72" textAnchor="middle" fill="#131F2D" fontSize="9" fontWeight="700">
                          40-DENSITY HR + COILS
                        </text>
                      </svg>
                    )}
                    {mat.id === 'hardware' && (
                      <svg viewBox="0 0 180 80" className="w-40 h-20" fill="none">
                        <line x1="34" y1="52" x2="72" y2="24" stroke="#131F2D" strokeWidth="4" strokeLinecap="round" />
                        <line x1="72" y1="52" x2="34" y2="24" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
                        <rect x="86" y="30" width="44" height="16" rx="4" fill="#131F2D" />
                        <rect x="130" y="35" width="24" height="6" rx="2" fill="#E27A34" />
                        <text x="90" y="70" textAnchor="middle" fill="#131F2D" fontSize="9" fontWeight="700">
                          25,000+ CYCLE STEEL
                        </text>
                      </svg>
                    )}
                    {mat.id === 'upholstery' && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center -space-x-2">
                          {UPHOLSTERY_SWATCHES.map((sw) => (
                            <span
                              key={sw.name}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-xs"
                              style={{ backgroundColor: sw.hex }}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#5B3618]">
                          20+ CUSTOM FACTORY SHADES
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E27A34] mb-1">
                      {mat.step}
                    </p>
                    <h3 className="font-display text-base font-semibold text-[#333333]">
                      {mat.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#131F2D] mt-1 tabular-nums">
                      {mat.metric}
                    </p>
                    <p className="text-xs sm:text-sm text-[#515151] leading-relaxed mt-2">
                      {mat.body}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Streamlined Expandable Factory Accordions */}
          <div className="border-t border-[#ECE6DF] divide-y divide-[#ECE6DF]">
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('why')}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-display text-lg font-semibold text-[#333333]">
                  Why Buy Direct from Zain Seating&apos;s Manufacturing Unit?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#515151] transition-transform ${
                    openAccordion === 'why' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'why' && (
                <div className="pb-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-5 rounded-xl bg-[#FAF4ED]">
                    <Factory className="w-5 h-5 text-[#E27A34] mb-2.5" />
                    <h4 className="font-semibold text-sm text-[#333333]">
                      Best Factory Price Point
                    </h4>
                    <p className="text-xs text-[#515151] mt-1 leading-relaxed">
                      Zero distributor markups—you pay transparent direct-from-workshop pricing.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#FAF4ED]">
                    <Palette className="w-5 h-5 text-[#E27A34] mb-2.5" />
                    <h4 className="font-semibold text-sm text-[#333333]">
                      Made-to-Order Customizing
                    </h4>
                    <p className="text-xs text-[#515151] mt-1 leading-relaxed">
                      Pick any color, fabric, wall dimension, or manual vs. motorized upgrade.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#FAF4ED]">
                    <Layers className="w-5 h-5 text-[#E27A34] mb-2.5" />
                    <h4 className="font-semibold text-sm text-[#333333]">
                      Certified Foam &amp; Springs
                    </h4>
                    <p className="text-xs text-[#515151] mt-1 leading-relaxed">
                      Consistent comfort across single recliners, full sofa sets, and electric sofa beds.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#FAF4ED]">
                    <ShieldCheck className="w-5 h-5 text-[#E27A34] mb-2.5" />
                    <h4 className="font-semibold text-sm text-[#333333]">
                      5-Year Frame &amp; Motor Backing
                    </h4>
                    <p className="text-xs text-[#515151] mt-1 leading-relaxed">
                      Spares, electrical actuators, and upholstery servicing handled by our own technicians.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('about')}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-display text-lg font-semibold text-[#333333]">
                  About Zain Seating System Manufacturing Unit
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#515151] transition-transform ${
                    openAccordion === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'about' && (
                <div className="pb-6 text-sm text-[#515151] leading-relaxed max-w-4xl space-y-2.5">
                  <p>
                    Zain Seating System is a dedicated seating manufacturer specializing in manual lever and motorized push-button recliner chairs, custom sofa sets, electrically forward-extending sofa-cum-beds, and modernist home chairs.
                  </p>
                  <p>
                    Every order is built to specification inside our workshop—giving homeowners and interior architects complete customizability over color, upholstery, and size at factory-direct prices.
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('searches')}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-display text-lg font-semibold text-[#333333]">
                  Popular Seating Searches
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#515151] transition-transform ${
                    openAccordion === 'searches' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'searches' && (
                <div className="pb-6 flex flex-wrap gap-2.5">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onSelectCategory(item.category)}
                      className="px-3.5 py-2 rounded-lg bg-[#FAF4ED] hover:bg-[#E27A34] hover:text-white text-xs font-medium text-[#333333] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Focused Footer */}
      <footer className="bg-[#F5F5F5] text-[#333333] pt-14 pb-10 border-t border-[#E6E0D8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E2DDD6]">
            {/* Brand & WhatsApp Contact Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-20 h-20 overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={BRAND_LOGO_COMPACT}
                    alt="ZSS — Zain Seating System"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain scale-[1.5] mix-blend-multiply"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-[#131F2D] block leading-none tracking-tight">
                    ZSS · ZAIN SEATING SYSTEM
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#515151] mt-1.5 block">
                    Direct Seating Manufacturing Unit
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#515151] leading-relaxed max-w-md mb-5">
                Custom manufacturing of Manual &amp; Motorized Recliners, Bespoke Sofa Sets, Electric Sofa Cum Beds, and Modernist Home Chairs — dispatched direct from our factory floor.
              </p>
              <div className="space-y-2.5 text-xs text-[#333333]">
                <a
                  href={getWhatsAppUrl(
                    'Hello Zain Seating System, I would like to discuss a custom recliner / sofa order.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#131F2D] hover:text-[#E27A34] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#E27A34]" />
                  <span>WhatsApp Direct: {WHATSAPP_DISPLAY}</span>
                </a>
                <p className="flex items-center gap-2 text-[#515151]">
                  <Phone className="w-3.5 h-3.5 text-[#E27A34]" />
                  <span>Call Desk: {WHATSAPP_DISPLAY} (Mon–Sun, 10 AM – 8 PM)</span>
                </p>
              </div>
            </div>

            {/* Seating Collections */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#131F2D] mb-4">
                Manufactured Lines
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#515151]">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Manual Recliners')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Manual Lever Recliners
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Motorized Recliners')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Motorized Push-Button Recliners
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Sofa Sets')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Custom Sofa Sets &amp; L-Shapes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Electric Sofa Beds')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Electric Forward-Extend Sofa Beds
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategory('Home Chairs')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Modernist Home Chairs
                  </button>
                </li>
              </ul>
            </div>

            {/* Custom Orders & Support */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#131F2D] mb-4">
                Factory Services
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#515151]">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenUtilityModal('custom')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Request Custom Color / Size
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenUtilityModal('track')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Track Factory Order
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenUtilityModal('help')}
                    className="hover:text-[#E27A34] cursor-pointer"
                  >
                    Factory Concierge &amp; Videos
                  </button>
                </li>
                {/* Hidden while #materials section is hidden */}
                <li className="hidden">
                  <a
                    href="#materials"
                    className="hover:text-[#E27A34] inline-block"
                  >
                    Raw Materials Specification
                  </a>
                </li>
              </ul>
            </div>

            {/* Delivery Network */}
            <div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#131F2D] mb-4">
                Pan-India Factory Dispatch
              </h4>
              <p className="text-xs text-[#515151] leading-relaxed">
                {DELIVERY_CITIES.join(' · ')}
              </p>
              <div className="mt-4 pt-4 border-t border-[#E2DDD6] text-xs text-[#515151] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#E27A34] shrink-0" />
                <span>25,000+ Cycle-Tested Mechanisms</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#515151]">
            <p>© 2026 Zain Seating System. All rights reserved.</p>
            <p>Direct Factory Manufacturing · WhatsApp {WHATSAPP_DISPLAY}</p>
          </div>
        </div>
      </footer>
    </>
  );
};
