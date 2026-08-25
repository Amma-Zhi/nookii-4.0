import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import HomeScene from '../../three/scenes/HomeScene/HomeScene'

const compareWithReference = new URLSearchParams(window.location.search).get('compare') === '1'

export default function Home3DPage() {
  return (
    <main className="nookii-home3d" aria-label="Nookii 4.0 3D home scene">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4.9, 17.3], fov: 30, near: 0.1, far: 100 }}
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

      {compareWithReference && (
        <div className="composition-reference" aria-hidden="true">
          <img src="/references/nookii-home-clay-reference.jpg" alt="" />
        </div>
      )}
    </main>
  )
}
