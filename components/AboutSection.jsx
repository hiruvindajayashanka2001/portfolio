'use client';

import { useEffect, useRef } from 'react';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git',
];

export default function AboutSection() {
  const ref = useRef(null);

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

  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <div ref={ref} className="section-enter">
        {/* Label */}
        <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
          01 — About
        </p>

        <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-10">
          Who I am
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="space-y-5 text-text-secondary font-body leading-relaxed text-base">
            <p>
              Hey! I'm a passionate developer who loves crafting elegant solutions
              to complex problems. I specialise in building modern web applications
              with a focus on performance, accessibility, and clean code.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new tech, contributing
              to open source, or experimenting with design. I believe great software
              is a mix of technical craft and creative thinking.
            </p>
            <p className="text-text-muted text-sm font-mono">
              Based in Colombo, Sri Lanka 🇱🇰
            </p>
          </div>

          {/* Skills */}
          <div>
            <p className="font-mono text-xs text-text-muted mb-4 uppercase tracking-widest">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-bg-card border border-white/8 text-text-secondary text-sm font-mono
                             hover:border-accent/50 hover:text-text-primary hover:bg-accent/10
                             transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}