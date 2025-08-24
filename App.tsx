
import React, { useState, useEffect, FC, ReactNode, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Custom Hooks ---

// Hook to trigger animations on scroll
const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};


// --- SVG Icon Components ---

const LogoIcon: FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
    <svg className={className} viewBox="0 0 75 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LITZ Digital Resources Logo">
        <defs>
            <linearGradient id="glossy-black" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2d3748', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1a202c', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            
            <filter id="unified-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <clipPath id="logo-mask">
                 <path d="M 10 5 L 10 105 L 65 105 L 65 95 L 20 95 L 20 5 Z" />
            </clipPath>
            
            <style>{`
                @keyframes logo-shenanigans {
                    /* 0-4s: Dance */
                    0% { transform: rotate(0deg) scale(1) translateY(0); opacity: 1; }
                    5% { transform: rotate(-4deg) translateY(-3px); }
                    10% { transform: rotate(4deg) translateY(3px); }
                    15% { transform: rotate(-2deg) translateY(-2px); }
                    20% { transform: rotate(2deg) translateY(2px); }
                    25% { transform: rotate(0deg) translateY(0); } /* End dance */

                    /* 4-8s: Jump sequence */
                    28% { transform: scale(1.1, 0.8) translateY(5px); } /* Squash */
                    35% { transform: scale(0.8, 1.2) translateY(-60px); } /* Jump up */
                    42% { transform: scale(1, 1) translateY(-10px); } /* Peak */
                    48% { transform: scale(1.1, 0.8) translateY(5px); } /* Land */
                    50% { transform: scale(1, 1) translateY(0); } /* Settle */

                    /* 8-11s: Cartwheel */
                    55% { transform: rotate(0deg); }
                    75% { transform: rotate(360deg); }
                    
                    /* 11-15s: Zoom and Fade */
                    80% { transform: rotate(360deg) scale(1); opacity: 1; }
                    95% { transform: rotate(360deg) scale(3); opacity: 0; }
                    
                    /* 15-16s: Hold invisible and reset for loop */
                    99% { transform: rotate(360deg) scale(3); opacity: 0; }
                    100% { transform: rotate(0deg) scale(1) translateY(0); opacity: 1; }
                }

                .logo-animated-group {
                    animation: logo-shenanigans 16s ease-in-out infinite;
                    transform-origin: center;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .fuchsia-neon {
                    animation: pulse 3s ease-in-out infinite;
                }
                .sky-neon {
                    animation: pulse 2.5s ease-in-out infinite 0.5s;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-30deg); }
                    100% { transform: translateX(250%) skewX(-30deg); }
                }
                .shimmer-rect {
                    animation: shimmer 5s ease-in-out infinite;
                    animation-delay: 1.5s;
                }

                /* Scroll Animations */
                .scroll-animate {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
                }
                .scroll-animate.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Testimonial Marquee */
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .testimonial-track {
                    animation: scroll 60s linear infinite;
                    will-change: transform;
                }
                .testimonial-carousel:hover .testimonial-track {
                    animation-play-state: paused;
                }

                /* CTA Button Glow */
                 @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px 5px rgba(217, 70, 239, 0.4), 0 0 30px 10px rgba(217, 70, 239, 0.2);
                    }
                    50% {
                        box-shadow: 0 0 30px 10px rgba(217, 70, 239, 0.6), 0 0 45px 15px rgba(217, 70, 239, 0.4);
                    }
                }
            `}</style>
        </defs>

        <g className="logo-animated-group">
            {/* 3D Structure */}
            <g fill="url(#glossy-black)">
                <path d="M 10 5 L 10 105 L 65 105 L 65 95 L 20 95 L 20 5 Z" />
            </g>

            {/* Shimmer Effect */}
            <g clipPath="url(#logo-mask)">
                <rect x="-10" y="0" width="220" height="120" fill="url(#shimmer)" className="shimmer-rect" opacity="0.8" />
            </g>

            {/* Neon Glow Effects */}
            <g filter="url(#unified-glow)" strokeWidth="4" strokeLinecap="round" fill="none">
                <g className="fuchsia-neon">
                    <path d="M 15 10 L 15 90" stroke="#f472b6" />
                </g>
                <g className="sky-neon">
                    <path d="M 25 100 L 60 100" stroke="#38bdf8" />
                </g>
            </g>
            
            {/* Neon Tubes */}
            <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none">
                <path d="M 15 10 L 15 90" />
                <path d="M 25 100 L 60 100" />
            </g>
        </g>
    </svg>
);


const CheckIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon: FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>  
);

const LocationIcon: FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.615-.379C11.875 18.042 12.582 17.5 13.5 16.5c1.423-1.568 2.5-3.834 2.5-6.5C16 5.36 13.314 3 10 3S4 5.36 4 10c0 2.666 1.077 4.932 2.5 6.5.918 1 1.625 1.542 2.25 1.954.215.156.43.279.615-.379.06.036.118.067.176.094a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const YouTubeIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.001,4.5c-4.664,0-8.463,3.799-8.463,8.463s3.799,8.463,8.463,8.463s8.463-3.799,8.463-8.463S16.665,4.5,12.001,4.5z M12.001,19.263c-3.69,0-6.688-2.998-6.688-6.688s2.998-6.688,6.688-6.688s6.688,2.998,6.688,6.688S15.691,19.263,12.001,19.263z M10.59,9.528l4.025,2.415l-4.025,2.415V9.528z" />
    </svg>
);

const TwitterIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const PinterestIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.017 2c-5.49 0-9.917 4.427-9.917 9.917 0 4.135 2.467 7.647 5.892 9.135-.083-.787-.033-1.635.228-2.38.25-1.02.667-2.628.667-2.628s-.175-.35-.175-.867c0-.81.483-1.417 1.083-1.417.517 0 .767.383.767.85 0 .517-.333 1.283-.5 2.008-.15.65.317 1.183.95 1.183 1.133 0 2.017-1.483 2.017-3.642 0-1.892-1.25-3.25-2.883-3.25-1.983 0-3.15 1.483-3.15 2.917 0 .55.2.917.483 1.25.133.15.15.233.1.483-.05.183-.167.65-.217.833-.05.217-.233.283-.45.183-1.433-.667-2.333-2.55-2.333-4.183 0-2.283 1.833-4.833 5.383-4.833 2.85 0 5.017 2.05 5.017 4.75 0 2.867-1.55 5.117-3.717 5.117-.733 0-1.433-.383-1.667-.833 0 0-.367 1.433-.45 1.817-.167.667-.533 1.333-.8 1.75.8.25 1.633.383 2.5.383 5.49 0 9.917-4.427 9.917-9.917C21.934 6.427 17.507 2 12.017 2z" />
    </svg>
);

const LinkedInIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const TelegramIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.8,3.2c-0.4-0.4-1-0.5-1.5-0.1L3.5,9.3c-0.5,0.2-0.8,0.7-0.8,1.2s0.3,1,0.8,1.2l4.8,1.8l1.8,4.8c0.2,0.5,0.7,0.8,1.2,0.8.1,0,0.2,0,0.3,0c0.6-0.1,1-0.5,1.2-1.1l6.3-16.8C22.3,4.2,22.2,3.6,21.8,3.2z M10.9,13.7L6.6,12l11.4-6.3L10.9,13.7z M12,17.4l-1.4-3.7l7.8-7.8L12,17.4z"/>
    </svg>
);


const ArrowUpIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
);

const XIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CopyIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
    </svg>
);


const SoundOnIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

const SoundOffIcon: FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);


// --- Component for Animated Counter ---
const AnimatedCounter: FC<{ endValue: number }> = ({ endValue }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = endValue;
                    if (start === end) return;

                    const duration = 2000;
                    const startTime = Date.now();

                    const step = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const current = Math.floor(progress * end);
                        setCount(current);
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(step);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [endValue]);

    return <span ref={ref}>{count.toLocaleString()}+</span>;
};


// --- Page Section Components ---

const Header: FC<{ 
    onBonusClick: () => void;
    currentPage: 'home' | 'bonus';
    onNavigateHome: () => void;
}> = ({ onBonusClick, currentPage, onNavigateHome }) => (
    <header className="bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-28 border-b border-gray-800">
                <button onClick={onNavigateHome} className="flex items-center gap-4 text-left">
                    <LogoIcon className="h-20 w-auto" />
                    <span className="text-2xl font-bold text-white tracking-wider">LITZ DIGITAL RESOURCES</span>
                </button>
                <div className="hidden md:flex items-center gap-4">
                     {currentPage === 'home' ? (
                        <>
                            <button 
                                onClick={onBonusClick}
                                className="bg-sky-600 text-white font-bold py-3 px-6 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-600/30"
                            >
                                BONUS GUIDES
                            </button>
                            <a href="https://www.raket.ph/litogarin/products/ultimate-reels-bundle-over-100000-viral-ready-videos" target="_blank" rel="noopener noreferrer" className="bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-full hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-600/30">
                                Get Instant Access
                            </a>
                        </>
                     ) : (
                        <button 
                            onClick={onNavigateHome} 
                            className="bg-sky-600 text-white font-bold py-3 px-6 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-600/30"
                        >
                            &larr; Back to Home
                        </button>
                     )}
                </div>
            </div>
        </div>
    </header>
);

const Hero: FC = () => (
    <section className="relative text-white py-20 sm:py-32 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-fuchsia-600 to-transparent blur-3xl -translate-x-1/2"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-sky-600 to-transparent blur-3xl translate-x-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-lg font-semibold tracking-widest text-gray-300 uppercase">LITZ Digital Resources</p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight">
            WALA KA NA BANG MAISIP NA IPOPOST NA REELS?
          </h2>
          <p className="mt-8 max-w-3xl mx-auto text-xl sm:text-2xl font-semibold text-gray-200">
            The Ultimate Reels Bundle: 100,000+ Viral-Ready Videos
          </p>
          
          <div className="mt-12 w-full max-w-5xl mx-auto">
            <div className="rounded-2xl shadow-2xl shadow-fuchsia-500/20 overflow-hidden border-2 border-gray-700">
                <img 
                    src="https://raketcontent.com/Gemini_Generated_Image_3qlo4u3qlo4u3qlo_e12884ec0d.png" 
                    alt="The Ultimate Reels Bundle displayed on a laptop and a phone" 
                    className="w-full h-auto object-cover" 
                    loading="lazy" 
                />
            </div>
          </div>
    
          <div className="mt-12 flex flex-col gap-4 justify-center items-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                PROMO PRICE 112 PESOS LAHAT!
            </h3>
            <a href="https://www.raket.ph/litogarin/products/ultimate-reels-bundle-over-100000-viral-ready-videos" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-fuchsia-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-600/50">
              GET THIS BUNDLE NOW - ₱112
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">One-Time Payment • Instant Download • Lifetime Access</p>
        </div>
      </section>
);

const ProblemSolver: FC = () => (
  <section className="py-20 sm:py-24 bg-black scroll-animate">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Tired of Struggling with Content Creation?</h2>
        <p className="mt-4 text-lg text-gray-400">We get it. Creating engaging content consistently is hard. That's why we built the ultimate shortcut.</p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8 text-lg">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-red-400 mb-3">The Old, Hard Way...</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">❌</span> Spending hours brainstorming ideas.</li>
            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">❌</span> Struggling with video editing software.</li>
            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">❌</span> Wasting money on expensive stock footage.</li>
            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">❌</span> Feeling burnt out and inconsistent.</li>
            <li className="flex items-start"><span className="text-red-500 mr-3 mt-1">❌</span> Getting low views and zero engagement.</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-fuchsia-500 shadow-lg shadow-fuchsia-500/20">
          <h3 className="text-xl font-semibold text-fuchsia-400 mb-3">The New, Smart Way!</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center"><CheckIcon className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> Access 100,000+ ready-to-post videos.</li>
            <li className="flex items-center"><CheckIcon className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> Post high-quality content in minutes.</li>
            <li className="flex items-center"><CheckIcon className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> Save time, energy, and money.</li>
            <li className="flex items-center"><CheckIcon className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> Stay consistent and grow your audience.</li>
            <li className="flex items-center"><CheckIcon className="w-6 h-6 text-fuchsia-400 mr-3 flex-shrink-0" /> Go viral and monetize your influence.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);


