'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './payments.module.css';
import { PAYMENTS } from '@/data/portal';

export default function PaymentsPage() {
  const [showReceipt, setShowReceipt] = useState(false);
  useEffect(() => {
    if (!showReceipt) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowReceipt(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showReceipt]);
  const sym = PAYMENTS.symbol;
  const remaining = PAYMENTS.total - PAYMENTS.deposit.amount;

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${styles.topBarPay}`}>
        <div className="topDate">Monday, 14 July 2026</div>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Heading */}
      <div className={styles.heading}>
        <h1 className={styles.headingTitle}>Payments</h1>
        <div className={styles.headingSubtitle}>A transparent overview of your journey investment.</div>
      </div>

      {/* Two-column layout */}
      <div className={styles.grid}>

        {/* ── LEFT column ── */}
        <div className={styles.mainCol}>

          {/* Summary cards */}
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Journey Total</div>
              <div className={styles.summaryAmount}>{sym}{PAYMENTS.total.toLocaleString()}</div>
              <div className={styles.summaryMeta}>Japan · 12 Nights</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Deposit Paid</div>
              <div className={styles.summaryAmount}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</div>
              <div className={styles.summaryReceived}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#7AB87A" strokeWidth="1.3" strokeLinecap="round">
                  <path d="M1.5 5.5L4 8l4.5-5"/>
                </svg>
                <span>Received 28 Jun</span>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Remaining</div>
              <div className={styles.summaryAmount}>{sym}{remaining.toLocaleString()}</div>
              <div className={styles.summaryMeta}>Two instalments</div>
            </div>

            <div className={`${styles.summaryCard} ${styles.summaryCardDark}`}>
              <div className={styles.summaryLabelDark}>Next Due</div>
              <div className={styles.summaryAmountLight}>{sym}{PAYMENTS.instalments[0].amount.toLocaleString()}</div>
              <div className={styles.summaryGold}>18 Aug 2026</div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className={styles.card}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Journey Payment Progress</span>
              <span className={styles.progressPct}>33% complete</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.milestones}>
              <div className={styles.milestone}>
                <div className={`${styles.mAmt} ${styles.mAmtGold}`}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</div>
                <div className={styles.mSub}>Deposit</div>
              </div>
              <div className={styles.milestone}>
                <div className={styles.mAmt}>{sym}{PAYMENTS.instalments[0].amount.toLocaleString()}</div>
                <div className={styles.mSub}>18 Aug</div>
              </div>
              <div className={styles.milestone}>
                <div className={styles.mAmt}>{sym}{PAYMENTS.instalments[1].amount.toLocaleString()}</div>
                <div className={styles.mSub}>15 Oct</div>
              </div>
              <div className={styles.milestone}>
                <div className={styles.mAmt}>Journey</div>
                <div className={styles.mSub}>12 Sep</div>
              </div>
            </div>
          </div>

          {/* Payment Timeline */}
          <div className={styles.card}>
            <div className={styles.timelineTitle}>Payment Timeline</div>
            <div className={styles.timeline}>
              <div className={styles.tlTrack}></div>

              {/* Step 1 — complete */}
              <div className={styles.tlStep}>
                <div className={`${styles.tlDot} ${styles.tlDotDone}`}></div>
                <div className={styles.tlBody}>
                  <div className={styles.tlRow}>
                    <span className={styles.tlLabel}>Deposit Received</span>
                    <span className={styles.tlAmt}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</span>
                  </div>
                  <div className={styles.tlMeta}>
                    <span className={styles.tlDate}>28 Jun 2026</span>
                    <span className={styles.tlReceived}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#7AB87A" strokeWidth="1.2" strokeLinecap="round">
                        <path d="M1.5 4.5L3.5 6.5l4-4"/>
                      </svg>
                      Received
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 — upcoming */}
              <div className={styles.tlStep}>
                <div className={`${styles.tlDot} ${styles.tlDotUpcoming}`}></div>
                <div className={styles.tlBody}>
                  <div className={styles.tlRow}>
                    <span className={styles.tlLabel}>Second Payment</span>
                    <span className={styles.tlAmt}>{sym}{PAYMENTS.instalments[0].amount.toLocaleString()}</span>
                  </div>
                  <div className={styles.tlMeta}>
                    <span className={styles.tlDate}>18 Aug 2026</span>
                    <span className={styles.tlDueBadge}>Due in 35 days</span>
                  </div>
                </div>
              </div>

              {/* Step 3 — future */}
              <div className={styles.tlStep}>
                <div className={`${styles.tlDot} ${styles.tlDotFuture}`}></div>
                <div className={styles.tlBody}>
                  <div className={styles.tlRow}>
                    <span className={`${styles.tlLabel} ${styles.tlLabelMuted}`}>Final Balance</span>
                    <span className={`${styles.tlAmt} ${styles.tlAmtMuted}`}>{sym}{PAYMENTS.instalments[1].amount.toLocaleString()}</span>
                  </div>
                  <span className={styles.tlDateMuted}>15 Oct 2026</span>
                </div>
              </div>

              {/* Step 4 — journey */}
              <div className={`${styles.tlStep} ${styles.tlStepLast}`}>
                <div className={`${styles.tlDot} ${styles.tlDotFaint}`}></div>
                <div className={styles.tlBody}>
                  <span className={`${styles.tlLabel} ${styles.tlLabelFaint}`}>Journey Complete</span>
                  <div><span className={styles.tlDateMuted}>Oct 2026</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className={styles.card}>
            <div className={styles.historyHeader}>
              <span className={styles.historyTitle}>Payment History</span>
              <span className={styles.historyCount}>1 transaction</span>
            </div>

            {/* Table header */}
            <div className={`${styles.histRow} ${styles.histHead}`}>
              <div className={styles.histCell}>Date</div>
              <div className={`${styles.histCell} ${styles.histCellMain}`}>Description</div>
              <div className={`${styles.histCell} ${styles.histCellAmt}`}>Amount</div>
              <div className={styles.histCell}>Status</div>
              <div className={styles.histCell}></div>
            </div>

            {/* Row 1 — clickable */}
            <button type="button" className={`btnReset ${styles.histRow} ${styles.histRowClickable}`} onClick={() => setShowReceipt(true)}>
              <div className={styles.histDate}>28 Jun 2026</div>
              <div>
                <div className={styles.histDesc}>Journey Deposit</div>
                <div className={styles.histDetail}>Japan · 12 Nights</div>
              </div>
              <div className={styles.histAmtVal}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</div>
              <div className={styles.histStatusGreen}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#7AB87A" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M1.5 4.5L3.5 6.5l4-4"/>
                </svg>
                Received
              </div>
              <svg className={styles.histArrow} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </button>

            {/* Row 2 — upcoming, dimmed */}
            <div className={`${styles.histRow} ${styles.histRowDim}`}>
              <div className={styles.histDate}>18 Aug 2026</div>
              <div>
                <div className={styles.histDesc}>Second Payment</div>
                <div className={styles.histDetail}>Japan · 12 Nights</div>
              </div>
              <div className={styles.histAmtVal}>{sym}{PAYMENTS.instalments[0].amount.toLocaleString()}</div>
              <div className={styles.histStatusAmber}>Pending</div>
              <div></div>
            </div>
          </div>

          {/* Travel Protection */}
          <div className={styles.protectionBanner}>
            <div>
              <div className={styles.protLabel}>Travel Protection</div>
              <div className={styles.protTitle}>Comprehensive journey insurance is included.</div>
              <div className={styles.protDetail}>Medical · Cancellation · Interruption · Baggage</div>
            </div>
            <div className={styles.protLink}>
              <span>View policy</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </div>
          </div>

        </div>

        {/* ── RIGHT sidebar ── */}
        <div className={styles.sidebar}>

          {/* Journey card */}
          <div className={styles.journeyCard}>
            <div className={styles.jLabel}>Current Journey</div>
            <div className={styles.jTitle}>Japan</div>
            <div className={styles.jMeta}>12 Nights · Sep 2026</div>
            <div className={styles.jBalance}>
              <div className={styles.jBalLabel}>Outstanding Balance</div>
              <div className={styles.jBalAmt}>{sym}{remaining.toLocaleString()}</div>
            </div>
            <div className={styles.jNext}>
              <div className={styles.jNextLabel}>Next Payment</div>
              <div className={styles.jNextAmt}>{sym}{PAYMENTS.instalments[0].amount.toLocaleString()}</div>
              <div className={styles.jNextDate}>Due {PAYMENTS.instalments[0].date}</div>
            </div>
          </div>

          {/* Payment method */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardLabel}>Payment Method</div>
            <div className={styles.payMethodBtn}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                <rect x="1" y="1" width="16" height="12" rx="1"/>
                <path d="M1 5h16"/>
              </svg>
              <span className={styles.payMethodText}>Arrange with your concierge</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#C8B89A" strokeWidth="1.1" strokeLinecap="round" style={{marginLeft:'auto',flexShrink:0}}>
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </div>
          </div>

          {/* Need assistance */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardLabel}>Need Assistance?</div>
            <p className={styles.assistText}>For questions about your payment schedule or to arrange a payment, message Sofia directly.</p>
            <Link href="/portal/messages" className={styles.msgSofiaBtn}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#1A1510" strokeWidth="1.1" strokeLinecap="round">
                <path d="M10.5 7.5A1.5 1.5 0 0 1 9 9H3L1 11V2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5z"/>
              </svg>
              <span>Message Sofia</span>
            </Link>
          </div>

          {/* Meridian assurance */}
          <div className={styles.assuranceCard}>
            <div className={styles.assuranceLabel}>Meridian Assurance</div>
            <p className={styles.assuranceText}>All payments are secured and held in client accounts until your journey is confirmed and completed.</p>
          </div>

        </div>
      </div>

      {/* ── Receipt overlay ── */}
      {showReceipt && (
        <div className={styles.overlay} onClick={() => setShowReceipt(false)} aria-hidden="true">
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-heading"
          >

            {/* Header */}
            <div className={styles.receiptHeader}>
              <button type="button" className={styles.receiptBack} onClick={() => setShowReceipt(false)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M8 2L4 6l4 4"/>
                </svg>
                Payments
              </button>
              <span className={styles.receiptCat}>Receipt</span>
            </div>

            {/* Body */}
            <div className={styles.receiptBody}>
              {/* Wordmark row */}
              <div className={styles.receiptWordmarkRow}>
                <div>
                  <div className={styles.receiptWordmark}>Meridian</div>
                  <div className={styles.receiptWordmarkSub}>Private Travel</div>
                </div>
                <div className={styles.receiptRefBlock}>
                  <div id="receipt-heading" className={styles.receiptRefLabel}>Receipt</div>
                  <div className={styles.receiptRefNum}>#MER-JPN-2026-001</div>
                </div>
              </div>

              {/* Amount */}
              <div className={styles.receiptAmtBlock}>
                <div className={styles.receiptAmtLabel}>Amount Received</div>
                <div className={styles.receiptAmtNum}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</div>
              </div>

              {/* Details grid */}
              <div className={styles.receiptDetails}>
                <div>
                  <div className={styles.receiptDetailLabel}>Payment Date</div>
                  <div className={styles.receiptDetailVal}>28 June 2026</div>
                </div>
                <div>
                  <div className={styles.receiptDetailLabel}>Method</div>
                  <div className={styles.receiptDetailVal}>Bank Transfer</div>
                </div>
                <div>
                  <div className={styles.receiptDetailLabel}>Journey</div>
                  <div className={styles.receiptDetailVal}>Japan · 12 Nights</div>
                </div>
                <div>
                  <div className={styles.receiptDetailLabel}>Description</div>
                  <div className={styles.receiptDetailVal}>Journey Deposit</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.receiptFooter}>
              <div className={styles.receiptDownload}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#1A1510" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M6.5 1v8M3.5 6l3 3 3-3"/>
                  <path d="M1.5 11h10"/>
                </svg>
                Download PDF
              </div>
              <div className={styles.receiptThanks}>Thank you, Emily.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
