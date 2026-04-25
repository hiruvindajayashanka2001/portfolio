'use client';

import { useEffect, useRef, useState } from 'react';

const SKILLS = {
  Frontend: [
    { name: 'React',        icon: 'react',            color: '#61DAFB' },
    { name: 'Next.js',      icon: 'nextjs',           color: '#ffffff' },
    { name: 'TypeScript',   icon: 'typescript',       color: '#3178C6' },
    { name: 'JavaScript',   icon: 'javascript',       color: '#F7DF1E' },
    { name: 'Tailwind CSS', icon: 'tailwindcss',      color: '#06B6D4' },
    { name: 'HTML',         icon: 'html5',            color: '#E34F26' },
    { name: 'CSS',          icon: 'css3',             color: '#1572B6' },
  ],
  Backend: [
    { name: 'Node.js',      icon: 'nodejs',           color: '#339933' },
    { name: 'Express',      icon: 'express',          color: '#ffffff' },
    { name: 'Python',       icon: 'python',           color: '#3776AB' },
    { name: 'Java',         icon: 'java',             color: '#ED8B00' },
    { name: 'PHP',          icon: 'php',              color: '#777BB4' },
  ],
  Database: [
    { name: 'MySQL',        icon: 'mysql',            color: '#4479A1' },
    { name: 'MongoDB',      icon: 'mongodb',          color: '#47A248' },
  ],
  'Tools & Workflow': [
    { name: 'Git',          icon: 'git',              color: '#F05032' },
    { name: 'Docker',       icon: 'docker',           color: '#2496ED' },
    { name: 'Postman',      icon: 'postman',          color: '#FF6C37' },
    { name: 'Figma',        icon: 'figma',            color: '#F24E1E' },
  ],
};

const CATEGORY_META = {
  Frontend:           { color: '#5227FF' },
  Backend:            { color: '#A855F7' },
  Database:           { color: '#06B6D4' },
  'Tools & Workflow': { color: '#FF9FFC' },
};

function SkillChip({ name, icon, color }) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc]   = useState(
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '10px',
        padding:      '11px 16px',
        borderRadius: '12px',
        cursor:       'default',
        userSelect:   'none',
        transition:   'all 0.25s ease',

        // default — visible but neutral
        background:   hovered ? `${color}18`              : 'rgba(255,255,255,0.05)',
        border:       hovered ? `1px solid ${color}60`    : '1px solid rgba(255,255,255,0.12)',
        boxShadow:    hovered ? `0 0 24px ${color}25`     : '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <img
        src={imgSrc}
        alt={name}
        width={22}
        height={22}
        onError={() =>
          setImgSrc(
            `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-plain.svg`
          )
        }
        style={{
          flexShrink: 0,
          transition: 'all 0.25s ease',
          // default: slight desaturate + dim but still clearly visible
          filter:     hovered
            ? 'none'
            : 'grayscale(0.4) brightness(0.75)',
        }}
      />

      <span
        style={{
          fontFamily:  'JetBrains Mono, monospace',
          fontSize:    '12px',
          whiteSpace:  'nowrap',
          transition:  'color 0.25s ease',
          // default: light enough to read clearly on dark bg
          color:       hovered ? color : '#C8C8E0',
        }}
      >
        {name}
      </span>
    </div>
  );
}

function CategoryBlock({ title, skills, animDelay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const meta = CATEGORY_META[title];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVis(true); obs.disconnect(); }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${animDelay}ms, transform 0.6s ease ${animDelay}ms`,
      }}
    >
      {/* Category label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div
          style={{
            width:        '3px',
            height:       '16px',
            borderRadius: '2px',
            background:   meta.color,
            boxShadow:    `0 0 8px ${meta.color}`,
            flexShrink:   0,
          }}
        />
        <span
          style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '11px',
            color:         meta.color,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight:    600,
          }}
        >
          {title}
        </span>

        {/* Thin line after label */}
        <div
          style={{
            flex:       1,
            height:     '1px',
            background: `linear-gradient(to right, ${meta.color}30, transparent)`,
          }}
        />
      </div>

      {/* Chips */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
          gap:                 '8px',
        }}
      >
        {skills.map((skill) => (
          <SkillChip key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
      },
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative w-full px-6 md:px-10 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="section-enter mb-16">
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">
            02 — Skills
          </p>
          <h2
            className="font-display font-extrabold leading-none tracking-tight text-text-primary select-none"
            style={{
              fontSize:   'clamp(2rem, 4vw, 3.5rem)',
              textShadow: '0 0 80px rgba(82,39,255,0.25)',
            }}
          >
            Technical skills
          </h2>
        </div>

        {/* Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          {Object.entries(SKILLS).map(([title, skills], i) => (
            <CategoryBlock
              key={title}
              title={title}
              skills={skills}
              animDelay={i * 100}
            />
          ))}
        </div>

      </div>
    </section>
  );
}