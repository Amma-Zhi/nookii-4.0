import { useState } from 'react'
import CameraRig from './CameraRig'
import HomeLighting from './HomeLighting'
import Fabric from './models/Fabric'
import HeartCabinet from './models/HeartCabinet'
import InspirationBoard from './models/InspirationBoard'
import ModularShelf from './models/ModularShelf'
import SceneBase from './models/SceneBase'
import SewingMachine from './models/SewingMachine'
import SewingTable from './models/SewingTable'

export default function HomeScene() {
  const [focus, setFocus] = useState('home')

  return (
    <>
      <CameraRig focus={focus} />
      <HomeLighting />

      <group>
        <SceneBase onFocus={setFocus} />
        <SewingTable />
        <SewingMachine onFocus={setFocus} />
        <Fabric />
        <ModularShelf onFocus={setFocus} />
        <HeartCabinet onFocus={setFocus} />
        <InspirationBoard onFocus={setFocus} />
      </group>
    </>
  )
}
