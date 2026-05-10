import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { X } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    const unsubscribe = scrollY.on('change', (latest) => {
      // Show text when scrolled past hero section (roughly viewport height)
      const heroHeight = window.innerHeight;
      setShowText(latest > heroHeight * 0.8);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [scrollY]);

  const menuItems = [
    { name: t('navbar.work'), href: '#work', id: 'work' },
    { name: t('navbar.blog'), href: '#blog', id: 'blog' },
    { name: t('navbar.about'), href: '#about', id: 'about' },
    { name: t('navbar.contact'), href: '#contact', id: 'contact' },
  ];

  const name = "CHRIST";
  const letters = name.split('');

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 flex border-b items-end justify-between mx-3 mt-3 pb-1 z-30 origin-left md:mx-5"
        style={{ borderColor: 'var(--color-secondary)' }}
      >
        <motion.a
          href="/"
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden px-1 rounded-none font-extrabold text-xl tracking-tight transition-all duration-300 bg-[var(--color-primary)] text-[var(--color-surface)]"
        >
          <div className="flex">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 0, opacity: showText ? 1 : 0 }}
                animate={{
                  y: showText ? 0 : 20,
                  opacity: showText ? 1 : 0
                }}
                transition={{
                  duration: 0.3,
                  delay: showText ? index * 0.05 : (letters.length - index - 1) * 0.03,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.a>

        {/* Date Display */}
        <div className="gap-10 text-sm font-medium overflow-hidden hidden md:flex">
          <span style={{ color: 'var(--color-primary)' }}>Portfolio {new Date().getFullYear()}</span>
          <span style={{ color: 'var(--color-secondary)' }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Controls Container */}
        <div className="text-lg font-medium leading-5 pointer-events-auto flex items-center gap-6" style={{ color: 'var(--color-primary)' }}>
          
          <button 
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
            className="hover:opacity-70 transition-opacity font-bold uppercase text-sm w-8 text-center relative h-5 overflow-hidden flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={i18n.language}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute"
              >
                {i18n.language === 'en' ? 'EN' : 'ES'}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="flex items-center overflow-hidden">
            <span className="italic">(&nbsp;&nbsp;</span>
            <Magnetic strength={0.3}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className="cursor-pointer relative text-lg font-medium overflow-hidden group"
            >
              {/* First span - visible by default, slides up on hover */}
              <span className="inline-block overflow-visible">
                {'Menu'.split('').map((letter, index) => (
                  <span
                    key={`top-${index}`}
                    className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* Second span - starts below, slides up on hover */}
              <span className="absolute top-0 left-0 inline-block">
                {'Menu'.split('').map((letter, index) => (
                  <span
                    key={`bottom-${index}`}
                    className="inline-block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0"
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </motion.button>
          </Magnetic>
            <span className="italic">&nbsp;)</span>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-4 md:right-12 text-white hover:opacity-70 transition-opacity"
            >
              <X size={24} />
            </motion.button>

            {/* Menu Items */}
            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-5xl md:text-7xl font-bold transition-colors ${activeSection === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="absolute bottom-12 flex gap-8 text-sm text-gray-400">
              <motion.a whileTap={{ scale: 0.95 }} href="https://github.com/chokchrist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </motion.a>
              <motion.a whileTap={{ scale: 0.95 }} href="https://www.linkedin.com/in/christ-jimenez/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
