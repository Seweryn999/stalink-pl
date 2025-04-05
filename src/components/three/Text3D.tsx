import React, { Suspense, useRef, useEffect, useState } from "react";
import { Text3D, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface Text3DProps {
  text: string;
  position?: [number, number, number];
  isMobile: boolean;
}

const Text3DComponent: React.FC<Text3DProps> = ({
  text,
  position = [0, 0, 0],
  isMobile,
}) => {
  const textRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const materialRef = useRef<any>(null!);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((prevKey) => prevKey + 1);
  }, [isMobile]);

  useEffect(() => {
    if (textRef.current) {
      const scaleFactor = isMobile ? 0.4 : 1.0;
      textRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [isMobile]);

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
      <group ref={groupRef} key={renderKey}>
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
