import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PortalShell from './PortalShell';
import './portal.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Meridian Client Portal',
    default: 'Client Portal | Meridian',
  },
  description: 'Your private Meridian Client Portal. Journey itineraries, documents, messages and payments in one place.',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
