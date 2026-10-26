import React, { useState } from 'react';
import { APP_LOGO_URL } from '../data/initialProducts';

interface AjustesViewProps {
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onResetData: () => void;
  onShowToast: (msg: string) => void;
}

export const AjustesView: React.FC<AjustesViewProps> = ({
  isMobileFrame,
  onToggleMobileFrame,
  onResetData,
  onShowToast,
}) => {
  const [storeOpen, setStoreOpen] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyOrders, setNotifyOrders] = useState(true);

  return (
    <div className="flex flex-col w-full pb-8 px-5 pt-4">
      <div className="pb-2">
        <div className="flex items-center gap-1 text-[#904d00] mb-1">
          <span className="material-symbols-outlined text-[18px]">settings</span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
            Preferências & Loja
          </span>
        </div>
        <h1 className="font-serif text-[28px] font-semibold text-[#261818] leading-tight">
          Ajustes da Confeitaria
        </h1>
        <p className="font-sans text-sm text-[#564144] mt-0.5">
          Configurações da loja, vitrine digital e modo de visualização.
        </p>
      </div>

      {/* Store Profile Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ffe9e8] mt-3 flex items-center gap-4">
        <img
          src={APP_LOGO_URL}
          alt="Logo Doce Encanto"
          className="w-16 h-16 rounded-xl object-contain bg-[#fff0ef] p-2 border border-[#ffe9e8]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-base text-[#261818]">
            Doce Encanto Ateliê
          </h3>
          <p className="text-xs text-[#564144]">Confeitaria Artesanal & Pâtisserie</p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7b1231] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Balcão Digital Ativo</span>
          </div>
        </div>
      </div>

      {/* Visual Experience Switcher */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ffe9e8] mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-sm font-semibold text-[#261818]">
              Modo Moldura de Celular
            </span>
            <span className="font-sans text-xs text-[#564144]">
              Simular dimensões reais de smartphone no computador
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMobileFrame}
              onChange={onToggleMobileFrame}
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-[#f7dcdc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#7b1231]" />
          </label>
        </div>
      </div>

      {/* Firebase Cloud Database Status */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ffe9e8] mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#ffe9e8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe932c] text-[22px]">cloud_sync</span>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#261818]">Nuvem & Banco Firebase</h3>
              <p className="text-[11px] text-[#564144]">Sincronização em tempo real</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-sans text-[10px] font-bold">
            Configuração
          </span>
        </div>

        <div className="bg-[#fff0ef] p-3 rounded-xl text-xs text-[#564144] flex flex-col gap-2">
          <p>
            O esquema de dados e regras de segurança (<code>firestore.rules</code>) foram preparados.
          </p>
          <div className="p-2.5 bg-white rounded-lg border border-[#ffd9dd] text-[11px] text-[#261818]">
            <strong className="text-[#904d00] block mb-1">Aviso de Permissão do Google Cloud:</strong>
            Contas institucionais (como <code>@docente.senai.br</code>) possuem bloqueio de criação automática de projetos via API. Para conectar seu banco, informe o <strong>ID do Projeto</strong> do Firebase Console.
          </div>
        </div>
      </div>

      {/* Loja & Atendimento */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ffe9e8] mt-4 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-base text-[#261818] pb-1 border-b border-[#ffe9e8]">
          Atendimento & Horários
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-semibold text-[#261818]">
              Aceitar Pedidos Online
            </span>
            <span className="font-sans text-[11px] text-[#564144]">
              Pausar ou ativar o carrinho digital para clientes
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={storeOpen}
              onChange={(e) => {
                setStoreOpen(e.target.checked);
                onShowToast(
                  e.target.checked
                    ? 'Balcão digital aberto para pedidos!'
                    : 'Balcão digital pausado temporariamente.'
                );
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#f7dcdc] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7b1231]" />
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#fff0ef] rounded-xl text-xs text-[#564144]">
          <span className="material-symbols-outlined text-[#7b1231] text-[20px]">schedule</span>
          <div>
            <div className="font-bold text-[#261818]">Horário de Produção</div>
            <div>Terça a Sábado: 09h00 às 19h00 · Domingo: 09h00 às 14h00</div>
          </div>
        </div>
      </div>

      {/* Notificações Push */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ffe9e8] mt-4 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-base text-[#261818] pb-1 border-b border-[#ffe9e8]">
          Alertas Automáticos
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-semibold text-[#261818]">
              Alerta de Estoque Crítico
            </span>
            <span className="font-sans text-[11px] text-[#564144]">
              Notificar quando um doce atingir o estoque mínimo
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifyLowStock}
              onChange={(e) => setNotifyLowStock(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#f7dcdc] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7b1231]" />
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-semibold text-[#261818]">
              Notificação de Vendas & Encomendas
            </span>
            <span className="font-sans text-[11px] text-[#564144]">
              Avisos sonoros e banner quando novo pedido entrar
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifyOrders}
              onChange={(e) => setNotifyOrders(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#f7dcdc] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7b1231]" />
          </label>
        </div>
      </div>

      {/* Dados & Reset */}
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Restaurar os produtos de exemplo do cardápio original?')) {
              onResetData();
              onShowToast('Cardápio restaurado para o padrão original!');
            }
          }}
          className="w-full py-3 px-4 rounded-full bg-[#ffe9e8] text-[#7b1231] font-semibold text-xs hover:bg-[#ffd9dd] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>Restaurar Cardápio Padrão do Ateliê</span>
        </button>
      </div>
    </div>
  );
};
