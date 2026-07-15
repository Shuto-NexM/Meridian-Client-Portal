'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import s from './payment-flow.module.css';
import { PAYMENTS, PORTAL_USER } from '@/data/portal';

// ── Types ──────────────────────────────────────────────────────────────────────
type Step = 'detail' | 'method' | 'review' | 'confirming' | 'success' | 'error';
type Method = 'saved' | 'new';

interface Card {
  name: string; number: string; expiry: string;
  cvv: string; country: string; postal: string;
}
interface Errs { name?: string; number?: string; expiry?: string; cvv?: string; postal?: string; }

export const FLOW_INV = {
  number:      'MRD-2026-0218',
  receipt:     'MER-JPN-2026-002',
  description: 'Second Payment — Japan Journey',
  amount:      PAYMENTS.instalments[0].amount,
  dueDate:     PAYMENTS.instalments[0].date,
  payDate:     '14 Jul 2026',
};

const BREAKDOWN = [
  { label: 'Accommodation',                sub: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan', amt: 2100 },
  { label: 'Private guiding & experiences', sub: '12 days · Tokyo, Kyoto, Hakone',              amt: 1260 },
  { label: 'Ground transport & transfers',  sub: 'All internal journeys',                        amt:  840 },
];

// Card 4000 0000 0000 0002 → demo error
const ERROR_NUM = '4000000000000002';

// ── Helpers ────────────────────────────────────────────────────────────────────
function fmt(n: number) { return n.toLocaleString(); }

function fmtCard(raw: string) {
  return raw.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
}
function fmtExp(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}
function maskNum(num: string) {
  const d = num.replace(/\D/g, '');
  return d.length >= 4 ? '•••• ' + d.slice(-4) : 'New card';
}

// ── Step dots ──────────────────────────────────────────────────────────────────
function Dots({ step }: { step: Step }) {
  const idx = step === 'detail' ? 0 : step === 'method' ? 1 : (step === 'review' || step === 'confirming') ? 2 : -1;
  if (idx < 0) return <div />;
  return (
    <div className={s.dots} aria-hidden="true">
      {[0, 1, 2].map(i => (
        <span key={i} className={`${s.dot} ${i < idx ? s.dotDone : i === idx ? s.dotActive : ''}`} />
      ))}
    </div>
  );
}

// ── StepDetail ─────────────────────────────────────────────────────────────────
function StepDetail({ sym, onContinue }: { sym: string; onContinue: () => void }) {
  return (
    <div className={s.step}>
      <p className={s.stepEyebrow}>Payment Due</p>
      <h2 id="pf-heading" className={s.stepTitle}>Second Payment</h2>
      <p className={s.stepSub}>Japan · 12 Nights · Invoice {FLOW_INV.number}</p>

      <div className={s.amtCard}>
        <p className={s.amtLabel}>Amount Due</p>
        <p className={s.amtValue}>{sym}{fmt(FLOW_INV.amount)}</p>
        <p className={s.amtMeta}>Due {FLOW_INV.dueDate}</p>
      </div>

      <div className={s.breakdown}>
        <p className={s.breakdownLabel}>Breakdown</p>
        {BREAKDOWN.map(b => (
          <div key={b.label} className={s.breakdownRow}>
            <div>
              <p className={s.breakdownItem}>{b.label}</p>
              <p className={s.breakdownSub}>{b.sub}</p>
            </div>
            <span className={s.breakdownAmt}>{sym}{fmt(b.amt)}</span>
          </div>
        ))}
        <div className={s.breakdownTotal}>
          <span>Total this instalment</span>
          <span className={s.breakdownTotalAmt}>{sym}{fmt(FLOW_INV.amount)}</span>
        </div>
      </div>

      <div className={s.context}>
        <div className={s.contextRow}>
          <span className={s.contextLabel}>Journey</span>
          <span className={s.contextVal}>Japan · 12 Nights</span>
        </div>
        <div className={s.contextRow}>
          <span className={s.contextLabel}>Client</span>
          <span className={s.contextVal}>{PORTAL_USER.name}</span>
        </div>
        <div className={s.contextRow}>
          <span className={s.contextLabel}>Deposit paid</span>
          <span className={s.contextVal}>{sym}4,200 · 28 Jun 2026</span>
        </div>
        <div className={s.contextRow}>
          <span className={s.contextLabel}>Final balance remaining</span>
          <span className={s.contextVal}>{sym}4,200 · 15 Sep 2026</span>
        </div>
      </div>

      <div className={s.stepFooter}>
        <button className={s.btnPrimary} type="button" onClick={onContinue}>
          Continue to payment
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────────
function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.fieldLabel}>{label}</label>
      {children}
      {error && <span className={s.fieldError} role="alert">{error}</span>}
    </div>
  );
}

