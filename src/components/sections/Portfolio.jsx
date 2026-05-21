import React, { useState, memo, useCallback } from 'react';
import { ExternalLink, Eye, ArrowUpRight, Monitor, Tablet, Smartphone, Zap } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ProjectPreviewModal } from './ProjectPreviewModal';

/* ── Asset imports ── */
import coffeeAura from '../../assets/portfolio/coffee_aura.png';
import saasMarket from '../../assets/portfolio/saas_market.png';
import nexar from '../../assets/portfolio/nexar.png';
import lumia from '../../assets/portfolio/lumia.png';
import techvibe from '../../assets/portfolio/techvibe.png';

/* ── Project data ── */
const projects = [
  {
    title: 'Coffee Aura',
    category: 'Landing Page',
    description:
      'Website premium para marca de café artesanal com design elegante e paleta warm. Hero imersivo e catálogo de produtos com estética luxuosa.',
    image: coffeeAura,
    url: 'https://riukyofc.github.io/coffe/',
    color: '#D4A574',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: { performance: 96, design: 'A+', mobile: true },
    featured: true,
  },
  {
    title: 'SaaS Market',
    category: 'SaaS Platform',
    description:
      'Plataforma SaaS moderna com dashboard interativo, tabela de preços e features em glassmorphism. Design dark com gradientes vibrantes.',
    image: saasMarket,
    url: 'https://riukyofc.github.io/saasmarket1/',
    color: '#6366F1',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: { performance: 94, design: 'A+', mobile: true },
    featured: false,
  },
  {
    title: 'Nexar',
    category: 'Dashboard App',
    description:
      'Dashboard enterprise de analytics com KPIs, gráficos de receita, gestão de projetos e métricas em tempo real. Interface corporativa premium.',
    image: nexar,
    url: 'https://riukydev.github.io/Nexar/',
    color: '#00BFFF',
    tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    metrics: { performance: 95, design: 'A', mobile: true },
    featured: false,
  },
  {
    title: 'Lumia',
    category: 'Analytics Dashboard',
    description:
      'Dashboard de analytics e gestão de projetos com estética neon. Métricas financeiras, performance de equipe e tracking de projetos em tempo real.',
    image: lumia,
    url: 'https://riukydev.github.io/Lumia-Frontend/',
    color: '#8B5CF6',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: { performance: 93, design: 'A+', mobile: true },
    featured: false,
  },
  {
    title: 'TechVibe',
    category: 'Tech Platform',
    description:
      'Landing page futurista para empresa de tecnologia com hero 3D, seções de inovação em IA e transformação digital. Estética cyberpunk premium.',
    image: techvibe,
    url: 'https://riukydev.github.io/TechVibe/',
    color: '#FF1493',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metrics: { performance: 97, design: 'A+', mobile: true },
    featured: false,
  },
];

/* ── Performance badge component ── */
const PerfBadge = memo(({ score }) => (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
    <Zap size={10} className="text-emerald-400" />
    <span className="text-[10px] font-black text-emerald-400 tabular-nums">{score}</span>
  </div>
));

/* ── Tech stack pills ── */
const TechBadges = memo(({ tech }) => (
  <div className="flex flex-wrap gap-1.5">
    {tech.map((t) => (
      <span
        key={t}
        className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/[0.06] text-white/50 border border-white/[0.04]"
      >
        {t}
      </span>
    ))}
  </div>
));

/* ── Device mockup indicator (responsive visual) ── */
const DeviceIndicator = memo(({ mobile }) => (
  <div className="flex items-center gap-1.5">
    <Monitor size={12} className="text-white/30" />
    <Tablet size={11} className="text-white/30" />
    <Smartphone size={10} className={mobile ? 'text-emerald-400/70' : 'text-white/20'} />
  </div>
));

