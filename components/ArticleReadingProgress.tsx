'use client';
import { useEffect, useRef } from 'react';

export default function ArticleReadingProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && fillRef.current) {
        fillRef.current.style.width = (window.scrollY / h * 100) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '72px',
      left: 0,
      right: 0,
      height: '2px',
      zIndex: 99,
      background: 'var(--m-border-s)',
    }}>
      <div ref={fillRef} style={{
        height: '100%',
        background: 'var(--m-gold)',
        width: '0%',
        transition: 'width 80ms linear',
      }} />
    </div>
  );
}
