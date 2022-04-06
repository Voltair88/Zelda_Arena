import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import Plane from './Plane';

export default function Game(props: any) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Physics>
          <Plane />
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
            {...props}
          />
          <OrbitControls />
          <ambientLight />
          <spotLight position={[10, 10, 10]} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
