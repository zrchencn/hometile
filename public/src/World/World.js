import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights, createRectLight } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createWall } from './components/wall.js';
import { createCubes } from './components/cubes.js'
import { createWindow } from './components/window/window.js'
import { createBulb } from './components/bulb.js'

import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createRaycaster } from './systems/Picker.js'
import { Vector2, MathUtils, Color, Vector3 } from '../../../vendor/three/build/three.module.js';
import { GUI } from './../../vendor/three/examples/jsm/libs/dat.gui.module.js'

let camera;
let renderer;
let scene;
let loop;
let raycaster;

let mouse = new Vector2()
let objects = []
let positions = []
const size = {
  sizeX: 20,
  sizeY: 12,
  sizeZ: 16,
  theme: 'normal',
  grid: true
}

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    raycaster = createRaycaster();
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const cube = createCube();
    const bulb = createBulb()
    const cubes = createCubes()
    let wall = createWall(size);
    const { light } = createLights();

    camera.position.set(size.sizeX * 1.3, size.sizeY * 1.4, size.sizeZ * 2.8);
    // camera.position.set(size.sizeX * 1.6, size.sizeY * 1.4, size.sizeZ * 2.3);
    loop.updatables.push(controls);
    scene.add(bulb)
    loop.updatables.push(bulb);
    scene.add(light)
    scene.add(createAxesHelper());
    createGridHelper().forEach(ele => {
      ele.name = 'helper'
      scene.add(ele)
    });
    wall.forEach(ele => {
      scene.add(ele)
      ele.name = 'wall'
      objects.push(ele)
    });

    const resizer = new Resizer(container, camera, renderer);

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    const options = {
      color: new Color('indigo').getHex(),
      funitureKind: 'sofa',
      buildFurniture: async function () {
        let furni
        let center = new Vector3()
        objects.forEach(o => {
        }
        )

        const { xMin, yMin, zMin, xMax, yMax, zMax } = getSelectedBound()
        // console.log(objects)
        // console.log('max:', xMax, yMax, zMax)
        // console.log('min:', xMin, yMin, zMin)
        center.set((xMax + xMin) / 2, (yMax + yMin) / 2, (zMax + zMin) / 2)
        // console.log('MIDDLE', center)

        if (options.funitureKind === 'sofa') {
          const { sofa } = await createWindow()
          furni = sofa
        }
        else if (options.funitureKind === 'bed') {
          const { bed } = await createWindow()
          furni = bed
        }
        else if (options.funitureKind === 'table') {
          const { table } = await createWindow()
          furni = table
        }
        else if (options.funitureKind === 'window') {
          const { win } = await createWindow(options.color)
          furni = win
        }
        scene.add(furni)
        objects.push(furni)
        movePositionBy(furni, center.x, center.y, center.z)
        furni.name = 'furniture'
      },
      uncoverAll: () => {
        objects.forEach(o => {
          o.visible = true
        })
      },
      coverAll: () => {
        objects.forEach(o => {
          o.visible = false
        })
        objects.forEach(o => {
          if (o.name.includes('furniture') || o.name.includes('wall')) {
            o.visible = true
          }
        })
      }
    }

    const mods = {
      remove: function () {
        let furs = getBoundFurniture()
        furs.forEach(f => {
          objects = objects.filter(ele => ele.uuid !== f.uuid)
          scene.remove(f)
        })
        console.log(objects)
      },
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    }

    const bulbOption = {
      color: new Color('white').getHex(),
      bulbX: bulb.position.x,
      bulbY: bulb.position.y,
      bulbZ: bulb.position.z,
      rotating: true
    }

    const gui = new GUI()
    const cubeFolder = gui.addFolder("Tiles")
    cubeFolder.addColor(options, 'color')
    cubeFolder.add(options, 'funitureKind', ['sofa', 'bed', 'table', 'window'])
    cubeFolder.add(options, 'buildFurniture').name('build furniture')
    cubeFolder.add(options, 'uncoverAll').name('display tiles')
    cubeFolder.add(options, 'coverAll').name("hide tiles")
    const modFolder = gui.addFolder('Furniture')
    modFolder.add(mods, 'remove')
    modFolder.add(mods, 'rotateY', 0, 360, 0.2).onChange(function () {
      let furs = getBoundFurniture()
      furs.forEach(f => {
        f.rotation.y = MathUtils.degToRad(mods.rotateY)
      })
    })
    modFolder.add(mods, 'rotateX', 0, 360, 0.2).onChange(function () {
      let furs = getBoundFurniture()
      furs.forEach(f => {
        f.rotation.x = MathUtils.degToRad(mods.rotateX)
      })
    })
    modFolder.add(mods, 'rotateZ', 0, 360, 0.2).onChange(function () {
      let furs = getBoundFurniture()
      furs.forEach(f => {
        f.rotation.z = MathUtils.degToRad(mods.rotateZ)
      })
    })

    const bulbFolder = gui.addFolder('Bulb')
    bulbFolder.add(bulbOption, 'bulbX', 0, 20, 0.1).onChange(() => { bulb.position.x = bulbOption.bulbX })
    bulbFolder.add(bulbOption, 'bulbY', 0, 20, 0.1).onChange(() => { bulb.position.y = bulbOption.bulbY })
    bulbFolder.add(bulbOption, 'bulbZ', 0, 16, 0.1).onChange(() => { bulb.position.z = bulbOption.bulbZ })
    bulbFolder.addColor(bulbOption, 'color').onChange(() => {
      bulb.children.forEach(e => {
        if (e.name === "light") {
          e.color.setHex(bulbOption.color);
        }
      })
    })
    bulbFolder.add(bulbOption, 'rotating').onChange(() => {
      if (!bulbOption.rotating) {
        loop.updatables = loop.updatables.filter(e => { e.uuid !== bulb.uuid })
      }
      else {
        loop.updatables.push(bulb)
      }
    })

    const toggleGrid = () => {
      scene.children.forEach(e => {
        if (e.name === 'helper') {
          e.visible = !e.visible
        }
      })
    }

    const resetWall = () => {
      objects.forEach(o => {
        if (o.name === 'wall') {
          scene.remove(o)
          objects = objects.filter(ele => ele.uuid !== o.uuid)
        }
      })
      wall = createWall(size, size.theme)
      wall.forEach(ele => {
        scene.add(ele)
        ele.name = 'wall'
        objects.push(ele)
      })
      bulb.position.set(size.sizeX / 2, size.sizeY, size.sizeZ / 2)
    }

    const sizeFolder = gui.addFolder('room')
    sizeFolder.add(size, 'sizeX').onChange(resetWall)
    sizeFolder.add(size, 'sizeY').onChange(resetWall)
    sizeFolder.add(size, 'sizeZ').onChange(resetWall)
    sizeFolder.add(size, 'grid').onChange(toggleGrid)
    sizeFolder.add(size, 'theme', ['normal', 'cyberpunk']).onChange(resetWall)

    cubeFolder.open()
    modFolder.open()
    bulbFolder.open()
    sizeFolder.open()
  }

  async init() {
    const { win, sofa, bed, table } = await createWindow()

    movePositionBy(sofa, 2, 0.5, 3)
    sofa.rotation.y = MathUtils.degToRad(90)
    scene.add(sofa)

    movePositionBy(bed, 10, 0.5, 8)
    scene.add(bed)
    const bed2 = bed.clone()
    movePositionBy(bed2, 6, 0, 0)
    scene.add(bed2)

    const table2 = table.clone()
    table.rotation.y = MathUtils.degToRad(0)
    movePositionBy(table, 5, 0.5, 4)
    scene.add(table)


    movePositionBy(table2, 13.5, 0.5, 6.5)
    scene.add(table2)

    movePositionBy(win, 10, 6, 0.5)
    scene.add(win)

    win.name = 'furniture'
    table.name = 'furniture'
    table2.name = 'furniture'
    sofa.name = 'furniture'
    bed.name = 'furniture'
    bed2.name = 'furniture'

    objects.push(win)
    objects.push(table)
    objects.push(table2)
    objects.push(sofa)
    objects.push(bed)
    objects.push(bed2)

    // sofa.castShadow = true
    // sofa.receiveShadow = true
    // bed.castShadow = true
    // bed.receiveShadow = true
    // table.castShadow = true
    // table.receiveShadow = true
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

function onDocumentMouseDown(event) {
  mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);
  if (intersects.length > 0) {
    if (event.which === 3) {
      const intersect = intersects[0].object
      console.log(intersect)
      if (intersect.name !== 'wall') {
        scene.remove(intersect)
        objects.splice(objects.indexOf(intersect), 1);
      }
    }
    if (event.which === 1) {
      const intersect = intersects[0]
      const tempCube = createCube()

      tempCube.position.copy(intersect.point).add(intersect.face.normal.divideScalar(2))
      tempCube.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
      tempCube.position.x = Math.abs(tempCube.position.x)
      tempCube.position.y = Math.abs(tempCube.position.y)
      tempCube.position.z = Math.abs(tempCube.position.z)

      tempCube.name = `${tempCube.position.x - 0.5},${tempCube.position.y - 0.5},${tempCube.position.z - 0.5}`
      scene.add(tempCube)
      objects.push(tempCube)
    }

    if (event.which === 2) {
      const intersect = intersects[0].object
      console.log(intersect)
      if (!intersect.name.includes('wall')) {
        if (!intersect.name.includes('selected')) {
          console.log('not selected branch', intersect)
          intersect.name = intersect.name + 'selected'
          intersect.material.color = new Color(0xff3333)
        }
        else if (intersect.name.includes('selected')) {
          console.log('selected branch', intersect)
          intersect.name = intersect.name.replace('selected', '')
          intersect.material.color = new Color()
        }
      }

    }
  }
}



