import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Profile(props) {
  const { scene } = useGLTF('/Avatar/6891b6cd4dd25e58780a0edf.glb');
  const avatarRef = useRef();
  const { isSpeaking, ...otherProps } = props;

  useFrame((state) => {
    if (avatarRef.current && isSpeaking) {
      // Simple lip sync animation - scale the avatar slightly when speaking
      const time = state.clock.elapsedTime;
      const scale = 1 + Math.sin(time * 10) * 0.02;
      avatarRef.current.scale.set(scale * 2, scale * 2, scale * 2);
    } else if (avatarRef.current) {
      // Reset to normal scale when not speaking
      avatarRef.current.scale.set(2, 2, 2);
    }
  });

  return <primitive ref={avatarRef} object={scene} {...otherProps} />;
}