const BUNDLE_ITEMS = [
  "5,000+ Motivational Reels",
  "5,000+ Luxury Lifestyle Reels",
  "3,000+ AI Arts & Talking Heads",
  "2,000+ Funny Pet & Animal Videos",
  "1,500+ Entrepreneur & Business Clips",
  "1,000+ Health, Gym & Fitness Videos",
  "Faceless Content for Monetization",
  "Trending Audios & Hooks Guide",
  "No Watermarks, Fully Editable",
  "Categorized for Easy Access",
  "New Content Added Monthly (Free)"
];

const BundleContents: FC = () => (
  <section id="features" className="py-20 sm:py-24 bg-gray-900 scroll-animate">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">What's Inside The Ultimate Bundle?</h2>
        <div className="mt-4 text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400">
            <AnimatedCounter endValue={100000} />
        </div>
        <p className="text-2xl font-bold text-white -mt-2">Viral Ready-Made Videos</p>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">An insane amount of value packed into one bundle. This is everything you need to dominate social media.</p>
      </div>
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUNDLE_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-fuchsia-500 hover:scale-105 transition-all duration-300">
              <CheckIcon className="w-7 h-7 text-fuchsia-400 mr-4 flex-shrink-0" />
              <span className="text-white font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks: FC = () => (
    <section className="py-20 sm:py-24 bg-black scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Go Viral in 4 Simple Steps</h2>
                <p className="mt-4 text-lg text-gray-400">It's designed to be incredibly simple and fast.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-4 gap-8 text-center relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-700"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-800 border-2 border-fuchsia-500 rounded-full text-3xl font-bold text-fuchsia-400 shadow-lg shadow-fuchsia-500/20">1</div>
                    <h3 className="mt-6 text-xl font-semibold text-white">Download</h3>
                    <p className="mt-2 text-gray-400">Get instant access to all files via Google Drive.</p>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-800 border-2 border-fuchsia-500 rounded-full text-3xl font-bold text-fuchsia-400 shadow-lg shadow-fuchsia-500/20">2</div>
                    <h3 className="mt-6 text-xl font-semibold text-white">Choose</h3>
                    <p className="mt-2 text-gray-400">Pick a viral-ready video from our massive library.</p>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-800 border-2 border-fuchsia-500 rounded-full text-3xl font-bold text-fuchsia-400 shadow-lg shadow-fuchsia-500/20">3</div>
                    <h3 className="mt-6 text-xl font-semibold text-white">Edit & Post</h3>
                    <p className="mt-2 text-gray-400">Add your text or logo in Canva, CapCut or any editor.</p>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gray-800 border-2 border-fuchsia-500 rounded-full text-3xl font-bold text-fuchsia-400 shadow-lg shadow-fuchsia-500/20">4</div>
                    <h3 className="mt-6 text-xl font-semibold text-white">Go Viral</h3>
                    <p className="mt-2 text-gray-400">Watch your views, followers, and engagement explode.</p>
                </div>
            </div>
        </div>
    </section>
);

const BONUS_ITEMS = [
    { title: "FREE: Ultimate Raket PH Mini Course", description: "Learn how to monetize your new content and turn views into cash. (Value: ₱1,500)" },
    { title: "FREE: 100+ Ebooks with Resell Rights", description: "A library of knowledge you can learn from or sell for 100% profit. (Value: ₱2,500)" },
    { title: "FREE: 1,000+ Canva Templates", description: "Professionally designed templates for all your social media needs. (Value: ₱999)" },
];

