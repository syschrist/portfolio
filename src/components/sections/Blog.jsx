import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../ui/Marquee';
import { useTranslation } from 'react-i18next';
import { X, ArrowRight } from 'lucide-react';
import Lenis from 'lenis';

const Blog = () => {
  const { t } = useTranslation();
  const posts = t('blog.posts', { returnObjects: true }) || [];
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const modalScrollRef = useRef(null);
  const lenisInstance = useRef(null);

  // Handle local smooth scroll for the modal
  useEffect(() => {
    if (selectedPost && modalScrollRef.current) {
      // Initialize Lenis for the modal container
      lenisInstance.current = new Lenis({
        wrapper: modalScrollRef.current, // The element that has overflow-y: auto
        content: modalScrollRef.current.querySelector('.modal-content-inner'), // The content inside
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

      return () => {
        cancelAnimationFrame(rafId);
        lenisInstance.current?.destroy();
        lenisInstance.current = null;
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedPost]);

  const handleShowMore = () => {
    if (visibleCount >= posts.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount(prev => Math.min(prev + 3, posts.length));
    }
  };

  return (
    <section id="blog" className="py-24 border-t bg-[var(--color-background)]" style={{ borderColor: 'var(--color-secondary)' }}>
      {/* ... (marquee and list remain same) ... */}
      <div className="text-[var(--color-primary)]">
        <Marquee baseVelocity={2}>
          <span className="mr-8 block">{t('blog.title')}</span>
        </Marquee>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-12 mt-16 relative">
        <h2 className="text-sm font-medium mb-12 uppercase tracking-wider" style={{ color: 'var(--color-secondary)' }}>
          {t('blog.subtitle')}
        </h2>

        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {Array.isArray(posts) && posts.slice(0, visibleCount).map((post) => (
              <motion.div
                key={post.id}
                layoutId={`post-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="border-b pb-6"
                style={{ borderColor: 'var(--color-secondary)' }}
              >
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full text-left flex justify-between items-start md:items-center group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <span className="text-sm font-mono opacity-60" style={{ color: 'var(--color-secondary)' }}>
                      {post.date}
                    </span>
                    <h3 className="text-2xl font-medium transition-colors group-hover:opacity-70" style={{ color: 'var(--color-primary)' }}>
                      {post.title}
                    </h3>
                  </div>
                  <motion.div
                    className="mt-1 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {Array.isArray(posts) && posts.length > 3 && (
          <motion.div layout className="mt-12 text-center">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {visibleCount >= posts.length ? t('blog.showLess') : t('blog.showMore')}
            </button>
          </motion.div>
        )}
      </div>

      {/* Full-Screen Immersive Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-end md:items-center bg-black/60 backdrop-blur-sm p-0 md:p-12"
          >
            <div className="absolute inset-0 z-0" onClick={() => setSelectedPost(null)} />

            <motion.div
              layoutId={`post-${selectedPost.id}`}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] md:max-h-full h-full md:h-auto md:min-h-[60vh] bg-[var(--color-surface)] rounded-t-3xl md:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
              style={{ borderTop: '1px solid var(--color-secondary)', borderLeft: '1px solid var(--color-secondary)', borderRight: '1px solid var(--color-secondary)' }}
            >
              <div className="sticky top-0 bg-[var(--color-surface)] z-20 px-8 py-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--color-secondary)' }}>
                <span className="text-sm font-mono opacity-60" style={{ color: 'var(--color-secondary)' }}>
                  {selectedPost.date}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-[var(--color-background)] transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - Local Smooth Scroll */}
              <div 
                ref={modalScrollRef}
                className="overflow-y-auto h-full"
              >
                <div className="modal-content-inner p-8 md:p-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                    {selectedPost.title}
                  </h2>
                  
                  <p className="text-xl md:text-2xl font-light italic mb-12" style={{ color: 'var(--color-secondary)' }}>
                    "{selectedPost.excerpt}"
                  </p>
                  
                  <div className="prose prose-invert max-w-none text-lg leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                    <p className="mb-6">{selectedPost.content}</p>
                    <div className="w-full h-64 bg-gray-800 rounded-lg my-8 flex items-center justify-center text-gray-500">
                      [ Placeholder Image ]
                    </div>
                    <p className="mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="mb-6">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    {/* Extra mock content for testing scroll */}
                    <p className="mb-6">
                      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
                    </p>
                    <p>
                      Donec accumsan, ipsum sed dignissim feugiat, risus nisl egestas massa, in pulvinar neque leo ac lectus. Fusce pretium porta nisl.
                    </p>
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

export default Blog;
