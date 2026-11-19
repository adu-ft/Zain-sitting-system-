import React, { useState } from 'react';
import { Download, Share, WifiOff, X } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header-icon' | 'menu-button';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header-icon',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    if (variant === 'menu-button') {
      return (
        <button
          type="button"
          onClick={() => void install()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#131F2D] hover:bg-[#1E2E42] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#E27A34]" />
          Install App (Faster Loads)
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => void install()}
        className="hidden lg:flex flex-col items-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors cursor-pointer"
      >
        <Download className="w-[19px] h-[19px] stroke-[1.75]" />
        <span className="text-[11px] font-medium whitespace-nowrap">
          Install App
        </span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        {variant === 'menu-button' ? (
          <button
            type="button"
            onClick={() => setShowIOSGuide(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FAF4ED] border border-[#E5D7C6] text-[#131F2D] text-sm font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E27A34]" />
            Add to Home Screen
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowIOSGuide(true)}
            className="hidden lg:flex flex-col items-center gap-0.5 text-[#333333] hover:text-[#E27A34] transition-colors cursor-pointer"
          >
            <Download className="w-[19px] h-[19px] stroke-[1.75]" />
            <span className="text-[11px] font-medium whitespace-nowrap">
              Save App
            </span>
          </button>
        )}

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Add Zain Seating System to Home Screen"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-[#FDFCFA] border border-[#E2D6C8] p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EFE6DA]">
                <h3 className="font-display text-base font-bold text-[#131F2D]">
                  Save Zain Seating on iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close instructions"
                  className="p-1 rounded-md text-[#78716A] hover:text-[#131F2D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-[#515151] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FAF4ED] border border-[#E5D7C6] text-[#E27A34] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Tap the{' '}
                    <strong className="inline-flex items-center gap-1 text-[#131F2D]">
                      <Share className="w-3.5 h-3.5" /> Share
                    </strong>{' '}
                    button in your Safari toolbar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FAF4ED] border border-[#E5D7C6] text-[#E27A34] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Scroll down and tap{' '}
                    <strong className="text-[#131F2D]">
                      Add to Home Screen
                    </strong>{' '}
                    for instant cached access.
                  </span>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-lg bg-[#131F2D] hover:bg-[#E27A34] py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-[#131F2D] border border-[#E27A34]/40 px-3 py-2 text-xs font-medium text-white shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#E27A34] shrink-0" />
      <span>Offline Mode — Showing cached catalog</span>
    </div>
  );
};
