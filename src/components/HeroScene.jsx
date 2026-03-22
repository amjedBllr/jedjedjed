import { Bounds, Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";

function OrbModel() {
  const { scene } = useGLTF("/models/roblox.glb");
  const model = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
      }
    });
  }, [model]);

  return (
    <Center scale={1.04}>
      <primitive object={model} />
    </Center>
  );
}

export function HeroScene() {
  return (
    <div className="relative mx-auto w-full max-w-[42rem]">
      <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_62%)]" />
      <div className="relative overflow-hidden rounded-[2.2rem] bg-transparent">
        <div className="h-[28rem] w-full overflow-hidden rounded-[1.8rem] md:h-[42rem]">
          <Canvas
            dpr={[0.8, 1]}
            camera={{ position: [0, 0, 6], fov: 35 }}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
            resize={{ scroll: false, debounce: { scroll: 0, resize: 120 } }}
            className="!bg-transparent"
            eventPrefix="client"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 5, 3]} intensity={2.1} />
            <directionalLight position={[-3, -2, 4]} intensity={1.1} color="#8da9d9" />
            <Suspense fallback={null}>
              <Bounds fit clip margin={1.16}>
                <OrbModel />
              </Bounds>
              <Environment preset="studio" />
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              autoRotate
              autoRotateSpeed={1.2}
              rotateSpeed={0.72}
            />
          </Canvas>
        </div>
      </div>
      <div className="absolute inset-x-12 bottom-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
