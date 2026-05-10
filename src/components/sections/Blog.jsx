import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../ui/Marquee';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    title: "Building Immersive UIs with Framer Motion",
    date: "May 10, 2026",
    excerpt: "Why animations matter for user experience and how to use them without degrading performance.",
    content: "Animations are no longer just eye candy; they are essential for giving users feedback and guiding them through an interface. Using Framer Motion allows us to build complex, declarative animations in React effortlessly. The key is ensuring that we animate properties that don't trigger layout recalculations, like transform and opacity. In this project, I used AnimatePresence to ensure that when components unmount, they do so gracefully, leaving a lasting impression of fluidity and high quality."
  },
  {
    id: 2,
    title: "Integrating i18n seamlessly in React",
    date: "April 28, 2026",
    excerpt: "My journey learning how to scale multiple languages in a modern web app.",
    content: "When a project grows, hardcoding strings becomes unmanageable. react-i18next solves this by creating a robust dictionary system. The real challenge is handling dynamic content and ensuring layout stability when words in one language are significantly longer than in another. Designing with flexbox and avoiding rigid fixed widths (except for specific UI toggles) usually prevents layout shifts when toggling between English and Spanish."
  },
  {
    id: 3,
    title: "Cybersecurity Basics for Web Developers",
    date: "March 15, 2026",
    excerpt: "Essential tips to ensure your web apps are secure by default.",
    content: "From preventing XSS with React's built-in escaping to securing your API endpoints with CORS and rate limiting, security should never be an afterthought. Always validate inputs on both the client and the server, and never trust user data. Implementing strong authentication like JWT with proper HttpOnly cookies goes a long way."
  },
  {
    id: 4,
    title: "Optimizing Vite and Tailwind",
    date: "February 02, 2026",
    excerpt: "How to keep your bundle sizes small and your builds blazing fast.",
    content: "Vite's esbuild integration already makes development incredibly fast, but for production, we need to be mindful of our dependencies. Tailwind CSS is fantastic because its JIT compiler ensures only the classes you actually use are shipped. Combine this with dynamic imports for heavy components, and you can achieve near-instant load times."
  },
  {
    id: 5,
    title: "The Future of Web Technologies",
    date: "January 10, 2026",
    excerpt: "A brief look at WebAssembly, Edge Computing, and AI integration.",
    content: "The web is evolving rapidly. WebAssembly allows us to run high-performance applications previously restricted to desktop environments directly in the browser. Meanwhile, edge computing brings the backend closer to the user, reducing latency to virtually zero. AI is also playing a huge role in assisting development and powering smart user interfaces."
  }
];

const Blog = () => {
  const { t } = useTranslation();
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const togglePost = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const handleShowMore = () => {
    if (visibleCount >= mockPosts.length) {
      setVisibleCount(3); // Reset to show less
    } else {
      setVisibleCount(prev => Math.min(prev + 3, mockPosts.length));
    }
  };

  return (
    <section id="blog" className="py-24 border-t bg-[var(--color-background)]" style={{ borderColor: 'var(--color-secondary)' }}>
      {/* Marquee Header */}
      <div className="text-[var(--color-primary)]">
        <Marquee baseVelocity={2}>
          <span className="mr-8 block">{t('blog.title')}</span>
        </Marquee>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-12 mt-16">
        <h2 className="text-sm font-medium mb-12 uppercase tracking-wider" style={{ color: 'var(--color-secondary)' }}>
          {t('blog.subtitle')}
        </h2>

        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {mockPosts.slice(0, visibleCount).map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="border-b pb-6"
                style={{ borderColor: 'var(--color-secondary)' }}
              >
                <button
                  onClick={() => togglePost(post.id)}
                  className="w-full text-left flex justify-between items-start md:items-center group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <span className="text-sm font-mono opacity-60" style={{ color: 'var(--color-secondary)' }}>
                      {post.date}
                    </span>
                    <h3 className="text-2xl font-medium transition-colors group-hover:text-gray-400" style={{ color: 'var(--color-primary)' }}>
                      {post.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedPostId === post.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 md:mt-0"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedPostId === post.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pl-0 md:pl-32 pr-4 md:pr-12 pb-4">
                        <p className="text-lg font-medium italic mb-4" style={{ color: 'var(--color-secondary)' }}>
                          "{post.excerpt}"
                        </p>
                        <p className="leading-relaxed opacity-90" style={{ color: 'var(--color-primary)' }}>
                          {post.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {mockPosts.length > 3 && (
          <motion.div layout className="mt-12 text-center">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {visibleCount >= mockPosts.length ? t('blog.showLess') : t('blog.showMore')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
