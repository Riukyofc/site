import React, { useState, useEffect, useRef } from 'react';

export const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      case 'scale': return 'scale-95';
      default: return 'translate-y-12';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.22, 1, 0.36, 1) ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
