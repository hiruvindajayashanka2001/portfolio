'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CARD_HEIGHT = 420;
const NAV_HEIGHT  = 80;

// ── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,8,20,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: '#1A1A33',
          boxShadow: `0 0 80px ${project.accent}30, 0 30px 80px rgba(0,0,0,0.7)`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />

        {/* Image banner */}
        <div className="relative w-full" style={{ height: '220px' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            style={{ filter: 'brightness(0.75) saturate(1.1)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.accent}30 0%, transparent 60%),
                           linear-gradient(to top, #1A1A33 0%, transparent 60%)`,
            }}
          />
          {/* Close btn */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 border border-white/15
                       flex items-center justify-center text-text-muted hover:text-text-primary
                       backdrop-blur-sm transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col gap-5">

          {/* Title */}
          <div>
            <div className="w-8 h-0.5 mb-3 rounded-full" style={{ background: project.accent }} />
            <h3
              className="font-display font-bold text-2xl text-text-primary leading-tight"
              style={{ textShadow: `0 0 30px ${project.accent}50` }}
            >
              {project.title}
            </h3>
            <p className="font-body text-text-secondary text-sm leading-relaxed mt-2">
              {project.description}
            </p>
          </div>

          {/* My Contribution */}
          <div className="rounded-xl p-4 border border-white/8 bg-white/3">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
              My Contribution
            </p>
            <p className="font-body text-text-secondary text-sm leading-relaxed">
              {project.myRole}
            </p>
          </div>

          {/* Impact */}
          <div
            className="rounded-xl p-4 bg-white/3 border"
            style={{ borderColor: `${project.accent}40` }}
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: project.accent }}>
              Impact
            </p>
            <p className="font-body text-text-secondary text-sm leading-relaxed">
              {project.impact}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted bg-white/5 border border-white/8"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5
                         font-mono text-xs text-text-secondary hover:text-text-primary hover:border-white/30
                         transition-all duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs
                           transition-all duration-200 border"
                style={{
                  background:  `${project.accent}20`,
                  borderColor: `${project.accent}50`,
                  color:        project.accent,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${project.accent}35`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${project.accent}20`; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, total, onOpen }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 flex"
      style={{
        height: `${CARD_HEIGHT}px`,
        background: '#1A1A33',
        boxShadow: `0 0 50px ${project.accent}18, 0 16px 50px rgba(0,0,0,0.55)`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />

      {/* LEFT: Image */}
      <div className="relative overflow-hidden" style={{ width: '55%', flexShrink: 0 }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top"
          style={{ filter: 'brightness(0.8) saturate(1.1)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.accent}20 0%, transparent 55%),
                         linear-gradient(to right, transparent 55%, #1A1A33 100%)`,
          }}
        />
        <div className="absolute top-5 left-5 font-mono text-xs text-white/50 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <div
          className="absolute bottom-5 left-5 w-2 h-2 rounded-full"
          style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
        />
      </div>

      {/* RIGHT: Content */}
      <div className="flex flex-col justify-center gap-5 px-8 py-8" style={{ width: '45%' }}>
        <div className="w-8 h-0.5 rounded-full" style={{ background: project.accent }} />

        <h3
          className="font-display font-bold leading-tight text-text-primary"
          style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            textShadow: `0 0 30px ${project.accent}50`,
          }}
        >
          {project.title}
        </h3>

        <p className="font-body text-text-secondary text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs font-mono text-text-muted bg-white/5 border border-white/8"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded text-xs font-mono text-text-muted bg-white/5 border border-white/8">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={onOpen}
          className="group w-fit flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-sm
                     transition-all duration-300 border"
          style={{
            background:  `${project.accent}15`,
            borderColor: `${project.accent}45`,
            color:        project.accent,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background  = `${project.accent}30`;
            e.currentTarget.style.borderColor = `${project.accent}80`;
            e.currentTarget.style.boxShadow   = `0 0 20px ${project.accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background  = `${project.accent}15`;
            e.currentTarget.style.borderColor = `${project.accent}45`;
            e.currentTarget.style.boxShadow   = 'none';
          }}
        >
          Get Full Details
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function ProjectsSection({ data }) {
  const { projects } = data;
  const [activeProject, setActiveProject] = useState(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('visible');
        obs.disconnect();
      },
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {activeProject !== null && (
        <ProjectModal
          project={projects[activeProject]}
          onClose={() => setActiveProject(null)}
        />
      )}

      <section id="projects" className="relative w-full px-6 md:px-10">

        {/* Heading — normal flow, not sticky */}
        <div className="max-w-5xl mx-auto pt-24 pb-10">
          <div ref={headingRef} className="section-enter">
            <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">
              02 — Projects
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tight text-text-primary select-none"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 0 80px rgba(82,39,255,0.25)',
              }}
            >
              Things I've built
            </h2>
          </div>
        </div>

        {/* Card stack */}
        <div className="max-w-5xl mx-auto flex flex-col">
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{
                position:     'sticky',
                top:          `${NAV_HEIGHT + i * 6}px`,
                zIndex:       10 + i,
                marginBottom: i === projects.length - 1 ? 0 : '24px',
              }}
            >
              <ProjectCard
                project={project}
                index={i}
                total={projects.length}
                onOpen={() => setActiveProject(i)}
              />
            </div>
          ))}
        </div>

      </section>
    </>
  );
}