/* ── Individual project card ── */
const ProjectCard = memo(({ project, index, isHero, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePreview = useCallback(
    (e) => {
      e.stopPropagation();
      onPreview({ isOpen: true, url: project.url, title: project.title });
    },
    [onPreview, project.url, project.title],
  );

  /* Hero card is taller to create visual hierarchy */
  const imageHeight = isHero ? 'h-[280px] sm:h-[340px] lg:h-[380px]' : 'h-[240px] sm:h-[260px]';

  return (
    <GlassCard
      className={`overflow-hidden group h-full cursor-pointer relative ${
        isHero ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Color accent bar (top) */}
      <div
        className="h-[3px] w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}66, transparent)`,
        }}
      />

      {/* "Projeto em Destaque" ribbon */}
      {project.featured && (
        <div className="ribbon ribbon-popular">⭐ Destaque</div>
      )}

      {/* Image container with auto-scroll hover */}
      <div className={`relative ${imageHeight} overflow-hidden`}>
        {/* Performance badge */}
        <PerfBadge score={project.metrics.performance} />

        {/* Auto-scrolling image – translates upward on hover to reveal more */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[200%] object-cover object-top transition-transform ease-in-out group-hover:brightness-[0.65]"
          style={{
            transitionDuration: isHovered ? '3s' : '0.6s',
            transform: isHovered ? 'translateY(-30%)' : 'translateY(0%)',
          }}
          loading="lazy"
        />

        {/* Project number watermark */}
        <div className="absolute top-4 left-4 text-white/[0.05] font-black text-5xl sm:text-6xl select-none pointer-events-none transition-all duration-500 group-hover:text-white/[0.1]">
          0{index + 1}
        </div>

        {/* Hover overlay with CTA buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 sm:p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2.5">
              {/* Ver ao Vivo → abre link externo */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${project.color}CC, ${project.color}88)`,
                  boxShadow: `0 0 20px ${project.color}40`,
                }}
              >
                <ExternalLink size={13} />
                Ver ao Vivo
              </a>

              {/* Preview → abre modal */}
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                <Eye size={13} />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card body — info area below image */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* Category + device indicator */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-black"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
          <DeviceIndicator mobile={project.metrics.mobile} />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <TechBadges tech={project.tech} />
      </div>
    </GlassCard>
  );
});

/* ── Main Portfolio Section ── */
export const Portfolio = () => {
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', title: '' });

  return (
    <>
      <section id="portfolio" className="py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SectionHeader
            badge="Portfólio"
            badgeColor="violet"
            title="Trabalhos que"
            highlight="impressionam."
            subtitle="Cada projeto é uma obra única, desenvolvida com atenção obsessiva aos detalhes."
          />

          {/* ── Desktop: Bento Grid  |  Mobile: Horizontal Carousel ── */}

          {/* Desktop grid (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <FadeIn
                key={project.title}
                delay={index * 120}
                className={`h-full ${index === 0 ? 'lg:col-span-2' : ''}`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHero={index === 0}
                  onPreview={setPreviewData}
                />
              </FadeIn>
            ))}
          </div>

          {/* Mobile carousel (visible only on mobile) */}
          <div className="flex md:hidden overflow-x-auto snap-x gap-4 pb-4 -mx-4 px-4">
            {projects.map((project, index) => (
              <FadeIn
                key={project.title}
                delay={index * 100}
                className="min-w-[85vw] snap-item"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHero={false}
                  onPreview={setPreviewData}
                />
              </FadeIn>
            ))}
          </div>

          {/* CTA to contact */}
          <FadeIn delay={500} className="mt-10 sm:mt-14 text-center">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-white/[0.03] transition-all duration-300 hover:scale-105"
            >
              Quer algo assim? Fale conosco
              <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Preview modal */}
      <ProjectPreviewModal
        isOpen={previewData.isOpen}
        onClose={() => setPreviewData({ ...previewData, isOpen: false })}
        url={previewData.url}
        title={previewData.title}
      />
    </>
  );
};
