"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShapes() {
    const meshRef = useRef<THREE.Mesh>(null);
    const meshRef2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
        if (meshRef2.current) {
            meshRef2.current.rotation.x = state.clock.getElapsedTime() * -0.15;
            meshRef2.current.rotation.y = state.clock.getElapsedTime() * -0.2;
        }
    });

    return (
        <>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[-3, 1, -5]}>
                    <MeshDistortMaterial
                        color="#7c3aed"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        envMapIntensity={1}
                    />
                </Sphere>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
                <Sphere ref={meshRef2} args={[1, 64, 64]} position={[3, -2, -3]}>
                    <MeshDistortMaterial
                        color="#c084fc"
                        attach="material"
                        distort={0.6}
                        speed={3}
                        roughness={0.1}
                        metalness={0.5}
                        envMapIntensity={1}
                    />
                </Sphere>
            </Float>
        </>
    );
}

function FloatingCards() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
            groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    const material = useMemo(
        () => new THREE.MeshPhysicalMaterial({
            color: 0x111111,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transmission: 0.5,
            thickness: 1,
        }),
        []
    );

    return (
        <group ref={groupRef} position={[4, 1, -2]} rotation={[0, -0.3, 0.1]}>
            <mesh material={material}>
                <boxGeometry args={[2.5, 3.5, 0.1]} />
            </mesh>
            {/* Skeleton lines for the resume card */}
            <mesh material={material} position={[0, 1, 0.06]}>
                <boxGeometry args={[1.8, 0.2, 0.02]} />
            </mesh>
            <mesh material={material} position={[-0.2, 0.5, 0.06]}>
                <boxGeometry args={[1.4, 0.1, 0.02]} />
            </mesh>
            <mesh material={material} position={[-0.2, 0.2, 0.06]}>
                <boxGeometry args={[1.4, 0.1, 0.02]} />
            </mesh>
            <mesh material={material} position={[0, -0.2, 0.06]}>
                <boxGeometry args={[1.8, 0.4, 0.02]} />
            </mesh>
            <mesh material={material} position={[0, -0.8, 0.06]}>
                <boxGeometry args={[1.8, 0.4, 0.02]} />
            </mesh>
        </group>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#c084fc" />

                <AnimatedShapes />
                <FloatingCards />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
