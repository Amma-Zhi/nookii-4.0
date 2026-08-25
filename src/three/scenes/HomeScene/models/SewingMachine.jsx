import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {
  CatmullRomCurve3,
  ExtrudeGeometry,
  Path,
  Shape,
  TubeGeometry,
  Vector3,
} from 'three'
import { clayMaterialProps } from '../materials/clayMaterials'
import { sceneLayout } from '../config/sceneLayout'

function createShellGeometry() {
  const shape = new Shape()

  shape.moveTo(-1.42, 0.34)
  shape.lineTo(-1.42, 1.58)
  shape.quadraticCurveTo(-1.42, 1.92, -1.08, 2.03)
  shape.quadraticCurveTo(-0.82, 2.12, -0.48, 2.12)
  shape.lineTo(0.76, 2.12)
  shape.quadraticCurveTo(1.1, 2.1, 1.2, 1.78)
  shape.lineTo(1.2, 0.58)
  shape.quadraticCurveTo(1.18, 0.34, 0.93, 0.34)
  shape.closePath()

  const throat = new Path()
  throat.moveTo(-0.88, 0.48)
  throat.lineTo(-0.88, 1.22)
  throat.quadraticCurveTo(-0.86, 1.42, -0.64, 1.48)
  throat.lineTo(0.34, 1.48)
  throat.quadraticCurveTo(0.54, 1.45, 0.56, 1.24)
  throat.lineTo(0.56, 0.5)
  throat.quadraticCurveTo(0.54, 0.42, 0.43, 0.42)
  throat.lineTo(-0.72, 0.42)
  throat.quadraticCurveTo(-0.86, 0.42, -0.88, 0.48)
  shape.holes.push(throat)

  const depth = 0.7
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.075,
    bevelThickness: 0.065,
    curveSegments: 18,
  })

  geometry.translate(0, 0, -depth / 2)
  geometry.computeVertexNormals()
  return geometry
}

function Cylinder({
  args,
  position,
  rotation = [0, 0, 0],
  material = 'metal',
  castShadow = true,
}) {
  return (
    <mesh castShadow={castShadow} position={position} rotation={rotation}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial {...clayMaterialProps[material]} />
    </mesh>
  )
}

function FrontDial({ position, radius }) {
  return (
    <group position={position}>
      <Cylinder
        args={[radius, radius, 0.13, 40]}
        rotation={[Math.PI / 2, 0, 0]}
        material="secondary"
      />
      <Cylinder
        args={[radius * 0.68, radius * 0.68, 0.17, 40]}
        position={[0, 0, 0.055]}
        rotation={[Math.PI / 2, 0, 0]}
        material="primary"
      />
    </group>
  )
}

export default function SewingMachine({ onFocus }) {
  const { position, scale } = sceneLayout.sewingMachine
  const handWheel = useRef()
  const needleAssembly = useRef()

  const shellGeometry = useMemo(createShellGeometry, [])

  const threadGeometry = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.18, 2.43, 0.34),
      new Vector3(-0.15, 2.39, 0.37),
      new Vector3(-0.7, 2.1, 0.39),
      new Vector3(-1.2, 1.72, 0.4),
      new Vector3(-1.2, 0.68, 0.4),
    ])
    return new TubeGeometry(curve, 48, 0.008, 6, false)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    if (handWheel.current) handWheel.current.rotation.x = time * 0.42
    if (needleAssembly.current) {
      needleAssembly.current.position.y = Math.sin(time * 3.4) * 0.028
    }
  })

  return (
    <group
      name="sewingMachineRoot"
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onFocus?.('sewingMachine')
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <group name="baseAssembly">
        <RoundedBox
          castShadow
          receiveShadow
          args={[3.18, 0.34, 1.08]}
          radius={0.15}
          smoothness={8}
          position={[-0.06, 0.17, 0]}
        >
          <meshStandardMaterial {...clayMaterialProps.primary} />
        </RoundedBox>

        <RoundedBox
          castShadow
          receiveShadow
          args={[2.9, 0.14, 0.9]}
          radius={0.08}
          smoothness={6}
          position={[-0.08, 0.39, 0]}
        >
          <meshStandardMaterial {...clayMaterialProps.secondary} />
        </RoundedBox>

        <RoundedBox
          castShadow
          args={[0.72, 0.035, 0.5]}
          radius={0.025}
          smoothness={3}
          position={[-1.02, 0.49, 0.15]}
        >
          <meshStandardMaterial {...clayMaterialProps.metal} />
        </RoundedBox>
      </group>

      <group name="shellAssembly" position={[0, 0.22, 0]}>
        <mesh castShadow receiveShadow geometry={shellGeometry} name="continuousShell">
          <meshStandardMaterial {...clayMaterialProps.primary} />
        </mesh>

        <RoundedBox
          castShadow
          args={[0.58, 1.16, 0.76]}
          radius={0.2}
          smoothness={8}
          position={[-1.18, 1.02, 0]}
          name="frontHead"
        >
          <meshStandardMaterial {...clayMaterialProps.primary} />
        </RoundedBox>
      </group>

      <group name="handWheelAssembly" position={[1.28, 1.73, 0]}>
        <group ref={handWheel} rotation={[0, 0, Math.PI / 2]} name="handWheel">
          <Cylinder args={[0.45, 0.45, 0.11, 48]} material="secondary" />
          <Cylinder args={[0.31, 0.31, 0.15, 40]} material="primary" />
          <Cylinder args={[0.11, 0.11, 0.21, 30]} material="metal" />
        </group>
      </group>

      <group name="controlAssembly">
        <FrontDial position={[0.64, 1.61, 0.43]} radius={0.19} />
        <FrontDial position={[0.64, 0.96, 0.43]} radius={0.18} />
      </group>

      <group name="spoolAssembly">
        <Cylinder
          args={[0.035, 0.035, 0.38, 18]}
          position={[0.18, 2.37, 0.05]}
          material="metal"
        />
        <Cylinder
          args={[0.17, 0.17, 0.28, 28]}
          position={[0.18, 2.5, 0.05]}
          material="secondary"
        />
        <Cylinder
          args={[0.21, 0.21, 0.055, 28]}
          position={[0.18, 2.63, 0.05]}
          material="primary"
        />
      </group>

      <group
        ref={needleAssembly}
        name="needleAssembly"
        position={[-1.18, 0.82, 0.28]}
      >
        <Cylinder args={[0.045, 0.045, 0.62, 18]} material="metal" />
        <Cylinder
          args={[0.012, 0.012, 0.42, 12]}
          position={[0, -0.46, 0]}
          material="metal"
        />
        <RoundedBox
          castShadow
          args={[0.3, 0.07, 0.26]}
          radius={0.025}
          smoothness={3}
          position={[0.03, -0.69, 0]}
        >
          <meshStandardMaterial {...clayMaterialProps.metal} />
        </RoundedBox>
      </group>

      <mesh geometry={threadGeometry} name="threadPath">
        <meshStandardMaterial {...clayMaterialProps.metal} />
      </mesh>
    </group>
  )
}
