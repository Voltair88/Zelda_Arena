import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
  };
};

export default function Arena({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/grass.glb') as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials['Material.001']}
        position={[0, 1.08, 0]}
        scale={[50, 0.87, 50]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[0, 1.08, 0]}
        scale={[4.63, 0.29, 4.18]}
      />
    </group>
  );
}

useGLTF.preload('/grass.glb');