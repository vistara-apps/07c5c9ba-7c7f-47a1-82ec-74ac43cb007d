'use client';

import { useState } from 'react';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ShareButtonProps {
  content: string;
  variant?: 'iconOnly' | 'withText';
  onShare?: () => void;
}

export function ShareButton({ 
  content, 
  variant = 'withText', 
  onShare 
}: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(content);
      setIsCopied(true);
      onShare?.();
      
      setTimeout(() => {
        setIsCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RightsGuard Incident Report',
          text: content,
          url: window.location.href,
        });
        onShare?.();
        setShowShareMenu(false);
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const shareToTwitter = () => {
    const tweetText = encodeURIComponent(content);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onShare?.();
    setShowShareMenu(false);
  };

  const shareToFarcaster = () => {
    const castText = encodeURIComponent(content);
    const url = `https://warpcast.com/~/compose?text=${castText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onShare?.();
    setShowShareMenu(false);
  };

  if (variant === 'iconOnly') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="p-2 rounded-lg btn-secondary hover:bg-opacity-20 transition-all duration-200"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        {showShareMenu && (
          <div className="absolute top-full right-0 mt-2 glass-card p-2 space-y-1 min-w-[120px] z-50">
            <button
              onClick={handleNativeShare}
              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 rounded transition-all duration-200"
            >
              Share
            </button>
            <button
              onClick={handleCopy}
              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 rounded transition-all duration-200"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Incident Report</span>
      </button>
      
      {showShareMenu && (
        <div className="glass-card p-4 space-y-3 fade-in">
          <h3 className="font-semibold text-white mb-3">Share Options</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNativeShare}
              className="flex items-center space-x-2 p-3 rounded-lg btn-secondary hover:bg-opacity-20 transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                isCopied
                  ? 'bg-green-500 bg-opacity-30 text-green-300'
                  : 'btn-secondary hover:bg-opacity-20'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className="border-t border-white border-opacity-20 pt-3">
            <p className="text-xs text-white text-opacity-60 mb-2">Share to social:</p>
            <div className="flex space-x-2">
              <button
                onClick={shareToTwitter}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-500 bg-opacity-20 text-blue-300 rounded-lg text-sm hover:bg-opacity-30 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Twitter</span>
              </button>
              
              <button
                onClick={shareToFarcaster}
                className="flex items-center space-x-1 px-3 py-2 bg-purple-500 bg-opacity-20 text-purple-300 rounded-lg text-sm hover:bg-opacity-30 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Farcaster</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
