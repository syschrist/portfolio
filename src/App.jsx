import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import ProjectGrid from './components/sections/ProjectGrid';
import Blog from './components/sections/Blog';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import ScrollIndicator from './components/ui/ScrollIndicator';
import Navbar from './components/layout/Navbar';
import About from './components/sections/About';
import ThemeToggle from './components/ui/ThemeToggle';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen">
      <title>Christ. J | Full Stack Developer & Creative Tech</title>
      <meta name="description" content="Portfolio of Christ. J, a Full Stack Developer specializing in AI, Development, and Creative Tech. Creating immersive digital experiences." />
      <meta name="keywords" content="Full Stack Developer, React, Creative Tech, AI, Web Development, Portfolio, Christ. J" />
      <meta name="author" content="Christ. J" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Christ. J | Full Stack Developer" />
      <meta property="og:description" content="Portfolio of Christ. J, a Full Stack Developer specializing in AI, Development, and Creative Tech." />
      <meta property="og:image" content="/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Christ. J | Full Stack Developer" />
      <meta name="twitter:description" content="Portfolio of Christ. J, a Full Stack Developer specializing in AI, Development, and Creative Tech." />
      <meta name="twitter:image" content="/og-image.png" />

      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />
      <ThemeToggle />
      <SmoothScroll>
        <Hero />
        <ProjectGrid />
        <Blog />
        <About />
        <Footer />
      </SmoothScroll>
      <ScrollIndicator />
    </div>
  );
}

export default App;
