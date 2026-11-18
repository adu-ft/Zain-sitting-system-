import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  HelpCircle,
  Menu,
  MessageCircle,
  PackageCheck,
  Palette,
  Phone,
  Search,
  ShoppingCart,
  X,
  ArrowRight,
} from 'lucide-react';
import type { CategoryKey, Product } from '../types';
import {
  BRAND_LOGO_HORIZONTAL,
  POPULAR_SEARCHES,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from '../data/catalog';
import { formatINR } from '../utils/format';

export type UtilityModalType = 'track' | 'help' | 'custom' | null;

interface HeaderProps {
  activeCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenQuickView: (product: Product) => void;
  onOpenUtilityModal: (modal: UtilityModalType) => void;
  onGoHome?: () => void;
  cartCount: number;
  wishlistCount: number;
  products: Product[];
}

const CATEGORY_BAR_ITEMS: Array<{ label: string; category: CategoryKey; sectionId?: string }> = [
  { label: 'All Factory Lines', category: 'All' },
  { label: 'Manual Recliners', category: 'Manual Recliners' },
  { label: 'Motorized Recliners', category: 'Motorized Recliners' },
  { label: 'Custom Sofa Sets', category: 'Sofa Sets' },
  { label: 'Electric Sofa Cum Beds', category: 'Electric Sofa Beds' },
  { label: 'Modern Home Chairs', category: 'Home Chairs' },
  { label: 'How It Works', category: 'All', sectionId: 'mechanisms' },
];

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  onOpenWishlist,
  onOpenCart,
  onOpenQuickView,
  onOpenUtilityModal,
  onGoHome,
  cartCount,
  wishlistCount,
  products,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeNavLabel, setActiveNavLabel] = useState<string>('All Factory Lines');
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = query.trim().toLowerCase();
  const matchedProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery) ||
          p.room.toLowerCase().includes(trimmedQuery) ||
          p.frameMaterial.toLowerCase().includes(trimmedQuery)
      )
    : products.slice(0, 4);

  const handleCategoryClick = (
    label: string,
    category: CategoryKey,
    sectionId?: string
  ) => {
    setActiveNavLabel(label);
    setIsMobileMenuOpen(false);
    if (sectionId) {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    onSelectCategory(category);
  };

  const mobileTabs: Array<{ label: string; category: CategoryKey; sectionId?: string }> = [
    { label: 'All', category: 'All' },
    { label: 'Manual', category: 'Manual Recliners' },
    { label: 'Motorized', category: 'Motorized Recliners' },
    { label: 'Sofa Sets', category: 'Sofa Sets' },
    { label: 'Sofa Beds', category: 'Electric Sofa Beds' },
    { label: 'Chairs', category: 'Home Chairs' },
  ];

  return (
    <>
      <header className="lg:sticky lg:top-0 z-40 bg-white border-b border-[#ECE6DF]">
        {/* Row 1: Factory Direct Utility Strip (Desktop) */}
        <div className="hidden lg:block border-b border-[#F1ECE6] bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between text-xs text-[#515151]">
            <div className="flex items-center gap-5">
              <span className="font-semibold text-[#E27A34] whitespace-nowrap">
                Direct Manufacturing Unit
              </span>
              <span className="text-[#DCD4CB]">|</span>
              <button
                type="button"
                onClick={() => onOpenUtilityModal('custom')}
                className="hover:text-[#E27A34] transition-colors cursor-pointer whitespace-nowrap"
              >
                Custom Color &amp; Size Inquiry
              </button>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={getWhatsAppUrl(
                  'Hello Zain Seating System, I would like to inquire about custom recliners / sofa sets.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#333333] hover:text-[#E27A34] font-medium tabular-nums whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#E27A34]" />
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
              <span className="text-[#DCD4CB]">|</span>
              <button
                type="button"
                onClick={() => onOpenUtilityModal('track')}
                className="inline-flex items-center gap-1.5 hover:text-[#E27A34] transition-colors cursor-pointer whitespace-nowrap"
              >
                <PackageCheck className="w-3.5 h-3.5" />
                Track Order
              </button>
              <span className="text-[#DCD4CB]">|</span>
              <button
                type="button"
                onClick={() => onOpenUtilityModal('help')}
                className="inline-flex items-center gap-1.5 hover:text-[#E27A34] transition-colors cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Factory Concierge
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Brand Wordmark + Desktop Search + Real Action Icons (Sticky on Mobile) */}
        <div className="sticky top-0 z-40 lg:static bg-white/95 backdrop-blur-md">
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 h-[52px] lg:h-auto lg:py-3 flex items-center justify-between gap-3 lg:gap-8">
            {/* Mobile Hamburger + Brand Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden min-h-[44px] min-w-[40px] flex items-center justify-center -ml-1.5 text-[#333333] hover:text-[#E27A34] cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  onGoHome?.();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="ZSS — Zain Seating System Home"
                className="flex items-center shrink-0 group focus:outline-none"
              >
                <div className="w-[152px] h-[44px] sm:w-[196px] sm:h-[52px] overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={BRAND_LOGO_HORIZONTAL}
                    alt="ZSS — Zain Seating System"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain scale-[1.15] mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.18]"
                  />
                </div>
                <span className="sr-only">ZSS — Zain Seating System</span>
              </a>
            </div>

            {/* Center Wide Search Bar with Live Dropdown (Desktop & Tablet) */}
            <div
              ref={searchWrapperRef}
              className="hidden lg:block relative flex-1 max-w-[540px]"
            >
              <div className="flex items-center border border-[#D4CEC6] focus-within:border-[#E27A34] rounded-[4px] bg-white h-10 px-3.5 transition-colors">
                <input
                  type="text"
                  value={query}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder="Search Manual Recliners, Motorized, Custom Sofas..."
                  className="w-full text-sm text-[#333333] placeholder-[#8A8178] focus:outline-none bg-transparent"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="p-1 text-[#8A8178] hover:text-[#333333] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <Search className="w-4 h-4 text-[#515151] ml-2 shrink-0" />
              </div>

              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-[#ECE6DF] shadow-2xl p-4 z-50 max-h-[420px] overflow-y-auto space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#515151] mb-2">
                      Popular Factory Searches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCHES.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            onSelectCategory(item.category);
                          }}
                          className="px-2.5 py-1 rounded bg-[#FAF4ED] hover:bg-[#E27A34] hover:text-white text-xs text-[#333333] transition-colors cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#515151] mb-2">
                      {trimmedQuery
                        ? `Matching Designs (${matchedProducts.length})`
                        : 'Featured Seating Lines'}
                    </p>
                    {matchedProducts.length === 0 ? (
                      <p className="text-xs text-[#515151] py-3">
                        No designs matched &ldquo;{query}&rdquo;.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {matchedProducts.slice(0, 5).map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => {
                              setSearchFocused(false);
                              onOpenQuickView(product);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAF4ED] text-left transition-colors cursor-pointer"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-11 rounded object-cover shrink-0 bg-[#FAF4ED]"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-[#333333] truncate">
                                {product.name}
                              </p>
                              <p className="text-xs font-semibold text-[#E27A34] tabular-nums">
                                {formatINR(product.price)}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#8A8178]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1 lg:gap-6 shrink-0">
              <button
                type="button"
                onClick={() => onOpenUtilityModal('custom')}
                className="hidden lg:flex flex-col items-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors cursor-pointer"
              >
                <Palette className="w-[19px] h-[19px] stroke-[1.75]" />
                <span className="text-[11px] font-medium whitespace-nowrap">Customize</span>
              </button>

              <a
                href={getWhatsAppUrl(
                  'Hello Zain Seating System, I want to discuss a custom seating order.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex flex-col items-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors"
              >
                <MessageCircle className="w-[19px] h-[19px] stroke-[1.75]" />
                <span className="text-[11px] font-medium whitespace-nowrap">WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenWishlist}
                aria-label={`Wishlist (${wishlistCount})`}
                className="relative min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 flex flex-col items-center justify-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5 lg:w-[19px] lg:h-[19px] stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="lg:hidden absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E27A34] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {wishlistCount}
                  </span>
                )}
                <span className="hidden lg:inline text-[11px] font-medium whitespace-nowrap tabular-nums">
                  Wishlist ({wishlistCount})
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                aria-label={`Cart (${cartCount})`}
                className="relative min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 flex flex-col items-center justify-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 lg:w-[19px] lg:h-[19px] stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="lg:hidden absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#131F2D] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
                <span className="hidden lg:inline text-[11px] font-medium whitespace-nowrap tabular-nums">
                  Cart ({cartCount})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Width Search Bar + Quick Category Tabs (Exact App Layout) */}
        <div className="lg:hidden bg-white px-4 pt-1 pb-0">
          <div className="relative">
            <div className="flex items-center rounded-lg border border-[#E5DDD3] focus-within:border-[#E27A34] bg-[#FAFAFA] h-10 px-3.5 transition-colors">
              <input
                type="text"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search Recliners, Custom Sofas..."
                className="w-full text-xs sm:text-sm text-[#333333] placeholder-[#8A8178] focus:outline-none bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="p-1 text-[#8A8178]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <Search className="w-4 h-4 text-[#515151] ml-1.5 shrink-0" />
            </div>

            {searchFocused && (
              <div className="mt-1.5 bg-white rounded-xl border border-[#ECE6DF] shadow-xl p-3.5 space-y-3 max-h-72 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#515151]">
                    {trimmedQuery ? `Results (${matchedProducts.length})` : 'Quick Factory Picks'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="text-xs font-medium text-[#E27A34]"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-1.5">
                  {matchedProducts.slice(0, 4).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        onOpenQuickView(product);
                      }}
                      className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#FAF4ED] text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-10 rounded object-cover shrink-0 bg-[#FAF4ED]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#333333] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs font-semibold text-[#E27A34] tabular-nums">
                          {formatINR(product.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Horizontal Quick Filter Bar + 4-Grid Button */}
          <div className="flex items-center justify-between gap-2 mt-1.5 border-b border-[#F2ECE4]">
            <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide flex-1">
              {mobileTabs.map((tab) => {
                const isSelected = activeNavLabel === tab.label || (tab.label === 'All' && activeNavLabel === 'All Factory Lines');
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() =>
                      handleCategoryClick(tab.label, tab.category, tab.sectionId)
                    }
                    className={`whitespace-nowrap shrink-0 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#E27A34] text-[#222222] font-semibold'
                        : 'border-transparent text-[#515151]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="All factory categories"
              className="min-h-[40px] min-w-[36px] flex items-center justify-center text-[#515151] hover:text-[#E27A34] shrink-0 pl-1"
            >
              <svg viewBox="0 0 18 18" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="5.5" height="5.5" rx="1" />
                <rect x="10.5" y="2" width="5.5" height="5.5" rx="1" />
                <rect x="2" y="10.5" width="5.5" height="5.5" rx="1" />
                <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Row 3: Desktop Category Navigation Strip */}
        <nav
          aria-label="Seating category navigation"
          className="hidden lg:block border-t border-[#F4EFE9] bg-white"
        >
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-center gap-7 xl:gap-9 overflow-x-auto scrollbar-hide">
            {CATEGORY_BAR_ITEMS.map((item) => {
              const isSelected = activeNavLabel === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    handleCategoryClick(item.label, item.category, item.sectionId)
                  }
                  className={`whitespace-nowrap shrink-0 py-3 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#E27A34] text-[#E27A34]'
                      : 'border-transparent text-[#333333] hover:text-[#E27A34]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Slide Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 lg:hidden flex">
          <div className="w-72 bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#ECE6DF]">
                <div className="flex items-center">
                  <div className="w-[156px] h-[44px] overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={BRAND_LOGO_HORIZONTAL}
                      alt="ZSS — Zain Seating System"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain scale-[1.15] mix-blend-multiply"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 text-[#333333] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-4 space-y-1">
                {CATEGORY_BAR_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      handleCategoryClick(item.label, item.category, item.sectionId)
                    }
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeNavLabel === item.label
                        ? 'bg-[#FAF4ED] text-[#E27A34]'
                        : 'text-[#333333] hover:bg-[#FAF4ED]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE6DF] space-y-2">
              <a
                href={getWhatsAppUrl(
                  'Hello Zain Seating System, I would like a quote for custom seating.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp ({WHATSAPP_DISPLAY})
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenUtilityModal('track');
                }}
                className="w-full py-2.5 px-4 rounded-lg border border-[#DCD4CB] text-[#333333] text-sm font-medium cursor-pointer"
              >
                Track Order
              </button>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
};
