'use client';

import { useEffect, useRef, useState } from 'react';

const EDUCATION = [
  {
    id: 'ol',
    year: '2019',
    label: 'GCE Ordinary Level',
    school: 'Your School Name',
    detail: 'Completed GCE O/L with strong results, building a solid academic foundation.',
    accent: '#5227FF',
  },
  {
    id: 'al',
    year: '2022',
    label: 'GCE Advanced Level',
    school: 'Your School Name',
    detail: 'Completed GCE A/L in the Physical Science stream, qualifying for university entrance.',
    accent: '#A855F7',
  },
  {
    id: 'degree',
    year: '2023 — Present',
    label: 'BSc (Hons) Information Technology',
    school: 'Sri Lanka Institute of Information Technology (SLIIT)',
    detail: 'Specializing in Software Engineering. Currently pursuing the degree with focus on full-stack development, algorithms, and software architecture.',
    accent: '#FF9FFC',
  },
];

export default function EducationSection() {
  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);
  const nodeRefs    = useRef([]);
  const [visibleNodes, setVisibleNodes] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line    = lineRef.current;
    if (!section || !line) return;

    // Total scrollable height of the section
    const onScroll = () => {
      const rect      = section.getBoundingClientRect();
      const winH      = window.innerHeight;

      // How far we've scrolled into this section (0 → 1)
      const progress  = Math.min(
        Math.max((-rect.top + winH * 0.25) / (rect.height - winH * 0.5), 0),
        1
      );

      // Grow the line
      line.style.height = `${progress * 100}%`;

      // Reveal nodes as the line reaches them
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const nodeRect   = node.getBoundingClientRect();
        const nodeCenter = nodeRect.top + nodeRect.height / 2;
        if (nodeCenter < winH * 0.78) {
          setVisibleNodes((prev) => (prev.includes(i) ? prev : [...prev, i]));
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full px-6 md:px-10 py-24"
    >
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-20">
        <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">
          03 — Education
        </p>
        <h2
          className="font-display font-extrabold leading-none tracking-tight text-text-primary select-none"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            textShadow: '0 0 80px rgba(82,39,255,0.25)',
          }}
        >
          My academic path
        </h2>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">

        {/* Track (background line) */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Animated glowing line */}
        <div
          className="absolute left-6 top-0 w-px overflow-hidden"
          style={{ height: '0%', transition: 'height 0.05s linear' }}
          ref={lineRef}
        >
          {/* Solid glow line */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #5227FF, #A855F7, #FF9FFC)',
              filter: 'blur(0px)',
            }}
          />
          {/* Soft bloom */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #5227FF80, #A855F780, #FF9FFC80)',
              filter: 'blur(4px)',
              transform: 'scaleX(4)',
            }}
          />
        </div>

        {/* Nodes */}
        <div className="flex flex-col gap-20 pl-16">
          {EDUCATION.map((item, i) => {
            const visible = visibleNodes.includes(i);
            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[i] = el)}
                className="relative"
              >
                {/* Dot on the line */}
                <div
                  className="absolute -left-[2.65rem] top-3 w-3 h-3 rounded-full border-2 transition-all duration-700"
                  style={{
                    borderColor:  visible ? item.accent : 'rgba(255,255,255,0.15)',
                    background:   visible ? item.accent : 'transparent',
                    boxShadow:    visible ? `0 0 16px ${item.accent}, 0 0 32px ${item.accent}60` : 'none',
                    transform:    visible ? 'scale(1)'   : 'scale(0.4)',
                    opacity:      visible ? 1            : 0,
                    transitionDelay: '0.1s',
                  }}
                />

                {/* Connector tick */}
                <div
                  className="absolute -left-[2.05rem] top-[1.1rem] h-px transition-all duration-500"
                  style={{
                    width:           visible ? '1.5rem'                 : '0rem',
                    background:      `linear-gradient(to right, ${item.accent}, transparent)`,
                    transitionDelay: '0.2s',
                  }}
                />

                {/* Card */}
                <div
                  className="relative rounded-2xl border p-6 transition-all duration-700"
                  style={{
                    background:      visible ? '#1A1A33'              : 'transparent',
                    borderColor:     visible ? `${item.accent}30`     : 'transparent',
                    boxShadow:       visible ? `0 0 40px ${item.accent}10, 0 8px 32px rgba(0,0,0,0.4)` : 'none',
                    opacity:         visible ? 1   : 0,
                    transform:       visible ? 'translateX(0)' : 'translateX(-16px)',
                    transitionDelay: '0.15s',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-opacity duration-700"
                    style={{
                      background:      `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                      opacity:         visible ? 1 : 0,
                      transitionDelay: '0.3s',
                    }}
                  />

                  {/* Year badge */}
                  <span
                    className="inline-block font-mono text-xs px-2.5 py-1 rounded-md mb-3 border"
                    style={{
                      color:       item.accent,
                      borderColor: `${item.accent}40`,
                      background:  `${item.accent}12`,
                    }}
                  >
                    {item.year}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-xl text-text-primary leading-tight mb-1"
                    style={{ textShadow: `0 0 24px ${item.accent}40` }}
                  >
                    {item.label}
                  </h3>

                  {/* School */}
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: item.accent }}
                  >
                    {item.school}
                  </p>

                  {/* Detail */}
                  <p className="font-body text-text-secondary text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}