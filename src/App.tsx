/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { Header, type UtilityModalType } from './components/Header';
import { HeroAndPromo } from './components/HeroAndPromo';
import { CategoryExplorer } from './components/CategoryExplorer';
import { ShowroomBanner } from './components/ShowroomBanner';
import { TrendingProducts } from './components/TrendingProducts';
import { EditorialAndReviews } from './components/EditorialAndReviews';
import { BuyingGuideAndFooter } from './components/BuyingGuideAndFooter';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BrowseCatalogPage } from './components/BrowseCatalogPage';
import {
  CartDrawer,
  UtilityModal,
  WishlistDrawer,
} from './components/ModalsAndDrawers';
import { PRODUCTS } from './data/catalog';
import type { CartItem, CategoryKey, Product } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['zss-mirza-custom-sofa']);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBrowseAllOpen, setIsBrowseAllOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [utilityModal, setUtilityModal] = useState<UtilityModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  /* Smooth Gliding Wheel Experience (skips internal scrollable modals/drawers & reduced motion) */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;
    let isGliding = false;

    const stopGlide = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      isGliding = false;
    };

    const glide = () => {
      const diff = targetY - currentY;
      currentY += diff * 0.12;
      window.scrollTo({ top: currentY, behavior: 'instant' });

      if (Math.abs(diff) > 0.6) {
        rafId = window.requestAnimationFrame(glide);
      } else {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        stopGlide();
      }
    };

    const onWheel = (e: WheelEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (
        targetEl?.closest('[role="dialog"]') ||
        e.ctrlKey ||
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
      ) {
        return;
      }
      e.preventDefault();
      if (!isGliding) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY * 0.92));

      if (!isGliding) {
        isGliding = true;
        rafId = window.requestAnimationFrame(glide);
      }
    };

    const onScrollSync = () => {
      setShowBackToTop(window.scrollY > 360);
      if (!isGliding) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const onInterrupt = () => {
      if (isGliding) {
        stopGlide();
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScrollSync, { passive: true });
    window.addEventListener('touchstart', onInterrupt, { passive: true });
    window.addEventListener('keydown', onInterrupt, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScrollSync);
      window.removeEventListener('touchstart', onInterrupt);
      window.removeEventListener('keydown', onInterrupt);
      stopGlide();
    };
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (category: CategoryKey) => {
    setQuickViewProduct(null);
    setActiveCategory(category);
    if (!isBrowseAllOpen) {
      window.setTimeout(() => {
        scrollToCatalog();
      }, 40);
    }
  };

  const handleAddToCart = (
    product: Product,
    finishName: string,
    unitPrice?: number,
    customNote?: string
  ) => {
    const finalPrice = unitPrice ?? product.price;
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.finishName === finishName &&
          item.customNote === customNote
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.finishName === finishName &&
          item.customNote === customNote
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        { product, finishName, customNote, unitPrice: finalPrice, quantity: 1 },
      ];
    });
    setToastMessage(`Added ${product.name} (${finishName}) to bag`);
  };

  const handleUpdateQty = (
    productId: string,
    finishName: string,
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.finishName === finishName
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, finishName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.finishName === finishName)
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      setToastMessage(exists ? 'Removed from saved seating' : 'Saved to wishlist');
      return next;
    });
  };

  const handleMoveWishlistToBag = (product: Product) => {
    const defaultFinish = product.finishes[0]?.name ?? 'Standard';
    handleAddToCart(product, defaultFinish);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#333333]">
        {/* Top Gliding Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-[#E27A34] origin-left z-50 pointer-events-none"
        />

        <Header
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenQuickView={(product) => setQuickViewProduct(product)}
          onOpenUtilityModal={(modal) => setUtilityModal(modal)}
          onGoHome={() => {
            setQuickViewProduct(null);
            setIsBrowseAllOpen(false);
          }}
          cartCount={totalCartItems}
          wishlistCount={wishlistIds.length}
          products={PRODUCTS}
        />

        <main className="flex-1">
          {quickViewProduct ? (
            <>
              <ProductDetailPage
                product={quickViewProduct}
                allProducts={PRODUCTS}
                isWishlisted={wishlistIds.includes(quickViewProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onSelectProduct={(product) => setQuickViewProduct(product)}
                onBack={() => setQuickViewProduct(null)}
              />
              <BuyingGuideAndFooter
                onSelectCategory={handleSelectCategory}
                onOpenUtilityModal={(modal) => setUtilityModal(modal)}
              />
            </>
          ) : isBrowseAllOpen ? (
            <>
              <BrowseCatalogPage
                products={PRODUCTS}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onOpenProduct={(product) => setQuickViewProduct(product)}
                onAddToCart={handleAddToCart}
                onBackHome={() => setIsBrowseAllOpen(false)}
              />
              <BuyingGuideAndFooter
                onSelectCategory={handleSelectCategory}
                onOpenUtilityModal={(modal) => setUtilityModal(modal)}
              />
            </>
          ) : (
            <>
              <HeroAndPromo onSelectCategory={handleSelectCategory} />

              <TrendingProducts
                products={PRODUCTS}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onOpenQuickView={(product) => setQuickViewProduct(product)}
                onAddToCart={handleAddToCart}
                onOpenBrowseAll={() => setIsBrowseAllOpen(true)}
              />

              <ShowroomBanner onOpenCustomModal={() => setUtilityModal('custom')} />

              <CategoryExplorer onSelectCategory={handleSelectCategory} />

              <EditorialAndReviews
                products={PRODUCTS}
                onSelectCategory={handleSelectCategory}
                onOpenQuickView={(product) => setQuickViewProduct(product)}
              />

              <BuyingGuideAndFooter
                onSelectCategory={handleSelectCategory}
                onOpenUtilityModal={(modal) => setUtilityModal(modal)}
              />
            </>
          )}
        </main>

        {/* Modals & Drawers */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCart([])}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onMoveToBag={handleMoveWishlistToBag}
        />

        <UtilityModal
          type={utilityModal}
          onClose={() => setUtilityModal(null)}
        />

        {/* Floating Back to Top Button (Theme Matched) */}
        {showBackToTop && (
          <div className="fixed bottom-5 right-5 z-40">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="w-11 h-11 rounded-full bg-[#131F2D] hover:bg-[#E27A34] text-white shadow-lg flex flex-col items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[8px] font-bold tracking-wider">TOP</span>
            </motion.button>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#131F2D] text-white text-xs sm:text-sm font-medium shadow-xl border border-white/10"
          >
            <CheckCircle2 className="w-4 h-4 text-[#4CAF4F] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
