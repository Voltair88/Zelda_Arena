import { PlaneProps, usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';

export default function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [colorMap, displacementMap, normalMap, aoMap, bumbMap] = useTexture([
    'TerrazzoVenetianMatteWhite001_COL_1K.jpg',
    'TerrazzoVenetianMatteWhite001_DISP_1K.jpg',
    'TerrazzoVenetianMatteWhite001_NRM_1K.png',
    'TerrazzoVenetianMatteWhite001_AO_1K.jpg',
    'TerrazzoVenetianMatteWhite001_BUMP_1K.jpg',
  ]);

  /*   const textures = useTexture({
    map: 'GroundForest003_COL_VAR1_1K.jpg',
    displacementMap: 'GroundForest003_DISP_VAR1_1K.jpg',
    normalMap: 'GroundForest003_NRM_1K.jpg',
    aoMap: 'GroundForest003_AO_1K.jpg',
  }); */

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial
        attach='material'
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        aoMap={aoMap}
        bumpMap={bumbMap}
        flatShading={true}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}
