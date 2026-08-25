export const clayPalette = Object.freeze({
  background: '#f5f3f1',
  primary: '#efeeeb',
  secondary: '#e6e4e1',
  edge: '#d7d4d0',
  paper: '#f4f2ef',
  fabric: '#e9e7e4',
  metal: '#c8c6c3',
})

export const clayMaterialProps = Object.freeze({
  primary: {
    color: clayPalette.primary,
    roughness: 0.72,
    metalness: 0,
  },
  secondary: {
    color: clayPalette.secondary,
    roughness: 0.78,
    metalness: 0,
  },
  paper: {
    color: clayPalette.paper,
    roughness: 0.9,
    metalness: 0,
  },
  fabric: {
    color: clayPalette.fabric,
    roughness: 0.96,
    metalness: 0,
  },
  metal: {
    color: clayPalette.metal,
    roughness: 0.5,
    metalness: 0.1,
  },
})
