import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  const isWarning = toast.type === 'warning';

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#3d2c2c] text-[#ffedec] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-sm z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 max-w-[90vw]"
      role="status"
      aria-live="polite"
    >
      <span
        className={`material-symbols-outlined text-[18px] ${
          isWarning ? 'text-[#fe932c]' : 'text-[#ffb2bc]'
        }`}
      >
        {isWarning ? 'warning' : 'check_circle'}
      </span>
      <span className="font-medium text-xs sm:text-sm line-clamp-1">{toast.message}</span>
    </div>
  );
};
