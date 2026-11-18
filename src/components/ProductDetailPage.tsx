import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  Factory,
  Heart,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import {
  CUSTOMER_STORIES,
  IMG_HERO_LIVING,
  IMG_RECLINER_SOFA,
  IMG_SOFA_CUM_BED,
  IMG_SOFA_MODULAR,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from '../data/catalog';
import type { CustomerStory, Product } from '../types';
import { calcDiscountPercent, formatINR } from '../utils/format';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (
    product: Product,
    finishName: string,
    unitPrice?: number,
    customNote?: string
  ) => void;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onBack,
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedFinishName, setSelectedFinishName] = useState(
    product.finishes[0]?.name ?? 'Standard'
  );
  const [customNote, setCustomNote] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [stories, setStories] = useState<CustomerStory[]>(CUSTOMER_STORIES);
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revQuote, setRevQuote] = useState('');
  const [revPhoto, setRevPhoto] = useState<string | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    photo: string;
    story: CustomerStory;
  } | null>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedFinishName(product.finishes[0]?.name ?? 'Standard');
    setCustomNote('');
    setPincode('');
    setPincodeStatus(null);
    setActivePhotoIdx(0);
    setIsReviewFormOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const galleryImages = useMemo(() => {
    const matchedReviewPhoto = CUSTOMER_STORIES.find(
      (s) => s.productId === product.id
    )?.image;
    const pool = [
      product.image,
      matchedReviewPhoto,
      product.room === 'Recliners'
        ? IMG_RECLINER_SOFA
        : product.room === 'Electric Sofa Beds'
        ? IMG_SOFA_CUM_BED
        : product.room === 'Sofa Sets'
        ? IMG_SOFA_MODULAR
        : IMG_HERO_LIVING,
      IMG_HERO_LIVING,
    ].filter((img): img is string => Boolean(img));
    return Array.from(new Set(pool)).slice(0, 4);
  }, [product]);

  const activeVariant =
    product.variants[selectedVariantIdx] ?? product.variants[0];
  const activeFinishObj =
    product.finishes.find((f) => f.name === selectedFinishName) ??
    product.finishes[0];

  const finalPrice = Math.max(
    9999,
    product.price + (activeVariant?.priceDelta ?? 0)
  );
  const finalMrp = Math.max(
    finalPrice + 6000,
    product.mrp + (activeVariant?.priceDelta ?? 0)
  );
  const discountPct = calcDiscountPercent(finalPrice, finalMrp);
  const savings = Math.max(0, finalMrp - finalPrice);
  const displayDimensions = activeVariant?.dimensions ?? product.dimensions;

  const fullVariantFinishLabel = activeVariant
    ? `${selectedFinishName} · ${activeVariant.label}`
    : selectedFinishName;

  const whatsappBuyMsg = `Hello Zain Seating System, I want to order directly:\nProduct: ${product.name}\nVariant: ${
    activeVariant?.label ?? 'Standard'
  }\nUpholstery Color: ${selectedFinishName} (${activeFinishObj?.upholstery ?? ''})\nDimensions: ${displayDimensions}\nFactory Price: ${formatINR(
    finalPrice
  )}${customNote.trim() ? `\nCustom Specs: ${customNote.trim()}` : ''}`;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (/^\d{6}$/.test(cleaned)) {
      setPincodeStatus({
        ok: true,
        message: `Delivery available to ${cleaned} · ${product.deliveryEstimate} with insured transit`,
      });
    } else {
      setPincodeStatus({
        ok: false,
        message: 'Enter a valid 6-digit Indian PIN code.',
      });
    }
  };

  const relatedProducts = useMemo(() => {
    return allProducts.filter((p) => p.id !== product.id).slice(0, 6);
  }, [allProducts, product.id]);

  const productReviews = useMemo(() => {
    const exact = stories.filter((s) => s.productId === product.id);
    const others = stories.filter((s) => s.productId !== product.id);
    return [...exact, ...others];
  }, [product.id, stories]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setRevPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitPdpReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revQuote.trim()) return;
    const cleanName = revName.trim();
    const imgUrl = revPhoto || product.image;
    const newReview: CustomerStory = {
      id: `pdp-rev-${Date.now()}`,
      customerName: cleanName,
      city: revCity.trim() || 'India',
      rating: revRating,
      date: 'Just now',
      quote: revQuote.trim(),
      productId: product.id,
      productName: product.name,
      categoryTag: product.category.replace(/s$/, ''),
      image: imgUrl,
      photos: [imgUrl],
      avatarInitials: cleanName.charAt(0).toUpperCase(),
      avatarBg: '#E27A34',
      factoryReply:
        'Thank you for sharing your review with Zain Seating System 🙏 We truly value your feedback!',
      factoryReplyDate: 'Just now',
    };
    setStories((prev) => [newReview, ...prev]);
    setRevName('');
    setRevCity('');
    setRevRating(5);
    setRevQuote('');
    setRevPhoto(null);
    setIsReviewFormOpen(false);
  };

  const scrollPdpReviews = (dir: 'left' | 'right') => {
    if (!reviewsScrollRef.current) return;
    reviewsScrollRef.current.scrollBy({
      left: dir === 'right' ? 310 : -310,
      behavior: 'smooth',
    });
  };

  const ratingBars = [
    { stars: 5, pct: 84 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 lg:pb-12">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#ECE6DF]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#515151] min-w-0 overflow-hidden">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 font-semibold text-[#131F2D] hover:text-[#E27A34] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Products</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B4AAA0] shrink-0" />
            <span className="hidden sm:inline text-[#78716A] shrink-0">
              {product.category}
            </span>
            <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-[#B4AAA0] shrink-0" />
            <span className="truncate font-medium text-[#333333]">
              {product.name}
            </span>
          </div>

          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#E27A34] shrink-0">
            <Factory className="w-3.5 h-3.5" />
            Direct Factory Manufacturing
          </span>
        </div>
      </div>

      {/* Main 2-Column Flipkart / Amazon PDP Layout */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <div className="bg-white rounded-2xl border border-[#ECE6DF] p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* LEFT COLUMN: Sticky Gallery + Primary Action Buttons */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Thumbnail + Main Image Row on Desktop / Stacked on Mobile */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                {/* Thumbnails */}
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible scrollbar-hide shrink-0">
                  {galleryImages.map((imgUrl, idx) => {
                    const active = activePhotoIdx === idx;
                    return (
                      <button
                        key={`${imgUrl}-${idx}`}
                        type="button"
                        onClick={() => setActivePhotoIdx(idx)}
                        aria-label={`View angle ${idx + 1}`}
                        className={`w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-[#FAF4ED] ${
                          active
                            ? 'border-[#E27A34] ring-1 ring-[#E27A34]/30'
                            : 'border-[#ECE6DF] hover:border-[#C8B9A6]'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${product.name} view ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Main Showcase Frame */}
                <div className="relative flex-1 aspect-[4/3] sm:aspect-[1/1] rounded-xl overflow-hidden bg-[#FAF4ED] border border-[#ECE3D6]">
                  <img
                    src={galleryImages[activePhotoIdx] ?? product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {discountPct > 0 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#131F2D] text-white text-[11px] font-bold tracking-wide uppercase tabular-nums">
                      {discountPct}% Factory Off
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 hover:bg-white shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? 'fill-[#E27A34] text-[#E27A34]'
                          : 'text-[#333333]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Desktop Action Buttons (Flipkart/Amazon style side-by-side) */}
              <div className="hidden lg:grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart(
                      product,
                      fullVariantFinishLabel,
                      finalPrice,
                      customNote.trim() || undefined
                    )
                  }
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#131F2D] hover:bg-[#1E2E42] text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG
                </button>
                <a
                  href={getWhatsAppUrl(whatsappBuyMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  ORDER ON WHATSAPP
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Full Details, Pricing, Variants, Specs & Reviews */}
          <div className="lg:col-span-7 space-y-6">
            {/* Brand + Title + Rating Summary */}
            <div className="border-b border-[#F0EAE2] pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E27A34]">
                  Zain Seating System · {product.category}
                </span>
                {product.mechanism && (
                  <span className="px-2 py-0.5 rounded bg-[#FAF4ED] border border-[#EDE2D4] text-[10px] font-semibold text-[#515151]">
                    {product.mechanism}
                  </span>
                )}
              </div>

              <h1 className="font-display text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#131F2D] leading-snug tracking-tight">
                {product.name}
              </h1>

              {/* Flipkart-Style Rating Pill & Verified Factory Badge */}
              <div className="flex flex-wrap items-center gap-3 mt-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4CAF4F] text-white text-xs font-bold tabular-nums">
                  {product.rating.toFixed(1)}
                  <Star className="w-3 h-3 fill-white text-white" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#515151] tabular-nums">
                  {product.reviewCount} Verified Customer Reviews
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#131F2D]">
                  <BadgeCheck className="w-4 h-4 text-[#E27A34]" />
                  Factory Assured
                </span>
              </div>

              {/* Price & Discount Row */}
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#131F2D] tabular-nums">
                  {formatINR(finalPrice)}
                </span>
                <span className="text-sm sm:text-base text-[#8A8178] line-through tabular-nums">
                  {formatINR(finalMrp)}
                </span>
                {discountPct > 0 && (
                  <span className="text-sm sm:text-base font-bold text-[#4CAF4F] tabular-nums">
                    {discountPct}% off
                  </span>
                )}
              </div>
              <p className="text-xs text-[#515151] mt-1">
                You save <strong className="text-[#131F2D] tabular-nums">{formatINR(savings)}</strong> with direct-from-factory pricing · {product.deliveryEstimate}
              </p>
            </div>

            {/* Factory Offers / Value Highlights (Amazon/Flipkart "Available Offers") */}
            <div className="rounded-xl bg-[#FAF4ED]/80 border border-[#ECE2D5] p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E27A34]" />
                Direct Manufacturing Benefits
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#333333]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF4F] shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Made to Order:</strong> Customize length, width, corner chaise side &amp; fabric shade directly with our unit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF4F] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Middleman Markup:</strong> Built in our own workshop using {product.foamAndSpring.toLowerCase()}.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF4F] shrink-0 mt-0.5" />
                  <span>
                    <strong>Warranty Coverage:</strong> {product.warranty}.
                  </span>
                </li>
              </ul>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#131F2D] mb-2">
                  Select Size / Seating Variant:{' '}
                  <span className="font-normal text-[#E27A34]">
                    {activeVariant?.label}
                  </span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant, idx) => {
                    const selected = selectedVariantIdx === idx;
                    const variantPrice = Math.max(
                      9999,
                      product.price + variant.priceDelta
                    );
                    return (
                      <button
                        key={variant.label}
                        type="button"
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selected
                            ? 'border-[#E27A34] bg-[#FAF4ED] ring-1 ring-[#E27A34]/30'
                            : 'border-[#E2DAD1] bg-white hover:border-[#333333]'
                        }`}
                      >
                        <span className="block text-xs font-semibold text-[#131F2D]">
                          {variant.label}
                        </span>
                        <span className="block text-[11px] font-bold text-[#E27A34] tabular-nums mt-0.5">
                          {formatINR(variantPrice)}
                        </span>
                        <span className="block text-[10px] text-[#78716A] mt-0.5 line-clamp-1">
                          {variant.dimensions}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upholstery Finish Swatches */}
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#131F2D] mb-2">
                Upholstery Shade &amp; Material:{' '}
                <span className="font-normal text-[#515151]">
                  {activeFinishObj?.name} ({activeFinishObj?.upholstery})
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map((fin) => {
                  const selected = selectedFinishName === fin.name;
                  return (
                    <button
                      key={fin.name}
                      type="button"
                      onClick={() => setSelectedFinishName(fin.name)}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selected
                          ? 'border-[#E27A34] bg-[#FAF4ED] text-[#131F2D] font-semibold'
                          : 'border-[#E2DAD1] bg-white text-[#515151] hover:border-[#333333]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                        style={{ backgroundColor: fin.swatchHex }}
                      />
                      {fin.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Sizing / Color Request Input */}
            <div>
              <label
                htmlFor="pdp-custom-note"
                className="text-xs sm:text-sm font-semibold text-[#131F2D] block mb-1.5"
              >
                Custom Color, Fabric or Exact Size Request (Optional)
              </label>
              <input
                id="pdp-custom-note"
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Custom olive velvet, 86-inch wall width, USB port on left arm..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCD4CB] bg-white text-xs sm:text-sm text-[#333333] focus:outline-none focus:border-[#E27A34]"
              />
            </div>

            {/* Delivery & PIN Check Block (Flipkart/Amazon Delivery row) */}
            <div className="rounded-xl border border-[#ECE6DF] p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#131F2D]">
                  <MapPin className="w-4 h-4 text-[#E27A34]" />
                  Delivery &amp; Factory Dispatch Check
                </span>
                <span className="text-[11px] font-medium text-[#515151]">
                  {product.deliveryEstimate}
                </span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Delivery PIN Code"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#DCD4CB] text-xs sm:text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#131F2D] hover:bg-[#E27A34] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p
                  className={`text-xs font-medium ${
                    pincodeStatus.ok ? 'text-[#4CAF4F]' : 'text-[#C94425]'
                  }`}
                >
                  {pincodeStatus.message}
                </p>
              )}

              {/* 4-Badge Trust Strip */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 border-t border-[#F2ECE4]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#333333]">
                  <Factory className="w-4 h-4 text-[#E27A34] shrink-0" />
                  <span>Direct Factory</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#333333]">
                  <ShieldCheck className="w-4 h-4 text-[#E27A34] shrink-0" />
                  <span>5-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#333333]">
                  <Truck className="w-4 h-4 text-[#E27A34] shrink-0" />
                  <span>Insured Transit</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#333333]">
                  <Palette className="w-4 h-4 text-[#E27A34] shrink-0" />
                  <span>20+ Shades</span>
                </div>
              </div>
            </div>

            {/* Product Description & Key Highlights */}
            <div className="space-y-3 pt-1">
              <h2 className="font-display text-base sm:text-lg font-semibold text-[#131F2D]">
                About This Seating Piece
              </h2>
              <p className="text-xs sm:text-sm text-[#515151] leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {product.customizableOptions.map((opt) => (
                  <span
                    key={opt}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF4ED] border border-[#ECE2D5] text-[11px] font-medium text-[#333333]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E27A34]" />
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Flipkart / Amazon-Style Full Specifications Table */}
            <div className="rounded-xl border border-[#ECE6DF] overflow-hidden">
              <div className="bg-[#FAF4ED] px-4 py-3 border-b border-[#ECE6DF] flex items-center justify-between">
                <h2 className="font-display text-sm sm:text-base font-semibold text-[#131F2D]">
                  Technical Specifications
                </h2>
                <span className="text-[11px] text-[#78716A]">Zain Manufacturing Unit</span>
              </div>
              <dl className="divide-y divide-[#F2ECE4] text-xs sm:text-sm">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-white">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#E27A34]" />
                    Dimensions
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium tabular-nums">
                    {displayDimensions}
                  </dd>
                </div>
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#FAFAFA]">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E27A34]" />
                    Frame &amp; Hardware
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium">
                    {product.frameMaterial}
                  </dd>
                </div>
                <div className="grid grid-cols-12 px-4 py-2.5 bg-white">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium">
                    Cushion &amp; Spring Core
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium">
                    {product.foamAndSpring}
                  </dd>
                </div>
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#FAFAFA]">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium">
                    Action Mechanism
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium">
                    {product.mechanism ?? 'Custom Fixed'}
                  </dd>
                </div>
                <div className="grid grid-cols-12 px-4 py-2.5 bg-white">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium">
                    Warranty
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium">
                    {product.warranty}
                  </dd>
                </div>
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#FAFAFA]">
                  <dt className="col-span-5 sm:col-span-4 text-[#78716A] font-medium">
                    Direct Support
                  </dt>
                  <dd className="col-span-7 sm:col-span-8 text-[#131F2D] font-medium tabular-nums">
                    WhatsApp {WHATSAPP_DISPLAY} (Custom swatches &amp; video demo)
                  </dd>
                </div>
              </dl>
            </div>

            {/* Ratings & Verified Buyer Reviews Section inside PDP (Matches Homepage Real-Review Cards) */}
            <div className="rounded-xl border border-[#ECE6DF] p-3.5 sm:p-5 space-y-4 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
                <div>
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
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-bold text-[#131F2D] tabular-nums">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#515151]">
                      based on <strong className="text-[#131F2D]">{product.reviewCount}</strong> verified buyer ratings
                    </span>
                  </div>
                </div>

                {/* Rating Progress Bars */}
                <div className="w-full sm:w-56 space-y-1">
                  {ratingBars.map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-2 text-[11px]">
                      <span className="w-6 text-[#515151] font-medium tabular-nums">
                        {bar.stars} ★
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-[#F0EAE2] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#E27A34]"
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-right text-[#78716A] tabular-nums">
                        {bar.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review + Scroll Controls Bar */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#131F2D]">
                  Verified Customer Photos &amp; Feedback
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen((o) => !o)}
                    className="px-3 py-1.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isReviewFormOpen ? 'Close Form' : 'Write a Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollPdpReviews('left')}
                    aria-label="Scroll product reviews left"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/70 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollPdpReviews('right')}
                    aria-label="Scroll product reviews right"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/70 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {isReviewFormOpen && (
                <form
                  onSubmit={handleSubmitPdpReview}
                  className="p-3.5 rounded-xl bg-[#FAF4ED]/70 border border-[#ECE2D5] grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                >
                  <input
                    type="text"
                    required
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="px-3 py-2 rounded-lg border border-[#DCD4CB] bg-white text-xs focus:outline-none focus:border-[#E27A34]"
                  />
                  <input
                    type="text"
                    value={revCity}
                    onChange={(e) => setRevCity(e.target.value)}
                    placeholder="City (e.g. Mumbai, Bengaluru)"
                    className="px-3 py-2 rounded-lg border border-[#DCD4CB] bg-white text-xs focus:outline-none focus:border-[#E27A34]"
                  />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD4CB] bg-white">
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
                          className={`w-3.5 h-3.5 ${
                            star <= revRating
                              ? 'fill-[#E27A34] text-[#E27A34]'
                              : 'text-[#D6CEC5]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#C9B9A6] bg-white hover:border-[#E27A34] text-xs font-medium text-[#515151] cursor-pointer">
                    <Camera className="w-3.5 h-3.5 text-[#E27A34]" />
                    <span>{revPhoto ? 'Photo Attached ✓' : 'Add Home Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={revQuote}
                    onChange={(e) => setRevQuote(e.target.value)}
                    placeholder={`Share your feedback on ${product.name}... *`}
                    className="sm:col-span-2 px-3 py-2 rounded-lg border border-[#DCD4CB] bg-white text-xs focus:outline-none focus:border-[#E27A34]"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-2 py-2 px-4 rounded-lg bg-[#131F2D] hover:bg-[#E27A34] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Publish Verified Review
                  </button>
                </form>
              )}

              {/* Horizontal Real-People Review Cards */}
              <div
                ref={reviewsScrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-1.5 pr-3 sm:pr-0"
              >
                {productReviews.map((rev) => {
                  const isExpanded = !!expandedQuotes[rev.id];
                  const isLongQuote = rev.quote.length > 125;
                  const displayQuote =
                    isLongQuote && !isExpanded
                      ? `${rev.quote.slice(0, 122).trim()}...`
                      : rev.quote;
                  const photos =
                    rev.photos && rev.photos.length > 0 ? rev.photos : [rev.image];

                  return (
                    <article
                      key={rev.id}
                      className="w-[82%] min-w-[248px] max-w-[300px] sm:w-[290px] shrink-0 snap-start rounded-xl bg-[#FDFCFA] border border-[#EAE1D6] p-3.5 flex flex-col justify-between shadow-2xs"
                    >
                      <div>
                        {/* Avatar + Customer Info */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative shrink-0">
                              {rev.avatarUrl ? (
                                <img
                                  src={rev.avatarUrl}
                                  alt={rev.customerName}
                                  referrerPolicy="no-referrer"
                                  className="w-9 h-9 rounded-full object-cover border border-[#E5DDD3]"
                                />
                              ) : (
                                <div
                                  className="w-9 h-9 rounded-full text-white font-display font-bold text-xs flex items-center justify-center"
                                  style={{ backgroundColor: rev.avatarBg ?? '#131F2D' }}
                                >
                                  {rev.avatarInitials ?? rev.customerName.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white border border-[#ECE4DA] flex items-center justify-center text-[7px] font-bold text-[#E27A34]">
                                Z
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <p className="text-xs sm:text-sm font-semibold text-[#131F2D] truncate">
                                  {rev.customerName}
                                </p>
                                <BadgeCheck className="w-3.5 h-3.5 text-[#E27A34] shrink-0" />
                              </div>
                              <p className="text-[10.5px] text-[#515151] truncate">
                                {rev.city}
                                {rev.isRepeatBuyer && (
                                  <span className="text-[#E27A34] font-medium"> · Repeat Buyer</span>
                                )}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-[#78716A] whitespace-nowrap shrink-0">
                            {rev.date}
                          </span>
                        </div>

                        {/* Stars + Category Tag */}
                        <div className="flex items-center justify-between gap-2 mt-2.5">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star
                                key={idx}
                                className="w-3.5 h-3.5 fill-[#E27A34] text-[#E27A34]"
                              />
                            ))}
                          </div>
                          <span className="px-2 py-0.5 rounded border border-[#E6DDD2] bg-[#FAF4ED] text-[9.5px] font-medium text-[#515151] truncate max-w-[130px]">
                            {rev.categoryTag}
                          </span>
                        </div>

                        {/* Quote + Read more */}
                        <div className="mt-2">
                          <p className="text-xs text-[#333333] leading-relaxed">
                            &ldquo;{displayQuote}&rdquo;
                          </p>
                          {isLongQuote && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedQuotes((prev) => ({
                                  ...prev,
                                  [rev.id]: !prev[rev.id],
                                }))
                              }
                              className="mt-0.5 text-[11px] font-semibold text-[#E27A34] hover:text-[#C96625] cursor-pointer"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>

                        {/* Customer Photos Thumbnails */}
                        <div className="mt-3">
                          <p className="text-[10.5px] font-medium text-[#515151] mb-1">
                            Customer Photos ({photos.length}):
                          </p>
                          <div className="flex items-center gap-2">
                            {photos.map((photoUrl, pIdx) => (
                              <button
                                key={`${rev.id}-pdp-photo-${pIdx}`}
                                type="button"
                                onClick={() => setLightboxData({ photo: photoUrl, story: rev })}
                                aria-label={`Inspect photo ${pIdx + 1} by ${rev.customerName}`}
                                className="w-12 h-12 rounded-lg overflow-hidden border border-[#E5DDD3] hover:ring-2 hover:ring-[#E27A34] transition-all cursor-pointer shrink-0 bg-[#FAF4ED]"
                              >
                                <img
                                  src={photoUrl}
                                  alt={`${rev.productName} home photo`}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Factory Reply Box */}
                        {rev.factoryReply && (
                          <div className="mt-3 rounded-lg bg-[#FAF4ED]/80 border border-[#ECE2D5] p-2">
                            <div className="flex items-center justify-between gap-2 text-[10.5px]">
                              <span className="inline-flex items-center gap-1 font-semibold text-[#131F2D]">
                                <CornerDownRight className="w-3 h-3 text-[#E27A34]" />
                                Response from Zain Seating
                              </span>
                              {rev.factoryReplyDate && (
                                <span className="text-[9.5px] text-[#78716A]">
                                  {rev.factoryReplyDate}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#515151] mt-1 leading-snug">
                              {rev.factoryReply}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3 pt-2 border-t border-[#F0EAE2] flex items-center justify-between text-[10.5px]">
                        <span className="inline-flex items-center gap-1 font-medium text-[#4CAF4F]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified Purchase
                        </span>
                        <span className="text-[#78716A]">Factory Order</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Similar / You Might Also Like Horizontal Scroll Rail */}
        <div className="mt-8 bg-white rounded-2xl border border-[#ECE6DF] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#131F2D]">
              More Factory-Direct Designs
            </h2>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-[#E27A34] hover:text-[#C96625] cursor-pointer"
            >
              View All Catalog
            </button>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x pb-2">
            {relatedProducts.map((rel) => {
              const relDiscount = calcDiscountPercent(rel.price, rel.mrp);
              return (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectProduct(rel)}
                  className="w-[185px] sm:w-[215px] shrink-0 snap-start rounded-xl border border-[#ECE6DF] hover:border-[#E27A34] bg-[#FDFCFA] overflow-hidden text-left transition-all cursor-pointer group"
                >
                  <div className="aspect-[4/3] bg-[#FAF4ED] overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-[#131F2D] line-clamp-2 leading-snug">
                      {rel.name}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-[#131F2D] tabular-nums">
                        {formatINR(rel.price)}
                      </span>
                      {relDiscount > 0 && (
                        <span className="text-[10px] font-semibold text-[#4CAF4F]">
                          {relDiscount}% off
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (Just like Flipkart / Amazon Mobile App) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6DDD2] px-3 py-2.5 grid grid-cols-2 gap-2.5 shadow-[0_-6px_20px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() =>
            onAddToCart(
              product,
              fullVariantFinishLabel,
              finalPrice,
              customNote.trim() || undefined
            )
          }
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#131F2D] text-white text-xs font-semibold cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </button>
        <a
          href={getWhatsAppUrl(whatsappBuyMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#E27A34] text-white text-xs font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Buy Now
        </a>
      </div>
      {/* Customer Photo Lightbox Modal */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxData(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Customer delivery photo"
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#ECE2D5]"
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
            <div className="p-4 space-y-2">
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
              <p className="text-xs text-[#515151] leading-relaxed">
                &ldquo;{lightboxData.story.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
