'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { FloatingCube, AnimatedSphere } from './FloatingCube';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bc13fe" />
          
          <FloatingCube />
          <AnimatedSphere />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
