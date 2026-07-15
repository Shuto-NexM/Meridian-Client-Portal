'use client';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export type NotifSettingKey = 'message' | 'proposal' | 'document' | 'payment' | 'status' | 'predep';
export interface NotifChannels { email: boolean; app: boolean; }
export type NotifSettings = Record<NotifSettingKey, NotifChannels>;

export interface PortalNotification {
  id: string;
  type: NotifSettingKey;
  title: string;
  sub: string;
  time: string;
  href: string;
  read: boolean;
}

interface NotifCtxValue {
  settings: NotifSettings;
  toggleSetting: (key: NotifSettingKey, ch: 'email' | 'app') => void;
  visibleNotifications: PortalNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Ctx = createContext<NotifCtxValue | null>(null);

const DEMO: PortalNotification[] = [
  { id: 'n1', type: 'message',  title: 'New message from Sofia',    sub: 'Regarding your Japan itinerary update',    time: '2 min ago',  href: '/portal/messages',                 read: false },
  { id: 'n2', type: 'proposal', title: 'Japan itinerary updated',   sub: 'Morning programme revised — Kyoto section', time: '1 hr ago',   href: '/portal/journeys/japan/workspace', read: false },
  { id: 'n3', type: 'document', title: 'New document available',    sub: 'Japan Visa Application Guide',              time: '3 hrs ago',  href: '/portal/documents',                read: false },
  { id: 'n4', type: 'payment',  title: 'Payment due in 7 days',     sub: 'Japan Journey — second instalment',         time: 'Yesterday',  href: '/portal/payments',                 read: true  },
  { id: 'n5', type: 'status',   title: 'Journey status updated',    sub: 'Japan: all bookings confirmed',             time: '2 days ago', href: '/portal/journeys',                 read: true  },
];

const DEFAULT_SETTINGS: NotifSettings = {
  message:  { email: true,  app: true  },
  proposal: { email: true,  app: true  },
  document: { email: false, app: true  },
  payment:  { email: true,  app: true  },
  status:   { email: true,  app: false },
  predep:   { email: true,  app: true  },
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings]       = useState<NotifSettings>(DEFAULT_SETTINGS);
  const [items, setItems]             = useState<PortalNotification[]>(DEMO);
  const [isOpen, setIsOpen]           = useState(false);
  const pathname                      = usePathname();

  // Close popover on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const toggleSetting = useCallback((key: NotifSettingKey, ch: 'email' | 'app') => {
    setSettings(prev => ({ ...prev, [key]: { ...prev[key], [ch]: !prev[key][ch] } }));
  }, []);

  const visibleNotifications = items.filter(n => settings[n.type].app);
  const unreadCount          = visibleNotifications.filter(n => !n.read).length;

  const markAllRead = useCallback(() => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  return (
    <Ctx.Provider value={{ settings, toggleSetting, visibleNotifications, unreadCount, markAllRead, markRead, isOpen, setIsOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useNotificationCtx(): NotifCtxValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNotificationCtx must be used within NotificationProvider');
  return ctx;
}
