'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web app with real-time collaboration features and a clean, minimal UI.',
    tags: ['Next.js', 'PostgreSQL', 'WebSockets'],
    link: '#',
    accent: '#5227FF',
  },
  {
    title: 'Project Beta',
    description: 'An AI-powered dashboard for visualising complex datasets with interactive charts.',
    tags: ['React', 'Python', 'D3.js'],
    link: '#',
    accent: '#8B5CF6',
  },
  {
    title: 'Project Gamma',
    description: 'A mobile-first e-commerce platform with seamless checkout and inventory management.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    link: '#',
    accent: '#FF9FFC',
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 max-w-5xl mx-auto">
      <div ref={ref} className="section-enter">
        <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
          02 — Projects
        </p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-14">
          Things I've built
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              className="group relative flex flex-col p-6 rounded-2xl bg-bg-card glow-border
                         hover:border-accent/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
                         transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
              />

              <h3 className="font-display font-semibold text-xl text-text-primary mb-3 group-hover:text-secondary transition-colors">
                {project.title}
              </h3>

              <p className="font-body text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs font-mono text-text-muted bg-white/5 border border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 text-text-muted group-hover:text-secondary transition-colors text-lg">
                ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}