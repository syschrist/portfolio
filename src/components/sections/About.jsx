import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Marquee from '../ui/Marquee';
import { useTranslation } from 'react-i18next';

const techStack = [
  "SIEM (Wazuh)", "Monitorización (Zabbix/Grafana)", "Linux (Ubuntu/Kali)", "Windows Server", "Networking (Cisco)",
  "Desarrollo Full-Stack", "Automatización (Scripting)", "Instalaciones Eléctricas", "Energías Renovables"
];

const About = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section id="about" ref={containerRef} className="py-20 overflow-hidden bg-[var(--color-surface)] text-[var(--color-primary)] transition-colors duration-300">

      {/* Marquee Header */}
      <div className="pt-10 pb-14 text-[var(--color-primary)]">
        <Marquee baseVelocity={2}>
          <span className="mr-8 block">{t('about.marquee')}</span>
        </Marquee>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[820px] mx-auto px-6 md:px-8">

        {/* Columns 2 & 3: Description & Stack */}
        <div id="About_Description" className="flex flex-col justify-center">
          <p className="text-sm mb-4 md:text-base opacity-100">
            {t('about.p1')}
          </p>

          <p className="text-sm mb-4 md:text-base opacity-100">
            {t('about.p2')}
          </p>

          <p className="text-sm mb-4 md:text-base opacity-100">
            {t('about.p3')}
          </p>

          <p className="text-sm mb-8 md:text-base opacity-100">
            {t('about.p4')}
          </p>

          <p className="text-sm mb-8 md:text-base opacity-100 font-semibold">
            {t('about.p5')}
          </p>

          <div>
            <h3 id="About_Stack-title" className="mt-2 mb-4 font-bold text-4xl">
              {t('about.techTitle')}
            </h3>

            <div id="About_Stack-pills" className="flex flex-wrap gap-y-2 gap-x-2">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-full border text-sm transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
                  style={{ borderColor: 'var(--color-primary)' }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
