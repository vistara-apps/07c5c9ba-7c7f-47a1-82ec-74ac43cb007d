'use client';

import { RightsGuide } from '@/lib/types';
import { formatCurrency, getStateFullName, getScenarioTitle } from '@/lib/utils';
import { Lock, Unlock, MapPin, Globe } from 'lucide-react';

interface RightsCardProps {
  guide: RightsGuide;
  variant?: 'compact' | 'detailed';
  onPurchase?: (guideId: string) => void;
  isPurchased?: boolean;
}

export function RightsCard({ 
  guide, 
  variant = 'compact', 
  onPurchase, 
  isPurchased = false 
}: RightsCardProps) {
  const handlePurchase = () => {
    if (onPurchase && !isPurchased) {
      onPurchase(guide.guideId);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="glass-card p-4 hover:bg-opacity-15 transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">
              {getScenarioTitle(guide.scenario)}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-white text-opacity-70">
              <MapPin className="w-4 h-4" />
              <span>{getStateFullName(guide.state)}</span>
              <Globe className="w-4 h-4 ml-2" />
              <span>{guide.language === 'es' ? 'Español' : 'English'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-cyan-300">
              {formatCurrency(guide.price)}
            </span>
            {isPurchased ? (
              <Unlock className="w-5 h-5 text-green-400" />
            ) : (
              <Lock className="w-5 h-5 text-white text-opacity-50" />
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-white text-opacity-80 line-clamp-2">
            {isPurchased ? guide.content.substring(0, 100) + '...' : 'Unlock to view complete legal guidance for this scenario.'}
          </p>
        </div>

        <button
          onClick={handlePurchase}
          disabled={isPurchased}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            isPurchased
              ? 'bg-green-500 bg-opacity-20 text-green-300 cursor-default'
              : 'btn-primary hover:shadow-lg'
          }`}
        >
          {isPurchased ? 'Purchased' : `Get Guide - ${formatCurrency(guide.price)}`}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {getScenarioTitle(guide.scenario)}
          </h2>
          <div className="flex items-center space-x-4 text-white text-opacity-70">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{getStateFullName(guide.state)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{guide.language === 'es' ? 'Español' : 'English'}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-300 mb-1">
            {formatCurrency(guide.price)}
          </div>
          {isPurchased && (
            <div className="flex items-center text-green-400 text-sm">
              <Unlock className="w-4 h-4 mr-1" />
              <span>Purchased</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white bg-opacity-5 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">Legal Guidance</h3>
        {isPurchased ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-white text-opacity-90 whitespace-pre-line">
              {guide.content}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-white text-opacity-30 mx-auto mb-3" />
            <p className="text-white text-opacity-60 mb-4">
              Purchase this guide to access complete legal information for {getScenarioTitle(guide.scenario)} situations in {getStateFullName(guide.state)}.
            </p>
            <button
              onClick={handlePurchase}
              className="btn-primary"
            >
              Unlock Guide - {formatCurrency(guide.price)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
