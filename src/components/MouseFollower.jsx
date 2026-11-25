import React, { useEffect, useState, useRef } from 'react';

export function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.glass-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Smooth physics trailing ring
    const render = () => {
      ringPos.current.x += (coords.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (coords.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [coords.x, coords.y]);

  return (
    <>
      {/* Ambient background soft light spotlight following mouse */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''}`}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          width: isHovered ? '12px' : '8px',
          height: isHovered ? '12px' : '8px',
          backgroundColor: isHovered ? '#B45309' : '#D97706'
        }}
      />
    </>
  );
}
