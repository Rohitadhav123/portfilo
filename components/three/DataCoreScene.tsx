"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function DataCoreScene({ isMobile = false }: { isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const shellMeshRef = useRef<THREE.Mesh>(null);
  const torusXRef = useRef<THREE.Mesh>(null);
  const torusYRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Ambient Star Particles
  const particleCount = isMobile ? 100 : 300;
  const particlesPosition = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [particleCount]);

  // Orbiting Node Connectors
  const nodeCount = isMobile ? 8 : 16;
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4 + Math.sin(i * 1.5) * 0.4;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(i * 0.8) * 0.8,
        z: Math.sin(angle) * radius,
        size: 0.05 + (i % 3) * 0.02,
        color: i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#8B5CF6" : "#EC4899",
      };
    });
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth Core Rotation
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.08;

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y -= delta * 0.3;
    }

    if (shellMeshRef.current) {
      shellMeshRef.current.rotation.y += delta * 0.2;
      shellMeshRef.current.rotation.z += delta * 0.1;
    }

    if (torusXRef.current) {
      torusXRef.current.rotation.x += delta * 0.4;
      torusXRef.current.rotation.y += delta * 0.2;
    }

    if (torusYRef.current) {
      torusYRef.current.rotation.y -= delta * 0.5;
      torusYRef.current.rotation.z += delta * 0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
    }

    // Mouse Physics Lerp
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.45,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.45,
      0.05
    );
  });

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 6, 6]} intensity={1.5} color="#22D3EE" />
      <pointLight position={[-6, -6, -6]} intensity={2.5} color="#8B5CF6" />
      <pointLight position={[4, -4, 4]} intensity={2} color="#EC4899" />

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
        <group ref={groupRef}>
          {/* Inner Metallic Core Sphere */}
          <mesh ref={coreMeshRef}>
            <icosahedronGeometry args={[1.15, 2]} />
            <meshStandardMaterial
              color="#0E0E14"
              roughness={0.12}
              metalness={0.95}
              emissive="#8B5CF6"
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Outer Glass Wireframe Shell */}
          <mesh ref={shellMeshRef}>
            <icosahedronGeometry args={[1.85, 1]} />
            <meshStandardMaterial
              color="#22D3EE"
              wireframe={true}
              transparent={true}
              opacity={0.4}
              emissive="#22D3EE"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Orbiting Ring Torus 1 */}
          <mesh ref={torusXRef}>
            <torusGeometry args={[2.2, 0.015, 16, 100]} />
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={1}
            />
          </mesh>

          {/* Orbiting Ring Torus 2 */}
          <mesh ref={torusYRef}>
            <torusGeometry args={[2.6, 0.012, 16, 100]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={1}
            />
          </mesh>

          {/* Floating Nodes */}
          {nodes.map((node, i) => (
            <mesh key={i} position={[node.x, node.y, node.z]}>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#8B5CF6"
          transparent={true}
          opacity={0.7}
          sizeAttenuation={true}
        />
      </points>
    </>
  );
}
