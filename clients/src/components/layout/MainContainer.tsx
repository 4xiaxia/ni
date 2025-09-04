
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BottomNavigation } from './BottomNavigation';
import { ContentArea } from './ContentArea';
import { useClickEffect } from '../effects/useClickEffect';
import { Settings } from 'lucide-react';

export const MainContainer: React.FC = () => {
  const { createClickEffect, effectsContainer } = useClickEffect();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    createClickEffect(e);
  };

  const handleAdminClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent card click effect
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-[5vh] px-4 relative overflow-hidden scrollbar-hide">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20" />

      <Card
        className="w-[85vw] h-[90vh] relative bg-white/80 backdrop-blur-sm rounded-[26px] shadow-clay overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative h-full flex flex-col">
          <ContentArea />
          <BottomNavigation />
        </div>
      </Card>

      {effectsContainer}

      {/* Admin Icon Link */}
      <div
        onClick={handleAdminClick}
        className="absolute bottom-5 right-5 z-50 p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/70 transition-colors cursor-pointer"
        title="Admin"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  );
};
