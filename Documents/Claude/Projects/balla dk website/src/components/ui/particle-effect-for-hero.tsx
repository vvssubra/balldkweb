"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { MousePointer2, ArrowRight, Compass, ListChecks, Footprints } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useScorecard } from '@/components/scorecard/ScorecardProvider';

const HERO_POINTS = [
  { icon: Compass, label: 'Understand your financial position' },
  { icon: ListChecks, label: 'Get a clear direction' },
  { icon: Footprints, label: 'Take the next step with confidence' },
] as const;

// --- Types ---

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number; // For some organic oscillation
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// --- Brand Palette (Balla DK R.I.S.E.) ---
// Primary: deep navy / near-black + white. Accent: warm premium gold.
const COLOR_GOLD = '#D4AF37';
const COLOR_WHITE = '#FFFFFF';

// --- Configuration Constants ---

const PARTICLE_DENSITY = 0.00015; // Particles per pixel squared (adjust for density)
const BG_PARTICLE_DENSITY = 0.00005; // Less dense for background
const MOUSE_RADIUS = 180; // Radius of mouse influence
const RETURN_SPEED = 0.08; // How fast particles fly back to origin (spring constant)
const DAMPING = 0.90; // Friction (velocity decay)
const REPULSION_STRENGTH = 1.2; // Multiplier for mouse push force

// --- Helper Functions ---

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Components ---

export const AntiGravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable state refs to avoid re-renders during animation loop
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Initialize Particles
  const initParticles = useCallback((width: number, height: number) => {
    // 1. Main Interactive Particles
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      newParticles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1, 2.5),
        color: Math.random() > 0.9 ? COLOR_GOLD : COLOR_WHITE,
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = newParticles;

    // 2. Background Ambient Particles (Stars/Dust)
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const newBgParticles: BackgroundParticle[] = [];

    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Very slow drift
        vy: (Math.random() - 0.5) * 0.2,
        size: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2, // For twinkling offset
      });
    }
    backgroundParticlesRef.current = newBgParticles;
  }, []);

  // Animation Loop
  const animateRef = useRef<(time: number) => void>(() => {});

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    lastTimeRef.current = time;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Background Effects ---

    // 1. Pulsating Radial Glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulseSpeed = 0.0008;
    // Oscillates between 0.05 and 0.12 opacity
    const pulseOpacity = Math.sin(time * pulseSpeed) * 0.035 + 0.085;

    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(canvas.width, canvas.height) * 0.7
    );
    gradient.addColorStop(0, `rgba(212, 175, 55, ${pulseOpacity})`); // Faint gold
    gradient.addColorStop(1, 'rgba(10, 14, 26, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Background Particles (Drifting Stars)
    const bgParticles = backgroundParticlesRef.current;
    ctx.fillStyle = COLOR_WHITE;

    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Twinkle effect
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5; // 0 to 1
      const currentAlpha = p.alpha * (0.3 + 0.7 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0; // Reset alpha for foreground

    // --- Main Foreground Physics ---

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Phase 1: Apply Forces (Mouse & Spring)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // 1. Calculate Distance to Mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 2. Mouse Repulsion Force
      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;

        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * 5;
        p.vy -= forceDirectionY * repulsion * 5;
      }

      // 3. Spring Force (Return to Origin)
      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;

      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;
    }

    // Phase 2: Resolve Collisions
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);

          if (dist > 0.01) {
            // Avoid division by zero
            const nx = dx / dist; // Normal X
            const ny = dy / dist; // Normal Y

            // Static Resolution: Push particles apart so they don't overlap
            const overlap = minDist - dist;
            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            p1.x -= pushX;
            p1.y -= pushY;
            p2.x += pushX;
            p2.y += pushY;

            // Dynamic Resolution: Elastic Collision
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;

            const velocityAlongNormal = dvx * nx + dvy * ny;

            // Only bounce if they are moving towards each other
            if (velocityAlongNormal > 0) {
              const m1 = p1.size; // Use size as mass proxy
              const m2 = p2.size;
              const restitution = 0.85; // Bounciness (1 is perfectly elastic)

              const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1 / m1 + 1 / m2);

              const impulseX = impulseMagnitude * nx;
              const impulseY = impulseMagnitude * ny;

              p1.vx += impulseX / m1;
              p1.vy += impulseY / m1;
              p2.vx -= impulseX / m2;
              p2.vy -= impulseY / m2;
            }
          }
        }
      }
    }

    // Phase 3: Integration & Drawing
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physics Update
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      // Drawing
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + velocity * 0.1, 1);

      ctx.fillStyle =
        p.color === COLOR_WHITE ? `rgba(255, 255, 255, ${opacity})` : `rgba(212, 175, 55, ${opacity})`;

      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame((t) => animateRef.current(t));
  }, []);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Set actual size in memory (scaled to account for extra pixel density)
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;

        // Make it visible size
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        // Normalize coordinate system to use CSS pixels
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        // Re-init particles for new dimensions
        initParticles(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Start Animation. Only runs while the canvas is on screen so several instances
  // on one page do not each burn a frame loop.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frameIdRef.current);
      if (entry.isIntersecting) {
        frameIdRef.current = requestAnimationFrame(animate);
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [animate]);

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-navy cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

const HeroContent: React.FC = () => {
  const { open } = useScorecard();

  return (
    <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-20 pointer-events-none">
      <div className="max-w-4xl w-full text-center space-y-8 pointer-events-auto">
        <div className="flex justify-center">
          <Image
            src="/images/balla-dk-hero.jpg"
            alt="Portrait of Balla DK, Malaysian financial mentor and agency leader"
            width={140}
            height={140}
            priority
            className="size-28 rounded-full border-2 border-gold/60 object-cover object-top transition-all duration-300 hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] sm:size-36"
          />
        </div>

        <div className="inline-block">
          <span className="py-1 px-3 border border-gold/30 rounded-full text-xs font-mono text-gold tracking-widest uppercase bg-gold/5 backdrop-blur-sm">
            Financial Mentor &amp; Advisor
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
          Know Where You Stand.
          <br />
          <span className="text-gold">Know Where to Go Next.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed">
          I help you understand your financial position through the R.I.S.E. framework, then find
          the right next step for your goals.
        </p>

        <ul className="flex flex-col items-center justify-center gap-3 text-sm text-white/70 sm:flex-row sm:gap-8">
          {HERO_POINTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="size-4 text-gold" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative rounded-full p-[2px] overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
            <span
              aria-hidden="true"
              className="cta-trail-ring absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_260deg,rgba(255,255,255,0.9)_300deg,var(--gold)_330deg,transparent_360deg)]"
            />
            <button
              type="button"
              onClick={() => open()}
              className="group relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-gold text-navy rounded-full font-bold tracking-wide transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <span className="relative z-10">Take the R.I.S.E. Scorecard</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium tracking-wide transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
          >
            Explore the Agency Opportunity
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="text-sm text-white/40">Free · 3 minutes · Personalised result</p>
      </div>
    </div>
  );
};

// --- Main Hero Component ---

export default function ParticleEffectHero() {
  return (
    <div id="top" className="relative w-full min-h-dvh bg-navy overflow-hidden selection:bg-gold selection:text-navy">
      <AntiGravityCanvas />
      <HeroContent />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none motion-safe:animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <MousePointer2 size={16} />
      </div>
    </div>
  );
}
