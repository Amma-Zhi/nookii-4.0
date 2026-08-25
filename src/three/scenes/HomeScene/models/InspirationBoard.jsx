import { RoundedBox } from '@react-three/drei'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function Paper({ position, scale = [0.7, 0.72, 0.03], rotation = [0, 0, 0] }) {
  return (
    <RoundedBox castShadow args={scale} radius={0.025} smoothness={3} position={position} rotation={rotation}>
      <meshStandardMaterial {...clayMaterialProps.paper} />
    </RoundedBox>
  )
}

export default function InspirationBoard({ onFocus }) {
  const { position, scale } = sceneLayout.inspirationBoard

  return (
    <group
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('inspirationBoard')
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <RoundedBox castShadow receiveShadow args={[3.25, 2.45, 0.16]} radius={0.18} smoothness={8}>
        <meshStandardMaterial {...clayMaterialProps.secondary} roughness={0.92} />
      </RoundedBox>

      <Paper position={[-0.88, 0.55, 0.11]} scale={[0.6, 0.52, 0.03]} rotation={[0, 0, 0.03]} />
      <Paper position={[-0.05, 0.76, 0.115]} scale={[0.72, 0.82, 0.03]} rotation={[0, 0, -0.025]} />
      <Paper position={[0.9, 0.65, 0.115]} scale={[0.58, 0.88, 0.03]} rotation={[0, 0, 0.015]} />
      <Paper position={[0.25, -0.45, 0.12]} scale={[0.85, 0.54, 0.03]} />

      {[[-1.15, 0.86], [0.18, 1.16], [0.56, -0.08], [1.15, 1.12]].map(([x, y], index) => (
        <mesh key={index} castShadow position={[x, y, 0.17]}>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshStandardMaterial {...clayMaterialProps.primary} />
        </mesh>
      ))}
    </group>
  )
}
