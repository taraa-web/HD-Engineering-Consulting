import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function parseOpacity(style) {
    const m = style.opacity?.match?.(/^([\d.]+)/) ?? String(style.opacity ?? '').match(/([\d.]+)/);
    return m ? parseFloat(m[1]) : null;
}

function isHiddenElement(el) {
    const opacity = parseOpacity(el.style);
    if (opacity !== null && opacity < 1) return true;
    const attr = el.getAttribute('style') ?? '';
    return /opacity:\s*0/i.test(attr) || /opacity:\s*0,/i.test(attr);
}

function prepareElement(el) {
    if (!el.dataset.revealTransform) {
        const transform = el.style.transform || 'translateY(20px)';
        el.dataset.revealTransform = transform;
        el.dataset.revealOpacity = el.style.opacity || '0';
    }
    if (!el.style.transition) {
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }
}

function showElement(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0) translateX(0)';
}

function hideElement(el) {
    el.style.opacity = el.dataset.revealOpacity || '0';
    el.style.transform = el.dataset.revealTransform || 'translateY(20px)';
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setupScrollReveal() {
    const main = document.querySelector('main');
    if (!main) return null;

    if (prefersReducedMotion()) {
        main.querySelectorAll('*').forEach((el) => {
            if (isHiddenElement(el)) showElement(el);
        });
        return null;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                if (!el.dataset.revealTransform) {
                    prepareElement(el);
                }
                if (entry.isIntersecting) {
                    showElement(el);
                } else {
                    hideElement(el);
                }
            });
        },
        { threshold: [0, 0.12], rootMargin: '0px 0px -4% 0px' },
    );

    const targets = new Set();

    main.querySelectorAll('*').forEach((el) => {
        if (isHiddenElement(el)) {
            prepareElement(el);
            targets.add(el);
            observer.observe(el);
        }
    });

    main.querySelectorAll('section > div').forEach((el, index) => {
        if (index > 0 && !targets.has(el)) {
            if (!el.dataset.revealTransform) {
                el.dataset.revealTransform = 'translateY(24px)';
                el.dataset.revealOpacity = '0';
                el.style.opacity = '0';
                el.style.transform = 'translateY(24px)';
            }
            if (!el.style.transition) {
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            observer.observe(el);
        }
    });

    return observer;
}

export default function useScrollReveal() {
    const { pathname } = useLocation();

    useEffect(() => {
        let observer;
        let frame2;

        const frame1 = requestAnimationFrame(() => {
            frame2 = requestAnimationFrame(() => {
                observer = setupScrollReveal();
            });
        });

        return () => {
            cancelAnimationFrame(frame1);
            if (frame2) cancelAnimationFrame(frame2);
            observer?.disconnect();
        };
    }, [pathname]);
}
