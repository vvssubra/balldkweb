"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { MousePointer2, ArrowRight, Compass, ListChecks, Footprints } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useScorecard } from '@/components/scorecard/ScorecardProvider';
import { HOME_HERO, type HeroPointIcon } from '@/lib/site-content';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const HERO_POINT_ICONS: Record<HeroPointIcon, IconComponent> = {
  position: ListChecks,
  direction: Compass,
  action: Footprints,
};

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

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number; // 0 → 1
  decay: number;
  gold: boolean;
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
const STAR_SPAWN_CHANCE = 0.012; // Per frame; roughly one meteor every 1.5s at 60fps
const STAR_MAX_ACTIVE = 3;

// --- Helper Functions ---

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Components ---

interface AntiGravityCanvasProps {
  /** Spawn occasional meteors streaking across the field. */
  shootingStars?: boolean;
}

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({ shootingStars = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable state refs to avoid re-renders during animation loop
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const starsRef = useRef<ShootingStar[]>([]);
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

    // 3. Shooting Stars (optional). Enter from the top-left half, streak down-right, fade out.
    if (shootingStars) {
      const stars = starsRef.current;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      if (stars.length < STAR_MAX_ACTIVE && Math.random() < STAR_SPAWN_CHANCE) {
        const speed = randomRange(9, 15);
        const angle = randomRange(Math.PI * 0.12, Math.PI * 0.22); // shallow diagonal
        stars.push({
          x: randomRange(-w * 0.1, w * 0.6),
          y: randomRange(-40, h * 0.35),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: randomRange(120, 220),
          life: 0,
          decay: randomRange(0.012, 0.02),
          gold: Math.random() > 0.6,
        });
      }

      ctx.lineCap = 'round';
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life += s.decay;

        if (s.life >= 1 || s.x > w + s.length || s.y > h + s.length) {
          stars.splice(i, 1);
          continue;
        }

        // Bright early, fading out over the second half of life
        const alpha = s.life < 0.5 ? 1 : 1 - (s.life - 0.5) * 2;
        const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tailX = s.x - (s.vx / mag) * s.length;
        const tailY = s.y - (s.vy / mag) * s.length;

        const head = s.gold ? `rgba(212, 175, 55, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, head);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head glow
        ctx.fillStyle = head;
        ctx.shadowColor = head;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

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
  }, [shootingStars]);

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
    <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-auto grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Portrait. Circular crop on mobile so the copy stays above the fold, full
            framed portrait from lg where there is room for it beside the text. */}
        <div className="relative order-first mx-auto w-full max-w-[7rem] sm:max-w-[9rem] lg:order-last lg:max-w-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 hidden rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(212,175,55,0.22),transparent_70%)] blur-2xl lg:block"
          />
          <div className="relative aspect-square overflow-hidden rounded-full border-2 border-gold/60 transition-colors duration-300 hover:border-gold lg:aspect-[4/5] lg:rounded-[2rem] lg:border lg:border-white/10 lg:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
            <Image
              src="/images/balla-dk-hero.jpg"
              alt={HOME_HERO.portraitAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 9rem"
              className="object-cover object-top lg:object-[50%_32%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-navy via-navy/50 to-transparent lg:block"
            />
          </div>
        </div>

        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-block">
            <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold backdrop-blur-sm">
              {HOME_HERO.eyebrow}
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tighter text-white sm:text-5xl lg:text-[3rem] xl:text-[3.35rem]">
            {HOME_HERO.headline}
            <br />
            <span className="text-gold">{HOME_HERO.headlineAccent}</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-white/60 lg:mx-0">
            {HOME_HERO.subheadline}
          </p>

          <ul className="mx-auto grid max-w-xs gap-2.5 text-sm text-white/70 sm:max-w-none sm:grid-cols-3 sm:gap-4">
            {HOME_HERO.points.map(({ icon, label }) => {
              const Icon = HERO_POINT_ICONS[icon];
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 text-left sm:flex-col sm:items-center sm:gap-2 sm:text-center lg:items-start lg:text-left"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 sm:size-9">
                    <Icon className="size-4 text-gold" aria-hidden="true" />
                  </span>
                  <span className="leading-snug">{label}</span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-full p-[2px] transition-transform duration-300 hover:scale-105 active:scale-95">
              <span
                aria-hidden="true"
                className="cta-trail-ring absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_260deg,rgba(255,255,255,0.9)_300deg,var(--gold)_330deg,transparent_360deg)]"
              />
              <button
                type="button"
                onClick={() => open()}
                className="group relative z-10 inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gold px-7 py-4 font-bold tracking-wide text-navy transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                <span className="relative z-10">{HOME_HERO.primaryCta}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <Link
              href={HOME_HERO.secondaryHref}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-7 py-4 font-medium tracking-wide text-white transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
            >
              {HOME_HERO.secondaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-sm text-white/40">{HOME_HERO.note}</p>
        </div>
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
