'use client';

import { Lock, Unlock, CreditCard } from 'lucide-react';
import { RightsCardProps } from '@/types';
import { formatCurrency, cn } from '@/utils/helpers';

export function RightsCard({ 
  guide, 
  variant = 'compact', 
  onPurchase, 
  isPurchased = false 
}: RightsCardProps) {
  const isDetailed = variant === 'detailed';

  return (
    <div className={cn(
      "bg-surface rounded-lg border border-gray-200 shadow-card transition-all duration-base hover:shadow-lg",
      isDetailed ? "p-6" : "p-4"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={cn(
            "font-semibold text-text-primary",
            isDetailed ? "text-lg" : "text-base"
          )}>
            {guide.title}
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            {guide.state} • {guide.language === 'en' ? 'English' : 'Spanish'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {isPurchased ? (
            <div className="flex items-center space-x-1 text-accent">
              <Unlock className="w-4 h-4" />
              <span className="text-xs font-medium">Unlocked</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-text-secondary">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-medium">
                {formatCurrency(guide.price)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Preview */}
      {isDetailed && (
        <div className="mb-4">
          <div className="text-sm text-text-secondary line-clamp-3">
            {isPurchased ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: guide.content.substring(0, 200) + '...' 
                }} 
              />
            ) : (
              <p>
                Get instant access to state-specific legal guidance for {guide.scenario.toLowerCase()}. 
                Know your rights and what to say to protect yourself.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Scenario Badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {guide.scenario.replace('_', ' ').toUpperCase()}
        </span>
        
        {/* Action Button */}
        {!isPurchased && onPurchase && (
          <button
            onClick={() => onPurchase(guide.guideId)}
            className={cn(
              "inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium",
              "bg-primary text-white hover:bg-primary/90 transition-colors duration-base",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
          >
            <CreditCard className="w-4 h-4" />
            <span>Get Guide</span>
          </button>
        )}
        
        {isPurchased && (
          <button
            className={cn(
              "inline-flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium",
              "bg-accent text-white hover:bg-accent/90 transition-colors duration-base",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            )}
          >
            <span>View Guide</span>
          </button>
        )}
      </div>
    </div>
  );
}
