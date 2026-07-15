'use client';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useNotificationCtx } from '@/context/NotificationContext';
import s from './notification-bell.module.css';

interface Props {
  variant?: 'sidebar' | 'mobile';
}

export default function NotificationBell({ variant = 'sidebar' }: Props) {
  const { visibleNotifications, unreadCount, markAllRead, markRead, isOpen, setIsOpen } = useNotificationCtx();

  const btnRef     = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  const close  = useCallback(() => {
    setIsOpen(false);
    btnRef.current?.focus();
  }, [setIsOpen]);

  // Escape key + click-outside
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
    }
    function onPointer(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen, close]);

  // Focus first item when popover opens
  useEffect(() => {
    if (!isOpen || !popoverRef.current) return;
    const first = popoverRef.current.querySelector<HTMLElement>('a, button');
    first?.focus();
  }, [isOpen]);

  const handleItemClick = useCallback((id: string) => {
    markRead(id);
    setIsOpen(false);
  }, [markRead, setIsOpen]);

  return (
    <div className={variant === 'mobile' ? s.wrapMobile : s.wrap}>
      <button
        ref={btnRef}
        type="button"
        className={variant === 'mobile' ? s.bellMobile : s.bell}
        onClick={toggle}
        aria-label={unreadCount > 0 ? `Notifications — ${unreadCount} unread` : 'Notifications'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className={s.dot} aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Notifications"
          aria-modal="false"
          className={`${s.popover} ${variant === 'mobile' ? s.popoverMobile : ''}`}
        >
          {/* Header */}
          <div className={s.header}>
            <span className={s.headerTitle}>Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                className={s.markRead}
                onClick={markAllRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className={s.list} role="list">
            {visibleNotifications.length === 0 ? (
              <div className={s.empty}>
                <EmptyIcon />
                <span>No notifications</span>
              </div>
            ) : (
              visibleNotifications.map(n => (
                <Link
                  key={n.id}
                  href={n.href}
                  role="listitem"
                  className={`${s.item} ${!n.read ? s.itemUnread : ''}`}
                  onClick={() => handleItemClick(n.id)}
                >
                  <span className={s.itemIndicator} aria-hidden="true">
                    {!n.read && <span className={s.itemDot} />}
                  </span>
                  <span className={s.itemBody}>
                    <span className={s.itemIcon} aria-hidden="true">
                      <NotifIcon type={n.type} />
                    </span>
                    <span className={s.itemText}>
                      <span className={s.itemTitle}>{n.title}</span>
                      <span className={s.itemSub}>{n.sub}</span>
                      <span className={s.itemTime}>{n.time}</span>
                    </span>
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 1.5a4 4 0 0 1 4 4v2.5l1 1.5H2l1-1.5V5.5a4 4 0 0 1 4-4z"/>
      <path d="M5.5 11.5a1.5 1.5 0 0 0 3 0"/>
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2.5a5.5 5.5 0 0 1 5.5 5.5v3.5l1.5 2H3l1.5-2V8a5.5 5.5 0 0 1 5.5-5.5z"/>
      <path d="M7.5 16.5a2.5 2.5 0 0 0 5 0"/>
    </svg>
  );
}

function NotifIcon({ type }: { type: string }) {
  switch (type) {
    case 'message':
      return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 7A1 1 0 0 1 8.5 8H3L1.5 9.5V2.5A1 1 0 0 1 2.5 1.5h6A1 1 0 0 1 9.5 2.5z"/>
        </svg>
      );
    case 'proposal':
    case 'status':
      return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="5.5" r="4"/>
          <path d="M5.5 1.5v4M1.5 5.5h4"/>
        </svg>
      );
    case 'document':
      return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 1.5H2.5A.5.5 0 0 0 2 2v7a.5.5 0 0 0 .5.5h6A.5.5 0 0 0 9 9V4z"/>
          <path d="M6.5 1.5V4H9"/>
        </svg>
      );
    case 'payment':
      return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="2.5" width="9" height="6" rx=".5"/>
          <path d="M1 5h9"/>
        </svg>
      );
    default:
      return null;
  }
}
