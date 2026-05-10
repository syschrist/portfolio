import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    // Hold the preloader for 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--color-surface)]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] tracking-tight">
          CHRIST. J
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
