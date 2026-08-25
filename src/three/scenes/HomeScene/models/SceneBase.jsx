import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

export default function SceneBase({ onFocus }) {
  const { position, scale, radius } = sceneLayout.base

  return (
    <mesh
      receiveShadow
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('home')
      }}
    >
      <cylinderGeometry args={[radius, radius, 1, 128]} />
      <meshStandardMaterial {...clayMaterialProps.secondary} />
    </mesh>
  )
}
