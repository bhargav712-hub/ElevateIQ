import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars, Box, Torus } from '@react-three/drei';

function FloatingOrb({ position, color, size, speed }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed) * 0.3;
    ref.current.rotation.x += 0.005 * speed;
    ref.current.rotation.y += 0.01 * speed;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.2} opacity={0.8} transparent />
    </mesh>
  );
}

function FloatingRing({ position, color, size }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.01;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[size, size * 0.1, 16, 48]} />
      <MeshDistortMaterial color={color} speed={1.5} distort={0.1} opacity={0.6} transparent wireframe />
    </mesh>
  );
}

function FloatingCube({ position, color, size }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7) * 0.25;
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <MeshDistortMaterial color={color} speed={1.5} distort={0.15} opacity={0.5} transparent wireframe />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingOrb position={[-2, 0, 0]} color="#6c5ce7" size={0.6} speed={0.8} />
        <FloatingOrb position={[2.5, -0.5, -1]} color="#00cec9" size={0.5} speed={1} />
        <FloatingOrb position={[0, 1.5, -1.5]} color="#fd79a8" size={0.4} speed={1.2} />
        <FloatingRing position={[-1.5, -1, -1.5]} color="#6c5ce7" size={0.8} />
        <FloatingRing position={[1.8, 1, -2]} color="#00cec9" size={0.6} />
        <FloatingCube position={[0, -1.2, -0.5]} color="#a29bfe" size={0.3} />
        <Stars radius={20} depth={40} count={100} factor={3} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

function ParticleField() {
  const ref = useRef();
  const particles = Array.from({ length: 50 }, () => ({
    position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10],
    speed: 0.2 + Math.random() * 0.5,
    color: ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe'][Math.floor(Math.random() * 4)],
  }));
  return (
    <>
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} index={i} />
      ))}
    </>
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

export function SceneBackground({ children }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.3, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
          <Stars radius={30} depth={50} count={200} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      {children}
    </div>
  );
}

export function ThreeDCard({ children, className = '', style = {} }) {
  const ref = useRef();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 10, y: x * 10 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedShape({ type, position, color, size, wireframe = false }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.008;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + position[0]) * 0.2;
  });
  const geom = type === 'torus' ? <torusGeometry args={[size, size * 0.15, 16, 48]} /> :
    type === 'box' ? <boxGeometry args={[size, size, size]} /> :
      <icosahedronGeometry args={[size, 0]} />;
  return (
    <mesh ref={ref} position={position}>
      {geom}
      <MeshDistortMaterial color={color} speed={2} distort={0.2} opacity={wireframe ? 0.4 : 0.7} transparent wireframe={wireframe} />
    </mesh>
  );
}

export function DashboardScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} />
        <AnimatedShape type="torus" position={[-2.5, 0.5, -2]} color="#6c5ce7" size={0.7} />
        <AnimatedShape type="box" position={[2.5, -0.8, -1.5]} color="#00cec9" size={0.4} wireframe />
        <AnimatedShape type="icosahedron" position={[0, 1.5, -3]} color="#fd79a8" size={0.5} />
        <AnimatedShape type="torus" position={[-1, -1.5, -2]} color="#a29bfe" size={0.5} wireframe />
        <Stars radius={15} depth={30} count={80} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
