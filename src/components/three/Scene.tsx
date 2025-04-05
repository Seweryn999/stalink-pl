import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import Text3DComponent from "./Text3D";
import { usePathname } from "next/navigation"; // Dodane

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [renderKey, setRenderKey] = useState(0);
  const pathname = usePathname();

  const updateDeviceType = () => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
  };

  useEffect(() => {
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [pathname]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "100vh";
    }
  }, [isMobile]);

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
      {pathname === "/" && (
        <Canvas
          key={renderKey}
          camera={{
            position: isMobile ? [0, 0, 22] : [0, 0, 6],
            fov: isMobile ? 40 : 55,
          }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Text3DComponent
            text="STALINK"
            position={isMobile ? [0, 1.1, 0] : [0, 0.5, 0]}
            isMobile={isMobile}
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
              intensity={0.1}
              luminanceThreshold={0.3}
              luminanceSmoothing={5}
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
};

export default Scene;
