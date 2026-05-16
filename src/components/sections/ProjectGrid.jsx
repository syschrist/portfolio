import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../ui/Marquee';
import { useTranslation } from 'react-i18next';
import { X, Github, BookOpen } from 'lucide-react';
import Lenis from 'lenis';

const ProjectGrid = () => {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) || [];
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const modalScrollRef = useRef(null);
  const lenisInstance = useRef(null);

  const categories = [
    { id: 'all', label: t('projects.categories.all') },
    { id: 'security_infra', label: t('projects.categories.security_infra') },
    { id: 'software_websec', label: t('projects.categories.software_websec') },
    { id: 'industrial_iot', label: t('projects.categories.industrial_iot') }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.categoryId === activeCategory);

  useEffect(() => {
    if (selectedProject && modalScrollRef.current) {
      lenisInstance.current = new Lenis({
        wrapper: modalScrollRef.current,
        content: modalScrollRef.current.querySelector('.modal-content-inner'),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenisInstance.current?.raf(time);
        requestAnimationFrame(raf);
      }
      const rafId = requestAnimationFrame(raf);

      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(rafId);
        lenisInstance.current?.destroy();
        lenisInstance.current = null;
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

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
              <ProjectCard key={project.id} project={project} index={index} onClick={() => {
                if (project.details) setSelectedProject(project);
                else if (project.link !== "#") window.open(project.link, '_blank');
              }} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-end md:items-center bg-black/60 backdrop-blur-sm p-0 md:p-12"
          >
            <div className="absolute inset-0 z-0" onClick={() => setSelectedProject(null)} />

            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] md:max-h-full h-full md:h-auto md:min-h-[60vh] bg-[var(--color-surface)] rounded-t-3xl md:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
              style={{ borderTop: '1px solid var(--color-secondary)', borderLeft: '1px solid var(--color-secondary)', borderRight: '1px solid var(--color-secondary)' }}
            >
              <div className="sticky top-0 bg-[var(--color-surface)] z-20 px-8 py-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--color-secondary)' }}>
                <span className="text-sm font-mono opacity-60" style={{ color: 'var(--color-secondary)' }}>
                  {selectedProject.category}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-[var(--color-background)] transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div ref={modalScrollRef} className="overflow-y-auto h-full">
                <div className="modal-content-inner p-8 md:p-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                    {selectedProject.title}
                  </h2>
                  
                  <div className="mb-12 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-secondary)' }}>
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover max-h-[400px]" />
                  </div>

                  <div className="space-y-12" style={{ color: 'var(--color-primary)' }}>
                    {selectedProject.details.introduction && (
                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-widest mb-4 opacity-60">Introducción</h3>
                        <p className="text-xl leading-relaxed font-light">{selectedProject.details.introduction}</p>
                      </div>
                    )}

                    {selectedProject.details.challenges && selectedProject.details.challenges.map((challenge, i) => (
                      <div key={i} className="space-y-6 pt-8" style={{ borderTop: '1px solid rgba(161,161,170,0.2)' }}>
                        <h3 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{challenge.title}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                          <div className="space-y-4">
                            <p className="text-base leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                              <strong className="uppercase text-xs tracking-widest block mb-1" style={{ color: 'var(--color-secondary)' }}>Acción:</strong>
                              {challenge.action}
                            </p>
                            <p className="text-base leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                              <strong className="uppercase text-xs tracking-widest block mb-1" style={{ color: 'var(--color-secondary)' }}>Resultado:</strong>
                              {challenge.result}
                            </p>
                          </div>
                          {challenge.image && (
                            <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-secondary)' }}>
                              <img src={challenge.image} alt={challenge.title} className="w-full h-auto object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Fallback for old projects if any */}
                    {selectedProject.details.problem && (
                      <div>
                        <h3 className="text-2xl font-medium mb-4">El Problema</h3>
                        <p className="text-lg leading-relaxed opacity-90">{selectedProject.details.problem}</p>
                      </div>
                    )}
                    {selectedProject.details.solution && (
                      <div>
                        <h3 className="text-2xl font-medium mb-4">La Solución</h3>
                        <p className="text-lg leading-relaxed opacity-90">{selectedProject.details.solution}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4" style={{ borderColor: 'var(--color-secondary)' }}>
                    {selectedProject.githubLink && (
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] font-medium transition-transform hover:scale-105">
                        <Github size={20} />
                        Ver Repositorio
                      </a>
                    )}
                    <button onClick={() => {
                        setSelectedProject(null);
                        window.lenis?.scrollTo('#blog');
                      }} 
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-[var(--color-primary)] font-medium transition-colors hover:bg-[var(--color-secondary)] hover:text-[var(--color-background)]"
                      style={{ borderColor: 'var(--color-secondary)' }}
                    >
                      <BookOpen size={20} />
                      Leer Artículo Técnico
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { t } = useTranslation();

  const isComingSoon = project.link === "#" && !project.details;

  return (
    <motion.div
      layoutId={project.details ? `project-${project.id}` : undefined}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      onClick={!isComingSoon ? onClick : undefined}
      className={`group block relative ${isComingSoon ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      data-hover={!isComingSoon ? t('projects.view') : undefined}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-900">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <motion.img
          src={project.image}
          alt={project.title}
          onLoad={() => setIsLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-500 ${isLoaded ? (isComingSoon ? 'opacity-40' : 'opacity-80 group-hover:opacity-100') : 'opacity-0'}`}
          whileHover={!isComingSoon ? { scale: 1.05 } : {}}
          transition={{ duration: 0.5 }}
        />
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-2 rounded-full border bg-[var(--color-surface)] text-[var(--color-primary)] font-medium text-sm tracking-wider uppercase" style={{ borderColor: 'var(--color-primary)' }}>
              Próximamente
            </span>
          </div>
        )}
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
    </motion.div>
  );
};

export default ProjectGrid;
