import React, { useState } from 'react';
import { ProductItem, ProductCategory } from '../types';
import { FilterState } from '../components/FilterModal';

interface ProductsViewProps {
  products: ProductItem[];
  onToggleOnline: (productId: string) => void;
  onOpenRestock: (product: ProductItem) => void;
  onOpenOptions: (product: ProductItem) => void;
  onNavigateToCadastrar: () => void;
  onOpenFilterModal: () => void;
  filters: FilterState;
  onSelectCategory: (category: ProductCategory | 'todos') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickToggleSort: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onToggleOnline,
  onOpenRestock,
  onOpenOptions,
  onNavigateToCadastrar,
  onOpenFilterModal,
  filters,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onQuickToggleSort,
}) => {
  // Category counts
  const totalCount = products.length;
  const bolosCount = products.filter((p) => p.category === 'bolos').length;
  const brigadeirosCount = products.filter((p) => p.category === 'brigadeiros').length;
  const finosCount = products.filter((p) => p.category === 'finos').length;
  const poteCount = products.filter((p) => p.category === 'pote').length;

  // Bento Insights
  const activeProductsCount = products.filter((p) => p.isOnline).length;
  const criticalStockProducts = products.filter((p) => p.stock <= p.minStock);
  const criticalStockCount = criticalStockProducts.length;

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    // category
    if (filters.category !== 'todos' && p.category !== filters.category) {
      return false;
    }
    // shelf status
    if (filters.shelfStatus === 'online' && !p.isOnline) return false;
    if (filters.shelfStatus === 'offline' && p.isOnline) return false;
    // stock status
    if (filters.stockStatus === 'low' && p.stock > p.minStock) return false;
    if (filters.stockStatus === 'normal' && p.stock <= p.minStock) return false;
    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.categoryLabel.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc) return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
    if (filters.sortBy === 'stock') return a.stock - b.stock;
    // Default: featured / salesToday / top1
    if (a.badge === 'top1') return -1;
    if (b.badge === 'top1') return 1;
    return (b.salesToday || 0) - (a.salesToday || 0);
  });

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search & Filter Bar */}
      <section className="px-5 pt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7174] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              id="product-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar doces, bolos, tortas..."
              className="w-full bg-[#ffffff] text-[#261818] text-sm pl-10 pr-4 py-3 rounded-xl shadow-xs outline-none placeholder:text-[#ddbfc2] transition-all focus:bg-[#fff0ef] focus:ring-1 focus:ring-[#7b1231]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7174] hover:text-[#261818] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onOpenFilterModal}
            aria-label="Abrir filtros"
            className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-[#ffe9e8] text-[#261818] hover:bg-[#fde2e1] transition-colors shadow-xs active:scale-95 cursor-pointer relative"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            {(filters.category !== 'todos' ||
              filters.stockStatus !== 'all' ||
              filters.shelfStatus !== 'all') && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7b1231]" />
            )}
          </button>
        </div>

        {/* Category Pill Carousel */}
        <div className="flex gap-2 overflow-x-auto py-1 -mx-5 px-5 no-scrollbar">
          <button
            type="button"
            onClick={() => onSelectCategory('todos')}
            className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-xs transition-transform active:scale-95 cursor-pointer ${
              filters.category === 'todos'
                ? 'bg-[#7b1231] text-white'
                : 'bg-[#ffffff] text-[#564144] hover:bg-[#fff0ef]'
            }`}
          >
            Todos <span className="opacity-80 font-normal ml-0.5">({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('bolos')}
            className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
              filters.category === 'bolos'
                ? 'bg-[#7b1231] text-white'
                : 'bg-[#ffffff] text-[#564144] hover:bg-[#fff0ef]'
            }`}
          >
            Bolos & Tortas <span className="text-[#8a7174] font-normal ml-0.5">({bolosCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('brigadeiros')}
            className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
              filters.category === 'brigadeiros'
                ? 'bg-[#7b1231] text-white'
                : 'bg-[#ffffff] text-[#564144] hover:bg-[#fff0ef]'
            }`}
          >
            Brigadeiros & Trufas{' '}
            <span className="text-[#8a7174] font-normal ml-0.5">({brigadeirosCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('finos')}
            className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
              filters.category === 'finos'
                ? 'bg-[#7b1231] text-white'
                : 'bg-[#ffffff] text-[#564144] hover:bg-[#fff0ef]'
            }`}
          >
            Doces Finos <span className="text-[#8a7174] font-normal ml-0.5">({finosCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('pote')}
            className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
              filters.category === 'pote'
                ? 'bg-[#7b1231] text-white'
                : 'bg-[#ffffff] text-[#564144] hover:bg-[#fff0ef]'
            }`}
          >
            Sobremesas no Pote{' '}
            <span className="text-[#8a7174] font-normal ml-0.5">({poteCount})</span>
          </button>
        </div>
      </section>

      {/* Live Bakery Insights / Summary Bento */}
      <section className="px-5 pt-6">
        <div className="grid grid-cols-2 gap-2">
          {/* Total Active Items */}
          <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs flex flex-col justify-between border border-[#ffe9e8]">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold text-[#564144] uppercase tracking-wider">
                Produtos Ativos
              </span>
              <div className="w-7 h-7 rounded-full bg-[#fff0ef] flex items-center justify-center text-[#7b1231]">
                <span className="material-symbols-outlined text-[16px]">cake</span>
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-serif text-[28px] font-semibold text-[#261818] leading-tight">
                {activeProductsCount.toString().padStart(2, '0')}
              </span>
              <span className="font-sans text-[11px] text-[#564144]">itens cadastrados</span>
            </div>
          </div>

          {/* Critical Stock Warning Card */}
          <div className="bg-[#fde2e1] p-4 rounded-xl shadow-xs flex flex-col justify-between border border-[#ffd9dd]">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold text-[#564144] uppercase tracking-wider">
                Atenção
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#fe932c] text-[#663500] font-sans text-[11px] font-bold">
                Crítico
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-serif text-[28px] font-semibold text-[#904d00] leading-tight">
                {criticalStockCount.toString().padStart(2, '0')}
              </span>
              <span className="font-sans text-xs text-[#564144]">em baixa</span>
            </div>
          </div>

          {/* Star Seller Banner (Spans 2 columns) */}
          <div className="col-span-2 bg-gradient-to-r from-[#7b1231] to-[#9b2c47] p-4 rounded-xl shadow-md text-white flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[#ffdcc3] text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-bold text-[#ffb9c2] tracking-wider uppercase">
                  Mais Vendido de Hoje
                </span>
                <span className="font-serif text-lg text-white font-semibold leading-snug">
                  Red Velvet Vulcão c/ Ninho
                </span>
                <span className="font-sans text-xs text-[#ffb9c2]">
                  42 fatias reservadas nesta manhã
                </span>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Quick Action: Novo Produto Strip */}
      <section className="px-5 pt-6">
        <div className="p-4 rounded-xl bg-[#ffe9e8] flex items-center justify-between shadow-xs border border-[#ffd9dd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f7dcdc] flex items-center justify-center text-[#7b1231]">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold text-[#261818]">
                Novo Produto na Vitrine
              </span>
              <span className="font-sans text-xs text-[#564144]">
                Adicione receitas, porções e valores
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigateToCadastrar}
            className="px-4 py-2.5 rounded-full bg-[#7b1231] text-white font-sans text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform hover:bg-[#9b2c47] cursor-pointer"
          >
            <span>Criar</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Product List Catalog Section */}
      <section className="px-5 pt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-[22px] font-semibold text-[#261818]">
              Cardápio & Vitrine
            </h2>
            <span className="font-sans text-[11px] px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#564144] font-medium">
              {sortedProducts.length} visíveis
            </span>
          </div>
          <button
            type="button"
            onClick={onQuickToggleSort}
            className="flex items-center gap-1 text-[#7b1231] font-sans text-xs font-semibold hover:underline cursor-pointer"
          >
            <span>Ordenar</span>
            <span className="material-symbols-outlined text-[16px]">unfold_more</span>
          </button>
        </div>

        {/* Product Cards Stream */}
        <div className="flex flex-col gap-4" id="products-catalog-list">
          {sortedProducts.map((product) => {
            const isLowStock = product.stock <= product.minStock;

            return (
              <article
                key={product.id}
                className="bg-[#ffffff] rounded-xl p-4 shadow-xs flex flex-col gap-2 border border-[#ffe9e8] transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  {/* Product Image + Badges */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e8]">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt || product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // styled graceful fallback
                        (e.currentTarget as HTMLElement).style.opacity = '0.5';
                      }}
                    />
                    {product.badge === 'top1' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-[#fe932c] text-[#663500] font-sans text-[11px] font-bold flex items-center gap-0.5 shadow-sm">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        Top 1
                      </span>
                    )}
                    {isLowStock && product.badge !== 'top1' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-[#fe932c] text-[#663500] font-sans text-[11px] font-bold flex items-center gap-0.5 shadow-sm">
                        <span className="material-symbols-outlined text-[10px]">warning</span>
                        Baixo
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8a7174]">
                          {product.categoryLabel}
                        </span>
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-sans text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#904d00]" />
                            Restam {product.stock} {product.unit}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fff0ef] text-[#564144] font-sans text-[11px] font-semibold">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                product.badge === 'top1' ? 'bg-[#7b1231]' : 'bg-[#8a7174]'
                              }`}
                            />
                            {product.stock} {product.unit}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-[18px] font-semibold text-[#261818] mt-0.5 truncate">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-end justify-between mt-1">
                      <div className="flex flex-col">
                        <span className="font-sans text-[11px] text-[#564144]">Valor unitário</span>
                        <span className="font-serif text-[22px] text-[#7b1231] font-bold leading-tight">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenOptions(product)}
                        aria-label="Opções do produto"
                        className="w-8 h-8 rounded-full bg-[#ffe9e8] flex items-center justify-center text-[#564144] hover:bg-[#fde2e1] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Shelf Status Bar or Restock Bar */}
                {isLowStock ? (
                  <div className="pt-2 flex items-center justify-between bg-[#fff0ef] px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#904d00]" />
                      <span className="font-sans text-[11px] font-semibold text-[#261818]">
                        Reposição Imediata
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenRestock(product)}
                      className="px-3 py-1 rounded-full bg-[#904d00] text-white font-sans text-[11px] font-semibold active:scale-95 transition-transform hover:bg-[#783e00] cursor-pointer shadow-xs"
                    >
                      Reabastecer
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between bg-[#fff0ef] px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.isOnline ? 'bg-[#9b2c47]' : 'bg-[#ddbfc2]'
                        }`}
                      />
                      <span className="font-sans text-[11px] font-medium text-[#261818]">
                        {product.isOnline ? 'Vitrine Online' : 'Pausado na Vitrine'}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.isOnline}
                        onChange={() => onToggleOnline(product.id)}
                        className="sr-only peer product-toggle"
                      />
                      <div className="w-9 h-5 bg-[#ddbfc2] peer-checked:bg-[#7b1231] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-inner" />
                    </label>
                  </div>
                )}
              </article>
            );
          })}

          {sortedProducts.length === 0 && (
            <div className="text-center py-12 px-4 bg-white rounded-xl border border-[#ffe9e8]">
              <span className="material-symbols-outlined text-[36px] text-[#8a7174]">
                search_off
              </span>
              <h3 className="font-serif font-bold text-base text-[#261818] mt-2">
                Nenhum doce encontrado
              </h3>
              <p className="text-xs text-[#564144] mt-1 max-w-xs mx-auto">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('todos');
                  onSearchChange('');
                }}
                className="mt-3 px-4 py-2 rounded-full bg-[#ffe9e8] text-[#7b1231] font-semibold text-xs hover:bg-[#ffd9dd] cursor-pointer"
              >
                Ver todos os doces
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
