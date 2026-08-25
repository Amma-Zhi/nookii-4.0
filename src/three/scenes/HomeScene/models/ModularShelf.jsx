import { RoundedBox } from '@react-three/drei'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function ShelfModule({ position, width = 1.55, height = 0.92, depth = 0.7 }) {
  const t = 0.14
  const common = { radius: 0.09, smoothness: 5, castShadow: true, receiveShadow: true }

  return (
    <group position={position}>
      <RoundedBox {...common} args={[width, t, depth]} position={[0, height / 2 - t / 2, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
      <RoundedBox {...common} args={[width, t, depth]} position={[0, -height / 2 + t / 2, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
      <RoundedBox {...common} args={[t, height - t * 1.2, depth]} position={[-width / 2 + t / 2, 0, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
      <RoundedBox {...common} args={[t, height - t * 1.2, depth]} position={[width / 2 - t / 2, 0, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
    </group>
  )
}

function Foot({ x }) {
  return (
    <RoundedBox castShadow args={[0.18, 0.42, 0.22]} radius={0.06} smoothness={4} position={[x, 0.2, 0]} rotation={[0, 0, x < 0 ? 0.08 : -0.08]}>
      <meshStandardMaterial {...clayMaterialProps.primary} />
    </RoundedBox>
  )
}

export default function ModularShelf({ onFocus }) {
  const { position, scale } = sceneLayout.leftShelf

  return (
    <group
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('leftShelf')
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <ShelfModule position={[-0.2, 3.92, 0]} width={1.85} />
      <ShelfModule position={[-0.55, 2.92, 0]} width={1.45} />
      <ShelfModule position={[0.85, 2.92, 0]} width={1.35} />
      <ShelfModule position={[-0.12, 1.92, 0]} width={1.78} />
      <ShelfModule position={[-0.7, 0.92, 0]} width={1.42} />
      <ShelfModule position={[0.72, 0.92, 0]} width={1.35} />
      <Foot x={-0.92} />
      <Foot x={0.9} />
    </group>
  )
}
