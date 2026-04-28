'use client';

import { useEffect, useRef, useState } from 'react';

const SOCIAL_ICONS = {
  GitHub: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Discord: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
};

const SOCIAL_COLORS = {
  GitHub:   '#ffffff',
  LinkedIn: '#0A66C2',
  Discord:  '#5865F2',
};

export default function ContactSection({ data }) {
  const { personal } = data;
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [hoveredSocial, setHoveredSocial] = useState(null);

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
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Something went wrong.');
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

  // Build socials from JSON — keyed by label
  const socials = [
    { label: 'GitHub',   href: personal.socials.github   },
    { label: 'LinkedIn', href: personal.socials.linkedin  },
    { label: 'Discord',  href: personal.socials.Discord   },
  ];

  const inputBase = `
    w-full px-4 py-3 rounded-xl font-body text-sm
    text-text-primary placeholder:text-text-muted
    focus:outline-none transition-all duration-200
  `;
  const inputStyle = {
    background: '#1A1A33',
    border:     '1px solid rgba(255,255,255,0.08)',
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
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="flex flex-col">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
              05 — Contact
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tight text-text-primary mb-5 select-none"
              style={{
                fontSize:   'clamp(2rem, 4vw, 3.5rem)',
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

            {/* Social icons with labels */}
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
              Find me on
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href }) => {
                const color     = SOCIAL_COLORS[label];
                const isHovered = hoveredSocial === label;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '8px',
                      padding:        '10px 16px',
                      borderRadius:   '12px',
                      border:         `1px solid ${isHovered ? color + '60' : 'rgba(255,255,255,0.1)'}`,
                      background:     isHovered ? color + '15' : 'rgba(255,255,255,0.04)',
                      color:          isHovered ? color : '#6B6B8D',
                      boxShadow:      isHovered ? `0 0 20px ${color}25` : 'none',
                      transition:     'all 0.25s ease',
                      textDecoration: 'none',
                    }}
                  >
                    {SOCIAL_ICONS[label]}
                    <span
                      style={{
                        fontFamily:  'JetBrains Mono, monospace',
                        fontSize:    '12px',
                        color:       isHovered ? color : '#A0A0C0',
                        transition:  'color 0.25s ease',
                      }}
                    >
                      {label}
                    </span>
                  </a>
                );
              })}
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
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #5227FF, transparent)' }}
            />
            <h3 className="font-display font-bold text-text-primary text-lg mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-widest">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    required placeholder="Your name" className={inputBase}
                    style={inputStyle} {...inputFocusHandlers} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-widest">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="your@email.com" className={inputBase}
                    style={inputStyle} {...inputFocusHandlers} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-text-muted uppercase tracking-widest">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={6} placeholder="Tell me about your project..."
                  className={inputBase}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                  {...inputFocusHandlers} />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300 border"
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
                      <span className="w-3.5 h-3.5 rounded-full border-2 animate-spin flex-shrink-0"
                        style={{ borderColor: 'rgba(82,39,255,0.3)', borderTopColor: '#5227FF' }} />
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
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Sent! I'll get back to you soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="font-mono text-xs text-red-400 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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