import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="h-screen w-full flex flex-col justify-center px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-tight mb-4" style={{ color: 'var(--color-primary)' }}>
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-4xl font-light tracking-wide" style={{ color: 'var(--color-secondary)' }}>
            {t('hero.subtitle')} <span className="mx-2 opacity-50">•</span> {t('hero.creative')}
          </h2>
        </motion.div>
      </div>

      {/* Abstract Background Element */}
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
};

export default Hero;
