import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Shield, Terminal, Zap } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-background">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`, size: '50px 50px', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
            style={{ borderColor: 'rgba(var(--nav-bg-rgb), 0.1)', backgroundColor: 'rgba(var(--color-primary), 0.03)', color: 'var(--color-secondary)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t('hero.available', 'Disponible para trabajar')}
          </span>
        </motion.div>

        {/* Main Title Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tighter leading-[0.9] mb-4 md:mb-8" style={{ color: 'var(--color-primary)' }}>
                {t('hero.title')}
                <span className="text-accent">.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-lg sm:text-2xl md:text-4xl font-medium tracking-tight leading-snug max-w-[90%]" style={{ color: 'var(--color-primary)' }}>
                {t('hero.subtitle')}
              </h2>
              
              <div className="h-0.5 md:h-1 w-12 md:w-20 bg-accent rounded-full mb-2 md:mb-4" />
            </motion.div>
          </div>

          {/* Description - Refined Positioning */}
          <div className="lg:col-span-4 mt-6 lg:mt-0 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative p-5 sm:p-6 rounded-2xl border border-primary/5 bg-primary/[0.02] backdrop-blur-md"
            >
              <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-background border border-primary/10 text-accent flex items-center gap-2 shadow-sm">
                <Shield size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('hero.expertise', 'Expertise')}</span>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-light italic" style={{ color: 'var(--color-secondary)' }}>
                "{t('hero.description')}"
              </p>
              
              <div className="mt-5 flex gap-4 opacity-40">
                <Terminal size={16} />
                <Zap size={16} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              window.lenis?.scrollTo('#work');
            }}
            className="group relative inline-flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent transition-colors duration-500">
                <ArrowDown size={24} className="group-hover:translate-y-1 transition-transform duration-500" style={{ color: 'var(--color-primary)' }} />
              </div>
              <motion.div 
                className="absolute inset-0 rounded-full border border-accent opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] group-hover:text-accent transition-colors duration-500" style={{ color: 'var(--color-primary)' }}>
              {t('hero.cta', 'Explorar Proyectos')}
            </span>
          </a>
        </motion.div>
      </div>

      {/* Modern Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Scroll indicator for the aesthetic */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;


