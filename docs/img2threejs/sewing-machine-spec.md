# Sewing Machine — img2threejs Reconstruction Spec (Phase 1 Clay)

## Reference intent

Use the supplied sewing-machine photo for **silhouette, proportion and mechanical-part hierarchy only**.

User override has higher priority than the photo:

- remove all floral carving / embossed ornament
- remain monochrome clay in Phase 1
- preserve a clean rounded vintage sewing-machine silhouette
- model must stay animation-ready

## Suitability

Status: **conditional pass**

Why:

- one obvious target object
- strong readable 3/4 silhouette
- base, arm, pillar, hand wheel, needle area, controls and spool hardware are visible
- hidden rear face and exact body thickness are not visible, so those regions are approximate

## Object class

- primary type: domestic mechanical sewing machine
- primary domain: object
- complexity: moderate
- target: real-time browser hero prop

## Macro decomposition

1. base assembly
2. continuous C-shaped machine shell
3. needle/head assembly
4. hand-wheel assembly
5. front control assembly
6. top spool assembly
7. thread path

## Meso components

### Base
- rounded lower plinth
- inset upper deck
- needle plate

### Shell
- horizontal upper arm
- right vertical pillar
- front head enclosure
- throat opening

### Needle/head
- needle bar
- needle
- presser bar / foot

### Hand wheel
- outer wheel
- hub
- axle

### Controls
- upper front dial
- lower front dial

### Spool
- spool pin
- thread spool

## Spatial relationships

- shell is seated flush on the base
- right pillar connects shell arm to base
- head enclosure terminates the front end of the arm
- needle assembly hangs below the head and terminates just above the needle plate
- hand wheel is attached to the lateral face of the right pillar
- control dials sit proud of the visible front/lateral face
- spool pin emerges from the top surface of the arm
- thread path runs from spool toward the front head and down to needle region

## Geometry strategy

The primary shell must **not** be assembled from unrelated boxes.

Use:

- a 2D `Shape` for the outer sewing-machine profile
- a `Path` hole for the throat opening
- `ExtrudeGeometry` with shallow depth and bevel to create the continuous shell
- separate rounded geometry for base and front-head mass
- cylinders for wheel, knobs, spool and mechanical rods
- tube geometry for the thread path

This keeps the recognizable C-shaped silhouette while remaining procedural Three.js code.

## Phase 1 material

Clay only. No photo texture and no floral relief.

## Animation anchors

Must remain separately addressable:

- `handWheel`
- `needleAssembly`
- `threadSpool`
- `threadPath`

Current idle animation:

- hand wheel: slow rotation
- needle assembly: subtle vertical reciprocation

## Uncertainty

- rear shell geometry: inferred
- exact depth: inferred
- rear wheel mounting: inferred
- lower mechanical linkage: intentionally omitted at Phase 1

Do not claim manufacturing accuracy.
