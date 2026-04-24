'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection({ data }) {
  const { about, personal } = data;

  const headingRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const observers = [];

    const animate = (ref, delay = 0) => {
      const el = ref.current;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => el.classList.add('visible'), delay);
          obs.disconnect();
        },
        { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    };

    animate(headingRef, 0);
    animate(leftRef,    180);
    animate(rightRef,   320);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="about"
      className="relative px-6 md:px-10 max-w-6xl mx-auto flex flex-col justify-center"
      style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '60px',
      }}
    >
      {/* Heading */}
      <div ref={headingRef} className="section-enter mb-6">  {/* ← was mb-14 */}
        <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">
          01 — About
        </p>
        <h2
          className="font-display font-extrabold leading-none tracking-tight text-text-primary select-none"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',  /* ← smaller heading */
            textShadow: '0 0 80px rgba(82,39,255,0.25)',
          }}
        >
          Who I am
        </h2>
      </div>

      {/* Two-column */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT: Bio */}
        <div
          ref={leftRef}
          className="section-enter space-y-4 text-text-secondary font-body leading-relaxed text-base"
        >
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-text-muted text-sm font-mono pt-1">
            {personal.location}
          </p>
        </div>

        {/* RIGHT: Image */}
        <div
          ref={rightRef}
          className="section-enter relative flex justify-center items-center"
        >
          {/* Glow backdrop */}
          <div
            className="absolute inset-0 rounded-2xl blur-2xl opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, #5227FF 0%, #FF9FFC 100%)',
            }}
          />

          {/* Image frame — smaller clamp values */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-bg-card"
            style={{
              width:     'clamp(180px, 28vw, 320px)',   /* ← was 240px/38vw/440px */
              height:    'clamp(220px, 34vw, 380px)',   /* ← was 280px/45vw/520px */
              boxShadow: '0 0 40px rgba(82,39,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width  - 0.5;
              const y = (e.clientY - rect.top)  / rect.height - 0.5;
              e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
              e.currentTarget.style.transition = 'transform 0.1s ease';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
              e.currentTarget.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px z-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(82,39,255,0.8), transparent)' }}
            />

            <Image
              src={personal.aboutImage}
              alt={personal.name}
              fill
              className="object-cover object-top"
              style={{ filter: 'drop-shadow(0 0 40px rgba(82,39,255,0.2))' }}
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.7), transparent)' }}
            />
          </div>

          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-bg-card border border-white/10 backdrop-blur-md
                       font-mono text-xs text-text-muted flex items-center gap-2"
            style={{ boxShadow: '0 0 20px rgba(82,39,255,0.15)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </div>
        </div>

      </div>
    </section>
  );
}