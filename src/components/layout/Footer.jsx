import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="contact" className="py-24 px-4 md:px-12 border-t" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-primary)', borderColor: 'var(--color-secondary)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

        <div className="flex flex-col gap-6">
          <h2 
            className="text-4xl md:text-5xl font-bold tracking-tight" 
            style={{ color: 'var(--color-primary)' }}
            dangerouslySetInnerHTML={{ __html: t('footer.title') }}
          />
          <Magnetic strength={0.3}>
            <motion.a
              href="mailto:christ.jmanzano@gmail.com"
              className="text-xl transition-colors inline-block"
              style={{ color: 'var(--color-secondary)' }}
              data-hover="Email"
              whileTap={{ scale: 0.95 }}
            >
              christ.jmanzano@gmail.com
            </motion.a>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-8 text-sm text-gray-400">
            <Magnetic strength={0.2}>
              <motion.a
                href="https://github.com/chokchrist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-primary)] transition-colors inline-block"
                data-hover="Code"
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <motion.a
                href="https://www.linkedin.com/in/christ-jimenez/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-primary)] transition-colors inline-block"
                data-hover="Social"
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
              </motion.a>
            </Magnetic>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
