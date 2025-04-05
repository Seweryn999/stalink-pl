import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import Text3DComponent from "./Text3D";

const EffectComposer = dynamic(
  () => import("@react-three/postprocessing").then((mod) => mod.EffectComposer),
  { ssr: false }
);
const Bloom = dynamic(
  () => import("@react-three/postprocessing").then((mod) => mod.Bloom),
  { ssr: false }
);

const Scene: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = "100%";
        canvasRef.current.style.height = "100vh";
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: isMobile ? [0, 0, 15] : [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Text3DComponent
          text="STALINK"
          position={isMobile ? [0, 0.9, 0] : [0, 0.5, 0]}
        />
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
          />
        )}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;
