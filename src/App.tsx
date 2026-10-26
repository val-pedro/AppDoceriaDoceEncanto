/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProductItem, ActiveTab, ToastMessage, NotificationItem, ProductCategory } from './types';
import { INITIAL_PRODUCTS, INITIAL_NOTIFICATIONS } from './data/initialProducts';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { NotificationsModal } from './components/NotificationsModal';
import { RestockModal } from './components/RestockModal';
import { ProductOptionsModal } from './components/ProductOptionsModal';
import { FilterModal, FilterState } from './components/FilterModal';
import { ProductsView } from './views/ProductsView';
import { CadastrarView } from './views/CadastrarView';
import { EstoqueView } from './views/EstoqueView';
import { AjustesView } from './views/AjustesView';

const LOCAL_STORAGE_KEY = 'doces_encanto_products_v1';
const LOCAL_STORAGE_NOTIFS_KEY = 'doces_encanto_notifs_v1';

export default function App() {
  // Products State
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_PRODUCTS;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_NOTIFS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('produtos');

  // Product being edited (if any)
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'todos',
    stockStatus: 'all',
    shelfStatus: 'all',
    sortBy: 'featured',
  });

  // Modals state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedRestockProduct, setSelectedRestockProduct] = useState<ProductItem | null>(null);
  const [selectedOptionsProduct, setSelectedOptionsProduct] = useState<ProductItem | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Display mode (realistic phone bezel or responsive)
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_NOTIFS_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  }, [notifications]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2500);
  };

  // Toggle Vitrine Online
  const handleToggleOnline = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newStatus = !item.isOnline;
          showToast(
            newStatus
              ? `"${item.name}" ativado na vitrine!`
              : `"${item.name}" pausado da vitrine.`
          );
          return { ...item, isOnline: newStatus };
        }
        return item;
      })
    );
  };

  // Restock product stock
  const handleConfirmRestock = (productId: string, quantityToAdd: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = p.stock + quantityToAdd;
          showToast(
            `Estoque de "${p.name}" atualizado para ${newStock} ${p.unit}!`,
            'success'
          );
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // Update single stock inline (from Estoque view)
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  // Batch restock all critical items (+5 un)
  const handleBatchRestockCritical = () => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.stock <= p.minStock) {
          return { ...p, stock: p.stock + 5 };
        }
        return p;
      })
    );
    showToast('Adicionadas +5 unidades a todos os itens críticos!', 'success');
  };

  // Save (Create or Edit) Product
  const handleSaveProduct = (productData: Partial<ProductItem>, isDraft: boolean) => {
    if (editingProduct) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? ({ ...p, ...productData } as ProductItem) : p))
      );
      setEditingProduct(null);
      showToast(
        isDraft ? 'Rascunho atualizado com sucesso!' : 'Doce atualizado no cardápio!',
        'success'
      );
    } else {
      // Create new
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        name: productData.name || 'Novo Doce',
        category: productData.category || 'bolos',
        categoryLabel: productData.categoryLabel || 'Bolos & Tortas',
        description: productData.description || '',
        price: productData.price || 0,
        cost: productData.cost || 0,
        stock: productData.stock || 0,
        minStock: productData.minStock || 2,
        unit: productData.unit || 'un',
        imageUrl:
          productData.imageUrl ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuATOVUpdyxm0HeYwbbOm0l28ONCNoYczem9qkSnpVfAJiJAvX5h8rpoEWyo9j657QlUwFDEaYReLPp5NJTLPLsrNQ1etmjPnaZR1tHpaqoX5XWM-OObTN2gPsAeQb58MINMrZnvytHRBmVxFFOuCitpqdTacPuqoJGr4PFC2PdS0aM2K28wISE95akp8Mq6slmP81AbmW5u6R9SedQLF0bz0-CKkvFkxnNwMfxifjcFsvGwlyP9CSry',
        imageAlt: productData.name,
        additionalImages: productData.additionalImages || [],
        isOnline: !isDraft,
        badge: null,
        isInstantDelivery: productData.isInstantDelivery ?? true,
        isMadeToOrder: productData.isMadeToOrder ?? false,
        prepTime: productData.prepTime || '24 Horas',
        tags: productData.tags || [],
        isDraft,
        salesToday: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setProducts((prev) => [newProduct, ...prev]);
      showToast(
        isDraft ? 'Rascunho salvo com sucesso!' : 'Doce publicado com sucesso no cardápio!',
        'success'
      );
    }

    setActiveTab('produtos');
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: ProductItem) => {
    const duplicated: ProductItem = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Cópia)`,
      badge: null,
      salesToday: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [duplicated, ...prev]);
    showToast(`"${duplicated.name}" criado com sucesso!`, 'success');
  };

  // Delete Product
  const handleDeleteProduct = (productId: string) => {
    const item = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`"${item?.name || 'Doce'}" removido do cardápio.`, 'info');
  };

  // Quick toggle sort
  const handleQuickToggleSort = () => {
    setFilters((prev) => {
      const nextSort: Record<FilterState['sortBy'], FilterState['sortBy']> = {
        featured: 'price-asc',
        'price-asc': 'price-desc',
        'price-desc': 'name',
        name: 'stock',
        stock: 'featured',
      };
      const newSort = nextSort[prev.sortBy];
      const sortLabels: Record<FilterState['sortBy'], string> = {
        featured: 'Mais Vendidos',
        'price-asc': 'Menor Preço',
        'price-desc': 'Maior Preço',
        name: 'Nome (A-Z)',
        stock: 'Estoque Baixo',
      };
      showToast(`Ordenando por: ${sortLabels[newSort]}`, 'info');
      return { ...prev, sortBy: newSort };
    });
  };

  // Reset to initial mockup data
  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_NOTIFS_KEY);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const criticalStockCount = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div
      className={`min-h-screen bg-[#fff8f7] text-[#261818] flex flex-col font-sans transition-all duration-300 ${
        isMobileFrame ? 'items-center justify-center p-0 md:p-6 bg-stone-200' : ''
      }`}
    >
      {/* Smartphone frame wrapper if mode active on desktop */}
      <div
        className={`w-full flex-1 flex flex-col relative transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[430px] min-h-[884px] bg-[#fff8f7] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-[#3d2c2c] overflow-hidden'
            : 'max-w-lg mx-auto bg-[#fff8f7] min-h-screen shadow-sm'
        }`}
      >
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          unreadNotificationsCount={unreadNotifsCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setActiveTab('perfil')}
        />

        {/* View Content */}
        <main className="flex-1 flex flex-col relative w-full pb-20">
          {activeTab === 'produtos' && (
            <ProductsView
              products={products}
              onToggleOnline={handleToggleOnline}
              onOpenRestock={(product) => setSelectedRestockProduct(product)}
              onOpenOptions={(product) => setSelectedOptionsProduct(product)}
              onNavigateToCadastrar={() => {
                setEditingProduct(null);
                setActiveTab('cadastrar');
              }}
              onOpenFilterModal={() => setIsFilterModalOpen(true)}
              filters={filters}
              onSelectCategory={(cat: ProductCategory | 'todos') =>
                setFilters((prev) => ({ ...prev, category: cat }))
              }
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onQuickToggleSort={handleQuickToggleSort}
            />
          )}

          {activeTab === 'cadastrar' && (
            <CadastrarView
              editingProduct={editingProduct}
              onSaveProduct={handleSaveProduct}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab('produtos');
              }}
            />
          )}

          {activeTab === 'estoque' && (
            <EstoqueView
              products={products}
              onUpdateStock={handleUpdateStock}
              onOpenRestockModal={(product) => setSelectedRestockProduct(product)}
              onBatchRestockCritical={handleBatchRestockCritical}
            />
          )}

          {activeTab === 'perfil' && (
            <AjustesView
              isMobileFrame={isMobileFrame}
              onToggleMobileFrame={() => setIsMobileFrame((prev) => !prev)}
              onResetData={handleResetData}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Persistent Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'cadastrar' && activeTab !== 'cadastrar') {
              setEditingProduct(null);
            }
            setActiveTab(tab);
          }}
          lowStockCount={criticalStockCount}
        />

        {/* Modals & Dialogs */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            showToast('Todas as notificações foram marcadas como lidas.');
          }}
          onSelectNotification={(item) => {
            setNotifications((prev) =>
              prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
            );
            setIsNotificationsOpen(false);
            if (item.type === 'stock') {
              setActiveTab('estoque');
            } else {
              setActiveTab('produtos');
            }
          }}
        />

        <RestockModal
          product={selectedRestockProduct}
          isOpen={!!selectedRestockProduct}
          onClose={() => setSelectedRestockProduct(null)}
          onConfirmRestock={handleConfirmRestock}
        />

        <ProductOptionsModal
          product={selectedOptionsProduct}
          isOpen={!!selectedOptionsProduct}
          onClose={() => setSelectedOptionsProduct(null)}
          onEdit={(product) => {
            setEditingProduct(product);
            setActiveTab('cadastrar');
          }}
          onToggleOnline={(product) => handleToggleOnline(product.id)}
          onRestock={(product) => setSelectedRestockProduct(product)}
          onDuplicate={handleDuplicateProduct}
          onDelete={handleDeleteProduct}
        />

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          onChangeFilters={setFilters}
          onResetFilters={() =>
            setFilters({
              category: 'todos',
              stockStatus: 'all',
              shelfStatus: 'all',
              sortBy: 'featured',
            })
          }
        />

        {/* Interactive Toast Notification */}
        <Toast toast={toast} />
      </div>
    </div>
  );
}
