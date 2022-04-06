import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import Plane from './Plane';
import Jeep from './Jeep';

export default function Game(props: any) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Physics>
          <Plane />
          <Jeep />
          <Sky
            distance={450000}
            sunPosition={[500, 500, 500]}
            inclination={0}
            azimuth={0.25}
            {...props}
          />
          <OrbitControls />
          <ambientLight intensity={0.3} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
