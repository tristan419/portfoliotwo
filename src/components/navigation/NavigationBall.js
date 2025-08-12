import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary";
import { 
  NAV_PAGES, 
  LONG_PRESS_DELAY, 
  MAX_PARTICLES, 
  MENU_RADIUS, 
  TOUCH_THRESHOLD,
  VIBRATE_FEEDBACK,
  PARTICLE_LIFETIME_DECAY,
  getCircularPosition,
  vibrate,
  createParticle
} from "../../utils/navigationConstants";

const NavigationBall = ({ isVisible = false, active }) => {
  const navigate = useNavigate();
  const [navBall, setNavBall] = useState({
    isDragging: false,
    isExpanded: false,
    position: { x: 0, y: 0 },
    targetPage: null,
    particles: []
  });
  
  const navBallRef = useRef(null);
  const particleIdRef = useRef(0);
  const longPressTimer = useRef(null);

  const handleNavBallStart = useCallback((e) => {
    if (!navBallRef.current) return;
    
    // Handle both touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      setNavBall(prev => ({ ...prev, isExpanded: true }));
      vibrate(VIBRATE_FEEDBACK.medium);
    }, LONG_PRESS_DELAY);

    const rect = navBallRef.current.getBoundingClientRect();
    setNavBall(prev => ({
      ...prev,
      isDragging: true,
      position: { x: clientX - rect.width / 2, y: clientY - rect.height / 2 }
    }));
  }, []);

  const handleNavBallMove = useCallback((e) => {
    if (!navBall.isDragging) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // Handle both touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setNavBall(prev => {
      const newParticles = [...prev.particles, createParticle(clientX, clientY, navBall.targetPage?.color, particleIdRef)]
        .filter(p => p.life > 0)
        .slice(-MAX_PARTICLES);
      return {
        ...prev,
        position: { x: clientX - 30, y: clientY - 30 },
        particles: newParticles.map(p => ({
          ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 0.05
        }))
      };
    });
  }, [navBall.isDragging, navBall.targetPage?.color]);

  const handlePageSelect = useCallback((page) => {
    navigate(page);
    vibrate(VIBRATE_FEEDBACK.long);
    setNavBall(prev => ({
      ...prev,
      isDragging: false,
      isExpanded: false,
      position: { x: 0, y: 0 },
      targetPage: null,
      particles: []
    }));
  }, [navigate]);

  const handleNavBallEnd = useCallback((e) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // Check for menu item selection when expanded
    if (navBall.isExpanded && navBallRef.current) {
      // Handle both touch and mouse events
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      
      if (clientX && clientY) {
        const ballRect = navBallRef.current.getBoundingClientRect();
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;
        for (let i = 0; i < NAV_PAGES.length; i++) {
          const position = getCircularPosition(i, NAV_PAGES.length, MENU_RADIUS);
          const circleX = ballCenterX + position.x;
          const circleY = ballCenterY + position.y;
          const distance = Math.hypot(clientX - circleX, clientY - circleY);
          if (distance < TOUCH_THRESHOLD) { 
            handlePageSelect(NAV_PAGES[i].page); 
            return; 
          }
        }
      }
    }
    // Collapse navigation ball
    setNavBall(prev => ({
      ...prev,
      isDragging: false,
      isExpanded: false,
      position: { x: 0, y: 0 },
      targetPage: null,
      particles: []
    }));
  }, [navBall.isExpanded, handlePageSelect]);

  // Particle animation cleanup - use RAF instead of setInterval to avoid memory leaks
  useEffect(() => {
    if (navBall.particles.length === 0) return;
    
    let rafId;
    const animateParticles = () => {
      setNavBall(prev => {
        const updatedParticles = prev.particles
          .filter(p => p.life > 0)
          .map(p => ({
            ...p, 
            x: p.x + p.vx, 
            y: p.y + p.vy, 
            life: p.life - PARTICLE_LIFETIME_DECAY
          }));
        
        if (updatedParticles.length > 0) {
          rafId = requestAnimationFrame(animateParticles);
        }
        
        return {
          ...prev,
          particles: updatedParticles
        };
      });
    };
    
    rafId = requestAnimationFrame(animateParticles);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [navBall.particles.length]);

  // Clean up long press timer on unmount
  useEffect(() => {
    return () => { 
      if (longPressTimer.current) clearTimeout(longPressTimer.current); 
    };
  }, []);

  if (!isVisible) return null;

  return (
    <ErrorBoundary>
      {/* Particle Effects Layer */}
      <div className="fixed inset-0 pointer-events-none z-[600]">
        {navBall.particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: particle.life,
              boxShadow: `0 0 ${particle.life * 10}px ${particle.color}`
            }}
          />
        ))}
      </div>

      {/* Navigation Ball */}
      <motion.div
        ref={navBallRef}
        className="fixed w-16 h-16 rounded-full backdrop-blur-md border-2 border-white/30 z-[700] shadow-lg cursor-pointer"
        style={{
          right: '20px',
          bottom: '120px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        animate={{ scale: navBall.isExpanded ? 1.1 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
        onMouseDown={handleNavBallStart}
        onMouseMove={handleNavBallMove}
        onMouseUp={handleNavBallEnd}
        onTouchStart={handleNavBallStart}
        onTouchMove={handleNavBallMove}
        onTouchEnd={handleNavBallEnd}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/60 to-transparent" />
        </div>

        {/* Circular Navigation Menu */}
        {navBall.isExpanded && (
          <>
            {NAV_PAGES.map((page, index) => {
              const position = getCircularPosition(index, NAV_PAGES.length, MENU_RADIUS);
              const IconComponent = page.icon;
              const isActive = active(page.page);
              return (
                <motion.div
                  key={page.page}
                  className="absolute w-12 h-12 rounded-full backdrop-blur-md border-2 border-white/40 cursor-pointer shadow-lg"
                  style={{
                    left: position.x + 32 - 24,
                    top: position.y + 32 - 24,
                    backgroundColor: isActive ? page.color : 'rgba(255, 255, 255, 0.15)',
                    boxShadow: `0 0 20px ${page.color}40`,
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent className="text-white text-lg" style={{ color: isActive ? '#000' : '#fff' }} />
                  </div>
                  <div
                    className="absolute text-xs text-white font-medium whitespace-nowrap pointer-events-none"
                    style={{
                      left: position.x >= 0 ? '-60px' : '48px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      textShadow: '0 0 10px rgba(0,0,0,0.8)'
                    }}
                  >
                    {page.label}
                  </div>
                </motion.div>
              );
            })}

            {/* Background overlay for better visual separation */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ left: '-100vw', top: '-100vh', width: '200vw', height: '200vh' }}
            />
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  );
};

export default NavigationBall;