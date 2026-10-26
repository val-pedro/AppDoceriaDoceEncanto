import React from 'react';
import { ProductItem } from '../types';

interface ProductOptionsModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (product: ProductItem) => void;
  onToggleOnline: (product: ProductItem) => void;
  onRestock: (product: ProductItem) => void;
  onDuplicate: (product: ProductItem) => void;
  onDelete: (productId: string) => void;
}

export const ProductOptionsModal: React.FC<ProductOptionsModalProps> = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onToggleOnline,
  onRestock,
  onDuplicate,
  onDelete,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#fff8f7] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 pb-3 border-b border-[#ffe9e8]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover bg-[#ffe9e8] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-bold text-sm text-[#261818] truncate">
              {product.name}
            </h4>
            <p className="text-xs text-[#7b1231] font-semibold">
              R$ {product.price.toFixed(2).replace('.', ',')} · {product.stock} {product.unit} em estoque
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#ffe9e8] text-[#564144] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="py-2 space-y-1">
          <button
            type="button"
            onClick={() => {
              onEdit(product);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#fff0ef] text-left text-xs font-semibold text-[#261818] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#7b1231]">edit</span>
            <span>Editar Informações & Preço</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleOnline(product);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#fff0ef] text-left text-xs font-semibold text-[#261818] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#9b2c47]">
              {product.isOnline ? 'visibility_off' : 'visibility'}
            </span>
            <span>
              {product.isOnline ? 'Pausar da Vitrine Online' : 'Ativar na Vitrine Online'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onRestock(product);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#fff0ef] text-left text-xs font-semibold text-[#261818] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#904d00]">inventory_2</span>
            <span>Reabastecer Quantidade</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onDuplicate(product);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#fff0ef] text-left text-xs font-semibold text-[#261818] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#564144]">content_copy</span>
            <span>Duplicar como Novo Doce</span>
          </button>

          <div className="my-1 border-t border-[#ffe9e8]" />

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Deseja remover "${product.name}" do cardápio?`)) {
                onDelete(product.id);
                onClose();
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#ffdad6] text-left text-xs font-semibold text-[#ba1a1a] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>Excluir Produto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
