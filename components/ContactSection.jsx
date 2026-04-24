'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection({ data }) {
  const { personal } = data;
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const socials = [
    { label: 'GitHub',   href: personal.socials.github   },
    { label: 'LinkedIn', href: personal.socials.linkedin  },
    { label: 'Twitter',  href: personal.socials.twitter   },
  ];

  return (
    <section id="contacts" className="py-32 px-6 max-w-5xl mx-auto pb-40">
      <div ref={ref} className="section-enter">
        <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
          03 — Contact
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6">
          Let's work together
        </h2>
        <p className="font-body text-text-secondary text-lg max-w-lg mb-12">
          Have a project in mind? I'm open to freelance, full-time roles, and
          interesting collaborations. Let's talk.
        </p>

        <button
          onClick={copyEmail}
          className="group flex items-center gap-4 px-6 py-4 rounded-xl bg-bg-card glow-border
                     hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 mb-10"
        >
          <span className="font-mono text-text-primary text-base">{personal.email}</span>
          <span className="text-xs text-text-muted font-mono bg-white/5 px-2 py-1 rounded border border-white/10 group-hover:border-accent/40 transition-colors">
            {copied ? '✓ copied' : 'copy'}
          </span>
        </button>

        <div className="flex gap-5">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-muted hover:text-secondary transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-secondary/50"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-white/8">
          <p className="font-mono text-xs text-text-muted">
            Built with Next.js · Designed & developed by {personal.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}