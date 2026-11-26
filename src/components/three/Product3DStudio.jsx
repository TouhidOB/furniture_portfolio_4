import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import ProceduralSofa from './ProceduralSofa';
import ProceduralChair from './ProceduralChair';

export const Product3DStudio = ({
  modelType = 'sofa',
  color = '#965737',
  rotationY = 0,
  autoRotate = false,
  enableZoom = true,
  className = "w-full h-full"
}) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1.4, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-4, 4, -3]} intensity={0.4} color="#FAF8F4" />
        <pointLight position={[0, -1, 2]} intensity={0.2} color="#EAE3D8" />

        <Suspense fallback={null}>
          <group position={[0, -0.4, 0]}>
            {modelType === 'chair' ? (
              <ProceduralChair color={color} scale={1.2} />
            ) : (
              <ProceduralSofa color={color} scale={0.9} rotationY={rotationY} />
            )}
          </group>

          <ContactShadows
            position={[0, -0.41, 0]}
            opacity={0.65}
            scale={8}
            blur={2.4}
            far={4}
            color="#292520"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={enableZoom}
          minDistance={2.2}
          maxDistance={6.0}
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};

export default Product3DStudio;
