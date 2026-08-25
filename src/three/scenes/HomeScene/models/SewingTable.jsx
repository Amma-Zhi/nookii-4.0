import { RoundedBox } from '@react-three/drei'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function TableLeg({ position, rotationZ = 0 }) {
  return (
    <RoundedBox
      castShadow
      receiveShadow
      args={[0.28, 2.1, 0.3]}
      radius={0.12}
      smoothness={5}
      position={position}
      rotation={[0, 0, rotationZ]}
    >
      <meshStandardMaterial {...clayMaterialProps.primary} />
    </RoundedBox>
  )
}

export default function SewingTable() {
  const { position, scale } = sceneLayout.table

  return (
    <group position={position} scale={scale}>
      <RoundedBox
        castShadow
        receiveShadow
        args={[5.3, 0.28, 1.65]}
        radius={0.16}
        smoothness={7}
        position={[0, 2.18, 0]}
      >
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <RoundedBox castShadow args={[4.7, 0.34, 1.18]} radius={0.1} smoothness={5} position={[0, 1.9, -0.05]}>
        <meshStandardMaterial {...clayMaterialProps.secondary} />
      </RoundedBox>

      <TableLeg position={[-2.18, 1.02, 0.54]} rotationZ={0.055} />
      <TableLeg position={[2.18, 1.02, 0.54]} rotationZ={-0.055} />
      <TableLeg position={[-2.18, 1.02, -0.54]} rotationZ={0.035} />
      <TableLeg position={[2.18, 1.02, -0.54]} rotationZ={-0.035} />
    </group>
  )
}
