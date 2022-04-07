import * as THREE from 'three';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../Hooks/useKeyboardControls';
import { Vector3 } from 'three';
import React from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube002_4: THREE.Mesh;
    Cube002_5: THREE.Mesh;
  };
  materials: {
    beige: THREE.MeshStandardMaterial;
    dark: THREE.MeshStandardMaterial;
    red: THREE.MeshStandardMaterial;
    yellow: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    orange: THREE.MeshStandardMaterial;
  };
};

const SPEED = 6;

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>();
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight } =
    useKeyboardControls();
  const { nodes, materials } = useGLTF('/jeep.glb') as GLTFResult;
  const [ref, api] = useSphere(() => ({
    mass: 500,
    type: 'Dynamic',
  }));
  const velocity = React.useRef([0, 0, 0]);

  React.useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name='camera'
        position={[10, 0, 50]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <PerspectiveCamera fov={40} near={10} far={1000} />
      </group>
      <group
        name='sun'
        position={[100, 50, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <pointLight intensity={10} />
      </group>
      <mesh ref={ref}>
        <group scale={[0.67, 1, 1]} position={[0, 0, 0]}>
          <mesh geometry={nodes.Cube002.geometry} material={materials.beige} />
          <mesh geometry={nodes.Cube002_1.geometry} material={materials.dark} />
          <mesh geometry={nodes.Cube002_2.geometry} material={materials.red} />
          <mesh
            geometry={nodes.Cube002_3.geometry}
            material={materials.yellow}
          />
          <mesh
            geometry={nodes.Cube002_4.geometry}
            material={materials.glass}
          />
          <mesh
            geometry={nodes.Cube002_5.geometry}
            material={materials.orange}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload('/jeep.glb');
