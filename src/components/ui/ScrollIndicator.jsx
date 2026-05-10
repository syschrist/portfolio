import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  // Height calculation: line should SHRINK downward as we scroll (1 to 0)
  // originY: 1 means it shrinks from the bottom upward (visually disappears downward)
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const smoothScaleY = useSpring(scaleY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="hidden fixed bottom-3 right-5 flex-col items-center gap-2 md:flex mix-blend-difference z-50">
      <div className="h-14 w-[2px] relative overflow-hidden rounded-full">
        <motion.div
          style={{
            scaleY: smoothScaleY,
            originY: 1,
            backgroundColor: '#ffffff'
          }}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <p className="text-[10px] font-medium tracking-widest uppercase text-white">
        Scroll
      </p>
    </div>
  );
};

export default ScrollIndicator;
