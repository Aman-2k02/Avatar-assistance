import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Profile from '../Profile';

// === Avatar Canvas Configuration ===
const CAMERA_CONFIG = {
  position: [-1, 1, 5],
  fov: 60,
};

const AVATAR_CONFIG = {
  position: [1, -1.5, 0],
  scale: 2,
};

const ORBIT_CONTROLS_CONFIG = {
  enableZoom: false,
  enablePan: false,
  minPolarAngle: Math.PI / 2,
  maxPolarAngle: Math.PI / 2,
  minAzimuthAngle: -Math.PI / 2,
  maxAzimuthAngle: Math.PI / 2,
};

const AVATAR_CANVAS_HEIGHT = { normal: 300, minimized: 150 };

// === Avatar Canvas Component ===
function AvatarCanvas({ isMinimized, isSpeaking }) {
  return (
    <div
      style={{
        height: isMinimized ? AVATAR_CANVAS_HEIGHT.minimized : AVATAR_CANVAS_HEIGHT.normal,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 0 0',
      }}
    >
      <Canvas camera={CAMERA_CONFIG}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Profile
            position={AVATAR_CONFIG.position}
            isSpeaking={isSpeaking}
          />
        </Suspense>
        <OrbitControls {...ORBIT_CONTROLS_CONFIG} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

export default AvatarCanvas; 