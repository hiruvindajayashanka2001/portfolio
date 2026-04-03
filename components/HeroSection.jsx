'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <div ref={ref}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-text-secondary text-sm font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Available for work
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-6xl md:text-8xl leading-none tracking-tight text-text-primary mb-4 glow-text">
          Your Name
        </h1>

        <p className="font-display font-semibold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-6">
          Full-Stack Developer
        </p>

        <p className="font-body text-text-secondary text-lg max-w-xl mx-auto leading-relaxed mb-10">
          I build beautiful, fast, and accessible digital experiences.
          Turning ideas into polished products.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-primary text-white font-display font-semibold text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:shadow-[0_0_30px_rgba(82,39,255,0.5)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-white/15 text-text-primary font-display font-semibold text-sm tracking-wide hover:border-accent/50 hover:bg-white/5 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-xs font-mono">
        <span>scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-text-muted to-transparent animate-pulse" />
      </div>
    </section>
  );
}