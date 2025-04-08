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
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((prevKey) => prevKey + 1);
  }, [isMobile]);

  useEffect(() => {
    if (textRef.current) {
      const scaleFactor = isMobile ? 0.8 : 1.0;
      textRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [isMobile]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Suspense fallback={null}>
      <group ref={groupRef} key={renderKey}>
        <Center position={position}>
          <Text3D
            ref={textRef}
            font="/models/helvetiker_regular.typeface.json"
            size={isMobile ? 1.2 : 1.0}
            height={isMobile ? 0.25 : 0.2}
            curveSegments={64}
            bevelEnabled
            bevelThickness={0.05}
            bevelSize={0.03}
            bevelSegments={16}
          >
            {text}
            <meshPhysicalMaterial
              color="#0a1931"
              metalness={0.9}
              roughness={0.2}
              clearcoat={0.9}
              clearcoatRoughness={0.15}
              emissive="#1b3b6f"
              emissiveIntensity={0.7}
              reflectivity={0.9}
              transparent={true}
              opacity={0.95}
            />
          </Text3D>
        </Center>
      </group>
    </Suspense>
  );
};

export default Text3DComponent;
