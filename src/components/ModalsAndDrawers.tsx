import React, { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../data/catalog';
import type { CartItem, Product } from '../types';
import { calcDiscountPercent, formatINR } from '../utils/format';
import type { UtilityModalType } from './Header';

/* -------------------------------------------------------------------------- */
/* 1. Product Quick-View Customizer & Contiguous Purchase Module              */
/* -------------------------------------------------------------------------- */
interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    finishName: string,
    unitPrice?: number,
    customNote?: string
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [customNote, setCustomNote] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0]?.name ?? 'Standard');
      setSelectedVariantIndex(0);
      setCustomNote('');
      setPincode('');
      setPincodeStatus(null);
    }
  }, [product]);

  if (!product) return null;

  const activeFinishObj =
    product.finishes.find((f) => f.name === selectedFinish) ?? product.finishes[0];
  const activeVariant =
    product.variants[selectedVariantIndex] ?? product.variants[0];
  const computedPrice = Math.max(
    9999,
    product.price + (activeVariant?.priceDelta ?? 0)
  );
  const computedMrp = Math.max(
    computedPrice + 6000,
    product.mrp + (activeVariant?.priceDelta ?? 0)
  );
  const displayDimensions = activeVariant?.dimensions ?? product.dimensions;
  const discountPct = calcDiscountPercent(computedPrice, computedMrp);

  const whatsappCustomizeMsg = `Hello Zain Seating System, I am interested in:\nProduct: ${product.name}\nVariant: ${
    activeVariant?.label ?? 'Standard'
  }\nFinish: ${selectedFinish}\nFactory Price: ${formatINR(computedPrice)}${
    customNote.trim() ? `\nCustom Request: ${customNote.trim()}` : ''
  }`;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus(
        `Eligible for Direct Factory Delivery to ${pincode.trim()} (${product.deliveryEstimate}).`
      );
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl grid grid-cols-1 md:grid-cols-12 relative"
        role="dialog"
        aria-label={product.name}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 shadow-sm hover:bg-[#FAF4ED] flex items-center justify-center text-[#333333] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image + Core Build Specs */}
        <div className="md:col-span-6 bg-[#FAF4ED] p-5 flex flex-col justify-between">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white">
            <img
              src={activeFinishObj?.image || activeVariant?.image || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white border border-[#ECE3D6]">
                <p className="text-[#78716A] uppercase tracking-wider text-[10px]">
                  Dimensions
                </p>
                <p className="font-semibold text-[#333333] mt-0.5 tabular-nums">
                  {displayDimensions}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#ECE3D6]">
                <p className="text-[#78716A] uppercase tracking-wider text-[10px]">
                  Factory Warranty
                </p>
                <p className="font-semibold text-[#333333] mt-0.5">
                  {product.warranty}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#ECE3D6]">
              <p className="text-[#78716A] uppercase tracking-wider text-[10px]">
                Core Materials &amp; Foam
              </p>
              <p className="font-medium text-[#333333] mt-0.5">
                {product.foamAndSpring} · {product.frameMaterial}
              </p>
            </div>
          </div>
        </div>

        {/* Right Customizer & Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#515151] mb-1.5">
              <span className="uppercase tracking-wider font-medium">
                {product.subtitle}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#333333] tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#E27A34] text-[#E27A34]" />
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <h3 className="font-display text-2xl font-semibold text-[#333333] leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-bold text-[#131F2D] tabular-nums">
                {formatINR(computedPrice)}
              </span>
              <span className="text-sm text-[#8A8178] line-through tabular-nums">
                {formatINR(computedMrp)}
              </span>
              {discountPct > 0 && (
                <span className="text-sm font-semibold text-[#4CAF4F] tabular-nums">
                  Factory Direct ({discountPct}% Off)
                </span>
              )}
            </div>

            <p className="text-sm text-[#515151] leading-relaxed mt-3">
              {product.description}
            </p>

            {product.variants.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-[#333333] mb-2">
                  Select Size / Configuration Variant:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((variant, idx) => {
                    const selected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={variant.label}
                        type="button"
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`py-2 px-3 rounded-lg border text-left transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#E27A34] bg-[#FAF4ED] text-[#131F2D]'
                            : 'border-[#E2DAD1] text-[#515151] hover:border-[#333333]'
                        }`}
                      >
                        <span className="block text-xs font-semibold">
                          {variant.label}
                        </span>
                        <span className="block text-[10px] text-[#78716A] tabular-nums mt-0.5">
                          {variant.priceDelta > 0
                            ? `+${formatINR(variant.priceDelta)}`
                            : variant.priceDelta < 0
                            ? `-${formatINR(Math.abs(variant.priceDelta))}`
                            : 'Base Factory Price'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xs font-semibold text-[#333333] mb-2">
                Factory Upholstery Color:{' '}
                <span className="font-normal text-[#515151]">
                  {activeFinishObj?.name} ({activeFinishObj?.upholstery})
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map((fin) => {
                  const selected = selectedFinish === fin.name;
                  return (
                    <button
                      key={fin.name}
                      type="button"
                      onClick={() => setSelectedFinish(fin.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selected
                          ? 'border-[#E27A34] bg-[#FAF4ED] text-[#333333]'
                          : 'border-[#E2DAD1] hover:border-[#333333] text-[#515151]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: fin.swatchHex }}
                      />
                      {fin.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-[#333333] block mb-1">
                Custom Size / Color Request (Built to Order in Factory)
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Olive velvet, 84-inch width, USB arm..."
                className="w-full px-3 py-2 rounded-lg border border-[#DCD4CB] text-xs text-[#333333] focus:outline-none focus:border-[#E27A34]"
              />
            </div>

            <form onSubmit={handleCheckPincode} className="mt-3 flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN for dispatch check"
                className="flex-1 px-3 py-2 rounded-lg border border-[#DCD4CB] text-xs text-[#333333] focus:outline-none focus:border-[#E27A34]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#FAF4ED] hover:bg-[#F3E8DB] text-xs font-semibold text-[#333333] cursor-pointer"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-[#131F2D] mt-1.5 font-medium">{pincodeStatus}</p>
            )}
          </div>

          <div className="pt-4 border-t border-[#ECE6DF] space-y-2.5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const finishLabel = activeVariant
                    ? `${selectedFinish || product.finishes[0].name} · ${activeVariant.label}`
                    : selectedFinish || product.finishes[0].name;
                  onAddToCart(
                    product,
                    finishLabel,
                    computedPrice,
                    customNote.trim() || undefined
                  );
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag — {formatINR(computedPrice)}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="p-3 rounded-lg border border-[#DCD4CB] hover:border-[#E27A34] transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-[#E27A34] text-[#E27A34]' : 'text-[#333333]'
                  }`}
                />
              </button>
            </div>

            <a
              href={getWhatsAppUrl(whatsappCustomizeMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#131F2D] hover:bg-[#1F3147] text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#E27A34]" />
              Order / Request Demo Video on WhatsApp ({WHATSAPP_DISPLAY})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Slide-Over Shopping Bag & Direct WhatsApp Checkout Drawer               */
/* -------------------------------------------------------------------------- */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, finishName: string, delta: number) => void;
  onRemoveItem: (productId: string, finishName: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState(
    () => `ZSS-${Math.floor(100000 + Math.random() * 899999)}`
  );
  const [confirmedOrderSnapshot, setConfirmedOrderSnapshot] = useState<string>('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const itemsText = items
    .map(
      (i, idx) =>
        `${idx + 1}. ${i.product.name}\n   Option: ${i.finishName}${
          i.customNote ? `\n   Custom Spec: ${i.customNote}` : ''
        }\n   Qty: ${i.quantity} × ${formatINR(i.unitPrice)} = ${formatINR(
          i.unitPrice * i.quantity
        )}`
    )
    .join('\n\n');

  const whatsappBagSummary = `Hello Zain Seating System, I'd like to place an order via WhatsApp Checkout:\n\n${itemsText}\n\nFactory Total: ${formatINR(
    subtotal
  )}\n\nPlease confirm availability, customization & delivery schedule.`;

  const isFormComplete =
    customerName.trim().length > 0 &&
    phone.trim().length > 0 &&
    address.trim().length > 0 &&
    /^\d{6}$/.test(pincode.trim());

  const buildFullWhatsAppMessage = (refId: string) =>
    `Hello Zain Seating System, I'd like to confirm my order via WhatsApp Checkout:\n\nOrder Ref: #${refId}\n\n${itemsText}\n\nFactory Total: ${formatINR(
      subtotal
    )}\n\nDelivery Details:\nName: ${customerName.trim()}\nPhone: ${phone.trim()}\nAddress: ${address.trim()}\nPIN Code: ${pincode.trim()}${
      orderNotes.trim() ? `\nNotes: ${orderNotes.trim()}` : ''
    }\n\nPlease confirm customization & delivery schedule on WhatsApp.`;

  const liveWhatsAppCheckoutUrl = getWhatsAppUrl(
    buildFullWhatsAppMessage(orderId)
  );

  const finalizeOrderToWhatsApp = () => {
    setConfirmedOrderSnapshot(buildFullWhatsAppMessage(orderId));
    setCopiedReceipt(false);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    finalizeOrderToWhatsApp();
  };

  const handleCopySummary = () => {
    if (!confirmedOrderSnapshot) return;
    navigator.clipboard?.writeText(confirmedOrderSnapshot).then(() => {
      setCopiedReceipt(true);
      window.setTimeout(() => setCopiedReceipt(false), 2200);
    });
  };

  const handleCloseDrawer = () => {
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('bag');
      setOrderId(`ZSS-${Math.floor(100000 + Math.random() * 899999)}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Zain Seating System Shopping Bag"
      >
        <div className="p-5 border-b border-[#ECE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E27A34]" />
            <h3 className="font-display text-lg font-semibold text-[#131F2D]">
              {checkoutStep === 'bag' &&
                `Your Bag (${items.reduce((a, b) => a + b.quantity, 0)})`}
              {checkoutStep === 'checkout' && 'WhatsApp Checkout'}
              {checkoutStep === 'confirmed' && 'WhatsApp Order Ready'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close bag"
            className="p-1.5 rounded-lg hover:bg-[#FAF4ED] text-[#333333] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'confirmed' ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#4CAF4F]/15 text-[#4CAF4F] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E27A34]">
                  No Online Payment Required
                </p>
                <h4 className="font-display text-xl font-semibold text-[#131F2D] mt-1">
                  Order Ref #{orderId}
                </h4>
              </div>
              <p className="text-sm text-[#515151] leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-[#333333]">
                  {customerName || 'Guest'}
                </span>
                . Tap below to send your itemized order directly to our factory desk on WhatsApp (
                <span className="font-semibold text-[#131F2D] tabular-nums">
                  {WHATSAPP_DISPLAY}
                </span>
                ) for final confirmation &amp; delivery to PIN{' '}
                <span className="font-semibold tabular-nums">{pincode}</span>.
              </p>

              <div className="text-left p-3.5 rounded-xl bg-[#FAF4ED] border border-[#EAE0D4] text-xs text-[#333333] whitespace-pre-line max-h-48 overflow-y-auto">
                {confirmedOrderSnapshot}
              </div>

              <a
                href={getWhatsAppUrl(confirmedOrderSnapshot)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Send Order on WhatsApp ({WHATSAPP_DISPLAY})
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[#DCD4CB] hover:border-[#131F2D] text-[#131F2D] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4CAF4F]" />
                      Copied Summary
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Details
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="py-2.5 px-3 rounded-lg bg-[#131F2D] hover:bg-[#1E2E42] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#C9BFB4] mx-auto" />
              <p className="font-display text-lg font-semibold text-[#333333]">
                Your bag is currently empty
              </p>
              <p className="text-sm text-[#515151]">
                Select any recliner, custom sofa set, electric sofa-cum-bed, or home chair finish to add it here.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="mt-2 px-5 py-2.5 rounded-lg bg-[#E27A34] text-white text-sm font-semibold cursor-pointer"
              >
                Browse Factory Lines
              </button>
            </div>
          ) : checkoutStep === 'bag' ? (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#FAF4ED] text-xs text-[#333333] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E27A34] shrink-0" />
                <span>Direct Factory Dispatch · Free Setup Included</span>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.finishName}-${item.customNote ?? ''}`}
                  className="flex gap-3.5 pb-4 border-b border-[#ECE6DF]"
                >
                  <img
                    src={item.selectedImage || item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-[#FAF4ED] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#333333] line-clamp-2">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.finishName)}
                        aria-label="Remove item"
                        className="text-[#8A8178] hover:text-[#333333] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#515151] mt-0.5">
                      Finish: {item.finishName}
                    </p>
                    {item.customNote && (
                      <p className="text-[11px] text-[#E27A34] mt-0.5 line-clamp-2">
                        Custom Spec: {item.customNote}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#DCD4CB] rounded-lg">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.finishName, -1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#333333] hover:bg-[#FAF4ED] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.finishName, 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#333333] hover:bg-[#FAF4ED] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#131F2D] tabular-nums">
                        {formatINR(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="zain-checkout-form" onSubmit={handleSubmitForm} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#FAF4ED] border border-[#EAE0D4] space-y-1">
                <p className="text-xs font-bold text-[#131F2D] flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#E27A34] shrink-0" />
                  Direct WhatsApp Checkout ({WHATSAPP_DISPLAY})
                </p>
                <p className="text-[11.5px] text-[#515151] leading-relaxed">
                  We do not take online payments on the website yet. Enter your delivery details to send your itemized order straight to our factory desk on WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    pattern="\d{6}"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="110020"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm tabular-nums focus:outline-none focus:border-[#E27A34]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, Street, Landmark, City"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#333333] mb-1">
                  Customization or Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g., Fabric swatch video, exact wall width, weekend delivery"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF4ED] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#515151]">
                    Estimated Factory Total ({items.reduce((a, b) => a + b.quantity, 0)}{' '}
                    {items.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'}):
                  </span>
                  <span className="font-bold text-[#131F2D] tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="text-[#515151] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF4F]" />
                  Pay nothing online · Finalize directly on WhatsApp
                </p>
              </div>
            </form>
          )}
        </div>

        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="p-5 border-t border-[#ECE6DF] bg-[#FAFAFA] space-y-2.5">
            <div className="flex justify-between items-baseline font-bold text-base text-[#131F2D]">
              <span>Factory Total</span>
              <span className="tabular-nums">{formatINR(subtotal)}</span>
            </div>

            {checkoutStep === 'bag' ? (
              <>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Checkout on WhatsApp
                </button>
                <a
                  href={getWhatsAppUrl(whatsappBagSummary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#131F2D] hover:bg-[#1E2E42] text-white text-xs font-semibold transition-colors"
                >
                  Quick Send Bag to {WHATSAPP_DISPLAY}
                </a>
                <p className="text-[11px] text-center text-[#78716A]">
                  No online payment required · Confirm directly on WhatsApp
                </p>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('bag')}
                    className="px-4 py-3 rounded-lg border border-[#DCD4CB] hover:border-[#131F2D] text-xs font-semibold text-[#333333] cursor-pointer"
                  >
                    Back
                  </button>
                  {isFormComplete ? (
                    <a
                      href={liveWhatsAppCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={finalizeOrderToWhatsApp}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      Send Order on WhatsApp
                    </a>
                  ) : (
                    <button
                      type="submit"
                      form="zain-checkout-form"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      Send Order on WhatsApp
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-center text-[#78716A]">
                  Opens WhatsApp chat with {WHATSAPP_DISPLAY} — no online payment charged
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Slide-Over Wishlist Drawer                                              */
/* -------------------------------------------------------------------------- */
interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onMoveToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onToggleWishlist,
  onMoveToBag,
}) => {
  if (!isOpen) return null;

  const saved = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Saved Seating Wishlist"
      >
        <div className="p-5 border-b border-[#ECE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#E27A34] fill-[#E27A34]" />
            <h3 className="font-display text-lg font-semibold text-[#131F2D]">
              Saved Seating ({saved.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-lg hover:bg-[#FAF4ED] text-[#333333] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {saved.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Heart className="w-10 h-10 text-[#C9BFB4] mx-auto" />
              <p className="font-display text-lg font-semibold text-[#333333]">
                No saved seating yet
              </p>
              <p className="text-sm text-[#515151]">
                Tap the heart icon on any recliner, sofa set, or home chair to shortlist options.
              </p>
            </div>
          ) : (
            saved.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 pb-4 border-b border-[#ECE6DF]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-[#FAF4ED] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#333333] line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-sm font-bold text-[#131F2D] tabular-nums mt-1">
                    {formatINR(product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      type="button"
                      onClick={() => onMoveToBag(product)}
                      className="px-3 py-1.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold cursor-pointer"
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#DCD4CB] text-xs font-medium text-[#515151] hover:text-[#333333] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Factory Customizer, Track Order & Concierge Modal                       */
/* -------------------------------------------------------------------------- */
interface UtilityModalProps {
  type: UtilityModalType;
  onClose: () => void;
}

export const UtilityModal: React.FC<UtilityModalProps> = ({ type, onClose }) => {
  const [orderLookup, setOrderLookup] = useState('');
  const [lookupResult, setLookupResult] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState('Custom Sofa Set');
  const [customDimensions, setCustomDimensions] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  if (!type) return null;

  const titles: Record<NonNullable<UtilityModalType>, string> = {
    track: 'Track Your Factory Order',
    help: 'Factory Concierge & Product Videos',
    custom: 'Custom Build Request — Direct Factory',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
        role="dialog"
        aria-label={titles[type]}
      >
        <div className="p-5 bg-[#131F2D] text-white flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#E27A34] font-semibold">
              ZAIN SEATING SYSTEM · MANUFACTURING UNIT
            </p>
            <h3 className="font-display text-lg font-semibold mt-0.5">{titles[type]}</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setLookupResult(null);
              setCustomSubmitted(false);
              onClose();
            }}
            aria-label="Close modal"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {type === 'track' && (
            <>
              <p className="text-sm text-[#515151]">
                Enter your Zain Seating Order ID (e.g., <span className="font-semibold">ZSS-482910</span>) or contact our factory desk directly on WhatsApp ({WHATSAPP_DISPLAY}).
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = orderLookup.trim().toUpperCase();
                  setLookupResult(
                    clean
                      ? `Order ${clean}: Passed workshop quality inspection. Scheduled for final white-glove transit in 48 hours.`
                      : 'Please enter an Order ID.'
                  );
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={orderLookup}
                  onChange={(e) => setOrderLookup(e.target.value)}
                  placeholder="Enter Order ID (e.g. ZSS-482910)"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#E27A34] text-white text-xs font-semibold cursor-pointer"
                >
                  Track
                </button>
              </form>
              {lookupResult && (
                <div className="p-3.5 rounded-xl bg-[#FAF4ED] text-xs text-[#333333] font-medium">
                  {lookupResult}
                </div>
              )}
            </>
          )}

          {type === 'help' && (
            <div className="space-y-3 text-sm text-[#515151]">
              <p>
                Want to see live demonstration videos of our Manual Lever Recliner, Push-Button Motorized Recliner, or Electric Forward-Extending Sofa Cum Bed? Message us on WhatsApp and our factory team will send real clips and fabric swatch photos right away.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF4ED] space-y-1.5 text-xs text-[#333333]">
                <p>
                  <strong>WhatsApp &amp; Factory Phone:</strong> {WHATSAPP_DISPLAY}
                </p>
                <p>
                  <strong>Hours:</strong> Mon–Sun, 10:00 AM – 8:00 PM IST
                </p>
              </div>
              <a
                href={getWhatsAppUrl(
                  'Hello Zain Seating System, please send demonstration videos of your recliners and electric sofa-cum-bed.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Request Demo Video on WhatsApp ({WHATSAPP_DISPLAY})
              </a>
            </div>
          )}

          {type === 'custom' &&
            (customSubmitted ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#4CAF4F] mx-auto" />
                <p className="font-semibold text-[#131F2D]">Custom Spec Saved</p>
                <p className="text-xs text-[#515151]">
                  You can also tap below to send your custom build specs straight to our factory WhatsApp ({WHATSAPP_DISPLAY}) for an immediate quote.
                </p>
                <a
                  href={getWhatsAppUrl(
                    `Hello Zain Seating System, Custom Build Inquiry:\nCategory: ${customCategory}\nDimensions/Size: ${customDimensions}\nColor/Fabric: ${customColor}\nPhone: ${customPhone}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Spec to WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCustomSubmitted(true);
                }}
                className="space-y-3"
              >
                <p className="text-sm text-[#515151]">
                  Tell our manufacturing unit the exact product, shade, and dimensions you want built at factory-direct pricing.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1">
                    Product Line
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm bg-white focus:outline-none focus:border-[#E27A34]"
                  >
                    <option value="Custom Sofa Set">Custom Sofa Set / L-Shape</option>
                    <option value="Motorized Recliner">Motorized Push-Button Recliner</option>
                    <option value="Manual Recliner">Manual Lever Recliner</option>
                    <option value="Electric Sofa Cum Bed">Electric Extendable Sofa Cum Bed</option>
                    <option value="Modern Home Chair">Modernist Home Chair</option>
                  </select>
                </div>
                <input
                  type="text"
                  required
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="Preferred Color & Fabric (e.g. Emerald Velvet / Cognac Leatherette) *"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="Approx. Dimensions or Seaters (e.g. 9ft x 6ft L-Shape)"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <input
                  type="tel"
                  required
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="Your Phone / WhatsApp Number *"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#DCD4CB] text-sm focus:outline-none focus:border-[#E27A34]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold cursor-pointer"
                >
                  Prepare Custom Factory Quote
                </button>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
};
