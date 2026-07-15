import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = { title: 'Travellers' };
export default function TravellersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
