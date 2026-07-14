'use client';
import { useState, useRef, useId } from 'react';
import styles from './BeginForm.module.css';

type FieldErrors = Partial<Record<string, string>>;

export default function BeginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const formId = useId();

  const refs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    country: useRef<HTMLSelectElement>(null),
    collection: useRef<HTMLSelectElement>(null),
    period: useRef<HTMLInputElement>(null),
    travellingWith: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const clearError = (field: string) =>
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });

  const handleSubmit = async () => {
    if (submitting) return;

    const firstName = refs.firstName.current?.value.trim() ?? '';
    const lastName = refs.lastName.current?.value.trim() ?? '';
    const email = refs.email.current?.value.trim() ?? '';
    const message = refs.message.current?.value.trim() ?? '';

    const newErrors: FieldErrors = {};
    if (!firstName) newErrors.firstName = 'Please enter your first name.';
    if (!lastName) newErrors.lastName = 'Please enter your family name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address.';
    if (message.length < 10) newErrors.message = 'Please write a short message (at least 10 characters).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0] as keyof typeof refs;
      (refs[firstKey]?.current as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          country: refs.country.current?.value ?? '',
          collection: refs.collection.current?.value ?? '',
          period: refs.period.current?.value ?? '',
          travellingWith: refs.travellingWith.current?.value ?? '',
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        if (data.field) {
          setErrors({ [data.field]: data.error });
          (refs[data.field as keyof typeof refs]?.current as HTMLElement | null)?.focus();
        } else {
          setErrors({ _form: 'Something went wrong. Please try again or write to us directly.' });
        }
      }
    } catch {
      setErrors({ _form: 'A network error occurred. Please check your connection and try again.' });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          <div>
            {!submitted ? (
              <div id={`${formId}-enquiry-form`} className={styles.form}>
                {errors._form && (
                  <div role="alert" style={{ background: 'oklch(96% 0.012 20)', border: '1px solid oklch(70% 0.08 20)', borderRadius: '4px', padding: '14px 18px', marginBottom: '24px', fontSize: '14px', color: 'oklch(35% 0.06 20)' }}>
                    {errors._form}
                  </div>
                )}
                <div className={styles.fields}>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-first`}>First name <span aria-hidden="true">*</span></label>
                      <input
                        ref={refs.firstName}
                        className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                        id={`${formId}-first`}
                        type="text"
                        placeholder="Your first name"
                        autoComplete="given-name"
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? `${formId}-first-err` : undefined}
                        onChange={() => clearError('firstName')}
                      />
                      {errors.firstName && <span id={`${formId}-first-err`} className={styles.fieldError} role="alert">{errors.firstName}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-last`}>Family name <span aria-hidden="true">*</span></label>
                      <input
                        ref={refs.lastName}
                        className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                        id={`${formId}-last`}
                        type="text"
                        placeholder="Your family name"
                        autoComplete="family-name"
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? `${formId}-last-err` : undefined}
                        onChange={() => clearError('lastName')}
                      />
                      {errors.lastName && <span id={`${formId}-last-err`} className={styles.fieldError} role="alert">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-email`}>Email address <span aria-hidden="true">*</span></label>
                      <input
                        ref={refs.email}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        id={`${formId}-email`}
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                        onChange={() => clearError('email')}
                      />
                      {errors.email && <span id={`${formId}-email-err`} className={styles.fieldError} role="alert">{errors.email}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-country`}>Country of residence</label>
                      <select ref={refs.country} className={styles.select} id={`${formId}-country`} defaultValue="">
                        <option value="" style={{color:'var(--m-stone)'}}>Select country</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Japan</option>
                        <option>Australia</option>
                        <option>Switzerland</option>
                        <option>Singapore</option>
                        <option>United Arab Emirates</option>
                        <option>Canada</option>
                        <option>Netherlands</option>
                        <option>Sweden</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-coll`}>Collection of interest</label>
                      <select ref={refs.collection} className={styles.select} id={`${formId}-coll`} defaultValue="">
                        <option value="" style={{color:'var(--m-stone)'}}>Select or leave open</option>
                        <option>Wellness &amp; Restoration</option>
                        <option>Cultural Immersion</option>
                        <option>Adventure &amp; Landscape</option>
                        <option>Honeymoon</option>
                        <option>I am not sure yet</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${formId}-period`}>Approximate travel period</label>
                      <input ref={refs.period} className={styles.input} id={`${formId}-period`} type="text" placeholder="e.g. Autumn 2026, or flexible" />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor={`${formId}-travellers`}>Travelling with</label>
                    <select ref={refs.travellingWith} className={styles.select} id={`${formId}-travellers`} defaultValue="">
                      <option value="" style={{color:'var(--m-stone)'}}>Select</option>
                      <option>Alone</option>
                      <option>With a partner</option>
                      <option>With family — children</option>
                      <option>With family — no children</option>
                      <option>With friends</option>
                      <option>A small group</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor={`${formId}-msg`}>Your message <span aria-hidden="true">*</span></label>
                    <textarea
                      ref={refs.message}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      id={`${formId}-msg`}
                      placeholder="Tell us whatever feels most relevant — what you are looking for, what you would like to leave behind, a specific place or season that interests you, or simply that you are not yet sure where to begin."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? `${formId}-msg-err` : undefined}
                      onChange={() => clearError('message')}
                    />
                    {errors.message
                      ? <span id={`${formId}-msg-err`} className={styles.fieldError} role="alert">{errors.message}</span>
                      : <div className={styles.hint}>Write as much or as little as feels natural.</div>}
                  </div>

                  <div>
                    <button
                      className={styles.btnSend}
                      onClick={handleSubmit}
                      disabled={loading}
                      aria-busy={loading}
                      aria-live="polite"
                    >
                      {loading ? 'Sending…' : 'Send to your concierge'}
                    </button>
                    <p className={styles.privacy}>We respond within two working days. Your enquiry is private and confidential.</p>
                  </div>

                </div>
              </div>
            ) : (
              <div className={styles.success} role="alert" aria-live="polite">
                <div className={styles.successLine} />
                <div className={styles.successTitle}>Your message has arrived.</div>
                <p className={styles.successBody}>Your concierge will write to you within two working days. The conversation has begun.</p>
                <div className={styles.successSig}>— The MERIDIAN Concierge</div>
              </div>
            )}
          </div>

          <div className={styles.aside}>
            <div className={styles.asideCard}>
              <div className={styles.asideCardLabel}>What to expect</div>
              <div className={styles.asideItems}>
                {[
                  'A personal reply within two working days',
                  'No obligation, no immediate cost',
                  'One concierge, throughout the process',
                  'A conversation, not a catalogue',
                ].map((item) => (
                  <div key={item} className={styles.asideItem}>
                    <span className={styles.asideDash}>—</span>
                    <span className={styles.asideItemText}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.asideQuote}>
              <div className={styles.asideQuoteText}>&ldquo;The journey begins when the conversation does.&rdquo;</div>
              <div className={styles.asideQuoteSig}>— MERIDIAN Concierge</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
