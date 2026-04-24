import LightPillar from '../components/LightPillar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import portfolioData from '../public/data/portfolio.json';

export default function Home() {
  const data = portfolioData;

  return (
    <main className="relative min-h-screen bg-bg-main">
      {/* Fixed background */}
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

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5 backdrop-blur-md border-b border-white/5">
        <span className="font-display font-bold text-xl text-text-primary tracking-tight">
          <span className="text-primary font-extrabold">{data.personal.initials.first}</span>
          <span className="text-text-secondary font-medium">{data.personal.initials.last}</span>
        </span>

        <div className="flex items-center gap-8">
          <div className="flex gap-7 font-body text-sm text-text-secondary">
            {data.nav.map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '#hero' : `#${item.toLowerCase()}`}
                className="hover:text-text-primary transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <div className="relative z-10">
        <HeroSection data={data} />
        <AboutSection data={data} />
        <EducationSection />
        <ProjectsSection data={data} />
        <ContactSection data={data} />
      </div>
    </main>
  );
}