import React, { useState } from 'react';
import { ProductItem } from '../types';

interface EstoqueViewProps {
  products: ProductItem[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onOpenRestockModal: (product: ProductItem) => void;
  onBatchRestockCritical: () => void;
}

export const EstoqueView: React.FC<EstoqueViewProps> = ({
  products,
  onUpdateStock,
  onOpenRestockModal,
  onBatchRestockCritical,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'ready'>('all');

  const criticalItems = products.filter((p) => p.stock <= p.minStock);
  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const totalPotentialRevenue = products.reduce((sum, p) => sum + p.stock * p.price, 0);
  const totalEstimatedCost = products.reduce((sum, p) => sum + p.stock * p.cost, 0);

  const displayedProducts = products.filter((p) => {
    if (filter === 'critical') return p.stock <= p.minStock;
    if (filter === 'ready') return p.isInstantDelivery && p.stock > 0;
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-8 px-5 pt-4">
      <div className="pb-2">
        <div className="flex items-center gap-1 text-[#904d00] mb-1">
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
            Gestão de Balcão
          </span>
        </div>
        <h1 className="font-serif text-[28px] font-semibold text-[#261818] leading-tight">
          Controle de Estoque
        </h1>
        <p className="font-sans text-sm text-[#564144] mt-0.5">
          Acompanhe níveis de produção, reposição imediata e valor imobilizado.
        </p>
      </div>

      {/* Stock Metrics Bento */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-white p-3.5 rounded-xl border border-[#ffe9e8] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7174]">
            Unidades Totais
          </span>
          <div className="font-serif text-2xl font-bold text-[#7b1231] mt-1">
            {totalStockUnits}
          </div>
          <span className="text-[10px] text-[#564144]">distribuídas na vitrine</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#ffe9e8] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a7174]">
            Valor em Vitrine
          </span>
          <div className="font-serif text-2xl font-bold text-[#261818] mt-1">
            R$ {totalPotentialRevenue.toFixed(2).replace('.', ',')}
          </div>
          <span className="text-[10px] text-[#564144]">
            Custo: R$ {totalEstimatedCost.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      {criticalItems.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-[#fde2e1] border border-[#ffd9dd] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#904d00] text-[22px]">warning</span>
              <span className="font-serif font-bold text-[#261818] text-sm">
                {criticalItems.length} doces em nível crítico
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#fe932c] text-[#2f1500] font-sans text-[10px] font-bold">
              Atenção
            </span>
          </div>
          <p className="text-xs text-[#564144]">
            Estes itens atingiram ou estão abaixo da margem mínima de segurança estipulada.
          </p>
          <button
            type="button"
            onClick={onBatchRestockCritical}
            className="mt-1 w-full py-2.5 rounded-full bg-[#904d00] text-white font-semibold text-xs hover:bg-[#783e00] active:scale-98 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_task</span>
            <span>Repor +5 un em todos os críticos</span>
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mt-5">
        {[
          { id: 'all', label: `Todos (${products.length})` },
          { id: 'critical', label: `Críticos (${criticalItems.length})` },
          { id: 'ready', label: 'Pronta Entrega' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-[#7b1231] text-white shadow-xs'
                : 'bg-white text-[#564144] border border-[#ffe9e8] hover:bg-[#fff0ef]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inventory List */}
      <div className="flex flex-col gap-3 mt-4">
        {displayedProducts.map((product) => {
          const isCritical = product.stock <= product.minStock;

          return (
            <div
              key={product.id}
              className={`p-3.5 rounded-xl border bg-white shadow-xs flex items-center gap-3 transition-all ${
                isCritical ? 'border-[#ffd9dd] bg-[#fff8f7]' : 'border-[#ffe9e8]'
              }`}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover bg-[#ffe9e8] shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#8a7174]">
                    {product.categoryLabel}
                  </span>
                  {isCritical && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#fe932c] text-[#2f1500] text-[9px] font-bold">
                      Baixo
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-sm text-[#261818] truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[#7b1231] font-semibold">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-[#8a7174]">
                    Alerta mín: {product.minStock} {product.unit}
                  </span>
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-1.5 shrink-0 bg-[#fff0ef] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => onUpdateStock(product.id, Math.max(0, product.stock - 1))}
                  className="w-7 h-7 rounded-lg bg-white text-[#261818] flex items-center justify-center text-sm font-bold shadow-xs active:scale-90"
                >
                  -
                </button>
                <span
                  className={`w-7 text-center font-serif text-sm font-bold ${
                    isCritical ? 'text-[#904d00]' : 'text-[#261818]'
                  }`}
                >
                  {product.stock}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateStock(product.id, product.stock + 1)}
                  className="w-7 h-7 rounded-lg bg-[#7b1231] text-white flex items-center justify-center text-sm font-bold shadow-xs active:scale-90"
                >
                  +
                </button>
              </div>

              {isCritical && (
                <button
                  type="button"
                  onClick={() => onOpenRestockModal(product)}
                  title="Reabastecer em lote"
                  className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#904d00] flex items-center justify-center active:scale-95 shrink-0 hover:bg-[#ffb77d] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
