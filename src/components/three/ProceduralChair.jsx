import React from 'react';
import { RoundedBox } from '@react-three/drei';

export const ProceduralChair = ({
  color = '#E8E3D9',
  roughness = 0.8,
  metalness = 0.0,
  scale = 1.0,
  position = [0, 0, 0]
}) => {
  return (
    <group scale={[scale, scale, scale]} position={position}>
      {/* Three-point pedestal base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.14, 0.3, 16]} />
        <meshStandardMaterial color="#4A3222" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.42, 0.44, 0.04, 32]} />
        <meshStandardMaterial color="#4A3222" roughness={0.6} />
      </mesh>

      {/* Main contoured seat shell */}
      <RoundedBox args={[0.88, 0.22, 0.84]} radius={0.1} smoothness={4} position={[0, 0.34, 0]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Wrap-around curved backrest */}
      <RoundedBox args={[0.86, 0.58, 0.24]} radius={0.12} smoothness={4} position={[0, 0.68, -0.32]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>

      {/* Side wings */}
      <RoundedBox args={[0.2, 0.48, 0.72]} radius={0.08} smoothness={4} position={[-0.38, 0.62, -0.06]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
      <RoundedBox args={[0.2, 0.48, 0.72]} radius={0.08} smoothness={4} position={[0.38, 0.62, -0.06]}>
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </RoundedBox>
    </group>
  );
};

export default ProceduralChair;
