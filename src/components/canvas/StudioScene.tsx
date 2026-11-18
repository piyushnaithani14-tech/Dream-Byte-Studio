"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

interface StudioSceneProps {
  scrollProgress?: number; // 0 (top) to 1 (dollied into lens)
  pointer: { x: number; y: number };
  themeColor?: string;
  focusTarget?: "camera" | "mic" | "softbox" | "frame";
}

export const StudioScene: React.FC<StudioSceneProps> = ({
  scrollProgress = 0,
  pointer,
  themeColor = "#E5A93C",
  focusTarget = "camera",
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraModelRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);
  const softboxRef = useRef<THREE.Group>(null);
  const micRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { camera } = useThree();

  // Create studio dust motes
  const particleCount = 180;
  const [particlePositions, particleScales] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Cylinder/cone distribution around central beam
      const radius = 0.3 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      scales[i] = Math.random() * 0.05 + 0.02;
    }
    return [positions, scales];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Mouse Parallax on camera and main group
    if (groupRef.current) {
      // Soft lerp rotation towards mouse cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.28,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.18,
        0.05
      );
    }

    // 2. Slow subtle orbital drift of elements around the light beam
    if (softboxRef.current) {
      softboxRef.current.position.y = 1.2 + Math.sin(t * 0.6) * 0.08;
      softboxRef.current.rotation.y = -0.4 + Math.sin(t * 0.4) * 0.04;
    }
    if (micRef.current) {
      micRef.current.position.y = -0.4 + Math.cos(t * 0.7) * 0.07;
      micRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }
    if (frameRef.current) {
      frameRef.current.position.y = 0.5 + Math.sin(t * 0.8) * 0.1;
      frameRef.current.rotation.y = 0.6 + Math.sin(t * 0.3) * 0.08;
    }

    // 3. Volumetric beam breathing
    if (beamRef.current) {
      const beamMat = beamRef.current.material as THREE.MeshBasicMaterial;
      beamMat.opacity = 0.18 + Math.sin(t * 1.5) * 0.04 + scrollProgress * 0.4;
    }

    // 4. Particle drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(t + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Focus Target Offset + Scroll-driven Dolly Zoom
    let baseX = 0;
    let baseY = 0;
    let baseZ = 5.2;

    if (focusTarget === "mic") {
      baseX = -0.85;
      baseY = -0.2;
      baseZ = 4.6;
    } else if (focusTarget === "softbox") {
      baseX = 0.85;
      baseY = 0.55;
      baseZ = 4.7;
    } else if (focusTarget === "frame") {
      baseX = 0.5;
      baseY = 0.25;
      baseZ = 4.8;
    }

    const targetZ = THREE.MathUtils.lerp(baseZ, 0.65, scrollProgress);
    const targetY = THREE.MathUtils.lerp(baseY, 0.05, scrollProgress);
    const targetX = THREE.MathUtils.lerp(baseX, 0.0, scrollProgress);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
  });

  return (
    <group ref={groupRef}>
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.25} />
      {/* Key theme-colored spotlight beam */}
      <spotLight
        position={[0, 4.5, 0]}
        target-position={[0, 0, 0]}
        angle={0.65}
        penumbra={0.8}
        intensity={2.8}
        color={themeColor}
        castShadow
      />
      {/* Soft cool rim/fill light */}
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#6080A0" />
      <directionalLight position={[4, -1, 3]} intensity={0.4} color={themeColor} />

      {/* Central Volumetric Light Cone Beam */}
      <mesh ref={beamRef} position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.6, 5, 32, 1, true]} />
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Floating Dust Motes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={themeColor}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 1. CINEMA CAMERA + LENS RIG (Centerpiece) */}
      <group ref={cameraModelRef} position={[0, 0, 0]}>
        {/* Main Camera Body (Magnesium/carbon chassis) */}
        <mesh position={[0, 0, -0.6]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.9, 1.1]} />
          <meshStandardMaterial
            color="#141518"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Top Handle */}
        <mesh position={[0, 0.65, -0.6]}>
          <boxGeometry args={[0.2, 0.12, 0.9]} />
          <meshStandardMaterial color="#222429" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.52, -0.9]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 16]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.52, -0.3]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 16]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>

        {/* Side Battery Pack & Telemetry Plate */}
        <mesh position={[-0.62, 0, -0.6]}>
          <boxGeometry args={[0.12, 0.7, 0.8]} />
          <meshStandardMaterial color="#0A0B0D" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Tally Recording LED (Red / Amber Glow) */}
        <mesh position={[0.45, 0.35, -0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#FF3B30"
            emissive="#FF2200"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>

        {/* Lens Mount Base Ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.44, 0.15, 36]} />
          <meshStandardMaterial color="#2E3038" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Cinema Prime Lens Barrel */}
        <group ref={lensRef} position={[0, 0, 0.1]}>
          {/* Main Barrel */}
          <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.4, 0.5, 36]} />
            <meshStandardMaterial color="#111215" roughness={0.35} metalness={0.6} />
          </mesh>

          {/* Golden Aperture Accent Ring (Sampled Accent #FFDB59) */}
          <mesh position={[0, 0, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.395, 0.395, 0.05, 36]} />
            <meshStandardMaterial
              color="#FFDB59"
              metalness={0.95}
              roughness={0.15}
              emissive="#FFDB59"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Focus Ring Ribs */}
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.405, 0.405, 0.12, 36]} />
            <meshStandardMaterial color="#1B1C22" roughness={0.7} metalness={0.3} />
          </mesh>

          {/* Front Optical Element Collar */}
          <mesh position={[0, 0, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.44, 0.4, 0.12, 36]} />
            <meshStandardMaterial color="#18191E" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Curved Front Glass Lens Element (Target of Dolly Zoom) */}
          <mesh position={[0, 0, 0.62]}>
            <sphereGeometry args={[0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
            <meshPhysicalMaterial
              color="#DCE6F2"
              roughness={0.05}
              metalness={0.1}
              transmission={0.92}
              thickness={0.4}
              ior={1.52}
              reflectivity={0.9}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>

          {/* Inner Glowing Aperture Blades & Sensor Core */}
          <mesh position={[0, 0, 0.3]}>
            <circleGeometry args={[0.18, 24]} />
            <meshBasicMaterial
              color="#FFDB59"
              toneMapped={false}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Rectangular Cinema Matte Box with Barn Doors */}
          <group position={[0, 0, 0.72]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.46, 0.14, 4]} />
              <meshStandardMaterial
                color="#0D0E11"
                roughness={0.5}
                metalness={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Top Eyebrow Flag */}
            <mesh position={[0, 0.48, 0.08]} rotation={[-0.35, 0, 0]}>
              <boxGeometry args={[0.9, 0.3, 0.02]} />
              <meshStandardMaterial color="#111215" roughness={0.6} />
            </mesh>
            {/* Side Barn Door Left */}
            <mesh position={[-0.52, 0, 0.08]} rotation={[0, 0.4, 0]}>
              <boxGeometry args={[0.26, 0.7, 0.02]} />
              <meshStandardMaterial color="#111215" roughness={0.6} />
            </mesh>
            {/* Side Barn Door Right */}
            <mesh position={[0.52, 0, 0.08]} rotation={[0, -0.4, 0]}>
              <boxGeometry args={[0.26, 0.7, 0.02]} />
              <meshStandardMaterial color="#111215" roughness={0.6} />
            </mesh>
          </group>
        </group>
      </group>

      {/* 2. STUDIO SOFTBOX LIGHT (Left Side) */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={softboxRef} position={[-2.4, 1.2, -0.6]} rotation={[0.2, 0.7, 0]}>
          {/* Softbox Hood */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.25, 0.8, 8]} />
            <meshStandardMaterial color="#101114" roughness={0.8} metalness={0.1} />
          </mesh>
          {/* Glowing Front Diffuser Fabric */}
          <mesh position={[0, 0, 0.42]}>
            <circleGeometry args={[0.68, 8]} />
            <meshStandardMaterial
              color="#FFF9E6"
              emissive="#FFDB59"
              emissiveIntensity={1.4}
              roughness={0.3}
            />
          </mesh>
          {/* Honeycomb Grid Overlay */}
          <mesh position={[0, 0, 0.43]}>
            <ringGeometry args={[0.2, 0.67, 8]} />
            <meshBasicMaterial color="#07070A" wireframe transparent opacity={0.6} />
          </mesh>
          {/* C-Stand Joint */}
          <mesh position={[0, -0.4, -0.3]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Vertical Pole */}
          <mesh position={[0, -1.8, -0.3]}>
            <cylinderGeometry args={[0.03, 0.03, 2.8, 16]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* 3. PODCAST BROADCAST MICROPHONE ON SCISSOR ARM (Right Side) */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <group ref={micRef} position={[2.2, -0.3, -0.2]} rotation={[-0.1, -0.6, 0.15]}>
          {/* Mic Capsule Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.45, 24]} />
            <meshStandardMaterial color="#1A1B20" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Golden Ring Accent on Mic */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.135, 0.135, 0.03, 24]} />
            <meshStandardMaterial color="#FFDB59" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Mesh Grill Dome */}
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.125, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#3A3C45" roughness={0.5} metalness={0.8} wireframe />
          </mesh>
          {/* Shockmount Cradle Ring */}
          <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.015, 12, 32]} />
            <meshStandardMaterial color="#FFDB59" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Scissor Boom Arm Segment */}
          <mesh position={[0.25, -0.35, 0]} rotation={[0, 0, -0.8]}>
            <boxGeometry args={[0.03, 0.7, 0.03]} />
            <meshStandardMaterial color="#2B2D35" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[0.3, -0.35, 0]} rotation={[0, 0, -0.8]}>
            <boxGeometry args={[0.03, 0.7, 0.03]} />
            <meshStandardMaterial color="#2B2D35" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>
      </Float>

      {/* 4. FLOATING PHOTO / FILM FRAME (Upper Right Orbit) */}
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.6}>
        <group ref={frameRef} position={[1.8, 1.6, -1.2]} rotation={[0.1, 0.5, -0.1]}>
          {/* Minimalist Floating Matte Frame */}
          <mesh>
            <boxGeometry args={[1.2, 0.85, 0.03]} />
            <meshStandardMaterial
              color="#0A0B0E"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Frame Inner Glass Slide catching highlights */}
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.08, 0.73]} />
            <meshPhysicalMaterial
              color="#FFF0D4"
              roughness={0.1}
              metalness={0.2}
              transmission={0.6}
              transparent
              opacity={0.35}
            />
          </mesh>
          {/* Golden Corner Crop Brackets */}
          {[
            [-0.5, 0.33],
            [0.5, 0.33],
            [-0.5, -0.33],
            [0.5, -0.33],
          ].map(([x, y], idx) => (
            <mesh key={idx} position={[x, y, 0.025]}>
              <boxGeometry args={[0.08, 0.08, 0.01]} />
              <meshBasicMaterial color="#FFDB59" />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};
