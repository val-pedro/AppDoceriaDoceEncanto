import React from 'react';
import { APP_LOGO_URL } from '../data/initialProducts';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  const getSubtitle = () => {
    switch (activeTab) {
      case 'produtos':
        return 'Produtos';
      case 'cadastrar':
        return 'Cadastrar';
      case 'estoque':
        return 'Estoque';
      case 'perfil':
        return 'Ajustes';
      default:
        return 'Produtos';
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-[#fff8f7]/90 backdrop-blur-xl border-b border-[#ffe9e8] shadow-[0_4px_20px_-4px_rgba(45,30,30,0.05)]">
      <div className="h-16 px-5 flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <img
            alt="Logo Doce Encanto"
            className="h-8 w-auto object-contain"
            src={APP_LOGO_URL}
            onError={(e) => {
              // fallback if logo fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[18px] text-[#7b1231] font-serif font-bold leading-none">
              Doce Encanto
            </span>
            <span className="font-label-sm text-[11px] text-[#564144] font-medium tracking-normal">
              {getSubtitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notificações"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#564144] hover:text-[#7b1231] hover:bg-[#fde2e1] transition-colors relative cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#fe932c] ring-2 ring-[#fff8f7] animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Perfil da Confeitaria"
            className="w-8 h-8 rounded-full bg-[#7b1231] flex items-center justify-center ml-1 text-white hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
