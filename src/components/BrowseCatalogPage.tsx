import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Heart,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import type { CategoryKey, Product } from '../types';
import { calcDiscountPercent, formatINR } from '../utils/format';

interface BrowseCatalogPageProps {
  products: Product[];
  activeCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenProduct: (product: Product, finishName?: string, variantIdx?: number) => void;
  onAddToCart: (
    product: Product,
    finishName: string,
    unitPrice?: number,
    customNote?: string,
    selectedImage?: string
  ) => void;
  onBackHome: () => void;
}

const CATEGORIES: Array<{ key: CategoryKey; label: string }> = [
  { key: 'All', label: 'All Factory Lines' },
  { key: 'Manual Recliners', label: 'Manual Recliners' },
  { key: 'Motorized Recliners', label: 'Motorized Recliners' },
  { key: 'Revolving Recliners', label: 'Revolving Recliners' },
  { key: 'Sofa Sets', label: 'Custom Sofa Sets' },
  { key: 'Electric Sofa Beds', label: 'Electric Sofa Cum Beds' },
  { key: 'Home Chairs', label: 'Modern Home Chairs' },
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';
type MechanismFilter = 'All' | 'Manual Lever' | 'Motorized Push-Button' | 'Fixed / Static';
type PriceTier = 'all' | 'under-20k' | '20k-35k' | 'above-35k';

export const BrowseCatalogPage: React.FC<BrowseCatalogPageProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onOpenProduct,
  onAddToCart,
  onBackHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mechanismFilter, setMechanismFilter] = useState<MechanismFilter>('All');
  const [priceTier, setPriceTier] = useState<PriceTier>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const matchesMech =
        mechanismFilter === 'All' ||
        p.mechanism === mechanismFilter ||
        (p.mechanism === 'Both Options' &&
          (mechanismFilter === 'Manual Lever' || mechanismFilter === 'Motorized Push-Button'));
      const matchesPrice =
        priceTier === 'all' ||
        (priceTier === 'under-20k' && p.price < 20000) ||
        (priceTier === '20k-35k' && p.price >= 20000 && p.price <= 35000) ||
        (priceTier === 'above-35k' && p.price > 35000);
      const matchesRating = p.rating >= minRating;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.finishes[0]?.name.toLowerCase().includes(q) ?? false);

      return matchesCat && matchesMech && matchesPrice && matchesRating && matchesQuery;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [products, activeCategory, mechanismFilter, priceTier, minRating, searchQuery, sortBy]);

  const activeFilterCount =
    (activeCategory !== 'All' ? 1 : 0) +
    (mechanismFilter !== 'All' ? 1 : 0) +
    (priceTier !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    onSelectCategory('All');
    setMechanismFilter('All');
    setPriceTier('all');
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  const FilterPanelContent = () => (
    <div className="space-y-5">
      {/* Search inside Catalog */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] mb-2">
          Search Models
        </p>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DCD4CB] bg-white focus-within:border-[#E27A34]">
          <Search className="w-4 h-4 text-[#78716A] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name, fabric, size..."
            className="w-full text-xs text-[#333333] placeholder-[#8A8178] bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="text-[#8A8178] hover:text-[#131F2D] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="pt-4 border-t border-[#ECE2D5]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] mb-2.5">
          Category
        </p>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onSelectCategory(cat.key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#131F2D] text-white'
                    : 'bg-white hover:bg-[#FAF4ED] text-[#333333] border border-[#EDE5DC]'
                }`}
              >
                <span className="truncate">{cat.label}</span>
                <span
                  className={`text-[11px] tabular-nums ${
                    isActive ? 'text-[#E27A34] font-bold' : 'text-[#78716A]'
                  }`}
                >
                  {categoryCounts[cat.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action / Mechanism */}
      <div className="pt-4 border-t border-[#ECE2D5]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] mb-2.5">
          Mechanism Type
        </p>
        <div className="space-y-1.5">
          {(
            [
              { key: 'All', label: 'All Actions' },
              { key: 'Motorized Push-Button', label: 'Motorized Push-Button' },
              { key: 'Manual Lever', label: 'Manual Side Lever' },
              { key: 'Fixed / Static', label: 'Static / Custom Fixed' },
            ] as const
          ).map((mech) => (
            <label
              key={mech.key}
              className="flex items-center gap-2.5 text-xs text-[#333333] cursor-pointer py-1"
            >
              <input
                type="radio"
                name="browse-mech"
                checked={mechanismFilter === mech.key}
                onChange={() => setMechanismFilter(mech.key)}
                className="accent-[#E27A34] cursor-pointer"
              />
              <span>{mech.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Tier */}
      <div className="pt-4 border-t border-[#ECE2D5]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] mb-2.5">
          Price Range
        </p>
        <div className="space-y-1.5">
          {(
            [
              { key: 'all', label: 'All Budgets' },
              { key: 'under-20k', label: 'Under ₹20,000' },
              { key: '20k-35k', label: '₹20,000 – ₹35,000' },
              { key: 'above-35k', label: '₹35,000 & Above' },
            ] as const
          ).map((tier) => (
            <label
              key={tier.key}
              className="flex items-center gap-2.5 text-xs text-[#333333] cursor-pointer py-1"
            >
              <input
                type="radio"
                name="browse-price"
                checked={priceTier === tier.key}
                onChange={() => setPriceTier(tier.key)}
                className="accent-[#E27A34] cursor-pointer"
              />
              <span>{tier.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buyer Rating */}
      <div className="pt-4 border-t border-[#ECE2D5]">
        <p className="text-xs font-bold uppercase tracking-wider text-[#131F2D] mb-2.5">
          Customer Rating
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { val: 0, label: 'All' },
            { val: 4.7, label: '4.7 ★+' },
            { val: 4.8, label: '4.8 ★+' },
          ].map((opt) => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setMinRating(opt.val)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                minRating === opt.val
                  ? 'bg-[#E27A34] text-white'
                  : 'bg-white border border-[#DCD4CB] text-[#333333] hover:border-[#E27A34]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#131F2D] text-[#131F2D] hover:bg-[#131F2D] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#FAF4ED]/45 min-h-screen pb-14 w-full max-w-full overflow-x-clip">
      {/* Sticky Breadcrumb & Page Top Bar */}
      <div className="bg-[#FAF4ED] border-b border-[#ECE2D5] sticky top-[56px] sm:top-[64px] z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2DAD1] hover:border-[#E27A34] text-xs font-semibold text-[#131F2D] hover:text-[#E27A34] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-[#78716A] truncate">
              <button type="button" onClick={onBackHome} className="hover:text-[#E27A34] cursor-pointer">
                Home
              </button>
              <span>/</span>
              <span className="text-[#131F2D] font-semibold">Browse All Seating</span>
              {activeCategory !== 'All' && (
                <>
                  <span>/</span>
                  <span className="text-[#E27A34] font-semibold">{activeCategory}</span>
                </>
              )}
            </nav>
          </div>

          <span className="text-xs font-semibold text-[#515151] tabular-nums shrink-0">
            Showing <strong className="text-[#131F2D]">{filteredProducts.length}</strong> of {products.length} designs
          </span>
        </div>
      </div>

      {/* Compact Direct-Factory Catalog Banner */}
      <div className="bg-white border-b border-[#ECE6DF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E27A34]">
              Zain Seating System · Complete Catalog
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#131F2D] tracking-tight mt-1">
              Browse All Recliners, Custom Sofas &amp; Chairs
            </h1>
            <p className="text-xs sm:text-sm text-[#515151] mt-1">
              Factory-direct pricing with 20+ custom upholstery shades, size tailoring, and Pan-India insured delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px] sm:text-xs font-medium text-[#333333]">
            <span className="px-2.5 py-1.5 rounded-lg bg-[#FAF4ED] border border-[#ECE2D5]">
              5-Yr Frame Warranty
            </span>
            <span className="px-2.5 py-1.5 rounded-lg bg-[#FAF4ED] border border-[#ECE2D5]">
              Custom Colors
            </span>
            <span className="px-2.5 py-1.5 rounded-lg bg-[#FAF4ED] border border-[#ECE2D5]">
              Factory Direct
            </span>
          </div>
        </div>
      </div>

      {/* Main Catalog Workspace: Sidebar Filters + Multi-Column Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-[#ECE6DF] p-5 sticky top-[120px]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EAE2]">
              <h2 className="font-display text-base font-bold text-[#131F2D] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#E27A34]" />
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[11px] font-semibold text-[#E27A34] hover:text-[#C96625] cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
            <FilterPanelContent />
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 min-w-0 space-y-4">
            {/* Controls Bar (Mobile Filter Button + Quick Category Pills + Sort) */}
            <div className="bg-white rounded-xl border border-[#ECE6DF] p-3 flex flex-wrap items-center justify-between gap-2.5 max-w-full overflow-x-clip">
              <div className="flex items-center gap-2 flex-wrap min-w-0 max-w-full">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#131F2D] text-white text-xs font-semibold cursor-pointer shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#E27A34]" />
                  Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </button>

                <div className="flex items-center gap-1.5 overflow-x-auto overscroll-x-contain max-w-full min-w-0 scrollbar-hide">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => onSelectCategory(cat.key)}
                        className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#E27A34] text-white'
                            : 'bg-[#FAF4ED] text-[#515151] hover:text-[#131F2D]'
                        }`}
                      >
                        {cat.key === 'All' ? 'All' : cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <label htmlFor="browse-sort" className="text-[11px] text-[#78716A] font-medium hidden sm:inline">
                  Sort by:
                </label>
                <select
                  id="browse-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#DCD4CB] bg-[#FAFAFA] text-xs font-medium text-[#131F2D] focus:outline-none focus:border-[#E27A34] cursor-pointer"
                >
                  <option value="featured">Featured Craft</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid Results */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#ECE6DF] py-16 px-6 text-center">
                <p className="font-display text-xl font-semibold text-[#131F2D]">
                  No products match your selected filters
                </p>
                <p className="text-xs sm:text-sm text-[#515151] mt-1.5">
                  Reset filters to view all Zain Seating direct-factory designs.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-4 px-5 py-2.5 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Show All {products.length} Designs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const activeFinishObj = product.finishes[0];
                  const activeFinish = activeFinishObj?.name ?? 'Standard';
                  const activeImage = product.image;
                  const finalPrice = product.price;
                  const finalMrp = product.mrp;
                  const discountPct = calcDiscountPercent(finalPrice, finalMrp);

                  return (
                    <article
                      key={product.id}
                      className="group flex flex-col rounded-xl bg-white border border-[#ECE6DF] hover:border-[#DECBB8] hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full bg-[#FAF4ED] overflow-hidden">
                        <img
                          src={activeImage}
                          alt={`${product.name} — ${activeFinish}`}
                          referrerPolicy="no-referrer"
                          decoding="async"
                          onClick={() => onOpenProduct(product, activeFinish)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350 ease-out cursor-pointer"
                        />
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(product.id)}
                          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted ? 'fill-[#E27A34] text-[#E27A34]' : 'text-[#333333]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#78716A]">
                              {product.category}
                            </span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FAF4ED] text-[11px] font-bold text-[#131F2D] tabular-nums">
                              <Star className="w-3 h-3 fill-[#E27A34] text-[#E27A34]" />
                              {product.rating.toFixed(1)}
                              <span className="text-[10px] font-normal text-[#78716A]">
                                ({product.reviewCount})
                              </span>
                            </span>
                          </div>

                          <h3
                            onClick={() => onOpenProduct(product, activeFinish)}
                            className="font-display text-base font-semibold text-[#131F2D] leading-snug hover:text-[#E27A34] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-[#515151] mt-1 line-clamp-2">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Price + Action Buttons */}
                        <div className="pt-3 border-t border-[#F2ECE4]">
                          <div className="flex items-baseline justify-between gap-2 mb-2.5">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="text-base sm:text-lg font-bold text-[#131F2D] tabular-nums">
                                {formatINR(finalPrice)}
                              </span>
                              <span className="text-xs text-[#8A8178] line-through tabular-nums">
                                {formatINR(finalMrp)}
                              </span>
                              {discountPct > 0 && (
                                <span className="text-[11px] font-semibold text-[#4CAF4F]">
                                  {discountPct}% off
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#4CAF4F] font-semibold shrink-0">
                              Custom Size
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenProduct(product, activeFinish)}
                              className="min-h-[38px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#DCD4CB] hover:border-[#131F2D] text-xs font-semibold text-[#131F2D] transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Full Details
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onAddToCart(
                                  product,
                                  activeFinish,
                                  finalPrice,
                                  undefined,
                                  activeImage
                                )
                              }
                              className="min-h-[38px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#E27A34] hover:bg-[#C96625] text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Catalog Filters"
        >
          <div
            className="w-full max-w-xs bg-[#FAF4ED] h-full overflow-y-auto p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DDD3]">
              <h2 className="font-display text-base font-bold text-[#131F2D] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#E27A34]" />
                Filter Catalog
              </h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
                className="w-8 h-8 rounded-full bg-white border border-[#DCD4CB] flex items-center justify-center text-[#131F2D] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <FilterPanelContent />

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-6 w-full py-2.5 rounded-lg bg-[#131F2D] text-white text-xs font-semibold cursor-pointer"
            >
              Show {filteredProducts.length} Designs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