const Bonuses: FC = () => (
  <section className="py-20 sm:py-24 bg-gray-900 scroll-animate">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-fuchsia-400 font-bold uppercase tracking-wider">Limited Time Offer</p>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Get These Exclusive Bonuses FREE!</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Order today and you'll also receive these game-changing resources, absolutely free.</p>
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {BONUS_ITEMS.map((bonus, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-fuchsia-500/30">
            <h3 className="text-2xl font-bold text-fuchsia-400">{bonus.title}</h3>
            <p className="mt-4 text-gray-300">{bonus.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const TESTIMONIALS = [
    { name: "John D.", role: "Fitness Coach", quote: "This bundle is a lifesaver. I went from 1k to 50k followers in two months. The quality is insane and it saves me so much time!", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1" },
    { name: "Sarah L.", role: "Digital Marketer", quote: "I was skeptical at first, but wow. The engagement on my client accounts has tripled. Easiest ROI I've ever made.", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1" },
    { name: "Mike R.", role: "Entrepreneur", quote: "The best ₱112 I've ever spent on my business. The content variety is amazing. I can schedule posts for weeks in advance.", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1" },
    { name: "Anna B.", role: "Content Creator", quote: "The sheer volume of content is mind-blowing. I never run out of ideas anymore. Highly recommended!", image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1" },
    { name: "Chris T.", role: "Real Estate Agent", quote: "Using the luxury reels to market properties has been a game-changer for my social media presence. My listings get way more views now.", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1" },
];

const Testimonials: FC = () => (
    <section className="py-20 sm:py-24 bg-black scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Join Thousands of Happy Creators</h2>
                <p className="mt-4 text-lg text-gray-400">Don't just take our word for it. Here's what our customers say.</p>
            </div>
            <div className="mt-16 testimonial-carousel w-full overflow-hidden relative">
                <div className="testimonial-track flex w-max">
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-lg border border-gray-700 mx-4 w-[350px] flex-shrink-0">
                            <div className="flex items-center mb-6">
                                <img className="w-14 h-14 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
                                <div className="ml-4">
                                    <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-fuchsia-400">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                            </div>
                            <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
                 <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-black to-transparent"></div>
                 <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-black to-transparent"></div>
            </div>
        </div>
    </section>
);

const FAQ_ITEMS = [
    { q: "Is this a one-time payment?", a: "Yes, absolutely! You pay only once and get lifetime access to all the current and future content in the bundle. No monthly fees, no hidden charges." },
    { q: "How do I receive the files after purchase?", a: "Instantly! After your payment is confirmed, you will receive an email with a link to a Google Drive folder where you can access and download all the files." },
    { q: "Can I use these videos for commercial purposes?", a: "Yes! You can use these videos for your own business, for client work, on monetized social media channels, and more. The included resell rights also allow you to sell some of the bonus products." },
    { q: "Do I need any special software to edit these videos?", a: "No special software is needed. You can use free and popular apps like Canva, CapCut, or any video editor you're comfortable with on your phone or computer." },
    { q: "What if I'm not satisfied with the bundle?", a: "We offer a 30-day money-back guarantee. If you don't see results or are not satisfied for any reason, just contact us and we'll issue a full refund, no questions asked." }
];

const FAQItem: FC<{ item: { q: string, a: string }; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-700">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6">
            <span className="text-lg font-medium text-white">{item.q}</span>
            <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <p className="pb-6 text-gray-300">{item.a}</p>
            </div>
        </div>
    </div>
);

const FAQ: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 sm:py-24 bg-gray-900 scroll-animate">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-400">Got questions? We've got answers.</p>
                </div>
                <div className="mt-12">
                    {FAQ_ITEMS.map((item, index) => (
                        <FAQItem key={index} item={item} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const FinalCallToAction: FC = () => (
    <section id="cta" className="py-20 sm:py-32 bg-gradient-to-t from-black to-gray-900 scroll-animate">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Ready to Become a Content Machine?
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
                For a single payment of just ₱112, you get lifetime access to a content library that will save you hundreds of hours and help you grow faster than ever before.
            </p>
            <div className="mt-6 flex justify-center">
                <div className="bg-gray-800 text-gray-400 text-lg font-mono p-2 rounded-md inline-block">
                    Total Value: <span className="line-through">₱5,000+</span>
                </div>
            </div>
            <div className="mt-10">
                <a href="https://www.raket.ph/litogarin/products/ultimate-reels-bundle-over-100000-viral-ready-videos" target="_blank" rel="noopener noreferrer" 
                   className="bg-fuchsia-600 text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105"
                   style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                    Get Instant Access Now for ₱112
                </a>
            </div>
            <p className="mt-6 text-gray-400">30-Day Money-Back Guarantee. You have nothing to lose!</p>
        </div>
    </section>
);

const AboutMe: FC = () => (
    <section id="about" className="py-20 sm:py-24 bg-gray-950 scroll-animate">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl sm:text-4xl font-bold text-white relative inline-block">
                    About Me
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-fuchsia-500 to-sky-500 rounded-full"></span>
                 </h2>
            </div>
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                <div className="md:col-span-2 group">
                    <div className="relative p-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-sky-600 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                        <img 
                            src="https://raketcontent.com/large_518888345_770789448957706_4156280178529580233_n_7b5dbdf9b2.jpg" 
                            alt="lito estember" 
                            className="relative rounded-2xl w-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>
                <div className="md:col-span-3 text-gray-300">
                    <h3 className="text-4xl font-extrabold text-white tracking-tight">lito estember</h3>
                    <p className="flex items-center gap-2 mt-2 text-fuchsia-400 font-semibold">
                        <LocationIcon className="w-5 h-5" />
                        Bacolod City, Western Visayas, Philippines
                    </p>
                    <p className="mt-6 text-lg leading-relaxed">
                        I'm a seasoned procurement professional (Bacolod City BAC) and a self-taught full-stack developer. I bridge the gap between complex government processes and modern technology by building custom AI-powered software.
                    </p>
                    <div className="mt-8 bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                        <p className="font-bold text-xl text-white">
                           Payment Notice
                        </p>
                        <p className="mt-2 text-gray-400">
                            You may send your payment directly to my GCash if you prefer not to be charged the 12% fee. Just send the original price and send the screenshot to my{' '}
                            <a href="https://www.facebook.com/tamis.litz/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">Messenger</a>
                            {' '}or{' '}
                            <a href="https.t.me/+639157525255" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">Telegram</a>.
                        </p>
                        <div className="mt-4 border-t border-gray-600 pt-4 space-y-2">
                            <p className="text-lg font-bold text-sky-400">GCash Details:</p>
                            <p><span className="font-semibold text-white w-20 inline-block">Number:</span> 09157525255</p>
                            <p><span className="font-semibold text-white w-20 inline-block">Name:</span> LI*O E.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Footer: FC<{ setActiveModal: (modal: 'terms' | 'privacy' | null) => void }> = ({ setActiveModal }) => (
    <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <LogoIcon className="h-10 w-auto" />
                        <span className="text-xl font-bold text-white">LITZ DIGITAL</span>
                    </div>
                    <p className="text-gray-400 text-sm">Your ultimate shortcut to viral social media content. Elevate your online presence effortlessly.</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Quick Links</h3>
                    <ul className="mt-4 space-y-3">
                        <li><a href="#features" className="text-base text-gray-400 hover:text-fuchsia-400 transition-colors">Features</a></li>
                        <li><a href="#faq" className="text-base text-gray-400 hover:text-fuchsia-400 transition-colors">FAQ</a></li>
                        <li><a href="#about" className="text-base text-gray-400 hover:text-fuchsia-400 transition-colors">About Me</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Follow Us</h3>
                    <div className="flex mt-4 space-x-4">
                        <a href="https://web.facebook.com/litogarin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label="Facebook"><FacebookIcon /></a>
                        <a href="https://youtube.com/c/LitoGarin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label="YouTube"><YouTubeIcon /></a>
                        <a href="https://twitter.com/litogarin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label="Twitter"><TwitterIcon /></a>
                        <a href="https://pinterest.ph/litogarin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label="Pinterest"><PinterestIcon /></a>
                        <a href="https://linkedin.com/in/lito-garin-estember-778824180" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors" aria-label="LinkedIn"><LinkedInIcon /></a>
                    </div>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-3">
                        <li><button onClick={() => setActiveModal('terms')} className="text-base text-gray-400 hover:text-fuchsia-400 transition-colors">Terms of Service</button></li>
                        <li><button onClick={() => setActiveModal('privacy')} className="text-base text-gray-400 hover:text-fuchsia-400 transition-colors">Privacy Policy</button></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} LITZ Digital Resources. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

const BackToTopButton: FC<{ isVisible: boolean }> = ({ isVisible }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 bg-fuchsia-600 text-white p-3 rounded-full shadow-lg hover:bg-fuchsia-700 transition-all duration-300 transform z-50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Go to top"
        >
            <ArrowUpIcon className="h-6 w-6" />
        </button>
    );
};

const MusicToggleButton: FC<{ isMuted: boolean; onToggle: () => void }> = ({ isMuted, onToggle }) => (
    <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 bg-fuchsia-600 text-white p-3 rounded-full shadow-lg hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
        {isMuted ? <SoundOffIcon className="h-6 w-6" /> : <SoundOnIcon className="h-6 w-6" />}
    </button>
);


// --- Legal & Bonus Content Modals ---

const Modal: FC<{ title: string; onClose: () => void; children: ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-fuchsia-500/20 w-full max-w-3xl max-h-[90vh] flex flex-col">
      <header className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 id="modal-title" className="text-2xl font-bold text-white">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
          <XIcon className="w-8 h-8" />
        </button>
      </header>
      <div className="p-8 overflow-y-auto text-gray-300 space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const LegalSection: FC<{ title: string, children: ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-semibold text-fuchsia-400 mb-2">{title}</h3>
    <div className="space-y-2 text-gray-400">{children}</div>
  </div>
);

const TermsOfServiceContent: FC = () => (
  <>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <LegalSection title="1. Introduction">
      <p>Welcome to LITZ Digital Resources ("we", "our", "us"). These Terms of Service ("Terms") govern your purchase and use of the Ultimate Reels Bundle and any other products or services offered on this website (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
    </LegalSection>
    <LegalSection title="2. License">
      <p>Upon purchase, we grant you a non-exclusive, worldwide, perpetual license to use the video content ("Content") for personal and commercial purposes. This includes use on social media platforms, websites, and in client projects. Some bonus content may come with resell rights as specified in the product description.</p>
    </LegalSection>
    <LegalSection title="3. Restrictions">
        <p>You are expressly prohibited from:</p>
        <ul className="list-disc pl-6 space-y-1">
            <li>Redistributing or reselling the core video content of the Ultimate Reels Bundle as a standalone product or as part of a similar bundle.</li>
            <li>Claiming ownership of the original, unedited Content.</li>
            <li>Using the Content in any way that is unlawful, defamatory, or harmful.</li>
        </ul>
    </LegalSection>
    <LegalSection title="4. Payment and Refunds">
      <p>All payments are processed through our third-party payment provider, Raket.ph, or via direct GCash transfer as detailed on the website. We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, please contact us for a full refund.</p>
    </LegalSection>
     <LegalSection title="5. Intellectual Property">
      <p>All intellectual property rights for the Service and its original content (excluding the licensed media) are and will remain the exclusive property of LITZ Digital Resources. Our trademarks may not be used in connection with any product or service without prior written consent.</p>
    </LegalSection>
    <LegalSection title="6. Limitation of Liability">
      <p>In no event shall LITZ Digital Resources be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
    </LegalSection>
    <LegalSection title="7. Governing Law">
      <p>These Terms shall be governed and construed in accordance with the laws of the Philippines, without regard to its conflict of law provisions.</p>
    </LegalSection>
    <LegalSection title="8. Changes to Terms">
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>
    </LegalSection>
  </>
);

const PrivacyPolicyContent: FC = () => (
  <>
     <p>Last updated: {new Date().toLocaleDateString()}</p>
    <LegalSection title="1. Introduction">
      <p>LITZ Digital Resources ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website and purchase our products (the "Service").</p>
    </LegalSection>
    <LegalSection title="2. Information We Collect">
      <p>We do not directly collect personal information on this website. All payment transactions are handled by our third-party payment processor, Raket.ph. We encourage you to review their privacy policy. If you opt for direct payment via GCash, we will receive the information you provide (e.g., mobile number, name, screenshot) for the sole purpose of verifying your payment.</p>
    </LegalSection>
    <LegalSection title="3. Use of Information">
      <p>Any information received through direct payment methods is used exclusively to confirm your purchase and provide you with access to the product. We do not use this information for marketing purposes or share it with third parties, except as required by law.</p>
    </LegalSection>
    <LegalSection title="4. Data Security">
      <p>We take reasonable measures to protect the information we receive. However, no electronic transmission or storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>
    </LegalSection>
    <LegalSection title="5. Third-Party Services">
      <p>Our Service may contain links to other sites that are not operated by us (e.g., Raket.ph, social media). If you click on a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
    </LegalSection>
    <LegalSection title="6. Children's Privacy">
      <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
    </LegalSection>
    <LegalSection title="7. Changes to This Privacy Policy">
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </LegalSection>
     <LegalSection title="8. Contact Us">
      <p>If you have any questions about this Privacy Policy, you can contact us via the social media links provided on this website.</p>
    </LegalSection>
  </>
);

const PasscodeModal: FC<{ 
    onClose: () => void; 
    onSubmit: (passcode: string) => void;
    error: string;
}> = ({ onClose, onSubmit, error }) => {
    const [passcode, setPasscode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(passcode);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-sky-500/20 w-full max-w-md relative">
                <header className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Access Bonus Content</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <XIcon className="w-8 h-8" />
                    </button>
                </header>
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="passcode" className="block text-sm font-medium text-gray-300">Enter Passcode</label>
                        <p className="text-xs text-gray-500 mb-2">Hint: Use the email address you used to purchase.</p>
                        <input
                            id="passcode"
                            type="email"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            placeholder="your-email@example.com"
                            required
                        />
                        
                        {error && (
                            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                                <p className="text-sm text-red-400">{error}</p>
                                <a 
                                    href="https://www.raket.ph/litogarin/products/ultimate-reels-bundle-over-100000-viral-ready-videos" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block w-full bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-full hover:bg-fuchsia-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    Get This Bundle Now
                                </a>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Unlock Guides
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Simple markdown to HTML parser
const parseGeneratedContent = (text: string): string => {
    if (!text) return '';

    let html = text
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-bold text-fuchsia-400 mt-8 mb-4">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl sm:text-2xl font-bold text-sky-400 mt-6 mb-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>');
      
    const lines = html.split('\n');
    let inList: 'ul' | 'ol' | null = null;
    let result = '';

    lines.forEach(line => {
        const trimmedLine = line.trim();
        const isUl = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ');
        const isOl = trimmedLine.match(/^\d+\. /);

        if (isUl) {
            if (inList !== 'ul') {
                if (inList) result += `</${inList}>`;
                result += '<ul>';
                inList = 'ul';
            }
            result += `<li>${trimmedLine.substring(2)}</li>`;
        } else if (isOl) {
            if (inList !== 'ol') {
                if (inList) result += `</${inList}>`;
                result += '<ol>';
                inList = 'ol';
            }
            result += `<li>${trimmedLine.replace(/^\d+\. /, '')}</li>`;
        } else {
            if (inList) {
                result += `</${inList}>`;
                inList = null;
            }
            if (line) {
                result += `<p>${line}</p>`;
            }
        }
    });

    if (inList) {
        result += `</${inList}>`;
    }

    return result.replace(/<p><(h[23])>(.*?)<\/\1><\/p>/gim, '<$1>$2</$1>');
};


const BonusGuideContentPage: FC<{ guide: { title: string, description: string }, onClose: () => void }> = ({ guide, onClose }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateContent = async () => {
            try {
                setIsLoading(true);
                setError('');
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const prompt = `
                    You are an expert social media marketing strategist and content creator.
                    Your goal is to provide an in-depth, practical, and easy-to-understand guide for a digital product customer.
                    
                    The guide title is: "${guide.title}"
                    The guide's brief description is: "${guide.description}"

                    Please write a comprehensive guide based on this. The guide should be structured with:
                    1. A catchy introduction explaining the importance of the topic.
                    2. Clear sections with headings (use markdown ## for main headings and ### for subheadings).
                    3. Actionable tips, strategies, and step-by-step instructions.
                    4. Use bullet points (using - or *) for lists.
                    5. Use bold markdown (**text**) for emphasis on key terms.
                    6. Conclude with a summary of key takeaways.

                    The tone should be encouraging, insightful, and professional. Do not include a title at the top, as it's already displayed on the page.
                `;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });
                
                setContent(response.text);

            } catch (err) {
                console.error("Error generating content:", err);
                setError("Sorry, we couldn't generate the guide at this moment. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        generateContent();
    }, [guide]);

    return (
        <div className="fixed inset-0 bg-gray-950 z-[60] p-4 sm:p-6 lg:p-8 overflow-y-auto" role="dialog" aria-modal="true" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="max-w-4xl mx-auto">
                <header className="flex items-start sm:items-center justify-between mb-8 sticky top-0 bg-gray-950/80 backdrop-blur-sm py-4 z-10 -mx-4 -mt-4 px-4 pt-4 sm:mx-0 sm:mt-0 sm:px-0">
                    <div className="flex-1">
                        <p className="text-fuchsia-400 font-bold">BONUS GUIDE</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{guide.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white ml-4 flex-shrink-0" aria-label="Close guide">
                        <XIcon className="w-8 h-8" />
                    </button>
                </header>
                <main className="guide-content text-gray-300">
                    {isLoading && (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-lg">Generating your exclusive guide... This might take a moment.</p>
                        </div>
                    )}
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {!isLoading && !error && (
                        <div dangerouslySetInnerHTML={{ __html: parseGeneratedContent(content) }} />
                    )}
                </main>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .guide-content p { margin-bottom: 1rem; line-height: 1.75; }
                .guide-content ul, .guide-content ol { margin-left: 1.5rem; margin-bottom: 1rem; list-style-position: outside; }
                .guide-content ul { list-style-type: disc; }
                .guide-content ol { list-style-type: decimal; }
                .guide-content li { margin-bottom: 0.5rem; }
                .guide-content strong { color: #f472b6; } /* fuchsia-400 */
            `}</style>
        </div>
    );
};


const BonusGuideCard: FC<{ title: string, description: string, onClick: () => void }> = ({ title, description, onClick }) => (
    <button onClick={onClick} className="block text-left bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-fuchsia-500 hover:scale-105 transition-all duration-300 group w-full">
        <h3 className="text-xl font-bold text-fuchsia-400 group-hover:underline">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
        <span className="mt-4 inline-block text-sky-400 font-semibold">Generate Guide &rarr;</span>
    </button>
);

const MEGA_REELS_BUNDLES = [
  { name: "1. 500+ Animation Explaining motivation video", link: "https://drive.google.com/drive/folders/1gbg6wk-XCnwM00t4nuOAjDNJSpe70U5W?usp=sharing" },
  { name: "2. 500+ Text Overlay motivational videos", link: "https://drive.google.com/drive/folders/17u1o83bDCJRuxH5LKNq4j35jmla7yDZo?usp=sharing" },
  { name: "3. 500+ English Health Reels bundle", link: "https://drive.google.com/drive/folders/1Vv12xDA25XIgf0PtKmlMay5BAtqLYNwF?usp=sharing" },
  { name: "4. 700+ AI (English) Reelsshorts", link: "https://drive.google.com/drive/folders/1YG4DGj__rIhXWeGX9MTwJ_5FJHiiLz9U?usp=sharing" },
  { name: "5. 9K+ Art & Craft Reels Bundle", link: "https://drive.google.com/drive/folders/1Xk99oksWs28r-GNkp14uIxmUaPJksEcQ?usp=sharing" },
  { name: "6. 1000+ Business growth Reels Bundle", link: "https://drive.google.com/drive/folders/13fTLpytkqVivgicZDCunAzl3uV_TcJWe?usp=sharing" },
  { name: "7. 3700+ Canva Editable Post", link: "https://drive.google.com/drive/folders/1rO5i9AVMsofiKSZxxBqQAIhuLo2K-G1X?usp=sharing" },
  { name: "8. 750+ Black word and white background Post", link: "https://drive.google.com/drive/folders/1_c-zRIbxdYgIQuyff3VGI6VBXUm8Qrpp?usp=sharing" },
  { name: "9. 2500+ Mega Car Reels Bundle", link: "https://drive.google.com/drive/folders/1dphzN7AJwsKkTfqS_2F5JoySYphsW_V5?usp=sharing" },
  { name: "10. 2200+ Gym& Fitness Reels Bundle", link: "https://drive.google.com/drive/folders/16OLExpXAhw11_-32ckwZwT1tVfWHv7oz?usp=sharing" },
  { name: "11. 550+ Fitness & Health Infographic Post", link: "https://drive.google.com/drive/folders/1VpOv4_64QIiLuvGYzmGXkfVHtG-PWsfA?usp=sharing" },
  { name: "12. All In One Youtuber Kit", link: "https://drive.google.com/drive/folders/1cbvbpdCPU25b-8ijquaNHl07UNcbD12s?usp=sharing" },
  { name: "13. 1000 Natures Reels Bundle", link: "https://drive.google.com/drive/folders/1acvwWqr4i7yMMFIZhwMQwaKI2zSZbCxS?usp=sharing" },
  { name: "14. 1200+ Space Content Reels Bundle", link: "https://drive.google.com/drive/folders/1fVGzQFRAv260Ku9iYdSpeY2hJIXssjfY?usp=sharing" },
  { name: "15. 200+ Yatch", link: "https://drive.google.com/drive/folders/1GPBzyvuStKNEd8ddtKpw47rwvKhwjBh1?usp=sharing" },
  { name: "16. 600+ Luxury Rich Lifestyle", link: "https://drive.google.com/drive/folders/1ZBShE22Q3mYHRpsPYlZvYTgo1a5KlrwF?usp=sharing" },
  { name: "17. 1000+ Caravan Life", link: "https://drive.google.com/drive/folders/19ec7Kj31aiciQXGA1atotcrDvELqE0LM?usp=sharing" },
  { name: "18. 1000+ Travel Videos", link: "https://drive.google.com/drive/folders/1AmRbEsBweAFg0bMwd5Sys-diDYcrVpGp?usp=sharing" },
  { name: "19. 1300+ Funny Animal Cat", link: "https://drive.google.com/drive/folders/1xXDgRjGwPEkzTBN1QJjAoEHhA_E5VlPk?usp=sharing" },
  { name: "20. 2000+ Luxury Hotels, Resorts", link: "https://drive.google.com/drive/folders/1WkLDs2yqTBKyY8c4d73hwHUvo4pw4xng?usp=sharing" },
  { name: "21. 3000+ Dogs Reels Bundle", link: "https://drive.google.com/drive/folders/1_JhwEZoZYTqvwtQd24F4d7dTfCBZpaWm?usp=sharing" },
  { name: "22. Trading Tips reels bundle", link: "https://drive.google.com/drive/folders/1Ae-gaTKP9BS3GLzNnVVpgNL6Y73HjI-u?usp=sharing" },
];

const HashtagGenerator: FC = () => {
    const [topic, setTopic] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            setError('Please enter a topic.');
            return;
        }

        setIsLoading(true);
        setError('');
        setHashtags('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are a viral social media expert specializing in Instagram Reels and TikTok. Your task is to generate a list of exactly 30 high-reach, trending, and relevant hashtags for a social media reel.

The topic for the reel is: "${topic}"

Please provide hashtags that have millions of views and are currently popular. The list must be ready to copy and paste.

Format the output as a single block of text. Each hashtag must start with '#' and be separated by a comma and a space. Do not include any other text, titles, explanations, or numbering.
`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setHashtags(response.text.trim());

        } catch (err) {
            console.error("Error generating hashtags:", err);
            setError("Sorry, we couldn't generate hashtags at this moment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (hashtags) {
            navigator.clipboard.writeText(hashtags);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20 hover:border-fuchsia-500">
            <div className="text-center">
                <h3 className="text-3xl font-extrabold text-white">
                    Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400">Hashtag Generator</span>
                </h3>
                <p className="mt-2 text-gray-400">Generate 30 high-reach hashtags for your reels in seconds.</p>
            </div>
            <form onSubmit={handleGenerate} className="mt-8 space-y-4">
                <div>
                    <label htmlFor="topic" className="sr-only">Reel Topic</label>
                    <input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="e.g., Fitness Motivation, Travel in Bali..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center bg-gradient-to-r from-fuchsia-600 to-sky-600 text-white font-bold py-3 px-6 rounded-full hover:from-fuchsia-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Generating...</span>
                        </>
                    ) : (
                        '✨ Generate Hashtags'
                    )}
                </button>
            </form>

            {error && <p className="mt-4 text-sm text-center text-red-400">{error}</p>}
            
            {hashtags && (
                <div className="mt-6 relative">
                    <label htmlFor="hashtags-output" className="block text-sm font-medium text-gray-300 mb-2">Your Hashtags:</label>
                    <textarea
                        id="hashtags-output"
                        readOnly
                        value={hashtags}
                        className="w-full h-32 bg-gray-800 border border-gray-600 rounded-md p-3 text-gray-300 resize-none"
                    />
                     <button
                        onClick={handleCopy}
                        className="absolute top-10 right-2 bg-gray-700 hover:bg-fuchsia-600 text-white font-semibold py-1 px-3 rounded-md transition-all text-sm flex items-center gap-1.5"
                    >
                        {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}
        </div>
    );
};


const BonusGuidesPage: FC<{ onGuideClick: (guide: { title: string, description: string }) => void }> = ({ onGuideClick }) => {
    const guides = [
        { title: "The Viral Hook Bible", description: "A complete guide to writing irresistible hooks that stop the scroll and skyrocket your watch time." },
        { title: "Monetization Mastery", description: "Learn 5 proven strategies to turn your faceless content channel into a consistent income stream." },
        { title: "Canva & CapCut Crash Course", description: "Quickly master the art of editing. Add your brand, text, and trending audio in minutes." },
        { title: "Algorithm Secrets 2024", description: "An inside look at what the Instagram and TikTok algorithms are rewarding right now." },
        { title: "The Ultimate Content Calendar", description: "A 30-day plug-and-play content calendar to keep you consistent and growing." },
        { title: "SEO for Social Media", description: "Optimize your captions and profiles to get discovered by your ideal audience." }
    ];

    return (
        <section className="py-20 sm:py-24 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400">Exclusive</span> Bonus Guides
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        Welcome, valued creator! Explore your exclusive bundles and AI-powered guides below.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:items-stretch mb-20">
                    {/* Left Column: Mega Reels List */}
                    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-6 text-center lg:text-left">
                            🔥 Mega Reels Bundles
                        </h3>
                        <div className="max-h-[500px] overflow-y-auto pr-2">
                            <ul className="space-y-3">
                                {MEGA_REELS_BUNDLES.map((bundle, index) => (
                                    <li key={index}>
                                        <a 
                                            href={bundle.link}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-500/10 w-full text-left group"
                                        >
                                            <span className="text-gray-200 group-hover:text-white font-medium">{bundle.name}</span>
                                            <span className="text-fuchsia-400 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">Access &rarr;</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Other Bundles */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 text-center flex flex-col justify-center items-center flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:border-sky-500">
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                                Cloudnine Take All Bundle
                            </h3>
                            <p className="mt-2 text-gray-400">The ultimate collection for every creator.</p>
                            <a 
                                href="https://drive.google.com/file/d/1Cwhi63xTzJ3hjf4OboUBpMbjP9SL97IK/view?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-6 inline-block bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-sky-500/30"
                            >
                                Access Bundle
                            </a>
                        </div>
                        
                        <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-2xl text-center shadow-lg flex flex-col justify-center items-center flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-500">
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-400">Special Access Granted!</h3>
                            <p className="mt-2 mb-6 text-gray-400">As a valued customer, unlock our powerful AI tool.</p>
                            <a 
                                href="https://ai-profit-architect-1017015609395.us-west1.run.app" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:from-sky-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/40"
                            >
                                Explore the AI Profit Architect ✨
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-16 mb-20">
                    <HashtagGenerator />
                </div>
                
                <main className="border-t border-gray-800 pt-16">
                     <div className="text-center">
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                            Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-400">Bonus Guides</span>
                        </h3>
                        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                           Click on any guide below to have our AI generate a detailed, personalized manual just for you.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {guides.map((guide, index) => (
                            <BonusGuideCard 
                                key={index}
                                title={guide.title} 
                                description={guide.description}
                                onClick={() => onGuideClick(guide)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </section>
    );
};


export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');
  const [activeBonusGuide, setActiveBonusGuide] = useState<{ title: string; description: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'bonus'>('home');
  
  const VALID_PASSCODES = ['estalontech@gmail.com', 'litogarin@gmail.com'];

  useScrollAnimation();
  
  const handlePasscodeSubmit = (passcode: string) => {
    if (VALID_PASSCODES.includes(passcode.trim().toLowerCase())) {
        setPasscodeError('');
        setShowPasscodeModal(false);
        setCurrentPage('bonus');
        window.scrollTo(0, 0);
    } else {
        setPasscodeError('Invalid email. Please check for typos or purchase the bundle to gain access.');
    }
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  // This effect runs once on mount to start the music (muted)
  useEffect(() => {
      if (audioRef.current) {
          audioRef.current.volume = 0.3; // Set a pleasant volume
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
              playPromise.catch(error => {
                  console.warn("Audio autoplay was blocked by the browser.", error);
              });
          }
      }
  }, []);

  const toggleMute = () => {
      if (audioRef.current) {
          audioRef.current.muted = !audioRef.current.muted;
          setIsMuted(audioRef.current.muted);
      }
  };


  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (activeModal || showPasscodeModal || activeBonusGuide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModal, showPasscodeModal, activeBonusGuide]);


  return (
    <div className="bg-gray-950 text-white font-sans">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop muted preload="auto" />
      <Header 
        onBonusClick={() => setShowPasscodeModal(true)} 
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
      />
      <main>
        {currentPage === 'home' && (
            <>
                <Hero />
                <ProblemSolver />
                <BundleContents />
                <HowItWorks />
                <Bonuses />
                <Testimonials />
                <FAQ />
                <FinalCallToAction />
                <AboutMe />
            </>
        )}
        {currentPage === 'bonus' && (
            <BonusGuidesPage onGuideClick={(guide) => setActiveBonusGuide(guide)} />
        )}
      </main>
      <Footer setActiveModal={setActiveModal} />
      <BackToTopButton isVisible={showBackToTop} />
      <MusicToggleButton isMuted={isMuted} onToggle={toggleMute} />
      
      {activeModal && (
        <Modal 
          title={activeModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          onClose={() => setActiveModal(null)}
        >
          {activeModal === 'terms' ? <TermsOfServiceContent /> : <PrivacyPolicyContent />}
        </Modal>
      )}

      {showPasscodeModal && (
        <PasscodeModal 
          onClose={() => {
              setShowPasscodeModal(false);
              setPasscodeError(''); // Reset error on close
          }}
          onSubmit={handlePasscodeSubmit}
          error={passcodeError}
        />
      )}

      {activeBonusGuide && (
          <BonusGuideContentPage 
            guide={activeBonusGuide}
            onClose={() => setActiveBonusGuide(null)}
          />
      )}
    </div>
  )
}
