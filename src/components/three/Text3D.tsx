import React, { Suspense, useRef, useEffect } from "react";
import { Text3D, Center } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface Text3DProps {
  text: string;
  position?: [number, number, number];
}

const Text3DComponent: React.FC<Text3DProps> = ({
  text,
  position = [0, 0, 0],
}) => {
  const textRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const materialRef = useRef<any>(null!);
  const { viewport, camera, size } = useThree();

  const isMobile = size.width < 768;

  useEffect(() => {
    if (textRef.current) {
      let scaleFactor;

      if (isMobile) {
        scaleFactor = viewport.width / 4;
      } else {
        scaleFactor = 12;
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }

      textRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [camera, isMobile, size.width]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;

      if (isMobile) {
        groupRef.current.rotation.y += 0.01;
      }
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        0.8 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={groupRef}>
        <Center position={position}>
          <Text3D
            ref={textRef}
            font="/models/helvetiker_regular.typeface.json"
            size={1}
            height={0.1}
            curveSegments={64}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.04}
            bevelSegments={12}
          >
            {text}
            <meshPhysicalMaterial
              ref={materialRef}
              color="#e0e7ff"
              metalness={0.2}
              roughness={0.4}
              clearcoat={0.5}
              clearcoatRoughness={0.3}
              emissive="#a3bffa"
              emissiveIntensity={0.8}
            />
          </Text3D>
        </Center>
      </group>
    </Suspense>
  );
};

export default Text3DComponent;