// ── StepMethod ─────────────────────────────────────────────────────────────────
function StepMethod({ method, setMethod, card, setCard, errors, setErrors, onContinue }: {
  method: Method; setMethod: (m: Method) => void;
  card: Card; setCard: (c: Card) => void;
  errors: Errs; setErrors: (e: Errs) => void;
  onContinue: () => void;
}) {
  const sym = PAYMENTS.symbol;
  function upd(field: keyof Card, raw: string) {
    let v = raw;
    if (field === 'number') v = fmtCard(raw);
    if (field === 'expiry') v = fmtExp(raw);
    if (field === 'cvv')    v = raw.replace(/\D/g, '').slice(0, 4);
    setCard({ ...card, [field]: v });
    if (errors[field as keyof Errs]) setErrors({ ...errors, [field]: undefined });
  }
  return (
    <div className={s.step}>
      <p className={s.stepEyebrow}>Step 2 of 3</p>
      <h2 id="pf-heading" className={s.stepTitle}>Payment method</h2>
      <span className={s.amtPill}>{sym}{fmt(FLOW_INV.amount)} due {FLOW_INV.dueDate}</span>

      {/* Saved card */}
      <button
        type="button"
        className={`${s.methodTile} ${method === 'saved' ? s.methodTileActive : ''}`}
        onClick={() => setMethod('saved')}
        aria-pressed={method === 'saved'}
      >
        <span className={s.methodCheck}>{method === 'saved' && <span className={s.checkDot} />}</span>
        <span className={s.methodCardIcon} aria-hidden="true">
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
            <rect x="1" y="1" width="24" height="16" rx="1.5" />
            <path d="M1 6h24" />
            <rect x="3" y="10" width="4" height="2" rx="0.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className={s.methodCardInfo}>
          <span className={s.methodCardName}>Visa ending in 4242</span>
          <span className={s.methodCardSub}>Expires 09/28</span>
        </span>
        <span className={s.methodBadge}>Saved</span>
      </button>

      {/* New card */}
      <button
        type="button"
        className={`${s.methodTile} ${method === 'new' ? s.methodTileActive : ''}`}
        onClick={() => setMethod('new')}
        aria-pressed={method === 'new'}
      >
        <span className={s.methodCheck}>{method === 'new' && <span className={s.checkDot} />}</span>
        <span className={s.methodCardIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 4v12M4 10h12" />
          </svg>
        </span>
        <span className={s.methodCardInfo}>
          <span className={s.methodCardName}>Use a new card</span>
          <span className={s.methodCardSub}>Visa, Mastercard, Amex</span>
        </span>
      </button>

      {/* New card form */}
      {method === 'new' && (
        <div className={s.cardForm}>
          <Field id="cf-name" label="Cardholder name" error={errors.name}>
            <input id="cf-name" className={`${s.input} ${errors.name ? s.inputErr : ''}`}
              type="text" autoComplete="cc-name" placeholder="Emily Weston"
              value={card.name} onChange={e => upd('name', e.target.value)} />
          </Field>
          <Field id="cf-num" label="Card number" error={errors.number}>
            <input id="cf-num" className={`${s.input} ${errors.number ? s.inputErr : ''}`}
              type="text" inputMode="numeric" autoComplete="cc-number"
              placeholder="•••• •••• •••• ••••"
              value={card.number} onChange={e => upd('number', e.target.value)} />
          </Field>
          <div className={s.fieldRow}>
            <Field id="cf-exp" label="Expiry" error={errors.expiry}>
              <input id="cf-exp" className={`${s.input} ${errors.expiry ? s.inputErr : ''}`}
                type="text" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY"
                value={card.expiry} onChange={e => upd('expiry', e.target.value)} />
            </Field>
            <Field id="cf-cvv" label="Security code" error={errors.cvv}>
              <input id="cf-cvv" className={`${s.input} ${errors.cvv ? s.inputErr : ''}`}
                type="text" inputMode="numeric" autoComplete="cc-csc" placeholder="•••"
                value={card.cvv} onChange={e => upd('cvv', e.target.value)} />
            </Field>
          </div>
          <div className={s.fieldRow}>
            <Field id="cf-country" label="Billing country" error={undefined}>
              <select id="cf-country" className={s.input} autoComplete="billing country"
                value={card.country} onChange={e => setCard({ ...card, country: e.target.value })}>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="JP">Japan</option>
                <option value="AU">Australia</option>
              </select>
            </Field>
            <Field id="cf-postal" label="Postal code" error={errors.postal}>
              <input id="cf-postal" className={`${s.input} ${errors.postal ? s.inputErr : ''}`}
                type="text" autoComplete="billing postal-code" placeholder="SW1A 1AA"
                value={card.postal} onChange={e => upd('postal', e.target.value)} />
            </Field>
          </div>
        </div>
      )}

      <DemoNotice />

      <div className={s.stepFooter}>
        <button className={s.btnPrimary} type="button" onClick={onContinue}>
          Review payment
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── StepReview ─────────────────────────────────────────────────────────────────
function StepReview({ sym, method, card, displayCard, onConfirm, onBack }: {
  sym: string; method: Method; card: Card; displayCard: string;
  onConfirm: () => void; onBack: () => void;
}) {
  return (
    <div className={s.step}>
      <p className={s.stepEyebrow}>Step 3 of 3</p>
      <h2 id="pf-heading" className={s.stepTitle}>Review payment</h2>

      <div className={s.reviewCard}>
        <div className={s.reviewRow}>
          <span className={s.reviewLabel}>Journey</span>
          <span className={s.reviewVal}>Japan · 12 Nights</span>
        </div>
        <div className={s.reviewRow}>
          <span className={s.reviewLabel}>Invoice</span>
          <span className={s.reviewVal}>{FLOW_INV.number}</span>
        </div>
        <div className={s.reviewRow}>
          <span className={s.reviewLabel}>Description</span>
          <span className={s.reviewVal}>{FLOW_INV.description}</span>
        </div>
        <div className={s.reviewRow}>
          <span className={s.reviewLabel}>Payment method</span>
          <span className={s.reviewVal}>{displayCard}</span>
        </div>
        {method === 'new' && card.postal && (
          <div className={s.reviewRow}>
            <span className={s.reviewLabel}>Billing postal code</span>
            <span className={s.reviewVal}>{card.postal}</span>
          </div>
        )}
        <div className={`${s.reviewRow} ${s.reviewTotal}`}>
          <span className={s.reviewTotalLabel}>Amount</span>
          <span className={s.reviewTotalAmt}>{sym}{fmt(FLOW_INV.amount)}</span>
        </div>
      </div>

      <DemoNotice />

      <div className={s.stepFooterTwo}>
        <button className={s.btnPrimary} type="button" onClick={onConfirm}>
          Confirm payment
        </button>
        <button className={s.btnGhost} type="button" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

// ── StepConfirming ─────────────────────────────────────────────────────────────
function StepConfirming({ sym }: { sym: string }) {
  return (
    <div className={s.stepCenter} aria-live="polite" aria-busy="true">
      <div className={s.loadingDots} aria-hidden="true">
        <span /><span /><span />
      </div>
      <p className={s.loadingText}>Processing payment</p>
      <p className={s.loadingAmt}>{sym}{fmt(FLOW_INV.amount)}</p>
    </div>
  );
}

// ── StepSuccess ────────────────────────────────────────────────────────────────
function StepSuccess({ sym, displayCard, onClose, onViewReceipt }: {
  sym: string; displayCard: string; onClose: () => void; onViewReceipt: () => void;
}) {
  return (
    <div className={s.stepCenter}>
      <div className={s.successMark} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7AB87A" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 12.5L9 17.5l11-11" />
        </svg>
      </div>
      <h2 id="pf-heading" className={s.successTitle} aria-live="polite">Payment received</h2>
      <p className={s.successAmt}>{sym}{fmt(FLOW_INV.amount)}</p>
      <p className={s.successMeta}>Received {FLOW_INV.payDate}</p>

      <div className={s.successDetails}>
        <div className={s.successRow}>
          <span className={s.successLabel}>Invoice</span>
          <span className={s.successVal}>{FLOW_INV.number}</span>
        </div>
        <div className={s.successRow}>
          <span className={s.successLabel}>Receipt</span>
          <span className={s.successVal}>{FLOW_INV.receipt}</span>
        </div>
        <div className={s.successRow}>
          <span className={s.successLabel}>Method</span>
          <span className={s.successVal}>{displayCard}</span>
        </div>
      </div>

      <p className={s.successNote}>
        Your payment has been received and applied to your Japan journey. Sofia has been notified.
      </p>

      <div className={s.successActions}>
        <button className={s.btnPrimary} type="button" onClick={onViewReceipt}>
          View receipt
        </button>
        <button className={s.btnGhost} type="button" onClick={onClose}>
          Return to Payments
        </button>
      </div>
    </div>
  );
}

// ── StepError ──────────────────────────────────────────────────────────────────
function StepError({ onRetry, onClose }: { onRetry: () => void; onClose: () => void }) {
  return (
    <div className={s.stepCenter} aria-live="assertive">
      <div className={s.errorMark} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#C8706A" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="9" />
          <path d="M11 7v4.5M11 14.5h.01" />
        </svg>
      </div>
      <h2 id="pf-heading" className={s.errorTitle}>Payment could not be completed</h2>
      <p className={s.errorNote}>
        Please review the payment details or contact Sofia directly for assistance.
      </p>
      <div className={s.successActions}>
        <button className={s.btnPrimary} type="button" onClick={onRetry}>
          Review payment details
        </button>
        <button className={s.btnGhost} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

// ── DemoNotice ─────────────────────────────────────────────────────────────────
function DemoNotice() {
  return (
    <p className={s.demoNotice}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
        <circle cx="5.5" cy="5.5" r="4.5" />
        <path d="M5.5 4.5v2.5M5.5 8.5h.01" />
      </svg>
      Demo payment — no charge will be made
    </p>
  );
}

// ── ReceiptView ────────────────────────────────────────────────────────────────
export function ReceiptView({ sym, displayCard, onClose }: {
  sym: string; displayCard: string; onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`${s.overlay} ${s.overlayTop}`} onClick={onClose} aria-hidden="true">
      <div className={s.receiptPanel} role="dialog" aria-modal="true" aria-labelledby="rcpt-h"
        onClick={e => e.stopPropagation()}>
        <div className={s.receiptHeader}>
          <button type="button" className={s.receiptBack} onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M8 2L4 6l4 4" />
            </svg>
            Payments
          </button>
          <span className={s.receiptCat}>Receipt</span>
        </div>

        <div className={s.receiptBody}>
          <div className={s.receiptWordmarkRow}>
            <div>
              <p className={s.receiptWordmark}>Meridian</p>
              <p className={s.receiptWordmarkSub}>Private Travel</p>
            </div>
            <div className={s.receiptRefBlock}>
              <p id="rcpt-h" className={s.receiptRefLabel}>Receipt</p>
              <p className={s.receiptRefNum}>{FLOW_INV.receipt}</p>
            </div>
          </div>

          <div className={s.receiptAmtBlock}>
            <p className={s.receiptAmtLabel}>Amount Received</p>
            <p className={s.receiptAmtNum}>{sym}{fmt(FLOW_INV.amount)}</p>
          </div>

          <div className={s.receiptDetails}>
            <div>
              <p className={s.receiptDetailLabel}>Payment Date</p>
              <p className={s.receiptDetailVal}>{FLOW_INV.payDate}</p>
            </div>
            <div>
              <p className={s.receiptDetailLabel}>Method</p>
              <p className={s.receiptDetailVal}>{displayCard}</p>
            </div>
            <div>
              <p className={s.receiptDetailLabel}>Journey</p>
              <p className={s.receiptDetailVal}>Japan · 12 Nights</p>
            </div>
            <div>
              <p className={s.receiptDetailLabel}>Invoice</p>
              <p className={s.receiptDetailVal}>{FLOW_INV.number}</p>
            </div>
            <div>
              <p className={s.receiptDetailLabel}>Client</p>
              <p className={s.receiptDetailVal}>{PORTAL_USER.name}</p>
            </div>
            <div>
              <p className={s.receiptDetailLabel}>Description</p>
              <p className={s.receiptDetailVal}>{FLOW_INV.description}</p>
            </div>
          </div>
        </div>

        <div className={s.receiptFooter}>
          <button type="button" className={s.receiptDownload} onClick={() => window.print()}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
              <path d="M6.5 1v8M3.5 6l3 3 3-3" /><path d="M1.5 11h10" />
            </svg>
            Print receipt
          </button>
          <span className={s.receiptThanks}>Thank you, {PORTAL_USER.name.split(' ')[0]}.</span>
        </div>
      </div>
    </div>
  );
}

// ── PaymentFlow (main export) ──────────────────────────────────────────────────
interface Props {
  onClose: () => void;
  onSuccess: (displayCard: string) => void;
}

export default function PaymentFlow({ onClose, onSuccess }: Props) {
  const [step, setStep]     = useState<Step>('detail');
  const [method, setMethod] = useState<Method>('saved');
  const [card, setCard]     = useState<Card>({ name: '', number: '', expiry: '', cvv: '', country: 'GB', postal: '' });
  const [errors, setErrors] = useState<Errs>({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [displayCard, setDisplayCard] = useState('Visa •••• 4242');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sym = PAYMENTS.symbol;

  // Escape to close (not during confirming/success)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'confirming' && step !== 'success') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [step, onClose]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function validate(): boolean {
    if (method === 'saved') return true;
    const errs: Errs = {};
    if (!card.name.trim()) errs.name = 'Cardholder name is required';
    if (card.number.replace(/\D/g, '').length < 13) errs.number = 'Please enter a valid card number';
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = 'Enter expiry as MM/YY';
    if (card.cvv.length < 3) errs.cvv = 'Security code must be 3–4 digits';
    if (!card.postal.trim()) errs.postal = 'Billing postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleMethodContinue() {
    if (!validate()) return;
    const dc = method === 'saved' ? 'Visa •••• 4242' : maskNum(card.number);
    setDisplayCard(dc);
    setStep('review');
  }

  const handleConfirm = useCallback(() => {
    const isErrorCard = method === 'new' && card.number.replace(/\D/g, '') === ERROR_NUM;
    setStep('confirming');
    timer.current = setTimeout(() => {
      if (isErrorCard) {
        setStep('error');
      } else {
        setStep('success');
        onSuccess(displayCard);
      }
    }, 2000);
  }, [method, card.number, displayCard, onSuccess]);

  function handleBack() {
    if (step === 'method') setStep('detail');
    else if (step === 'review') setStep('method');
    else if (step === 'error') setStep('review');
  }

  const showHeader = step !== 'success';

  return (
    <>
      <div className={s.overlay} role="dialog" aria-modal="true" aria-labelledby="pf-heading">
        <div className={s.panel}>

          {showHeader && (
            <div className={s.panelHeader}>
              {(step !== 'detail' && step !== 'confirming') ? (
                <button className={s.headerBack} type="button" onClick={handleBack} aria-label="Go back">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                    <path d="M8 2L4 6l4 4" />
                  </svg>
                  Back
                </button>
              ) : <div />}

              <Dots step={step} />

              {step !== 'confirming' ? (
                <button className={s.headerClose} type="button" onClick={onClose} aria-label="Close payment">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                    <path d="M2 2l10 10M12 2L2 12" />
                  </svg>
                </button>
              ) : <div />}
            </div>
          )}

          <div className={s.panelBody}>
            {step === 'detail'     && <StepDetail sym={sym} onContinue={() => setStep('method')} />}
            {step === 'method'     && <StepMethod method={method} setMethod={setMethod} card={card} setCard={setCard} errors={errors} setErrors={setErrors} onContinue={handleMethodContinue} />}
            {step === 'review'     && <StepReview sym={sym} method={method} card={card} displayCard={displayCard} onConfirm={handleConfirm} onBack={handleBack} />}
            {step === 'confirming' && <StepConfirming sym={sym} />}
            {step === 'success'    && <StepSuccess sym={sym} displayCard={displayCard} onClose={onClose} onViewReceipt={() => setShowReceipt(true)} />}
            {step === 'error'      && <StepError onRetry={handleBack} onClose={onClose} />}
          </div>
        </div>
      </div>

      {showReceipt && (
        <ReceiptView sym={sym} displayCard={displayCard} onClose={() => setShowReceipt(false)} />
      )}
    </>
  );
}
