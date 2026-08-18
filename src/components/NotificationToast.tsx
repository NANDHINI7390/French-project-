import React from 'react';
import { CheckCircle2, ShoppingBag, Heart } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'cart' | 'wishlist' | 'success';
}

export const NotificationToast: React.FC<ToastProps> = ({ message, type = 'cart' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 bg-[#16332A] text-[#F8F4EA] px-4 py-3 rounded-2xl shadow-2xl border border-[#C6A468]/40">
        {type === 'wishlist' ? (
          <Heart className="w-5 h-5 text-[#DFCA9B] fill-current" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#C6A468]" />
        )}
        <span className="text-xs sm:text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};
