import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { CatmullRomCurve3, TubeGeometry, Vector3 } from 'three'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function Cylinder({ args, position, rotation, material = 'metal', castShadow = true }) {
  return (
    <mesh castShadow={castShadow} position={position} rotation={rotation}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial {...clayMaterialProps[material]} />
    </mesh>
  )
}

export default function SewingMachine({ onFocus }) {
  const { position, scale } = sceneLayout.sewingMachine
  const wheel = useRef()
  const needleAssembly = useRef()

  const threadGeometry = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.25, 2.13, 0.34),
      new Vector3(-0.2, 2.1, 0.36),
      new Vector3(-0.82, 1.86, 0.38),
      new Vector3(-1.2, 0.62, 0.4),
    ])
    return new TubeGeometry(curve, 36, 0.008, 6, false)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    if (wheel.current) wheel.current.rotation.x = time * 0.42
    if (needleAssembly.current) needleAssembly.current.position.y = Math.sin(time * 3.4) * 0.028
  })

  return (
    <group
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('sewingMachine')
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <RoundedBox castShadow receiveShadow args={[3.05, 0.36, 1.05]} radius={0.15} smoothness={8} position={[0, 0.18, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <RoundedBox castShadow args={[0.82, 1.75, 0.78]} radius={0.22} smoothness={8} position={[0.76, 1.0, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <RoundedBox castShadow args={[2.35, 0.78, 0.78]} radius={0.24} smoothness={8} position={[-0.2, 1.64, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <RoundedBox castShadow args={[0.56, 1.15, 0.76]} radius={0.18} smoothness={8} position={[-1.18, 1.08, 0]}>
        <meshStandardMaterial {...clayMaterialProps.primary} />
      </RoundedBox>

      <group ref={wheel} position={[1.38, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <Cylinder args={[0.42, 0.42, 0.12, 42]} position={[0, 0, 0]} material="secondary" />
        <Cylinder args={[0.24, 0.24, 0.17, 32]} position={[0, 0, 0]} material="metal" />
      </group>

      <Cylinder args={[0.16, 0.16, 0.12, 30]} position={[0.57, 1.52, 0.43]} rotation={[Math.PI / 2, 0, 0]} material="secondary" />
      <Cylinder args={[0.16, 0.16, 0.12, 30]} position={[0.57, 0.94, 0.43]} rotation={[Math.PI / 2, 0, 0]} material="secondary" />

      <Cylinder args={[0.035, 0.035, 0.36, 16]} position={[0.22, 2.22, 0.05]} material="metal" />
      <Cylinder args={[0.17, 0.17, 0.28, 24]} position={[0.22, 2.36, 0.05]} material="secondary" />

      <group ref={needleAssembly} position={[-1.18, 0.66, 0.28]}>
        <Cylinder args={[0.045, 0.045, 0.6, 18]} position={[0, 0, 0]} material="metal" />
        <Cylinder args={[0.012, 0.012, 0.42, 12]} position={[0, -0.45, 0]} material="metal" />
        <RoundedBox castShadow args={[0.3, 0.07, 0.26]} radius={0.025} smoothness={3} position={[0.03, -0.68, 0]}>
          <meshStandardMaterial {...clayMaterialProps.metal} />
        </RoundedBox>
      </group>

      <RoundedBox castShadow args={[0.75, 0.035, 0.52]} radius={0.025} smoothness={3} position={[-1.05, 0.39, 0.15]}>
        <meshStandardMaterial {...clayMaterialProps.metal} />
      </RoundedBox>

      <mesh geometry={threadGeometry}>
        <meshStandardMaterial {...clayMaterialProps.metal} />
      </mesh>
    </group>
  )
}
