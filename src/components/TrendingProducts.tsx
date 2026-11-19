import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Heart, Search, ShoppingBag, Star, X } from 'lucide-react';
import type { CategoryKey, Product } from '../types';
import { calcDiscountPercent, formatINR } from '../utils/format';

interface TrendingProductsProps {
  products: Product[];
  activeCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenQuickView: (product: Product, finishName?: string, variantIdx?: number) => void;
  onAddToCart: (
    product: Product,
    finishName: string,
    unitPrice?: number,
    customNote?: string,
    selectedImage?: string
  ) => void;
  onOpenBrowseAll?: () => void;
}

const PRODUCT_TABS: Array<{ key: CategoryKey; label: string }> = [
  { key: 'All', label: 'All Factory Lines' },
  { key: 'Manual Recliners', label: 'Manual Recliners' },
  { key: 'Motorized Recliners', label: 'Motorized Recliners' },
  { key: 'Sofa Sets', label: 'Custom Sofa Sets' },
  { key: 'Electric Sofa Beds', label: 'Electric Sofa Cum Beds' },
  { key: 'Home Chairs', label: 'Modern Home Chairs' },
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';
type MechanismFilter = 'All' | 'Manual Lever' | 'Motorized Push-Button' | 'Fixed / Static';

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
  onOpenBrowseAll,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [mechanismFilter, setMechanismFilter] = useState<MechanismFilter>('All');
  const [selectedFinishes, setSelectedFinishes] = useState<Record<string, string>>({});
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<Record<string, number>>({});
  const [selectedCardImages, setSelectedCardImages] = useState<Record<string, string>>({});
  const productRailRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: 'left' | 'right') => {
    if (!productRailRef.current) return;
    productRailRef.current.scrollBy({
      left: dir === 'right' ? 320 : -320,
      behavior: 'smooth',
    });
  };

  const filteredProducts = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    const base = products.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesMech =
        mechanismFilter === 'All' ||
        p.mechanism === mechanismFilter ||
        (p.mechanism === 'Both Options' &&
          (mechanismFilter === 'Manual Lever' || mechanismFilter === 'Motorized Push-Button'));
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.finishes.some((f) => f.name.toLowerCase().includes(q)) ||
        p.variants.some((v) => v.label.toLowerCase().includes(q));
      return matchesCat && matchesMech && matchesQuery;
    });

    const copy = [...base];
    if (sortBy === 'price-asc') copy.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') copy.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') copy.sort((a, b) => b.rating - a.rating);
    return copy;
  }, [products, activeCategory, mechanismFilter, catalogSearch, sortBy]);

  return (
    <section id="catalog" className="pt-5 pb-10 lg:pt-8 lg:pb-12 bg-white w-full max-w-full overflow-x-clip">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header & Dynamic Catalog Controls */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 mb-6 pb-5 border-b border-[#ECE6DF]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E27A34] mb-1">
              Dynamic Factory Catalog · {filteredProducts.length} of {products.length} Designs
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#333333] tracking-tight">
              Recliners, Custom Sofas &amp; Home Chairs
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full xl:w-auto min-w-0">
            {/* Live Catalog Filter Input */}
            <div className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2DAD1] bg-[#FAFAFA] focus-within:border-[#E27A34] w-full sm:w-56 min-w-0">
              <Search className="w-4 h-4 text-[#78716A] shrink-0" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Filter by model, fabric, size..."
                className="w-full min-w-0 text-xs sm:text-sm text-[#333333] placeholder-[#8A8178] bg-transparent focus:outline-none"
              />
              {catalogSearch && (
                <button
                  type="button"
                  onClick={() => setCatalogSearch('')}
                  aria-label="Clear filter"
                  className="text-[#8A8178] hover:text-[#333333] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown (Replaces Horizontal Category Tabs) */}
            <select
              id="category-seating"
              aria-label="Filter by category"
              value={activeCategory}
              onChange={(e) => onSelectCategory(e.target.value as CategoryKey)}
              className="col-span-2 sm:col-span-1 w-full max-w-full sm:w-auto min-w-0 px-3 py-2 rounded-lg border border-[#E27A34]/45 bg-[#FAF4ED] text-xs sm:text-sm font-semibold text-[#131F2D] focus:outline-none focus:border-[#E27A34] cursor-pointer"
            >
              {PRODUCT_TABS.map((tab) => (
                <option key={tab.key} value={tab.key}>
                  {tab.label}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by mechanism"
              value={mechanismFilter}
              onChange={(e) => setMechanismFilter(e.target.value as MechanismFilter)}
              className="w-full max-w-full sm:w-auto min-w-0 px-2.5 sm:px-3 py-2 rounded-lg border border-[#E2DAD1] bg-[#FAFAFA] text-xs sm:text-sm font-medium text-[#333333] focus:outline-none focus:border-[#E27A34] cursor-pointer"
            >
              <option value="All">All Actions</option>
              <option value="Motorized Push-Button">Motorized Push-Button</option>
              <option value="Manual Lever">Manual Side Lever</option>
              <option value="Fixed / Static">Static / Custom Fixed</option>
            </select>

            <select
              id="sort-seating"
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full max-w-full sm:w-auto min-w-0 px-2.5 sm:px-3 py-2 rounded-lg border border-[#E2DAD1] bg-[#FAFAFA] text-xs sm:text-sm font-medium text-[#333333] focus:outline-none focus:border-[#E27A34] cursor-pointer"
            >
              <option value="featured">Featured Craft</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Empty State for Dynamic Search / Filter */}
        {filteredProducts.length === 0 ? (
          <div className="py-14 px-6 text-center rounded-2xl bg-[#FAF4ED] border border-[#ECE2D5]">
            <p className="font-display text-xl font-semibold text-[#333333]">
              No matching factory designs found
            </p>
            <p className="text-sm text-[#515151] mt-1.5">
              Try clearing your filter—or message us for a custom build tailored to your exact specs.
            </p>
            <button
              type="button"
              onClick={() => {
                setCatalogSearch('');
                setMechanismFilter('All');
                onSelectCategory('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Reset Catalog Filters
            </button>
          </div>
        ) : (
          <>
          {/* Compact Horizontal Scrolling Product Rail */}
          <div
            ref={productRailRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain max-w-full scrollbar-hide snap-x scroll-smooth pb-2 pr-3 sm:pr-0"
          >
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const activeFinish =
                selectedFinishes[product.id] ?? product.finishes[0]?.name ?? 'Standard';
              const activeFinishObj =
                product.finishes.find((f) => f.name === activeFinish) ?? product.finishes[0];
              const vIdx = selectedVariantIdx[product.id] ?? 0;
              const activeVariant = product.variants[vIdx] ?? product.variants[0];
              const activeImage =
                selectedCardImages[product.id] ??
                activeFinishObj?.image ??
                activeVariant?.image ??
                product.image;
              const cardImages = Array.from(
                new Set(
                  [
                    product.image,
                    ...product.finishes.map((f) => f.image),
                    ...product.variants.map((v) => v.image),
                  ].filter((img): img is string => Boolean(img))
                )
              );
              const finalPrice = Math.max(9999, product.price + (activeVariant?.priceDelta ?? 0));
              const finalMrp = Math.max(finalPrice + 6000, product.mrp + (activeVariant?.priceDelta ?? 0));
              const discountPct = calcDiscountPercent(finalPrice, finalMrp);

              return (
                <article
                  key={product.id}
                  className="w-[218px] sm:w-[242px] lg:w-[258px] shrink-0 snap-start group flex flex-col rounded-xl bg-white border border-[#ECE6DF] hover:border-[#DECBB8] hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* Compact Media (Blended Color & Variant Crossfade) */}
                  <div className="relative aspect-[4/3] w-full bg-[#FAF4ED] overflow-hidden">
                    {cardImages.map((imgUrl) => {
                      const isCurrent = imgUrl === activeImage;
                      return (
                        <img
                          key={imgUrl}
                          src={imgUrl}
                          alt={`${product.name} — ${activeFinish}`}
                          referrerPolicy="no-referrer"
                          decoding="async"
                          onClick={() => onOpenQuickView(product, activeFinish, vIdx)}
                          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-350 ease-out cursor-pointer ${
                            isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        />
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted
                            ? 'fill-[#E27A34] text-[#E27A34]'
                            : 'text-[#333333]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Compact Body */}
                  <div className="p-3 flex flex-col flex-1 justify-between gap-2.5">
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-0.5">
                        <p className="text-[10px] uppercase tracking-wider text-[#78716A] truncate">
                          {product.category}
                        </p>
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#333333] tabular-nums shrink-0">
                          <Star className="w-3 h-3 fill-[#E27A34] text-[#E27A34]" />
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      <h3
                        onClick={() => onOpenQuickView(product, activeFinish, vIdx)}
                        className="font-display text-sm font-semibold text-[#131F2D] leading-snug line-clamp-2 hover:text-[#E27A34] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Compact Variant Select */}
                      {product.variants.length > 0 && (
                        <div className="mt-2">
                          <label className="sr-only" htmlFor={`var-${product.id}`}>
                            Select variant
                          </label>
                          <select
                            id={`var-${product.id}`}
                            value={vIdx}
                            onChange={(e) => {
                              const nextIdx = Number(e.target.value);
                              setSelectedVariantIdx((prev) => ({
                                ...prev,
                                [product.id]: nextIdx,
                              }));
                              const nextImg = product.variants[nextIdx]?.image;
                              if (nextImg) {
                                setSelectedCardImages((prev) => ({
                                  ...prev,
                                  [product.id]: nextImg,
                                }));
                              }
                            }}
                            className="w-full px-2 py-1 rounded border border-[#E6DDD2] bg-[#FAF4ED]/65 text-[11px] font-medium text-[#333333] focus:outline-none focus:border-[#E27A34] cursor-pointer"
                          >
                            {product.variants.map((variant, i) => (
                              <option key={variant.label} value={i}>
                                {variant.label}
                                {variant.priceDelta > 0
                                  ? ` (+${formatINR(variant.priceDelta)})`
                                  : variant.priceDelta < 0
                                  ? ` (-${formatINR(Math.abs(variant.priceDelta))})`
                                  : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Compact Finish Color Swatches */}
                      <div className="flex items-center gap-1.5 mt-2">
                        {product.finishes.map((fin) => {
                          const isPicked = activeFinish === fin.name;
                          return (
                            <button
                              key={fin.name}
                              type="button"
                              title={fin.name}
                              aria-label={`Select ${fin.name}`}
                              onClick={() => {
                                setSelectedFinishes((prev) => ({
                                  ...prev,
                                  [product.id]: fin.name,
                                }));
                                if (fin.image) {
                                  setSelectedCardImages((prev) => ({
                                    ...prev,
                                    [product.id]: fin.image!,
                                  }));
                                }
                              }}
                              className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                                isPicked
                                  ? 'ring-2 ring-offset-1 ring-[#333333] scale-110'
                                  : 'border-black/20 hover:scale-110'
                              }`}
                              style={{ backgroundColor: fin.swatchHex }}
                            />
                          );
                        })}
                        <span className="text-[10px] text-[#515151] truncate">
                          {activeFinish}
                        </span>
                      </div>
                    </div>

                    {/* Compact Pricing & Actions */}
                    <div className="pt-2.5 border-t border-[#F2EDE7]">
                      <div className="flex items-baseline gap-1.5 flex-wrap mb-2">
                        <span className="text-sm sm:text-base font-bold text-[#131F2D] tabular-nums">
                          {formatINR(finalPrice)}
                        </span>
                        <span className="text-[11px] text-[#8A8178] line-through tabular-nums">
                          {formatINR(finalMrp)}
                        </span>
                        {discountPct > 0 && (
                          <span className="text-[10.5px] font-semibold text-[#4CAF4F] tabular-nums">
                            {discountPct}% off
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenQuickView(product, activeFinish, vIdx)}
                          className="min-h-[34px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg border border-[#DCD4CB] hover:border-[#333333] text-[11px] font-semibold text-[#333333] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Eye className="w-3 h-3" />
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onAddToCart(
                              product,
                              activeVariant
                                ? `${activeFinish} · ${activeVariant.label}`
                                : activeFinish,
                              finalPrice,
                              undefined,
                              activeImage
                            )
                          }
                          className="min-h-[34px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {onOpenBrowseAll && (
              <button
                type="button"
                onClick={onOpenBrowseAll}
                className="w-[180px] sm:w-[205px] shrink-0 snap-start rounded-xl bg-[#FAF4ED] border-2 border-dashed border-[#DFCDB9] hover:border-[#E27A34] hover:bg-[#F5E9DB] p-5 flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#131F2D]">
                    View All Products
                  </p>
                  <p className="text-[11px] text-[#515151] mt-0.5">
                    Browse all {products.length} factory designs &amp; filters
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E27A34]">
                  Open Full Catalog
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            )}
          </div>

          {/* Bottom-Right Product Rail Navigation & View All Bar */}
          <div className="mt-3 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => scrollRail('left')}
              aria-label="Scroll products left"
              className="w-8 h-8 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/70 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail('right')}
              aria-label="Scroll products right"
              className="w-8 h-8 rounded-full border border-[#E2DAD1] bg-[#FAF4ED]/70 hover:bg-[#FAF4ED] text-[#333333] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {onOpenBrowseAll && (
              <button
                type="button"
                onClick={onOpenBrowseAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#131F2D] hover:bg-[#E27A34] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ml-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          </>
        )}
      </div>
    </section>
  );
};
