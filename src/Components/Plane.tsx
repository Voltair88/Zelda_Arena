import { PlaneProps, usePlane } from '@react-three/cannon';

export default function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshBasicMaterial attach='material' color='green' />
    </mesh>
  );
}
