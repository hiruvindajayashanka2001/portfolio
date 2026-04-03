'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const els = [headingRef.current, imageRef.current, bottomRef.current];

    els.forEach((el, i) => {
      if (!el) return;

      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';

      setTimeout(() => {
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120 + i * 180);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col"
      style={{ height: '100vh', paddingTop: '72px' }}
    >
      {/* ── HEADING ── */}
      <div
        ref={headingRef}
        className="relative z-30 px-6 md:px-10 pt-8 flex-shrink-0"
      >
        <h1
          className="font-display font-extrabold leading-none tracking-tight text-text-primary select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(2rem, 7.5vw, 8rem)',
            textShadow: '0 0 80px rgba(82,39,255,0.3)',
          }}
        >
          Hi&nbsp;, I&apos;m Hiruvinda
        </h1>
      </div>

      {/* ── CENTER AVATAR (RESPONSIVE) ── */}
      <div
        ref={imageRef}
        className="absolute z-20 w-full flex justify-center "
        style={{
          top: 'clamp(80px, 18vh, 180px)',
        }}
      >
        <div
          className="relative transition-transform duration-200 ease-out will-change-transform"
          style={{
            width: 'clamp(450px, 65vw, 1200px)',
            height: 'clamp(520px, 95vh, 1300px)',
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            e.currentTarget.style.transform = `
        translateX(${x * 30}px)
        translateY(${y * 30}px)
        scale(1.03)
      `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `
        translateX(0px)
        translateY(0px)
        scale(1)
      `;
          }}
        >
          <Image
            src="/assets/my_image.png"
            alt="Hiruvinda Jayashanka"
            fill
            priority
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 0 80px rgba(82,39,255,0.35))',
            }}
          />
        </div>
      </div>

      {/* ── BOTTOM LEFT CONTENT ── */}
      <div
        ref={bottomRef}
        className="relative z-30 mt-auto px-6 md:px-10 pb-12 flex flex-col gap-4"
        style={{
          maxWidth: '380px',
          marginBottom: 'clamp(40px, 10vh, 100px)',
        }}
      >
        <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed">
          I build beautiful, fast, and accessible digital experiences.
          Turning ideas into polished products.
        </p>

        <a
          href="#projects"
          className="group inline-flex flex-col w-fit gap-1.5 font-display font-bold text-text-primary text-base tracking-wide hover:text-secondary transition-colors duration-300"
        >
          View My Projects
          <span className="block h-[2px] w-full bg-text-primary group-hover:bg-secondary transition-colors duration-300" />
        </a>
      </div>
    </section>
  );
}