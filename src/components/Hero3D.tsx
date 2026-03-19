import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Knot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollT = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollT.current = window.scrollY / max;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const m = meshRef.current;
    if (!m) return;
    const base = 0.25;
    const scrollInfluence = scrollT.current * Math.PI * 1.25;
    m.rotation.y += delta * base;
    m.rotation.x = 0.35 + scrollInfluence * 0.25;
    m.rotation.z = scrollInfluence * 0.1;
    m.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a567"),
        roughness: 0.35,
        metalness: 0.9,
      }),
    [],
  );

  return (
    <mesh ref={meshRef} material={material}>
      <torusKnotGeometry args={[1, 0.32, 220, 28]} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 2, 3]} intensity={1.1} />
        <directionalLight position={[-3, -2, 2]} intensity={0.6} />
        <group position={[0.9, 0.15, 0]} scale={0.9}>
          <Knot />
        </group>
      </Canvas>
    </div>
  );
}

