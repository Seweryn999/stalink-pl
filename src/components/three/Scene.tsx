import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Text3DComponent from "./Text3D";
import { usePathname } from "next/navigation";

const Scene: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
          camera={{
            position: isMobile ? [0, 1.5, 10] : [0, 1.5, 8],
            fov: isMobile ? 75 : 55,
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 5, 3]} intensity={1} />
          <pointLight position={[0, 1, 3]} intensity={3} color="#22d3ee" />
          <pointLight position={[-3, -1, 2]} intensity={2} color="#a78bfa" />

          <Stars
            radius={50}
            depth={30}
            count={1500}
            factor={2}
            saturation={0}
            fade
            speed={0.5}
          />

          <Text3DComponent
            text="STALINK"
            position={[0, 0.6, 0]}
            isMobile={isMobile}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.3}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
          />
        </Canvas>
      )}
    </div>
  );
};

export default Scene;
