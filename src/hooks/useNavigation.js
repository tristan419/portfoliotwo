import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useNavigation = () => {
  const [sidenav, setSidenav] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const location = useLocation();

  // Show navigation ball only on mobile/tablet (width < 1024px)
  const showNavBall = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024;
  }, []);

  // Check if current path is active
  const active = useCallback((path) => location.pathname.startsWith(path), [location.pathname]);

  // Handle outside click to close sidenav
  const handleOutsideClick = useCallback((e) => {
    // Only close if clicking the backdrop, not the sidenav content
    if (e.target === e.currentTarget) {
      setSidenav(false);
    }
  }, []);

  // Global event to open Contact
  useEffect(() => {
    const openContact = () => {
      const navigate = (path) => {
        // This would need to be passed from the component using this hook
        window.location.pathname = path;
      };
      navigate("/contact");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, []);

  // Show long press hint on mobile
  useEffect(() => {
    if (!showNavBall) return;
    if (!localStorage.getItem("longPressHintShown")) {
      setShowSwipeHint(true);
      localStorage.setItem("longPressHintShown", "1");
    }
  }, [showNavBall]);

  // Hide hint after timeout
  useEffect(() => {
    if (!showSwipeHint) return;
    const hideTimer = setTimeout(() => setShowSwipeHint(false), 2000);
    return () => clearTimeout(hideTimer);
  }, [showSwipeHint]);

  return {
    sidenav,
    setSidenav,
    showSwipeHint,
    showNavBall,
    active,
    handleOutsideClick
  };
};