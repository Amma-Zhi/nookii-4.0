import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Vector3 } from 'three'
import { CAMERA_PRESETS } from './config/cameraPresets'

const dampAlpha = (speed, delta) => 1 - Math.exp(-speed * delta)

export default function CameraRig({ focus = 'home' }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const lookTarget = useRef(new Vector3(...CAMERA_PRESETS.home.target))

  const aspect = size.width / Math.max(size.height, 1)
  const mobileDistance = useMemo(() => {
    if (aspect < 0.72) return 6.8
    if (aspect < 1) return 4.5
    if (aspect < 1.3) return 2.1
    return 0
  }, [aspect])

  useFrame(({ clock }, delta) => {
    const preset = CAMERA_PRESETS[focus] ?? CAMERA_PRESETS.home
    const idle = focus === 'home'
    const time = clock.elapsedTime

    const destination = new Vector3(
      preset.position[0] + (idle ? Math.sin(time * 0.18) * 0.045 : 0),
      preset.position[1] + (idle ? Math.sin(time * 0.14) * 0.022 : 0),
      preset.position[2] + mobileDistance,
    )
    const target = new Vector3(...preset.target)

    camera.position.lerp(destination, dampAlpha(3.2, delta))
    lookTarget.current.lerp(target, dampAlpha(4.1, delta))
    camera.fov += (preset.fov - camera.fov) * dampAlpha(3.4, delta)
    camera.lookAt(lookTarget.current)
    camera.updateProjectionMatrix()
  })

  return null
}
