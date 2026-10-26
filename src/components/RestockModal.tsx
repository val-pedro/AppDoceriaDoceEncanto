import React, { useState } from 'react';
import { ProductItem } from '../types';

interface RestockModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRestock: (productId: string, quantityToAdd: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirmRestock,
}) => {
  const [amount, setAmount] = useState<number>(10);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    if (amount > 0) {
      onConfirmRestock(product.id, amount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-[#fff8f7] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#ffe9e8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#904d00] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#261818]">Reabastecer Estoque</h3>
              <p className="text-xs text-[#564144]">Reposição Imediata da Confeitaria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#564144] hover:text-[#7b1231] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-4">
          <div className="flex items-center gap-3 bg-[#ffffff] p-3 rounded-xl border border-[#ffe9e8] mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-14 h-14 rounded-lg object-cover bg-[#ffe9e8] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8a7174]">
                {product.categoryLabel}
              </span>
              <h4 className="font-serif font-bold text-sm text-[#261818] truncate">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#564144]">
                  Atual:{' '}
                  <strong className={product.stock <= product.minStock ? 'text-[#904d00]' : 'text-[#261818]'}>
                    {product.stock} {product.unit}
                  </strong>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fff0ef] text-[#7b1231] font-semibold">
                  Mínimo: {product.minStock} {product.unit}
                </span>
              </div>
            </div>
          </div>

          <label className="block text-xs font-semibold text-[#261818] mb-2">
            Quantidade a Adicionar ({product.unit}):
          </label>
          <div className="flex items-center justify-between bg-[#fff0ef] p-2 rounded-xl mb-4">
            <button
              type="button"
              onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 rounded-lg bg-[#ffffff] text-[#261818] flex items-center justify-center active:scale-95 shadow-sm text-lg font-bold"
            >
              -
            </button>
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold text-[#7b1231]">{amount}</span>
              <span className="text-[10px] text-[#8a7174]">Novo total: {product.stock + amount} {product.unit}</span>
            </div>
            <button
              type="button"
              onClick={() => setAmount((prev) => prev + 1)}
              className="w-10 h-10 rounded-lg bg-[#7b1231] text-white flex items-center justify-center active:scale-95 shadow-sm text-lg font-bold"
            >
              +
            </button>
          </div>

          <div className="flex gap-2">
            {[5, 10, 15, 20].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  amount === preset
                    ? 'bg-[#7b1231] text-white'
                    : 'bg-[#ffe9e8] text-[#564144] hover:bg-[#ffd9dd]'
                }`}
              >
                +{preset}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#ffe9e8] flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-[#ffe9e8] text-[#564144] font-semibold text-xs hover:bg-[#ffd9dd]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-full bg-[#904d00] text-white font-semibold text-xs hover:bg-[#783e00] shadow-md active:scale-95 transition-transform"
          >
            Confirmar Reposição
          </button>
        </div>
      </div>
    </div>
  );
};
