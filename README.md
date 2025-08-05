# Hologram POC - React Three Fiber

A proof of concept holographic material implementation using React Three Fiber and Vite.

## Features

- ✨ Holographic material shader effect
- 🎛️ Real-time controls with Leva
- 🔄 Animated 3D objects (cube, sphere, torus)
- 📱 Responsive design
- ⚡ Built with Vite for fast development

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Controls

Use the Leva panel to adjust holographic material properties:

- **Fresnel Amount**: Controls the edge glow effect
- **Fresnel Opacity**: Opacity of the edge effect
- **Scanline Size**: Size of the animated scanlines
- **Hologram Brightness**: Overall brightness
- **Signal Speed**: Animation speed
- **Hologram Color**: Base color of the effect
- **Enable Blinking**: Toggle blinking effect
- **Auto Rotate**: Toggle automatic rotation

## Build

```bash
npm run build
```

## Technologies Used

- React 18
- Three.js
- React Three Fiber
- React Three Drei
- Leva (GUI controls)
- Vite

## License

MIT License
