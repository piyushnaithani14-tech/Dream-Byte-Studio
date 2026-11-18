"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

interface PlaneMeshProps {
  pointer: { x: number; y: number };
}

const PlaneMesh: React.FC<PlaneMeshProps> = ({ pointer }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/assets/images/P1095305.webp");

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Tilt responding to pointer
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.25,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4.4, 2.8, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const DisplacementPlane: React.FC = () => {
  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#07070A] shadow-2xl group"
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 4]} intensity={1.5} color="#FFDB59" />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#6080A0" />
        <React.Suspense fallback={null}>
          <PlaneMesh pointer={pointer} />
        </React.Suspense>
      </Canvas>

      {/* Frame Vignette & Viewfinder Telemetry */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent opacity-60" />

      {/* Floating Badge */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-[#07070A]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#FFDB59] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FFDB59] animate-pulse" />
        <span>3D SPATIAL DISPLACEMENT • DEHRADUN FLOOR</span>
      </div>
    </div>
  );
};
