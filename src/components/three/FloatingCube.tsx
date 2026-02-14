'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </Float>
  );
}

export function AnimatedSphere() {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={5}>
      <Sphere args={[1, 64, 64]} position={[2, 1, -2]}>
        <MeshDistortMaterial
          color="#bc13fe"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
}
