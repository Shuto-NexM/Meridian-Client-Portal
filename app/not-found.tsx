import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
        background: 'oklch(100% 0 0 / 0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--m-border-s)', zIndex: 100,
        display: 'flex', alignItems: 'center', padding: '0 96px',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-d)', fontSize: '23px', fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--m-ink)',
          textDecoration: 'none',
        }}>Meridian</Link>
      </nav>

      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '120px 40px 80px', background: 'oklch(98% 0.006 72)',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--m-gold)', margin: '0 auto 24px' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--m-stone)' }}>
            404
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-d)', fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 400, color: 'var(--m-ink)', lineHeight: 1.2, marginBottom: '20px',
          maxWidth: '540px',
        }}>
          This page does not appear to exist.
        </h1>

        <p style={{
          fontSize: '18px', color: 'var(--m-charcoal)', lineHeight: 1.65,
          maxWidth: '440px', marginBottom: '48px',
        }}>
          The address may have changed, or the journey you were looking for has not yet been written.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            display: 'inline-block', background: 'var(--m-ink)', color: 'white',
            padding: '13px 28px', borderRadius: '4px', fontSize: '12px',
            letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Return home</Link>
          <Link href="/journeys" style={{
            display: 'inline-block', border: '1px solid var(--m-border)',
            color: 'var(--m-ink)', padding: '13px 28px', borderRadius: '4px',
            fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>Browse journeys</Link>
        </div>
      </main>
    </>
  );
}
