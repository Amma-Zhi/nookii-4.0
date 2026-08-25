import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import { ExtrudeGeometry, Shape } from 'three'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function createHeartGeometry() {
  const shape = new Shape()
  shape.moveTo(0, 0.18)
  shape.bezierCurveTo(0, 0.18, -0.34, 0.48, -0.62, 0.14)
  shape.bezierCurveTo(-0.9, -0.22, -0.56, -0.62, 0, -1.02)
  shape.bezierCurveTo(0.56, -0.62, 0.9, -0.22, 0.62, 0.14)
  shape.bezierCurveTo(0.34, 0.48, 0, 0.18, 0, 0.18)
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.05,
  })
  geometry.center()
  return geometry
}

function HeartHandle({ y }) {
  const geometry = useMemo(createHeartGeometry, [])
  return (
    <mesh castShadow geometry={geometry} position={[0, y, 0.64]} scale={0.24}>
      <meshStandardMaterial {...clayMaterialProps.primary} />
    </mesh>
  )
}

export default function HeartCabinet({ onFocus }) {
  const { position, scale } = sceneLayout.rightCabinet

  return (
    <group
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('rightCabinet')
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <RoundedBox castShadow receiveShadow args={[1.75, 2.05, 1.05]} radius={0.2} smoothness={8} position={[0, 1.03, 0]}>
        <meshStandardMaterial {...clayMaterialProps.secondary} />
      </RoundedBox>

      <RoundedBox castShadow args={[1.52, 0.78, 0.16]} radius={0.14} smoothness={7} position={[0, 1.45, 0.53]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
      <RoundedBox castShadow args={[1.52, 0.78, 0.16]} radius={0.14} smoothness={7} position={[0, 0.55, 0.53]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <HeartHandle y={1.52} />
      <HeartHandle y={0.62} />

      <RoundedBox castShadow args={[1.45, 0.18, 0.82]} radius={0.08} smoothness={5} position={[0, -0.03, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>
    </group>
  )
}
