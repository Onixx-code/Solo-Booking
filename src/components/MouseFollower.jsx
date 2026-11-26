import React, { useEffect, useState, useRef } from 'react';

const TRAIL_COUNT = 5;

export function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
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

    const handleMouseDown = (e) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Smooth orbital ring physics
      ringPos.current.x += (targetX - ringPos.current.x) * 0.16;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Cascading comet trail particles
      let leaderX = targetX;
      let leaderY = targetY;
      trailPos.current.forEach((pos, idx) => {
        const ease = 0.34 - idx * 0.045;
        pos.x += (leaderX - pos.x) * ease;
        pos.y += (leaderY - pos.y) * ease;
        leaderX = pos.x;
        leaderY = pos.y;

        const el = trailRefs.current[idx];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Ambient Indigo-Teal Aurora Spotlight */}
      <div
        ref={glowRef}
        className="custom-cursor-glow"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.09) 0%, rgba(13, 148, 136, 0.05) 48%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Comet Trail Echo Particles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, idx) => (
        <div
          key={idx}
          ref={(el) => (trailRefs.current[idx] = el)}
          className="custom-cursor-trail"
          style={{
            width: `${7 - idx}px`,
            height: `${7 - idx}px`,
            opacity: 0.45 - idx * 0.08,
            background: idx % 2 === 0 ? '#4F46E5' : '#0D9488'
          }}
        />
      ))}

      {/* Rotating Orbital Compass Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''}`}
      >
        <span className="custom-cursor-orbit" />
      </div>

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          width: isHovered ? '11px' : '8px',
          height: isHovered ? '11px' : '8px',
          backgroundColor: isHovered ? '#0D9488' : '#4F46E5'
        }}
      />

      {/* Click Shockwave Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="custom-cursor-ripple"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}
    </>
  );
}
