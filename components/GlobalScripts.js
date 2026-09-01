"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Reveal Elements (runs on mount and watches for dynamically added elements)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        observer.observe(el);
      });
    };
    
    // Initial observation
    observeElements();

    // Watch for DOM changes (fixes Next.js client-side navigation blank screens)
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldObserve = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldObserve = true;
          break;
        }
      }
      if (shouldObserve) {
        observeElements();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // 2. Navbar Scroll (runs once)
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
