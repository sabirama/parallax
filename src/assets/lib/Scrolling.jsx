/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function ScrollEffect({
  as: Tag = "div", // Allow custom tag with div as default
  children,
  startScroll = 0, // When the effect begins
  endScroll = 500, // When the effect completes
  effects = {
    fade: false,
    scale: false,
    translate: {
      x: 0,
      y: 50,
    },
  },
  className = "", // Allow additional classes
  style = {}, // Allow additional inline styles
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > startScroll) {
        setIsVisible(true);

        // Calculate progress between 0 and 1
        const progress = Math.min(
          1,
          Math.max(0, (currentScroll - startScroll) / (endScroll - startScroll))
        );

        setScrollProgress(progress);
      } else {
        setIsVisible(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startScroll, endScroll]);

  if (!isVisible) return null;

  // Calculate dynamic styles
  const dynamicStyles = {
    opacity: effects.fade ? scrollProgress : 1,
    transform: `
      translate(${
        effects.translate.x ? effects.translate.x * (1 - scrollProgress) : 0
      }px, 
                ${
                  effects.translate.y
                    ? effects.translate.y * (1 - scrollProgress)
                    : 0
                }px)
      scale(${1 - (effects.scale ? (1 - scrollProgress) * 0.2 : 0)})
    `,
    transition: "opacity 0.3s, transform 0.3s",
    ...style, // Merge with additional styles
  };

  return (
    <Tag className={`${className}`} style={dynamicStyles}>
      {children}
    </Tag>
  );
}

export default ScrollEffect;
