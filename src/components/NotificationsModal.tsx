import React from 'react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-[#fff8f7] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#ffe9e8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffd9dd] text-[#7b1231] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#261818]">Notificações</h3>
              <p className="text-xs text-[#564144]">Ateliê Doce Encanto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#564144] hover:text-[#7b1231] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-2 text-xs">
          <span className="text-[#564144] font-medium">
            {notifications.filter((n) => !n.isRead).length} não lidas
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-[#7b1231] font-semibold hover:underline cursor-pointer"
          >
            Marcar todas como lidas
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 py-1 max-h-[50vh]">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification && onSelectNotification(item)}
              className={`p-3 rounded-xl transition-all border cursor-pointer ${
                item.isRead
                  ? 'bg-[#ffffff] border-[#ffe9e8] opacity-75'
                  : 'bg-[#fff0ef] border-[#ffd9dd] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                    item.type === 'stock'
                      ? 'text-[#fe932c]'
                      : item.type === 'order'
                      ? 'text-[#7b1231]'
                      : 'text-[#904d00]'
                  }`}
                >
                  {item.type === 'stock'
                    ? 'inventory_2'
                    : item.type === 'order'
                    ? 'local_fire_department'
                    : 'info'}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#261818]">{item.title}</h4>
                    <span className="text-[10px] text-[#8a7174]">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#564144] mt-0.5">{item.description}</p>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-8 text-xs text-[#8a7174]">
              Nenhuma notificação no momento.
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[#ffe9e8]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#ffe9e8] text-[#7b1231] font-medium text-xs hover:bg-[#ffd9dd] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
