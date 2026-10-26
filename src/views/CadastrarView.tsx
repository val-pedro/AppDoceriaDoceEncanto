import React, { useState, useEffect } from 'react';
import { ProductItem, ProductCategory, ProductUnit } from '../types';

interface CadastrarViewProps {
  editingProduct?: ProductItem | null;
  onSaveProduct: (product: Partial<ProductItem>, isDraft: boolean) => void;
  onCancel: () => void;
}

export const CadastrarView: React.FC<CadastrarViewProps> = ({
  editingProduct,
  onSaveProduct,
  onCancel,
}) => {
  // Photos list
  const [photos, setPhotos] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATOVUpdyxm0HeYwbbOm0l28ONCNoYczem9qkSnpVfAJiJAvX5h8rpoEWyo9j657QlUwFDEaYReLPp5NJTLPLsrNQ1etmjPnaZR1tHpaqoX5XWM-OObTN2gPsAeQb58MINMrZnvytHRBmVxFFOuCitpqdTacPuqoJGr4PFC2PdS0aM2K28wISE95akp8Mq6slmP81AbmW5u6R9SedQLF0bz0-CKkvFkxnNwMfxifjcFsvGwlyP9CSry',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAeRJyxzvTIsQefXRRAohwgaSIgR5-zCvOemuOmYZ1ZcY0Ctklb9jCwoyC8jnqTC3qij7bzzK5FeR1HlteBSvUicvyon077o1MpOI501S6XmjZx85YclmF39jfm_OfYPDoJC-S8wmyRkgBpY8rTIynvDQl71UxPnWTj92OyFc-8kriMNur610sMDTFWyZ3KXWI0XRq7BvRtcnGG96A0flQI5NK-VNOmGpgpplLt62OLlSx-OcZZ8Vk9',
  ]);

  // Form states
  const [name, setName] = useState<string>('Bolo Vulcão de Cenoura com Brigadeiro Belga');
  const [category, setCategory] = useState<ProductCategory>('bolos');
  const [description, setDescription] = useState<string>(
    'Massa ultra fofinha de cenoura fresca, coberta com uma generosa erupção de brigadeiro cremoso de puro chocolate Belga 54%.'
  );

  // Price & Costs
  const [salePrice, setSalePrice] = useState<number>(78.0);
  const [costPrice, setCostPrice] = useState<number>(28.0);

  // Stock
  const [stock, setStock] = useState<number>(8);
  const [minStock, setMinStock] = useState<number>(2);
  const [unit, setUnit] = useState<ProductUnit>('un');

  // Availability
  const [isInstantDelivery, setIsInstantDelivery] = useState<boolean>(true);
  const [isMadeToOrder, setIsMadeToOrder] = useState<boolean>(true);
  const [prepTime, setPrepTime] = useState<string>('24 Horas');

  // Tags
  const [activeTags, setActiveTags] = useState<string[]>([
    'Mais Vendido',
    'Edição Limitada',
  ]);

  const [showAddPhotoModal, setShowAddPhotoModal] = useState<boolean>(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');

  // Populate when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setDescription(editingProduct.description || '');
      setSalePrice(editingProduct.price);
      setCostPrice(editingProduct.cost);
      setStock(editingProduct.stock);
      setMinStock(editingProduct.minStock);
      setUnit(editingProduct.unit);
      setIsInstantDelivery(editingProduct.isInstantDelivery);
      setIsMadeToOrder(editingProduct.isMadeToOrder);
      setPrepTime(editingProduct.prepTime || '24 Horas');
      setActiveTags(editingProduct.tags || []);
      if (editingProduct.imageUrl) {
        setPhotos([
          editingProduct.imageUrl,
          ...(editingProduct.additionalImages || []),
        ]);
      }
    }
  }, [editingProduct]);

  // Margin calculation
  const profit = Math.max(0, salePrice - costPrice);
  const margin = salePrice > 0 ? Math.round((profit / salePrice) * 100) : 0;

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos((prev) => [...prev, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
      setShowAddPhotoModal(false);
    }
  };

  const toggleTag = (tagName: string) => {
    if (activeTags.includes(tagName)) {
      setActiveTags((prev) => prev.filter((t) => t !== tagName));
    } else {
      setActiveTags((prev) => [...prev, tagName]);
    }
  };

  const getCategoryLabel = (cat: ProductCategory) => {
    switch (cat) {
      case 'bolos':
        return 'Bolos & Tortas';
      case 'brigadeiros':
        return 'Brigadeiros';
      case 'finos':
        return 'Doces Finos';
      case 'pote':
        return 'No Pote';
      case 'especiais':
        return 'Edições Especiais';
      default:
        return 'Bolos & Tortas';
    }
  };

  const handleSave = (isDraft: boolean) => {
    if (!name.trim()) {
      alert('Por favor, informe o nome do doce.');
      return;
    }

    onSaveProduct(
      {
        id: editingProduct?.id,
        name: name.trim(),
        category,
        categoryLabel: getCategoryLabel(category),
        description: description.trim(),
        price: Number(salePrice) || 0,
        cost: Number(costPrice) || 0,
        stock: Number(stock) || 0,
        minStock: Number(minStock) || 0,
        unit,
        isInstantDelivery,
        isMadeToOrder,
        prepTime,
        tags: activeTags,
        imageUrl: photos[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
        additionalImages: photos.slice(1),
        isOnline: !isDraft,
        isDraft,
      },
      isDraft
    );
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Title Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-1 text-[#904d00] mb-1">
          <span className="material-symbols-outlined text-[18px]">cake</span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
            Ateliê Doce Encanto
          </span>
        </div>
        <h1 className="font-serif text-[28px] font-semibold text-[#261818] leading-tight">
          {editingProduct ? 'Editar Doce' : 'Cadastrar Novo Doce'}
        </h1>
        <p className="font-sans text-sm text-[#564144] mt-0.5">
          Adicione um novo item ao cardápio e gerencie preço e estoque.
        </p>
      </div>

      <form
        className="flex flex-col gap-6 px-5 mt-3"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Seção: Upload de Fotos */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs flex flex-col gap-2 border border-[#ffe9e8]">
          <div className="flex items-center justify-between">
            <label className="font-serif text-[18px] font-semibold text-[#261818] flex items-center gap-1">
              <span>Fotos da Confeitaria</span>
              <span className="w-2 h-2 rounded-full bg-[#fe932c]" />
            </label>
            <span className="font-sans text-[11px] text-[#564144]">
              {photos.length} de 4 fotos
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-1">
            {photos.map((photoUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden shadow-xs bg-[#fde2e1] group"
              >
                <img
                  src={photoUrl}
                  alt={`Foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  aria-label="Remover foto"
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-[#7b1231] flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-[#7b1231]/85 backdrop-blur-xs text-white font-sans text-[9px] font-bold">
                    Principal
                  </span>
                )}
              </div>
            ))}

            {photos.length < 4 && (
              <button
                type="button"
                onClick={() => setShowAddPhotoModal(true)}
                className="aspect-square rounded-xl bg-[#fff0ef] flex flex-col items-center justify-center gap-1 text-[#7b1231] active:scale-95 transition-all p-2 text-center group cursor-pointer hover:bg-[#ffe9e8]"
              >
                <div className="w-8 h-8 rounded-full bg-[#fde2e1] flex items-center justify-center group-hover:bg-[#ffd9dd] transition-colors">
                  <span className="material-symbols-outlined text-[#7b1231] text-[20px]">
                    add_a_photo
                  </span>
                </div>
                <span className="font-sans text-[11px] text-[#564144] font-medium leading-tight">
                  Adicionar
                </span>
              </button>
            )}
          </div>

          <div className="bg-[#fff0ef] rounded-xl p-3 flex items-center gap-2 text-[#564144]">
            <span className="material-symbols-outlined text-[#904d00] text-[20px] shrink-0">
              auto_awesome
            </span>
            <p className="font-sans text-xs">
              Dica: Fotos bem iluminadas e em ângulo superior aumentam os pedidos em até 40%.
            </p>
          </div>
        </div>

        {/* 1. Informações Básicas */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs flex flex-col gap-4 border border-[#ffe9e8]">
          <div className="flex items-center gap-2 pb-1 border-b border-[#ffe9e8]">
            <span className="w-7 h-7 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#7b1231] font-bold text-xs">
              1
            </span>
            <h2 className="font-serif text-[18px] font-semibold text-[#261818]">
              Informações Básicas
            </h2>
          </div>

          {/* Nome do Doce */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-sm font-semibold text-[#261818]" htmlFor="cake-name">
              Nome do Doce / Produto
            </label>
            <div className="relative flex items-center">
              <input
                id="cake-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Bolo Vulcão de Cenoura com Brigadeiro"
                className="w-full h-12 bg-[#fff0ef] rounded-xl px-4 pr-10 text-[#261818] placeholder:text-[#8a7174] font-sans text-sm focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none transition-all"
              />
              <span className="absolute right-3 material-symbols-outlined text-[#564144] text-[20px] pointer-events-none">
                brush
              </span>
            </div>
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-sm font-semibold text-[#261818]"
              htmlFor="category-select"
            >
              Categoria no Cardápio
            </label>
            <div className="relative flex items-center">
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full h-12 bg-[#fff0ef] rounded-xl px-4 text-[#261818] font-sans text-sm focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none appearance-none transition-all cursor-pointer"
              >
                <option value="bolos">Bolos & Tortas Especiais</option>
                <option value="brigadeiros">Brigadeiros Gourmet</option>
                <option value="finos">Doces Finos & Trufas</option>
                <option value="pote">Sobremesas no Pote</option>
                <option value="especiais">Sobremesas Festivas & Edições</option>
              </select>
              <span className="absolute right-3.5 material-symbols-outlined text-[#564144] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Descrição Apetitosa */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                className="font-sans text-sm font-semibold text-[#261818]"
                htmlFor="cake-desc"
              >
                Descrição Apetitosa
              </label>
              <span className="font-sans text-[11px] text-[#564144]">
                {description.length}/280
              </span>
            </div>
            <textarea
              id="cake-desc"
              rows={3}
              maxLength={280}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Conte os ingredientes e a sensação a cada mordida..."
              className="w-full p-3.5 bg-[#fff0ef] rounded-xl text-[#261818] placeholder:text-[#8a7174] font-sans text-sm focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* 2. Preço e Custos */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs flex flex-col gap-4 border border-[#ffe9e8]">
          <div className="flex items-center justify-between pb-1 border-b border-[#ffe9e8]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#7b1231] font-bold text-xs">
                2
              </span>
              <h2 className="font-serif text-[18px] font-semibold text-[#261818]">
                Preço & Rentabilidade
              </h2>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-[#f7dcdc] text-[#7b1231] font-sans text-[11px] font-bold flex items-center gap-1 shadow-xs">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>Margem: {margin}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Preço de Venda */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-sans text-xs font-semibold text-[#261818]"
                htmlFor="sale-price"
              >
                Preço de Venda
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 font-sans text-xs font-bold text-[#564144]">
                  R$
                </span>
                <input
                  id="sale-price"
                  type="number"
                  step="0.50"
                  value={salePrice || ''}
                  onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                  className="w-full h-12 bg-[#fff0ef] rounded-xl pl-10 pr-3 text-[#7b1231] font-serif text-[18px] font-bold focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none transition-all"
                />
              </div>
            </div>

            {/* Custo Estimado */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-sans text-xs font-semibold text-[#564144]"
                htmlFor="cost-price"
              >
                Custo de Produção
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 font-sans text-xs text-[#564144]">R$</span>
                <input
                  id="cost-price"
                  type="number"
                  step="0.50"
                  value={costPrice || ''}
                  onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                  className="w-full h-12 bg-[#fff0ef] rounded-xl pl-10 pr-3 text-[#564144] font-sans text-base focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Demonstração de Lucro Bruto */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#fde2e1]/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7b1231] text-[20px]">
                monetization_on
              </span>
              <span className="font-sans text-xs text-[#261818] font-medium">
                Lucro Bruto por unidade
              </span>
            </div>
            <span className="font-sans text-sm text-[#7b1231] font-bold">
              R$ {profit.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* 3. Estoque e Disponibilidade */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs flex flex-col gap-4 border border-[#ffe9e8]">
          <div className="flex items-center gap-2 pb-1 border-b border-[#ffe9e8]">
            <span className="w-7 h-7 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#7b1231] font-bold text-xs">
              3
            </span>
            <h2 className="font-serif text-[18px] font-semibold text-[#261818]">
              Estoque & Disponibilidade
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Quantidade Inicial com Stepper */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-[#261818]">
                Qtd. Inicial Pronta
              </label>
              <div className="flex items-center h-12 bg-[#fff0ef] rounded-xl p-1 justify-between">
                <button
                  type="button"
                  onClick={() => setStock((prev) => Math.max(0, prev - 1))}
                  className="w-9 h-9 rounded-lg bg-[#ffffff] text-[#261818] flex items-center justify-center active:scale-90 transition-transform shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-serif text-[18px] font-semibold text-[#261818] w-8 text-center">
                  {stock}
                </span>
                <button
                  type="button"
                  onClick={() => setStock((prev) => prev + 1)}
                  className="w-9 h-9 rounded-lg bg-[#7b1231] text-white flex items-center justify-center active:scale-90 transition-transform shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            {/* Alerta de Estoque Mínimo */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-sans text-xs font-semibold text-[#261818]"
                htmlFor="min-stock"
              >
                Avisar se atingir
              </label>
              <div className="relative flex items-center">
                <input
                  id="min-stock"
                  type="number"
                  value={minStock || ''}
                  onChange={(e) => setMinStock(parseInt(e.target.value, 10) || 0)}
                  className="w-full h-12 bg-[#fff0ef] rounded-xl px-4 text-[#261818] font-sans text-base focus:bg-[#ffffff] focus:ring-2 focus:ring-[#9b2c47] outline-none transition-all"
                />
                <span className="absolute right-3 font-sans text-[11px] text-[#564144]">
                  itens
                </span>
              </div>
            </div>
          </div>

          {/* Unidade de Medida */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-semibold text-[#261818]">
              Unidade de Medida Comercial
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['un', 'caixa', 'kg', 'fatia'] as ProductUnit[]).map((u) => {
                const labelMap: Record<ProductUnit, string> = {
                  un: 'Unidade',
                  caixa: 'Caixa',
                  kg: 'Kg',
                  fatia: 'Fatia',
                };
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`py-2 px-1 rounded-xl font-sans text-[11px] text-center transition-all cursor-pointer ${
                      unit === u
                        ? 'bg-[#7b1231] text-white shadow-xs font-bold'
                        : 'bg-[#fff0ef] text-[#564144] hover:bg-[#ffe9e8]'
                    }`}
                  >
                    {labelMap[u]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch: Disponível para Pronta Entrega */}
          <div className="flex items-center justify-between pt-2 border-t border-[#ffe9e8]">
            <div className="flex flex-col">
              <span className="font-sans text-sm font-semibold text-[#261818]">
                Disponível para pronta entrega
              </span>
              <span className="font-sans text-xs text-[#564144]">
                Exibir no balcão digital agora
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isInstantDelivery}
                onChange={(e) => setIsInstantDelivery(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-[#f7dcdc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#7b1231]" />
            </label>
          </div>

          {/* Switch: Sob Encomenda */}
          <div className="flex flex-col gap-3 pt-2 border-t border-[#ffe9e8]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans text-sm font-semibold text-[#261818]">
                  Produção sob encomenda
                </span>
                <span className="font-sans text-xs text-[#564144]">
                  Requer tempo de preparo antecipado
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMadeToOrder}
                  onChange={(e) => setIsMadeToOrder(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-[#f7dcdc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#904d00]" />
              </label>
            </div>

            {/* Prazo de Preparo */}
            {isMadeToOrder && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#fff0ef]">
                <span className="material-symbols-outlined text-[#904d00] text-[20px]">
                  schedule
                </span>
                <span className="font-sans text-xs text-[#261818] flex-1">
                  Prazo padrão de confecção:
                </span>
                <select
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-[#ffffff] text-[#261818] font-sans text-xs font-bold shadow-xs border border-[#ffe9e8] outline-none cursor-pointer"
                >
                  <option value="12 Horas">12 Horas</option>
                  <option value="24 Horas">24 Horas</option>
                  <option value="48 Horas">48 Horas</option>
                  <option value="72 Horas">72 Horas</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 4. Tags e Selos Especiais */}
        <div className="bg-[#ffffff] rounded-2xl p-4 shadow-xs flex flex-col gap-4 border border-[#ffe9e8]">
          <div className="flex items-center justify-between pb-1 border-b border-[#ffe9e8]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#7b1231] font-bold text-xs">
                4
              </span>
              <h2 className="font-serif text-[18px] font-semibold text-[#261818]">
                Selos & Destaques
              </h2>
            </div>
            <span className="font-sans text-[11px] text-[#564144]">Toque para ativar</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'Mais Vendido', icon: 'check', activeClass: 'bg-[#9b2c47] text-[#ffb9c2]' },
              { id: 'Edição Limitada', icon: 'star', activeClass: 'bg-[#ffdcc3] text-[#2f1500]' },
              { id: 'Sem Glúten', icon: 'check', activeClass: 'bg-[#9b2c47] text-[#ffb9c2]' },
              { id: 'Sem Lactose', icon: 'check', activeClass: 'bg-[#9b2c47] text-[#ffb9c2]' },
              { id: 'Vegano', icon: 'check', activeClass: 'bg-[#9b2c47] text-[#ffb9c2]' },
              { id: '100% Cacau', icon: 'check', activeClass: 'bg-[#9b2c47] text-[#ffb9c2]' },
            ].map((tag) => {
              const isActive = activeTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3.5 py-2 rounded-full font-sans text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? `${tag.activeClass} shadow-xs`
                      : 'bg-[#fff0ef] text-[#564144] hover:bg-[#fde2e1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isActive ? tag.icon : 'add'}
                  </span>
                  <span>{tag.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Botões de Ação do Rodapé */}
        <div className="flex flex-col gap-2.5 pt-2 mb-2">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="w-full h-13 py-3.5 px-6 rounded-full bg-[#7b1231] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(155,44,71,0.25)] active:scale-[0.98] transition-transform hover:bg-[#9b2c47] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>Salvar e Publicar Doce</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            className="w-full h-12 py-3 px-6 rounded-full bg-[#fde2e1] text-[#7b1231] font-sans text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#ffd9dd] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">draft</span>
            <span>Salvar como Rascunho</span>
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-[#564144] text-xs font-semibold hover:text-[#7b1231] cursor-pointer"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#fff8f7] rounded-2xl p-5 w-full max-w-sm shadow-xl border border-[#ffe9e8]">
            <h3 className="font-serif font-bold text-base text-[#261818] mb-2">
              Adicionar Foto do Doce
            </h3>
            <p className="text-xs text-[#564144] mb-3">
              Insira o link direto de uma foto gastronômica ou selecione uma foto de exemplo:
            </p>
            <input
              type="url"
              placeholder="https://..."
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 bg-[#ffffff] rounded-xl border border-[#ffe9e8] text-xs text-[#261818] outline-none focus:ring-1 focus:ring-[#7b1231] mb-3"
            />
            <div className="text-[11px] text-[#8a7174] mb-2 font-semibold">Exemplos do Ateliê:</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  label: 'Brownie',
                  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATOVUpdyxm0HeYwbbOm0l28ONCNoYczem9qkSnpVfAJiJAvX5h8rpoEWyo9j657QlUwFDEaYReLPp5NJTLPLsrNQ1etmjPnaZR1tHpaqoX5XWM-OObTN2gPsAeQb58MINMrZnvytHRBmVxFFOuCitpqdTacPuqoJGr4PFC2PdS0aM2K28wISE95akp8Mq6slmP81AbmW5u6R9SedQLF0bz0-CKkvFkxnNwMfxifjcFsvGwlyP9CSry',
                },
                {
                  label: 'Torta',
                  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5cXlB_I_-ejPKqSDepa844Oyej1Fh5Oje5h0D7ZHRP7WstkyKR_OUykwX8kRDhyQ_YLQToj21xN6QZWT4PvSJyMfqGX4LomLRlz1Q8f7SrdPAQIsdkU0Hy1zrejDyOl0m0XiCsHn2eYYWmHKkY9c-tHrLRPlYudmQkhNImA37mKtlziCShvTY0YeU3Z7Wp9z__ikCko_MMS-ZxlA2ZF9Wi8cqZmAEMnuA4unXW2uuYRZNPtC6pDyW',
                },
                {
                  label: 'Docinhos',
                  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeRJyxzvTIsQefXRRAohwgaSIgR5-zCvOemuOmYZ1ZcY0Ctklb9jCwoyC8jnqTC3qij7bzzK5FeR1HlteBSvUicvyon077o1MpOI501S6XmjZx85YclmF39jfm_OfYPDoJC-S8wmyRkgBpY8rTIynvDQl71UxPnWTj92OyFc-8kriMNur610sMDTFWyZ3KXWI0XRq7BvRtcnGG96A0flQI5NK-VNOmGpgpplLt62OLlSx-OcZZ8Vk9',
                },
              ].map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewPhotoUrl(sample.url)}
                  className="p-1 rounded-lg border border-[#ffe9e8] bg-white text-center hover:border-[#7b1231] cursor-pointer"
                >
                  <img src={sample.url} alt={sample.label} className="w-full h-12 object-cover rounded" />
                  <span className="text-[9px] text-[#564144] block mt-1">{sample.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddPhotoModal(false)}
                className="flex-1 py-2 rounded-full bg-[#ffe9e8] text-[#564144] text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddPhoto}
                disabled={!newPhotoUrl.trim()}
                className="flex-1 py-2 rounded-full bg-[#7b1231] text-white text-xs font-semibold disabled:opacity-50"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
