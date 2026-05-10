import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues for smooth/performant animation
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth following delay
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor if fine pointer is available (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsVisible(mediaQuery.matches);

    const handleMediaChange = (e) => setIsVisible(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer');

      setIsHovering(!!isClickable);

      if (isClickable && isClickable.dataset.hover) {
        setHoverText(isClickable.dataset.hover);
      } else {
        setHoverText("");
      }
    };

    // Add event listeners window-wide
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference flex items-center justify-center overflow-hidden"
        variants={{
          default: {
            width: 4,
            height: 4,
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderWidth: 0,
            borderColor: "rgba(255, 255, 255, 1)",
          },
          hover: {
            width: 80,
            height: 80,
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 1)",
          }
        }}
        initial="default"
        animate={isHovering ? "hover" : "default"}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          borderStyle: 'solid',
        }}
        transition={{
          duration: 0.3,
          ease: "circOut",
          width: { duration: 0.3 },
          height: { duration: 0.3 },
          backgroundColor: { duration: 0.2 },
          borderWidth: { duration: 0.2 }
        }}
      >
        {isHovering && hoverText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] uppercase tracking-widest text-white font-medium"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
