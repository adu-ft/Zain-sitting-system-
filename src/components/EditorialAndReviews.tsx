import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  CUSTOMER_STORIES,
  FACTORY_ADDRESS,
  IMG_RECLINE_95,
  IMG_RECLINE_130,
  IMG_RECLINE_160,
  IMG_SOFABED_VIDEO_POSTER,
} from '../data/catalog';
import type { CategoryKey, CustomerStory, Product } from '../types';

interface EditorialAndReviewsProps {
  products: Product[];
  onSelectCategory: (cat: CategoryKey) => void;
  onOpenQuickView: (product: Product) => void;
}

export const EditorialAndReviews: React.FC<EditorialAndReviewsProps> = ({
  products,
  onSelectCategory,
  onOpenQuickView,
}) => {
  const [mechanismTab, setMechanismTab] = useState<'manual' | 'motorized'>('motorized');
  const [reclineAngle, setReclineAngle] = useState<0 | 1 | 2>(0);
  const [stories, setStories] = useState<CustomerStory[]>(CUSTOMER_STORIES);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revProductId, setRevProductId] = useState(products[0]?.id ?? '');
  const [revQuote, setRevQuote] = useState('');
  const [revUploadedPhoto, setRevUploadedPhoto] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});
  const [lightboxData, setLightboxData] = useState<{
    photo: string;
    story: CustomerStory;
  } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setRevUploadedPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenProduct =
      products.find((p) => p.id === revProductId) ?? products[0];
    if (!revName.trim() || !revQuote.trim() || !chosenProduct) return;

    const cleanName = revName.trim();
    const chosenPhoto = revUploadedPhoto || chosenProduct.image;
    const newStory: CustomerStory = {
      id: `rev-${Date.now()}`,
      customerName: cleanName,
      city: revCity.trim() || 'India',
      rating: revRating,
      date: 'Just now',
      quote: revQuote.trim(),
      productId: chosenProduct.id,
      productName: chosenProduct.name,
      categoryTag: chosenProduct.category.replace(/s$/, ''),
      image: chosenPhoto,
      photos: [chosenPhoto],
      avatarInitials: cleanName.charAt(0).toUpperCase(),
      avatarBg: '#E27A34',
      factoryReply:
        'Thank you for sharing your review with Zain Seating System 🙏 We truly appreciate your support!',
      factoryReplyDate: 'Just now',
    };
    setStories((prev) => [newStory, ...prev]);
    setActiveFilter('All');
    setRevName('');
    setRevCity('');
    setRevRating(5);
    setRevQuote('');
    setRevUploadedPhoto(null);
    setIsReviewFormOpen(false);
  };

  const handleInspectReviewedProduct = (productId: string) => {
    const match = products.find((p) => p.id === productId);
    if (match) {
      onOpenQuickView(match);
    }
  };

  const filterTabs = useMemo(() => {
    const photosCount = stories.filter((s) => (s.photos?.length ?? 0) > 0).length;
    return [
      { key: 'All', label: `All Reviews (${240 + stories.length})` },
      { key: 'Recliners', label: 'Recliners' },
      { key: 'Sofas', label: 'Custom Sofa Sets' },
      { key: 'SofaBed', label: 'Electric Sofa Beds' },
      { key: 'Chairs', label: 'Home Chairs' },
      { key: 'Photos', label: `Customer Photos (${38 + photosCount})` },
    ];
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (activeFilter === 'All') return stories;
    if (activeFilter === 'Photos') {
      return stories.filter((s) => (s.photos?.length ?? 0) > 0);
    }
    if (activeFilter === 'Recliners') {
      return stories.filter((s) => s.categoryTag.toLowerCase().includes('recliner'));
    }
    if (activeFilter === 'Sofas') {
      return stories.filter((s) => s.categoryTag.toLowerCase().includes('l-shape') || s.categoryTag.toLowerCase().includes('sofa set'));
    }
    if (activeFilter === 'SofaBed') {
      return stories.filter((s) => s.categoryTag.toLowerCase().includes('bed'));
    }
    if (activeFilter === 'Chairs') {
      return stories.filter((s) => s.categoryTag.toLowerCase().includes('chair'));
    }
    return stories;
  }, [stories, activeFilter]);

  const scrollReviews = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === 'right' ? 350 : -350,
      behavior: 'smooth',
    });
  };

  const reclineLabels = ['90° Upright', '130° Lounge', '160° Full Recline'];
  const reclineShortLabels = ['90° Upright', '130° Lounge', '160° Full'];
  const reclineImages = [IMG_RECLINE_95, IMG_RECLINE_130, IMG_RECLINE_160];
  const backTiltDegrees = [-6, -24, -44];
  const footrestAngles = [82, 32, 6];

  useEffect(() => {
    reclineImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      {/* Interactive Mechanism Showcase (How It Works) */}
      <section
        id="mechanisms"
        className="py-8 lg:py-12 bg-[#FAFAFA] border-y-2 border-[#E6DCD0] w-full max-w-full overflow-x-clip"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 lg:space-y-10">
          {/* Bold Section Separator Header — Clearly Distinguishes How It Works from Product Sections */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b-2 border-[#E27A34]/30">
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-[#131F2D] text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                How It Works
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131F2D] tracking-tight mt-2">
                How Zain Motion Mechanisms Work
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#515151] font-medium">
              Tap any angle or glide step below to see real hardware in action.
            </p>
          </div>
          {/* Split 1: Unified Recliner Visualizer + Attached Control Dock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            {/* Mobile-Only Recliner Section Heading Above Visual */}
            <div className="lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E27A34] mb-1.5">
                TWO RECLINER MECHANISMS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#333333] leading-tight">
                Manual Side-Lever or Electric Push-Button Recline
              </h2>
            </div>

            <div className="lg:col-span-6 min-w-0 rounded-2xl overflow-hidden bg-white border border-[#E2D8CD] shadow-sm">
              {/* Stacked Crossfade-Blended Recliner Degree Photos */}
              <div className="aspect-[16/10] bg-[#FAF4ED] relative overflow-hidden">
                {reclineImages.map((src, idx) => {
                  const isActive = reclineAngle === idx;
                  return (
                    <img
                      key={src}
                      src={src}
                      alt={`Zain Recliner shown at ${reclineLabels[idx]} position`}
                      referrerPolicy="no-referrer"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Flush Attached Recliner Control Dock */}
              <div className="p-3.5 sm:p-4 bg-[#FAF4ED]/65 border-t border-[#EAE0D4]">
                {/* Live Motion SVG + Degree Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Minimal Animated Side-Profile Chair SVG */}
                    <div className="w-20 h-16 rounded-lg bg-white border border-[#EAE0D4] flex items-center justify-center relative overflow-hidden shrink-0">
                      <svg viewBox="0 0 120 90" className="w-18 h-14" fill="none">
                        <line
                          x1="28"
                          y1="74"
                          x2="86"
                          y2="74"
                          stroke="#131F2D"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <rect
                          x="38"
                          y="52"
                          width="38"
                          height="12"
                          rx="4"
                          fill="#E27A34"
                        />
                        <motion.g
                          animate={{ rotate: backTiltDegrees[reclineAngle] }}
                          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                          style={{ originX: '40px', originY: '58px' }}
                        >
                          <rect
                            x="30"
                            y="18"
                            width="12"
                            height="40"
                            rx="5"
                            fill="#131F2D"
                          />
                        </motion.g>
                        <motion.g
                          animate={{ rotate: footrestAngles[reclineAngle] }}
                          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                          style={{ originX: '76px', originY: '58px' }}
                        >
                          <rect
                            x="76"
                            y="52"
                            width="26"
                            height="9"
                            rx="3"
                            fill="#9C582B"
                          />
                        </motion.g>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#E27A34]">
                        {mechanismTab === 'motorized'
                          ? 'Push-Button Electric Glide'
                          : 'Side-Lever Mechanical Action'}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#131F2D] tabular-nums">
                        {reclineLabels[reclineAngle]}
                      </p>
                      <p className="text-[11px] text-[#515151]">
                        Tap a recline angle to preview posture
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-end">
                    {([0, 1, 2] as const).map((step) => {
                      const isActive = reclineAngle === step;
                      return (
                        <button
                          key={step}
                          type="button"
                          onClick={() => setReclineAngle(step)}
                          aria-pressed={isActive}
                          className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer tabular-nums ${
                            isActive
                              ? 'bg-[#E27A34] text-white shadow-xs'
                              : 'bg-white text-[#515151] hover:bg-[#F2E6D8] hover:text-[#131F2D] border border-[#E2D8CD]'
                          }`}
                        >
                          {reclineShortLabels[step]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 min-w-0 flex flex-col justify-center">
              <p className="hidden lg:block text-xs font-semibold uppercase tracking-[0.18em] text-[#E27A34] mb-2">
                TWO RECLINER MECHANISMS
              </p>
              <h2 className="hidden lg:block font-display text-2xl sm:text-3xl font-semibold text-[#333333] leading-tight">
                Manual Side-Lever or Electric Push-Button Recline
              </h2>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0 lg:mt-5 p-1 bg-[#EFE8DF] rounded-lg w-full sm:w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setMechanismTab('motorized');
                    setReclineAngle(0);
                  }}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mechanismTab === 'motorized'
                      ? 'bg-white text-[#131F2D] shadow-xs'
                      : 'text-[#515151] hover:text-[#333333]'
                  }`}
                >
                  Motorized Button
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMechanismTab('manual');
                    setReclineAngle(0);
                  }}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mechanismTab === 'manual'
                      ? 'bg-white text-[#131F2D] shadow-xs'
                      : 'text-[#515151] hover:text-[#333333]'
                  }`}
                >
                  Manual Lever
                </button>
              </div>

              {mechanismTab === 'motorized' ? (
                <div className="mt-4 space-y-2.5 text-sm text-[#515151] leading-relaxed">
                  <p>
                    <strong className="text-[#333333]">Button-Operated Electric Glide:</strong>{' '}
                    Press the sleek side control buttons to smoothly glide to any angle between 90° upright viewing and 160° zero-gravity lounging.
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-[#E27A34]">
                    <li>
                      Whisper-quiet 24V Okin actuator motor with integrated USB charging port
                    </li>
                    <li>
                      Available in 1-Seater Lounge, 2-Seater Love Seat, or Cinema Rows
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectCategory('Motorized Recliners')}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#333333] border-b-2 border-[#E27A34] pb-1 hover:text-[#E27A34] transition-colors cursor-pointer"
                    >
                      Explore Motorized Recliners
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2.5 text-sm text-[#515151] leading-relaxed">
                  <p>
                    <strong className="text-[#333333]">Precision Side-Lever Operation:</strong>{' '}
                    Pull the discreet side lever to instantly release the footrest and lean back smoothly using balanced bodyweight mechanics—zero wall plug needed.
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-[#E27A34]">
                    <li>
                      Heavy-gauge powder-coated steel linkage tested for 25,000+ cycles
                    </li>
                    <li>
                      Place anywhere in bedrooms or living corners without trailing cords
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectCategory('Manual Recliners')}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#333333] border-b-2 border-[#E27A34] pb-1 hover:text-[#E27A34] transition-colors cursor-pointer"
                    >
                      Explore Manual Lever Recliners
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Split 2: Real Factory Video Demonstration of Electric Sofa-to-Sleeper Bed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center pt-6 border-t border-[#ECE6DF]">
            {/* Mobile-Only Sofa Cum Bed Heading Above Video */}
            <div className="lg:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E27A34] mb-1">
                ELECTRIC SOFA CUM BED · LIVE DEMO
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#333333] leading-tight">
                One-Touch Sofa to Sleeper Bed
              </h2>
              <p className="text-xs sm:text-sm text-[#515151] mt-1">
                Watch our motorized sofa-cum-bed glide effortlessly from an upright sofa into a deep sleeper bed with a single remote press.
              </p>
            </div>

            <div className="lg:col-span-5 min-w-0 order-2 lg:order-1 flex flex-col justify-center space-y-4">
              <div className="hidden lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E27A34] mb-1">
                  ELECTRIC SOFA CUM BED · LIVE DEMO
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#333333] leading-tight">
                  One-Touch Sofa to Sleeper Bed
                </h2>
                <p className="text-xs sm:text-sm text-[#515151] mt-1.5 leading-relaxed">
                  Watch our motorized sofa-cum-bed glide effortlessly from an upright sofa into a deep sleeper bed with a single remote press.
                </p>
              </div>

              {/* Clean Text-Only 3-Step Mechanism Breakdown */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#ECE6DF] space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#E27A34] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    1
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#131F2D]">
                      Press Remote Button
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-[#515151] mt-0.5 leading-snug">
                      Handheld electric remote activates dual silent motors — no manual lifting or pulling.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2.5 border-t border-[#F3EDE5]">
                  <span className="w-6 h-6 rounded-md bg-[#131F2D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    2
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#131F2D]">
                      Smooth Forward Steel Glide
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-[#515151] mt-0.5 leading-snug">
                      The tufted seat deck extends forward evenly on heavy-gauge steel tracks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2.5 border-t border-[#F3EDE5]">
                  <span className="w-6 h-6 rounded-md bg-[#131F2D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    3
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#131F2D]">
                      Full Sleeper Bed Support
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-[#515151] mt-0.5 leading-snug">
                      Stop at any lounger depth or extend completely for overnight sleeping comfort.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                <button
                  type="button"
                  onClick={() => onSelectCategory('Electric Sofa Beds')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#333333] border-b-2 border-[#E27A34] pb-0.5 hover:text-[#E27A34] transition-colors cursor-pointer"
                >
                  Explore Electric Sofa Beds
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-[#78716A]">
                  Custom size &amp; fabric in 7–10 days
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0 order-1 lg:order-2">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#131F2D] shadow-sm relative border border-[#ECE2D5]">
                <video
                  src="/assets/videos/sofa-cum-bed-demo.mp4?v=15s"
                  poster={IMG_SOFABED_VIDEO_POSTER}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= 15) {
                      e.currentTarget.currentTime = 0;
                    }
                  }}
                  aria-label="Zain Seating System electric sofa-cum-bed mechanism demonstration video"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real People Reviews & Customer Delivery Photos Section (Theme Matched) */}
      <section className="py-6 sm:py-10 lg:py-14 bg-[#FAF4ED] border-b border-[#ECE3D6] w-full max-w-full overflow-x-clip">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="bg-white rounded-2xl border border-[#E7DDD0] shadow-xs p-3.5 sm:p-6 lg:p-8 w-full max-w-full overflow-x-clip">
            {/* Top Summary & Actions Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-4 sm:pb-5 border-b border-[#F0EAE2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF4ED] border border-[#E27A34]/30 flex flex-col items-center justify-center shrink-0">
                  <span className="font-display text-sm font-bold text-[#E27A34] leading-none tabular-nums">
                    4.9
                  </span>
                  <Star className="w-3 h-3 fill-[#E27A34] text-[#E27A34] mt-0.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-[#131F2D]">
                      EXCELLENT
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#E27A34] text-[#E27A34]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-[#515151] mt-0.5">
                    <span>
                      <strong className="text-[#131F2D] tabular-nums">4.9</strong> rating based on{' '}
                      <strong className="text-[#131F2D] tabular-nums">246+ verified orders</strong>
                    </span>
                    <span className="hidden sm:inline text-[#D9D0C5]">·</span>
                    <span className="hidden sm:inline text-xs font-medium text-[#4CAF4F]">
                      Verified Factory Buyers
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewFormOpen((o) => !o)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  {isReviewFormOpen ? 'Close Form' : 'Write a Review'}
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollReviews('left')}
                    aria-label="Scroll reviews left"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/60 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollReviews('right')}
                    aria-label="Scroll reviews right"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/60 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Bar — Single Horizontal Swipe Row on Mobile */}
            <div className="flex items-center gap-2 py-3 sm:py-4 overflow-x-auto overscroll-x-contain max-w-full scrollbar-hide flex-nowrap sm:flex-wrap">
              <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-wider text-[#78716A] mr-1 shrink-0">
                Filter:
              </span>
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#131F2D] text-white'
                        : 'bg-[#FAF4ED] text-[#333333] hover:bg-[#F2E7D9] border border-[#EDE3D6]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Expandable Customer Review Submission Form */}
            {isReviewFormOpen && (
              <form
                onSubmit={handleSubmitReview}
                className="mb-5 p-3.5 sm:p-5 rounded-xl bg-[#FAF4ED]/70 border border-[#ECE2D5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Your Full Name *"
                  className="px-3 py-2.5 rounded-lg border border-[#DCD4CB] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <input
                  type="text"
                  value={revCity}
                  onChange={(e) => setRevCity(e.target.value)}
                  placeholder="City (e.g. Mumbai, Delhi)"
                  className="px-3 py-2.5 rounded-lg border border-[#DCD4CB] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <select
                  value={revProductId}
                  onChange={(e) => setRevProductId(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-[#DCD4CB] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#E27A34]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DCD4CB] bg-white">
                  <span className="text-xs text-[#515151] mr-1">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      aria-label={`Rate ${star} stars`}
                      className="cursor-pointer p-0.5"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= revRating
                            ? 'fill-[#E27A34] text-[#E27A34]'
                            : 'text-[#D6CEC5]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  rows={2}
                  value={revQuote}
                  onChange={(e) => setRevQuote(e.target.value)}
                  placeholder="Share honest feedback on comfort, motor glide, fabric, or delivery... *"
                  className="sm:col-span-2 px-3 py-2.5 rounded-lg border border-[#DCD4CB] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-[#C9B9A6] bg-white hover:border-[#E27A34] text-xs font-medium text-[#515151] cursor-pointer">
                  <Camera className="w-4 h-4 text-[#E27A34]" />
                  <span>{revUploadedPhoto ? 'Photo Attached ✓' : 'Add Home Photo (Optional)'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#131F2D] hover:bg-[#E27A34] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </form>
            )}

            {/* Horizontal Multi-Card Real Customer Reviews Row (Card 2 peeks cleanly on mobile) */}
            <div
              ref={carouselRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain max-w-full scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2.5 pr-3 sm:pr-0"
            >
              {filteredStories.map((story) => {
                const isExpanded = !!expandedQuotes[story.id];
                const isLongQuote = story.quote.length > 130;
                const displayQuote =
                  isLongQuote && !isExpanded
                    ? `${story.quote.slice(0, 128).trim()}...`
                    : story.quote;
                const photos = story.photos && story.photos.length > 0 ? story.photos : [story.image];

                return (
                  <article
                    key={story.id}
                    className="w-[78%] min-w-[258px] max-w-[295px] sm:w-[320px] sm:max-w-none lg:w-[336px] shrink-0 snap-start bg-[#FDFCFA] rounded-xl border border-[#EAE1D6] p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs hover:border-[#DECBB8] transition-colors"
                  >
                    <div>
                      {/* Card Header: Avatar + Name + City + Date */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative shrink-0">
                            {story.avatarUrl ? (
                              <img
                                src={story.avatarUrl}
                                alt={story.customerName}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-full object-cover border border-[#E5DDD3]"
                              />
                            ) : (
                              <div
                                className="w-10 h-10 rounded-full text-white font-display font-bold text-sm flex items-center justify-center"
                                style={{ backgroundColor: story.avatarBg ?? '#131F2D' }}
                              >
                                {story.avatarInitials ?? story.customerName.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span
                              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border border-[#ECE4DA] flex items-center justify-center text-[8px] font-bold text-[#E27A34]"
                              title="Verified Zain Customer"
                            >
                              Z
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-semibold text-[#131F2D] truncate">
                                {story.customerName}
                              </p>
                              <BadgeCheck className="w-3.5 h-3.5 text-[#E27A34] shrink-0" />
                            </div>
                            <p className="text-[11px] text-[#515151] truncate">
                              {story.city}
                              {story.isRepeatBuyer && (
                                <span className="text-[#E27A34] font-medium"> · Repeat Buyer</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] text-[#78716A] whitespace-nowrap shrink-0 mt-0.5">
                          {story.date}
                        </span>
                      </div>

                      {/* Star Rating + Category Tag */}
                      <div className="flex items-center justify-between gap-2 mt-3">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: story.rating }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-3.5 h-3.5 fill-[#E27A34] text-[#E27A34]"
                            />
                          ))}
                        </div>
                        <span className="px-2 py-0.5 rounded border border-[#E6DDD2] bg-[#FAF4ED] text-[10px] font-medium text-[#515151] truncate max-w-[148px]">
                          {story.categoryTag}
                        </span>
                      </div>

                      {/* Review Quote + Read More */}
                      <div className="mt-2.5">
                        <p className="text-xs sm:text-[13px] text-[#333333] leading-relaxed">
                          &ldquo;{displayQuote}&rdquo;
                        </p>
                        {isLongQuote && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedQuotes((prev) => ({
                                ...prev,
                                [story.id]: !prev[story.id],
                              }))
                            }
                            className="mt-1 text-xs font-semibold text-[#E27A34] hover:text-[#C96625] cursor-pointer"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {/* Customer Photos Thumbnails */}
                      <div className="mt-3.5">
                        <p className="text-[11px] font-medium text-[#515151] mb-1.5">
                          Customer Photos ({photos.length}):
                        </p>
                        <div className="flex items-center gap-2">
                          {photos.map((photoUrl, pIdx) => (
                            <button
                              key={`${story.id}-photo-${pIdx}`}
                              type="button"
                              onClick={() => setLightboxData({ photo: photoUrl, story })}
                              aria-label={`View customer delivery photo ${pIdx + 1} by ${story.customerName}`}
                              className="w-14 h-14 rounded-lg overflow-hidden border border-[#E5DDD3] hover:ring-2 hover:ring-[#E27A34] transition-all cursor-pointer shrink-0 bg-[#FAF4ED]"
                            >
                              <img
                                src={photoUrl}
                                alt={`${story.productName} installed at ${story.customerName}'s home`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Factory Response Callout */}
                      {story.factoryReply && (
                        <div className="mt-3.5 rounded-lg bg-[#FAF4ED]/80 border border-[#ECE2D5] p-2.5">
                          <div className="flex items-center justify-between gap-2 text-[11px]">
                            <span className="inline-flex items-center gap-1 font-semibold text-[#131F2D]">
                              <CornerDownRight className="w-3 h-3 text-[#E27A34]" />
                              Response from Zain Seating
                            </span>
                            {story.factoryReplyDate && (
                              <span className="text-[10px] text-[#78716A]">
                                {story.factoryReplyDate}
                              </span>
                            )}
                          </div>
                          <p className="text-[11.5px] text-[#515151] mt-1 leading-snug">
                            {story.factoryReply}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Verified Purchase + Inspect Link */}
                    <div className="mt-4 pt-2.5 border-t border-[#F0EAE2] flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1 font-medium text-[#4CAF4F]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Purchase
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInspectReviewedProduct(story.productId)}
                        className="inline-flex items-center gap-1 font-semibold text-[#515151] hover:text-[#E27A34] transition-colors cursor-pointer"
                      >
                        <span>Inspect Piece</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Location & Action Bar inside Reviews Container */}
            <div className="mt-4 pt-4 border-t border-[#F0EAE2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <p className="inline-flex items-center gap-1.5 text-[#515151]">
                <MapPin className="w-3.5 h-3.5 text-[#E27A34] shrink-0" />
                <span>
                  <strong className="text-[#131F2D]">Zain Seating System</strong> · {FACTORY_ADDRESS} (Mon–Sun 10 AM – 8 PM)
                </span>
              </p>
              <button
                type="button"
                onClick={() => setIsReviewFormOpen(true)}
                className="inline-flex items-center gap-1 font-semibold text-[#E27A34] hover:text-[#C96625] transition-colors cursor-pointer self-start sm:self-auto max-w-full"
              >
                Share Your Home Photo &amp; Review
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Photo Lightbox Modal */}
        {lightboxData && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setLightboxData(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Customer home installation photo"
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ECE2D5]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square bg-[#131F2D]">
                <img
                  src={lightboxData.photo}
                  alt={lightboxData.story.productName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxData(null)}
                  aria-label="Close photo"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#131F2D] hover:bg-[#E27A34] hover:text-white flex items-center justify-center shadow transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#131F2D]">
                      {lightboxData.story.customerName} · {lightboxData.story.city}
                    </p>
                    <p className="text-xs text-[#E27A34] font-medium">
                      {lightboxData.story.productName}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: lightboxData.story.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#E27A34] text-[#E27A34]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#515151] leading-relaxed">
                  &ldquo;{lightboxData.story.quote}&rdquo;
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const prodId = lightboxData.story.productId;
                      setLightboxData(null);
                      handleInspectReviewedProduct(prodId);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Inspect This Piece
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
