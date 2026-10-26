import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lowStockCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  lowStockCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f7]/95 backdrop-blur-xl border-t border-[#ffe9e8] shadow-[0_-8px_24px_rgba(45,30,30,0.06)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {/* Tab 1: Produtos */}
        <button
          type="button"
          onClick={() => onTabChange('produtos')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'produtos' ? 'text-[#7b1231] font-bold' : 'text-[#564144] hover:text-[#7b1231]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">bakery_dining</span>
          <span className="font-label-sm text-[11px] leading-tight">Produtos</span>
        </button>

        {/* Tab 2: Cadastrar (Elevated FAB) */}
        <button
          type="button"
          onClick={() => onTabChange('cadastrar')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors group cursor-pointer ${
            activeTab === 'cadastrar' ? 'text-[#7b1231] font-bold' : 'text-[#564144]'
          }`}
        >
          <div
            className={`w-11 h-11 -mt-4 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(155,44,71,0.28)] transition-transform group-active:scale-95 ${
              activeTab === 'cadastrar' ? 'bg-[#9b2c47] ring-4 ring-[#ffd9dd]' : 'bg-[#7b1231] hover:bg-[#9b2c47]'
            }`}
          >
            <span className="material-symbols-outlined text-white text-[24px]">add</span>
          </div>
          <span className="font-label-sm text-[11px] leading-tight">Cadastrar</span>
        </button>

        {/* Tab 3: Estoque */}
        <button
          type="button"
          onClick={() => onTabChange('estoque')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer relative ${
            activeTab === 'estoque' ? 'text-[#7b1231] font-bold' : 'text-[#564144] hover:text-[#7b1231]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            {lowStockCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#fe932c] text-[#2f1500] text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                {lowStockCount}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[11px] leading-tight">Estoque</span>
        </button>

        {/* Tab 4: Ajustes */}
        <button
          type="button"
          onClick={() => onTabChange('perfil')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'perfil' ? 'text-[#7b1231] font-bold' : 'text-[#564144] hover:text-[#7b1231]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="font-label-sm text-[11px] leading-tight">Ajustes</span>
        </button>
      </div>
    </nav>
  );
};