function movePositionBy(obj, x, y, z) {
  obj.position.set(obj.position.x + x, obj.position.y + y, obj.position.z + z)
}

function getSelectedBound() {
  let first = true
  let xMin, yMin, zMin, xMax, yMax, zMax
  objects.forEach(o => {

    if (o.name.includes('selected')) {
      if (first) {
        xMax = o.position.x
        xMin = o.position.x
        yMin = o.position.y
        yMax = o.position.y
        zMin = o.position.z
        zMax = o.position.z
        first = false
      }
      xMax = Math.max(xMax, o.position.x)
      yMax = Math.max(yMax, o.position.y)
      zMax = Math.max(zMax, o.position.z)
      xMin = Math.min(xMin, o.position.x)
      yMin = Math.min(yMin, o.position.y)
      zMin = Math.min(zMin, o.position.z)
    }
  })
  return { xMin, yMin, zMin, xMax, yMax, zMax }
}

function getBoundFurniture() {
  let arr = []
  const { xMin, yMin, zMin, xMax, yMax, zMax } = getSelectedBound()
  objects.forEach(o => {
    // console.log('xMin', 'yMin', 'zMin', 'xMax', 'yMax', 'zMax', xMin, yMin, zMin, xMax, yMax, zMax)
    // console.log('furniture', o)
    if (o.name.includes('furniture')) {
      if ((o.position.x >= xMin && o.position.x <= xMax) && (o.position.z >= (zMin - 0.3) && o.position.z <= (zMax + 0.3))
        && (o.position.y >= (yMin - 0.6) && o.position.y <= (yMax + 0.6))
      ) {
        arr.push(o)
      }
    }
  })
  return arr
}
export { World };
