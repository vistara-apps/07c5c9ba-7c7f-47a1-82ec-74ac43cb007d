'use client';

import { useState } from 'react';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { ShareButtonProps } from '@/types';
import { cn, copyToClipboard } from '@/utils/helpers';

export function ShareButton({
  variant = 'withText',
  shareData,
  onShare,
}: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsShared(true);
        onShare?.();
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback to showing options
      setShowOptions(true);
    }
  };

  const handleCopyLink = async () => {
    const textToShare = `${shareData.title}\n\n${shareData.text}${shareData.url ? `\n\n${shareData.url}` : ''}`;
    const success = await copyToClipboard(textToShare);
    
    if (success) {
      setIsShared(true);
      onShare?.();
      setTimeout(() => setIsShared(false), 2000);
    }
    setShowOptions(false);
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook') => {
    const text = encodeURIComponent(`${shareData.title} - ${shareData.text}`);
    const url = encodeURIComponent(shareData.url || window.location.href);
    
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowOptions(false);
    onShare?.();
  };

  const isIconOnly = variant === 'iconOnly';

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={handleNativeShare}
        className={cn(
          "inline-flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base",
          "border border-gray-300 hover:border-primary hover:bg-primary/5",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isShared && "bg-accent/10 border-accent text-accent",
          isIconOnly && "px-2"
        )}
      >
        {isShared ? (
          <>
            <Check className="w-4 h-4" />
            {!isIconOnly && <span>Shared!</span>}
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            {!isIconOnly && <span>Share</span>}
          </>
        )}
      </button>

      {/* Share Options Modal */}
      {showOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/20" 
            onClick={() => setShowOptions(false)}
          />
          
          {/* Modal */}
          <div className="absolute top-full right-0 z-50 mt-2 w-64 bg-surface border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Share this information
              </h4>
              <p className="text-xs text-text-secondary">
                {shareData.title}
              </p>
            </div>

            <div className="space-y-2">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-base"
              >
                <Copy className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-primary">Copy to clipboard</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-base"
              >
                <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="text-sm text-text-primary">Share on Twitter</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-base"
              >
                <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span className="text-sm text-text-primary">Share on Facebook</span>
              </button>

              {/* External Link */}
              {shareData.url && (
                <button
                  onClick={() => {
                    window.open(shareData.url, '_blank');
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-base"
                >
                  <ExternalLink className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-primary">Open link</span>
                </button>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowOptions(false)}
                className="w-full text-center text-xs text-text-secondary hover:text-text-primary transition-colors duration-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
