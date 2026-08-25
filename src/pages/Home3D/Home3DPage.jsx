import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import HomeScene from '../../three/scenes/HomeScene/HomeScene'

export default function Home3DPage() {
  return (
    <main className="nookii-home3d" aria-label="Nookii 4.0 3D home scene">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 5, 13.5], fov: 32, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
          gl.setClearColor('#f5f3f1')
        }}
      >
        <HomeScene />
      </Canvas>
    </main>
  )
}
