'use client';

import { useState, useEffect, useRef } from 'react';
import LightPillar from '../components/LightPillar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import portfolioData from '../public/data/portfolio.json';

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  { id: 'skills',    label: 'Skills',    icon: (          
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'contacts',
    label: 'Contact',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Home() {
  const data = portfolioData;
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Hide top nav after scrolling 60px
        setScrolled(scrollY > 60);

        // Detect active section
        // AFTER
        const midpoint = window.innerHeight / 2;

        // A section is "active" if the user is physically inside it
        // i.e. its top is above midpoint AND its bottom is below midpoint
        const inside = NAV_ITEMS.find(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= midpoint && rect.bottom >= midpoint;
        });

        if (inside) {
          setActiveSection(inside.id);
        } else {
          // Fallback — pick whichever section top is closest to midpoint
          // (handles edges like top of page / bottom of page)
          const sections = NAV_ITEMS.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return { id, top: Infinity };
            const rect = el.getBoundingClientRect();
            return { id, top: Math.abs(rect.top - midpoint) };
          });
          const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
          setActiveSection(closest.id);
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = id === 'hero' ? 0 : 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-bg-main">

      {/* ── Fixed background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      {/* ── Top nav — visible only on hero ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <span className="font-display font-bold text-xl text-text-primary tracking-tight">
          <span className="text-primary font-extrabold">{data.personal.initials.first}</span>
          <span className="text-text-secondary font-medium">{data.personal.initials.last}</span>
        </span>
        <div className="flex gap-7 font-body text-sm text-text-secondary">
          {data.nav.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item === 'Home' ? 'hero' : item.toLowerCase())}
              className="hover:text-text-primary transition-colors duration-200 bg-transparent border-0 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Vertical right nav — appears after scrolling ── */}
      <div
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: `translateY(-50%) translateX(${scrolled ? '0px' : '80px'})`,
          opacity: scrolled ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        {/* Outer pill container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '10px 8px',
            borderRadius: '20px',
            background: 'rgba(20,20,40,0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {NAV_ITEMS.map(({ id, label, icon }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;
            const highlight = isActive || isHovered;

            return (
              <div key={id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                {/* Floating label — appears on hover */}
                <div
                  style={{
                    position: 'absolute',
                    right: 'calc(100% + 10px)',
                    whiteSpace: 'nowrap',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(20,20,40,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: isActive ? '#5227FF' : '#A0A0C0',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {label}
                </div>

                {/* Icon button */}
                <button
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHoveredItem(id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    background: isActive
                      ? 'rgba(82,39,255,0.2)'
                      : isHovered
                        ? 'rgba(255,255,255,0.06)'
                        : 'transparent',
                    color: highlight ? '#5227FF' : '#6B6B8D',
                    boxShadow: isActive
                      ? '0 0 16px rgba(82,39,255,0.3), inset 0 0 0 1px rgba(82,39,255,0.4)'
                      : 'none',
                  }}
                  title={label}
                >
                  {/* Active dot indicator */}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#5227FF',
                        boxShadow: '0 0 6px #5227FF',
                      }}
                    />
                  )}
                  {icon}
                </button>
              </div>
            );
          })}

          {/* Divider + scroll progress bar */}
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '1px',
              margin: '4px 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(to bottom, #5227FF, #FF9FFC)',
                borderRadius: '1px',
                height: `${((NAV_ITEMS.findIndex((n) => n.id === activeSection) + 1) /
                    NAV_ITEMS.length) *
                  100
                  }%`,
                transition: 'height 0.4s ease',
              }}
            />
          </div>

          {/* Section counter */}
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: '#6B6B8D',
              textAlign: 'center',
              lineHeight: 1.4,
              padding: '2px 0',
            }}
          >
            <span style={{ color: '#5227FF', fontWeight: 600 }}>
              {String(NAV_ITEMS.findIndex((n) => n.id === activeSection) + 1).padStart(2, '0')}
            </span>
            <br />
            <span style={{ opacity: 0.5 }}>
              {String(NAV_ITEMS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10">
        <HeroSection data={data} />
        <AboutSection data={data} />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection data={data} />
        <ContactSection data={data} />
      </div>

    </main>
  );
}