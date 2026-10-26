import React from 'react';
import { ProductCategory } from '../types';

export interface FilterState {
  category: ProductCategory | 'todos';
  stockStatus: 'all' | 'low' | 'normal';
  shelfStatus: 'all' | 'online' | 'offline';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name' | 'stock';
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f7] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#ffe9e8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffd9dd] text-[#7b1231] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#261818]">Filtros & Ordenação</h3>
              <p className="text-xs text-[#564144]">Cardápio e Vitrine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#564144] hover:text-[#7b1231] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 overflow-y-auto">
          {/* Ordenação */}
          <div>
            <label className="block text-xs font-bold text-[#261818] mb-2 uppercase tracking-wider">
              Ordenar por
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'featured', label: 'Mais Vendidos' },
                { id: 'stock', label: 'Estoque Baixo' },
                { id: 'price-asc', label: 'Menor Preço' },
                { id: 'price-desc', label: 'Maior Preço' },
                { id: 'name', label: 'Nome (A-Z)' },
              ].map((sort) => (
                <button
                  key={sort.id}
                  type="button"
                  onClick={() =>
                    onChangeFilters({
                      ...filters,
                      sortBy: sort.id as FilterState['sortBy'],
                    })
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    filters.sortBy === sort.id
                      ? 'bg-[#7b1231] text-white shadow-xs'
                      : 'bg-[#ffffff] text-[#564144] border border-[#ffe9e8] hover:bg-[#fff0ef]'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status da Vitrine */}
          <div>
            <label className="block text-xs font-bold text-[#261818] mb-2 uppercase tracking-wider">
              Status na Vitrine
            </label>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'online', label: 'Vitrine Online' },
                { id: 'offline', label: 'Pausados' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onChangeFilters({
                      ...filters,
                      shelfStatus: opt.id as FilterState['shelfStatus'],
                    })
                  }
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    filters.shelfStatus === opt.id
                      ? 'bg-[#7b1231] text-white shadow-xs'
                      : 'bg-[#ffffff] text-[#564144] border border-[#ffe9e8] hover:bg-[#fff0ef]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nível de Estoque */}
          <div>
            <label className="block text-xs font-bold text-[#261818] mb-2 uppercase tracking-wider">
              Nível de Estoque
            </label>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'low', label: 'Atenção / Crítico' },
                { id: 'normal', label: 'Normal' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onChangeFilters({
                      ...filters,
                      stockStatus: opt.id as FilterState['stockStatus'],
                    })
                  }
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                    filters.stockStatus === opt.id
                      ? 'bg-[#904d00] text-white shadow-xs'
                      : 'bg-[#ffffff] text-[#564144] border border-[#ffe9e8] hover:bg-[#fff0ef]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#ffe9e8] flex gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex-1 py-3 rounded-full bg-[#ffe9e8] text-[#564144] font-semibold text-xs hover:bg-[#ffd9dd] cursor-pointer"
          >
            Limpar Filtros
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-[#7b1231] text-white font-semibold text-xs hover:bg-[#9b2c47] shadow-md cursor-pointer"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
