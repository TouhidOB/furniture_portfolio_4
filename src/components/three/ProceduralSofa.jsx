import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

export const ProceduralSofa = ({
  color = '#965737',
  roughness = 0.55,
  metalness = 0.05,
  scale = 1.0,
  rotationY = 0
}) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && rotationY !== undefined) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* Wooden Shadow Gap Plinth / Base */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[2.7, 0.12, 1.05]} />
        <meshStandardMaterial color="#4A3222" roughness={0.7} />
      </mesh>

      {/* Main Base Seating Modules (Left & Right) */}
      <RoundedBox args={[1.3, 0.38, 1.05]} radius={0.06} smoothness={4} position={[-0.67, 0.32, 0]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
      <RoundedBox args={[1.3, 0.38, 1.05]} radius={0.06} smoothness={4} position={[0.67, 0.32, 0]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Deep Plush Seat Cushions with Channel Seams */}
      <RoundedBox args={[1.26, 0.2, 0.98]} radius={0.08} smoothness={4} position={[-0.67, 0.52, 0.02]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
      <RoundedBox args={[1.26, 0.2, 0.98]} radius={0.08} smoothness={4} position={[0.67, 0.52, 0.02]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Backrest Modules */}
      <RoundedBox args={[1.3, 0.44, 0.32]} radius={0.08} smoothness={4} position={[-0.67, 0.72, -0.38]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
      <RoundedBox args={[1.3, 0.44, 0.32]} radius={0.08} smoothness={4} position={[0.67, 0.72, -0.38]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Low Architectural Wide Armrests */}
      <RoundedBox args={[0.34, 0.42, 1.08]} radius={0.06} smoothness={4} position={[-1.48, 0.44, 0]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.42, 1.08]} radius={0.06} smoothness={4} position={[1.48, 0.44, 0]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
    </group>
  );
};

export default ProceduralSofa;
