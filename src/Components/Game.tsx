import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import Plane from './Plane';
import Vehicle from './Vehicle';

export default function Game(props: any) {
  return (
    <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <fog attach='fog' args={['#171720', 10, 100]} />
      <color attach='background' args={['#171720']} />

      <Suspense fallback={null}>
        <Physics broadphase='SAP' allowSleep>
          <Plane position={[0, 0, 0]} />
          <Vehicle
            position={[0, 3, 0]}
            rotation={[0, -Math.PI / 4, 0]}
            angularVelocity={[0, 0.5, 0]}
            wheelRadius={0.3}
          />
          <Sky
            distance={450000}
            sunPosition={[500, 500, 500]}
            inclination={0}
            azimuth={0.25}
            {...props}
          />
          <OrbitControls />
          <ambientLight intensity={2} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
