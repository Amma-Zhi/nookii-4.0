import { useMemo } from 'react'
import { DoubleSide, PlaneGeometry } from 'three'
import { clayMaterialProps } from '../materials/clayMaterials'

export default function Fabric() {
  const geometry = useMemo(() => {
    const geo = new PlaneGeometry(1.65, 2.45, 22, 30)
    const position = geo.attributes.position

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i)
      const y = position.getY(i)
      const normalizedY = (y + 1.225) / 2.45
      const fold = Math.sin(x * 7.5 + normalizedY * 2.2) * 0.055
      const frontCurl = Math.pow(1 - normalizedY, 1.7) * 0.2
      position.setZ(i, fold + frontCurl)
      position.setX(i, x + Math.sin(normalizedY * 3.5) * 0.07)
    }

    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh castShadow geometry={geometry} position={[-0.72, 2.0, 0.82]} rotation={[-0.48, 0.02, -0.05]}>
      <meshStandardMaterial {...clayMaterialProps.fabric} side={DoubleSide} />
    </mesh>
  )
}
