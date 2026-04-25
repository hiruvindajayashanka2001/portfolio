'use client';

import { useEffect, useRef, useState }  from 'react';

export default function ContactSection({ data }) {
  const { personal } = data;
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socials = [
    { label: 'GitHub',   href: personal.socials.github   },
    { label: 'LinkedIn', href: personal.socials.linkedin  },
    { label: 'Twitter',  href: personal.socials.twitter   },
  ];

  const inputBase = `
    w-full px-4 py-3 rounded-xl font-body text-sm
    text-text-primary placeholder:text-text-muted
    focus:outline-none transition-all duration-200
  `;

  const inputStyle = {
    background: '#1A1A33',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  const inputFocusHandlers = {
    onFocus: (e) => {
      e.target.style.borderColor = 'rgba(82,39,255,0.6)';
      e.target.style.boxShadow   = '0 0 0 3px rgba(82,39,255,0.1)';
    },
    onBlur: (e) => {
      e.target.style.borderColor = 'rgba(255,255,255,0.08)';
      e.target.style.boxShadow   = 'none';
    },
  };

  return (
    <section id="contacts" className="relative px-6 md:px-10 max-w-6xl mx-auto py-32 pb-40">
      <div ref={sectionRef} className="section-enter">

        {/* ── Two-column grid ── */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: Content ── */}
          <div className="flex flex-col">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
              04 — Contact
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tight text-text-primary mb-5 select-none"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 0 80px rgba(82,39,255,0.25)',
              }}
            >
              Let's work<br />together
            </h2>
            <p className="font-body text-text-secondary text-base leading-relaxed mb-10">
              Have a project in mind? I'm open to freelance,
              full-time roles, and interesting collaborations.
              Let's talk.
            </p>

            {/* Copy email */}
            <button
              onClick={copyEmail}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-bg-card glow-border
                         hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 mb-10 w-fit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-text-muted flex-shrink-0">
                <path d="M4 4h11v3H4zM9 4V2h6v2M4 7v13h11V7"/>
              </svg>
              <span className="font-mono text-text-primary text-sm">{personal.email}</span>
              <span
                className="text-xs text-text-muted font-mono px-2 py-0.5 rounded border border-white/10
                           group-hover:border-accent/40 transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {copied ? '✓' : 'copy'}
              </span>
            </button>

            {/* Socials */}
            <div className="flex gap-5">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-text-muted hover:text-secondary transition-colors
                             duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-secondary/50"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div
            className="rounded-2xl border border-white/8 p-8 relative overflow-hidden"
            style={{
              background: '#141427',
              boxShadow:  '0 0 60px rgba(82,39,255,0.06), 0 16px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #5227FF, transparent)' }}
            />

            <h3 className="font-display font-bold text-text-primary text-lg mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputBase}
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputBase}
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={inputBase}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                  {...inputFocusHandlers}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-sm
                             transition-all duration-300 border"
                  style={{
                    background:  'rgba(82,39,255,0.15)',
                    borderColor: 'rgba(82,39,255,0.45)',
                    color:       '#5227FF',
                    opacity:     status === 'sending' ? 0.6 : 1,
                    cursor:      status === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'sending') {
                      e.currentTarget.style.background  = 'rgba(82,39,255,0.28)';
                      e.currentTarget.style.borderColor = 'rgba(82,39,255,0.7)';
                      e.currentTarget.style.boxShadow   = '0 0 20px rgba(82,39,255,0.25)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = 'rgba(82,39,255,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(82,39,255,0.45)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span
                        className="w-3.5 h-3.5 rounded-full border-2 animate-spin flex-shrink-0"
                        style={{
                          borderColor:    'rgba(82,39,255,0.3)',
                          borderTopColor: '#5227FF',
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <span className="font-mono text-xs text-green-400 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Sent! I'll get back to you soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="font-mono text-xs text-red-400 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {errorMsg}
                  </span>
                )}
              </div>

            </form>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-24 pt-8 border-t border-white/8">
          <p className="font-mono text-xs text-text-muted">
            Built with Next.js · Designed & developed by {personal.name} · {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </section>
  );
}