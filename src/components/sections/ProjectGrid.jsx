import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../ui/Marquee';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    id: 1,
    title: "AI-Powered Resume Builder",
    category: "Full-Stack",
    image: "/projects/CV_Generator.png",
    link: "https://resumecraft-ai-yu36.onrender.com/",
    techStack: ["React", "Cohere API", "Tailwind", "PDF Generation"],
  },
  {
    id: 2,
    title: "NovaBook",
    category: "Full-Stack",
    image: "/projects/NovaBook.png",
    link: "https://nova-book.vercel.app/",
    techStack: ["Next.js", "Supabase", "Prisma", "Stripe"],
  },
  {
    id: 3,
    title: "Secure Network Monitor",
    category: "Ciberseguridad / Sistemas",
    image: "/projects/placeholder.png",
    link: "#",
    techStack: ["Python", "Wireshark", "Docker", "Linux"],
  },
  {
    id: 4,
    title: "Solar Grid Dashboard",
    category: "Energías Renovables",
    image: "/projects/placeholder.png",
    link: "#",
    techStack: ["React", "IoT", "Data Viz", "Node.js"],
  }
];

const ProjectGrid = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: t('projects.categories.all') },
    { id: 'Full-Stack', label: t('projects.categories.fullstack') },
    { id: 'Ciberseguridad / Sistemas', label: t('projects.categories.cybersecurity') },
    { id: 'Energías Renovables', label: t('projects.categories.renewable') }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-24 border-t" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-secondary)' }}>
      {/* Marquee Header */}
      <div className="text-[var(--color-primary)]">
        <Marquee baseVelocity={2}>
          <span className="mr-8 block">{t('projects.title')}</span>
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-16">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <h2 className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--color-secondary)' }}>
            {t('projects.subtitle')}
          </h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-[var(--color-primary)] text-[var(--color-surface)]'
                    : 'border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { t } = useTranslation();

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer block"
      data-hover={t('projects.view')}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-900">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <motion.img
          src={project.image}
          alt={project.title}
          onLoad={() => setIsLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div>
        <h4 className="text-2xl font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>{project.title}</h4>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--color-secondary)' }}>{project.category}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full border text-xs opacity-80"
              style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectGrid;
