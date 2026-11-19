/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react';
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

interface ToastNotification {
  id: number;
  kicker: string;
  title: string;
  subtitle?: string;
  image?: string;
  actionType?: 'cart' | 'wishlist';
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['zss-mirza-custom-sofa']);
  const [activeProductView, setActiveProductView] = useState<{
    product: Product;
    finishName?: string;
    variantIdx?: number;
  } | null>(null);
  const [isBrowseAllOpen, setIsBrowseAllOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [utilityModal, setUtilityModal] = useState<UtilityModalType>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);
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
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openProductDetail = (
    product: Product,
    finishName?: string,
    variantIdx?: number
  ) => {
    setActiveProductView({ product, finishName, variantIdx });
  };

  const handleSelectCategory = (category: CategoryKey) => {
    setActiveProductView(null);
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
    customNote?: string,
    selectedImage?: string
  ) => {
    const finalPrice = unitPrice ?? product.price;
    const itemImage = selectedImage ?? product.image;
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
            ? { ...item, quantity: item.quantity + 1, selectedImage: itemImage }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          finishName,
          customNote,
          selectedImage: itemImage,
          unitPrice: finalPrice,
          quantity: 1,
        },
      ];
    });
    setToast({
      id: Date.now(),
      kicker: 'Added to Bag',
      title: product.name,
      subtitle: finishName,
      image: itemImage,
      actionType: 'cart',
    });
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
    const exists = wishlistIds.includes(productId);
    const matched = PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) =>
      exists ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    setToast({
      id: Date.now(),
      kicker: exists ? 'Removed from Saved' : 'Saved to Wishlist',
      title: matched?.name ?? 'Seating Design',
      subtitle: matched?.category,
      image: matched?.image,
      actionType: exists ? undefined : 'wishlist',
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
      <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-white text-[#333333]">
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
          onOpenQuickView={(product) => openProductDetail(product)}
          onOpenUtilityModal={(modal) => setUtilityModal(modal)}
          onGoHome={() => {
            setActiveProductView(null);
            setIsBrowseAllOpen(false);
          }}
          cartCount={totalCartItems}
          wishlistCount={wishlistIds.length}
          products={PRODUCTS}
        />

        <main className="flex-1 min-w-0 w-full overflow-x-clip">
          {activeProductView ? (
            <>
              <ProductDetailPage
                product={activeProductView.product}
                initialFinishName={activeProductView.finishName}
                initialVariantIdx={activeProductView.variantIdx}
                allProducts={PRODUCTS}
                isWishlisted={wishlistIds.includes(activeProductView.product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onSelectProduct={(product) => openProductDetail(product)}
                onBack={() => setActiveProductView(null)}
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
                onOpenProduct={openProductDetail}
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
                onOpenQuickView={openProductDetail}
                onAddToCart={handleAddToCart}
                onOpenBrowseAll={() => setIsBrowseAllOpen(true)}
              />

              <ShowroomBanner onOpenCustomModal={() => setUtilityModal('custom')} />

              <CategoryExplorer onSelectCategory={handleSelectCategory} />

              <EditorialAndReviews
                products={PRODUCTS}
                onSelectCategory={handleSelectCategory}
                onOpenQuickView={(product) => openProductDetail(product)}
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

        {/* Brand-Matched Editorial Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] sm:top-20 right-3 left-3 sm:left-auto sm:w-[360px] z-50 rounded-xl bg-[#FDFCFA] border border-[#E2D6C8] shadow-[0_14px_34px_rgba(19,31,45,0.14)] overflow-hidden"
            >
              <div className="p-3 flex items-center gap-3">
                {toast.image && (
                  <img
                    src={toast.image}
                    alt={toast.title}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-cover border border-[#EAE0D4] bg-[#FAF4ED] shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E27A34] leading-none">
                    {toast.kicker}
                  </p>
                  <p className="text-xs sm:text-[13px] font-semibold text-[#131F2D] truncate mt-1">
                    {toast.title}
                  </p>
                  {toast.subtitle && (
                    <p className="text-[11px] text-[#515151] truncate mt-0.5">
                      {toast.subtitle}
                    </p>
                  )}
                </div>

                {toast.actionType && (
                  <button
                    type="button"
                    onClick={() => {
                      const target = toast.actionType;
                      setToast(null);
                      if (target === 'cart') setIsCartOpen(true);
                      if (target === 'wishlist') setIsWishlistOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#FAF4ED] hover:bg-[#E27A34] text-[#131F2D] hover:text-white border border-[#E5D7C6] text-[11px] font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <span>{toast.actionType === 'cart' ? 'View Bag' : 'Saved'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setToast(null)}
                  aria-label="Dismiss notification"
                  className="w-6 h-6 rounded-md text-[#78716A] hover:text-[#131F2D] hover:bg-[#FAF4ED] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3.2, ease: 'linear' }}
                className="h-[2.5px] bg-[#E27A34] origin-left"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
