import React, { useRef, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Text3DComponent from "./Text3D";
import { usePathname } from "next/navigation";

const MOBILE_BREAKPOINT = 768;

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

const getIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

// Na serwerze nie znamy szerokosci okna - tak jak wczesniej startujemy od
// wariantu desktopowego, a klient koryguje to przy pierwszym renderze.
const getIsMobileOnServer = () => false;

const Scene: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isMobile = useSyncExternalStore(
    subscribeToResize,
    getIsMobile,
    getIsMobileOnServer
  );

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
