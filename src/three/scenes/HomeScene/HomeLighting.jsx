export default function HomeLighting() {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#d8d3cf', 1.65]} />
      <directionalLight
        castShadow
        color="#fffaf6"
        intensity={2.4}
        position={[-4.5, 8, 8]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-2}
        shadow-bias={-0.00012}
      />
      <directionalLight color="#e9edf0" intensity={0.85} position={[6, 5, 3]} />
      <pointLight color="#ffffff" intensity={0.55} position={[0, 7, -3]} distance={18} />
    </>
  )
}
