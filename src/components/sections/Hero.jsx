import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium uppercase tracking-widest"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#22c55e' }}
            />
            {t('hero.available', 'Available for work')}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter leading-[0.9] mb-6" style={{ color: 'var(--color-primary)' }}>
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16"
        >
          <h2 className="text-xl md:text-3xl font-light tracking-wide" style={{ color: 'var(--color-secondary)' }}>
            {t('hero.subtitle')} <span className="mx-2 opacity-40">•</span> {t('hero.creative')}
          </h2>

          <p className="text-sm md:text-base max-w-xs leading-relaxed" style={{ color: 'var(--color-secondary)', opacity: 0.7 }}>
            {t('hero.description', 'Cybersecurity & Infrastructure specialist with a 360° vision — from threat detection to full-stack development.')}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="mt-12"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 group"
            style={{ color: 'var(--color-primary)' }}
          >
            <span className="text-sm font-medium uppercase tracking-widest">{t('hero.cta', 'View my work')}</span>
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-background)]"
              style={{ borderColor: 'var(--color-primary)' }}
            >
              <ArrowDown size={16} strokeWidth={2} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Abstract Background Elements */}
      <motion.div
        className="absolute top-1/3 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </section>
  );
};

export default Hero;

