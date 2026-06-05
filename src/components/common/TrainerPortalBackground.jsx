import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { useRef } from 'react';

function TrainerOrb({ position, color, speed = 1 }) {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.18 * speed;
    meshRef.current.rotation.y = clock.elapsedTime * 0.28 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.45} floatIntensity={1.3}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} roughness={0.32} metalness={0.55} transparent opacity={0.48} />
      </mesh>
    </Float>
  );
}

export default function TrainerPortalBackground() {
  return (
    <div className="trainer-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }}>
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 4, 5]} intensity={1.2} color="#64ffda" />
        <pointLight position={[-4, -3, 4]} intensity={0.8} color="#7c3aed" />
        <Stars radius={40} depth={18} count={900} factor={3.8} saturation={0} fade speed={0.45} />
        <TrainerOrb position={[-3.2, 1.7, -1.2]} color="#22d3ee" speed={0.9} />
        <TrainerOrb position={[3.4, -1.3, -1.8]} color="#a78bfa" speed={1.2} />
        <TrainerOrb position={[1.1, 2.6, -2.2]} color="#34d399" speed={0.7} />
      </Canvas>
    </div>
  );
}