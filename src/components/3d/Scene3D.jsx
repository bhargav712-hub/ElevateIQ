import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars, Box, Torus } from '@react-three/drei';

/* ─────────────────────────────────────────────
   NEURAL NETWORK CANVAS BACKGROUND
   Pure canvas-based animated background:
   · Drifting particle nodes
   · Connection lines with distance-based opacity
   · Pulsing concentric ripple rings
   · Faint animated hex-grid overlay
──────────────────────────────────────────────*/
function NeuralNetworkCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Resize ──────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Particle config ───────────────────
    const COUNT  = 90;
    const MAX_DIST = 160;
    const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#06b6d4', '#0ea5e9'];

    const particles = Array.from({ length: COUNT }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.45,
      vy:  (Math.random() - 0.5) * 0.45,
      r:   1.5 + Math.random() * 2.5,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
      glow: Math.random() > 0.7,
    }));

    // ── Ripple rings ─────────────────────
    const RINGS = 4;
    const rings = Array.from({ length: RINGS }, (_, i) => ({
      cx: 0, cy: 0,
      radius: 0,
      maxR: 260 + i * 80,
      speed: 0.6 + i * 0.3,
      alpha: 0,
      delay: i * 65,
      tick: -(i * 65),
    }));

    // ── HEX grid helper ──────────────────
    const drawHexGrid = (tick) => {
      const S = 52; // hex "size" (centre-to-vertex)
      const HW = S * Math.sqrt(3);
      const HH = S * 2;
      const rows = Math.ceil(canvas.height / (HH * 0.75)) + 2;
      const cols = Math.ceil(canvas.width  / HW) + 2;
      ctx.save();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.07)';
      ctx.lineWidth = 0.8;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const ox = col * HW + (row % 2 === 0 ? HW / 2 : 0);
          const oy = row * HH * 0.75;
          const pulse = 0.07 + 0.04 * Math.sin(tick * 0.012 + col * 0.3 + row * 0.4);
          ctx.strokeStyle = `rgba(37,99,235,${pulse.toFixed(3)})`;
          ctx.beginPath();
          for (let v = 0; v < 6; v++) {
            const angle = (Math.PI / 3) * v - Math.PI / 6;
            const px = ox + S * Math.cos(angle);
            const py = oy + S * Math.sin(angle);
            v === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // ── Main draw loop ────────────────────
    let tick = 0;
    const draw = () => {
      tick++;
      const W = canvas.width;
      const H = canvas.height;

      // Dark gradient background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#0a0f1e');
      bg.addColorStop(0.5, '#0d1b2e');
      bg.addColorStop(1,   '#0a1628');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Hex grid
      drawHexGrid(tick);

      // Glowing radial spotlight
      const spotlight = ctx.createRadialGradient(W * 0.6, H * 0.35, 0, W * 0.6, H * 0.35, W * 0.55);
      spotlight.addColorStop(0,   'rgba(37, 99, 235, 0.10)');
      spotlight.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      spotlight.addColorStop(1,   'transparent');
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, W, H);

      // ── Particles ────────────────────
      // Move
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      // Connection lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.5;
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, `rgba(37,99,235,${alpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(6,182,212,${alpha.toFixed(3)})`);
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particle dots
      for (const p of particles) {
        if (p.glow) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          grd.addColorStop(0, p.col.replace(')', ', 0.6)').replace('rgb', 'rgba'));
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.fill();
      }

      // ── Ripple rings ──────────────────
      const cx = W * 0.62;
      const cy = H * 0.38;
      for (const ring of rings) {
        ring.tick++;
        if (ring.tick < 0) continue;
        const progress = (ring.tick * ring.speed) % ring.maxR;
        ring.radius = progress;
        ring.alpha  = Math.max(0, 1 - progress / ring.maxR) * 0.35;

        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${ring.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner bright ring
        if (ring.radius > 10) {
          ctx.beginPath();
          ctx.arc(cx, cy, ring.radius * 0.85, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${(ring.alpha * 0.5).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // ── Animated data streams (diagonal dashes) ──
      const streamCount = 5;
      for (let s = 0; s < streamCount; s++) {
        const startX = (((tick * 0.4 + s * (W / streamCount)) % (W + 200)) - 100);
        const startY = 0;
        const endX   = startX + H * 0.7;
        const endY   = H;
        const streamAlpha = 0.06 + 0.04 * Math.sin(tick * 0.05 + s);
        const streamGrad  = ctx.createLinearGradient(startX, startY, endX, endY);
        streamGrad.addColorStop(0, `rgba(6,182,212,0)`);
        streamGrad.addColorStop(0.4, `rgba(6,182,212,${streamAlpha.toFixed(3)})`);
        streamGrad.addColorStop(1, `rgba(37,99,235,0)`);
        ctx.beginPath();
        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = 1;
        ctx.setLineDash([12, 18]);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   HERO SCENE  (replaces old Canvas-based one)
──────────────────────────────────────────────*/
export function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <NeuralNetworkCanvas />
      {/* Floating glowing orbs via CSS – lightweight */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '15%', right: '8%',
          width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          animation: 'heroOrb1 8s ease-in-out infinite',
          filter: 'blur(2px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '20%',
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
          animation: 'heroOrb2 11s ease-in-out infinite',
          filter: 'blur(1px)',
        }} />
        <div style={{
          position: 'absolute', top: '55%', left: '5%',
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)',
          animation: 'heroOrb3 14s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes heroOrb1 {
          0%,100% { transform: translate(0,0) scale(1); opacity: 0.8; }
          33%      { transform: translate(-20px, 20px) scale(1.05); opacity: 1; }
          66%      { transform: translate(15px, -15px) scale(0.95); opacity: 0.7; }
        }
        @keyframes heroOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px, -20px) scale(1.1); }
        }
        @keyframes heroOrb3 {
          0%,100% { transform: translate(0,0); opacity: 0.6; }
          50%      { transform: translate(20px, -30px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D TILT CARD
──────────────────────────────────────────────*/
export function ThreeDCard({ children, className = '', style = {} }) {
  const ref = useRef();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setRotate({ x: -y * 12, y: x * 12 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.12s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SITE-WIDE PARTICLE BACKGROUND (SceneBackground)
──────────────────────────────────────────────*/
function FloatingOrb({ position, color, size, speed }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed) * 0.3;
    ref.current.rotation.x += 0.005 * speed;
    ref.current.rotation.y += 0.01  * speed;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.2} opacity={0.7} transparent />
    </mesh>
  );
}

function FloatingParticle({ position, speed, color, index }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y += Math.sin(clock.elapsedTime * speed + index) * 0.002;
    ref.current.position.x += Math.cos(clock.elapsedTime * speed * 0.5 + index) * 0.002;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 60 }, () => ({
    position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10],
    speed:    0.2 + Math.random() * 0.5,
    color:    ['#2563eb', '#06b6d4', '#60a5fa', '#3b82f6'][Math.floor(Math.random() * 4)],
  }));
  return (
    <>
      {particles.map((p, i) => <FloatingParticle key={i} {...p} index={i} />)}
    </>
  );
}

export function SceneBackground({ children }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.3, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
          <Stars radius={30} depth={50} count={200} factor={4} saturation={0.5} fade speed={1} />
        </Canvas>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD SCENE
──────────────────────────────────────────────*/
function AnimatedShape({ type, position, color, size, wireframe = false }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.008;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + position[0]) * 0.2;
  });
  const geom = type === 'torus'
    ? <torusGeometry args={[size, size * 0.15, 16, 48]} />
    : type === 'box'
    ? <boxGeometry args={[size, size, size]} />
    : <icosahedronGeometry args={[size, 0]} />;
  return (
    <mesh ref={ref} position={position}>
      {geom}
      <MeshDistortMaterial
        color={color} speed={2} distort={0.2}
        opacity={wireframe ? 0.4 : 0.7} transparent wireframe={wireframe}
      />
    </mesh>
  );
}

export function DashboardScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} />
        <AnimatedShape type="torus"       position={[-2.5,  0.5, -2]} color="#2563eb" size={0.7} />
        <AnimatedShape type="box"         position={[ 2.5, -0.8, -1.5]} color="#06b6d4" size={0.4} wireframe />
        <AnimatedShape type="icosahedron" position={[ 0,    1.5, -3]} color="#60a5fa" size={0.5} />
        <AnimatedShape type="torus"       position={[-1,   -1.5, -2]} color="#3b82f6" size={0.5} wireframe />
        <Stars radius={15} depth={30} count={80} factor={3} saturation={0.5} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
