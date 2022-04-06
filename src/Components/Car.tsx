import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Car() {
  const gltf = useLoader(GLTFLoader, '/Car.gltf');
  return <primitive object={gltf.scene} />;
}
