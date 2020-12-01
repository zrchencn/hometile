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





// this session is an import of three.js
// should move to seperate files


import { Vector2, MathUtils, Color, Vector3 } from '../../../vendor/three/build/three.module.js';
import { GUI } from './../../vendor/three/examples/jsm/libs/dat.gui.module.js'
// import { Vector3 } from '../../vendor/three/build/three.module.js';




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
  theme: 'normal'
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

    loop.updatables.push(controls);

    // stop the cube's animation
    // loop.updatables.push(cube);

    // scene.add(cube)

    scene.add(bulb)
    loop.updatables.push(bulb);

    scene.add(light)

    // scene.add(windowLight)




    // scene.add(window)

    // scene.add(cube, light);
    scene.add(createAxesHelper());
    createGridHelper().forEach(ele => {
      scene.add(ele)
    });
    wall.forEach(ele => {
      scene.add(ele)
      ele.name = 'wall'
      objects.push(ele)
    });
    // cubes.forEach(cub => {
    //   scene.add(cub)
    //   objects.push(cub)
    //   positions.push(getPos(cub.name))
    // })
    // scene.add(wall)

    const resizer = new Resizer(container, camera, renderer);



    document.addEventListener('mousedown', onDocumentMouseDown, false);






    const options = {
      color: new Color('indigo').getHex(),
      funitureKind: 'sofa',
      buildFurniture: async function () {
        let furni
        let center = new Vector3()
        objects.forEach(o => {
          // console.log(o.position)

          // if (o.name.includes('selected')) {
          //   o.visible = false
          // }
        }
        )

        const { xMin, yMin, zMin, xMax, yMax, zMax } = getSelectedBound()
        console.log(objects)
        console.log('max:', xMax, yMax, zMax)
        console.log('min:', xMin, yMin, zMin)
        center.set((xMax + xMin) / 2, (yMax + yMin) / 2, (zMax + zMin) / 2)
        console.log('MIDDLE', center)

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
        console.log(furni)
        scene.add(furni)
        objects.push(furni)
        movePositionBy(furni, center.x, center.y, center.z)
        furni.name = 'furniture'



      },
      uncoverAll: () => {
        objects.forEach(o => {
          o.visible = true
          // if (o.name.includes('selected')) {
          //   o.visible = true
          // }
          // console.log(o.name)
          // if (o.name.includes('furniture')) {
          //   o.visible = false
          //   console.log(o.name)
          // }
        })
        // console.log(objects.length)
      },
      coverAll: () => {
        objects.forEach(o => {
          o.visible = false
        })
        objects.forEach(o => {
          // console.log(o.position)

          // if (o.name.includes('selected')) {
          //   o.visible = false
          // }

          if (o.name.includes('furniture') || o.name.includes('wall')) {
            o.visible = true
            // console.log(o.name)
          }
        })
      }
    }


    const mods = {
      remove: function () {
        let furs = getBoundFurniture()
        // console.log('before', objects)
        furs.forEach(f => {
          objects = objects.filter(ele => ele.uuid !== f.uuid)
          scene.remove(f)
        })
        // console.log('after', objects)
        console.log(objects)
      },
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,

    }

    const bulbOption = {
      bulbX: bulb.position.x,
      bulbY: bulb.position.y,
      bulbZ: bulb.position.z,
      rotating: true
    }

    const windows = {

    }


    const gui = new GUI()
    const cubeFolder = gui.addFolder("Tiles")
    cubeFolder.addColor(options, 'color')
    cubeFolder.add(options, 'funitureKind', ['sofa', 'bed', 'table', 'window'])
    cubeFolder.add(options, 'buildFurniture')
    cubeFolder.add(options, 'uncoverAll')
    cubeFolder.add(options, 'coverAll')
    const modFolder = gui.addFolder('Mods')
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
    bulbFolder.add(bulbOption, 'rotating').onChange(() => {
      if (!bulbOption.rotating) {
        loop.updatables = loop.updatables.filter(e => { e.uuid !== bulb.uuid })
      }
      else {
        loop.updatables.push(bulb)
      }
    })

    const resetWall = () => {
      objects.forEach(o => {
        if (o.name === 'wall') {
          scene.remove(o)
          objects = objects.filter(ele => ele.uuid !== o.uuid)
        }
      })
      // console.log(objects.length)
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
    sizeFolder.add(size, 'theme', ['normal', 'cyberpunk']).onChange(resetWall)

    cubeFolder.open()
    modFolder.open()
    bulbFolder.open()
    sizeFolder.open()









  }

  async init() {
    // const { win, sofa, bed, table } = await createWindow()

    // // console.log('win:', win)
    // // console.log('sofa', sofa)






    // win.scale.set(.03, .05, .05)
    // win.rotation.y = MathUtils.degToRad(-90);
    // win.position.set(6, 3, .2)

    // const win2 = win.clone()

    // const { rectLight, rectLight2 } = createRectLight(2, 4, 'indigo');
    // win.add(rectLight)
    // win.add(rectLight2)


    // const { rectLight: rectLight3, rectLight2: rectLight4 } = createRectLight(2, 4, 'cyan');

    // win2.position.set(2, 5, .2)
    // win2.add(rectLight3)
    // win2.add(rectLight4)



    // movePositionBy(sofa, 2, 0, 2)
    // // sofa.scale.set(2, 2, 2)
    // // sofa.position.set(2, 0.31, 2)
    // // console.log(sofa.children)

    // bed.scale.set(.018, .019, .02)
    // bed.rotation.x = MathUtils.degToRad(-90);
    // bed.position.set(6.5, 1.05, 3.2)

    // table.scale.set(.02, .02, .02)
    // table.rotation.y = MathUtils.degToRad(90);
    // // bed.position.set(6.5, 1, 3.2)
    // table.position.set(2.5, 0.27, 4)





    // scene.add(win2)
    // scene.add(win)
    // scene.add(sofa)
    // scene.add(bed)
    // scene.add(table)


    // sofa.castShadow = true
    // sofa.receiveShadow = true
    // bed.castShadow = true
    // bed.receiveShadow = true
    // table.castShadow = true
    // table.receiveShadow = true









    //GUI














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
  // console.log('window')
  // console.log(window.innerWidth)
  // console.log(window.innerHeight)
  mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
  // console.log(mouse)
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
      // intersect.material.emissive.setHex(0xFF0000)

    }
    if (event.which === 1) {
      const intersect = intersects[0]
      const tempCube = createCube()

      // console.log(intersect.point)
      tempCube.position.copy(intersect.point).add(intersect.face.normal.divideScalar(2))
      tempCube.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
      tempCube.position.x = Math.abs(tempCube.position.x)
      tempCube.position.y = Math.abs(tempCube.position.y)
      tempCube.position.z = Math.abs(tempCube.position.z)

      // console.log(tempCube.position)
      tempCube.name = `${tempCube.position.x - 0.5},${tempCube.position.y - 0.5},${tempCube.position.z - 0.5}`
      // positions.push(getPos(tempCube.name))
      scene.add(tempCube)
      objects.push(tempCube)
      // console.log(objects)
    }

    if (event.which === 2) {
      const intersect = intersects[0].object
      console.log(intersect)
      // intersect.material = new Color(0xff3333)
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
    // console.log(objects)

  }
  // console.log(objects)
  // console.log(intersects)
  // getPattern(positions)
}



function movePositionBy(obj, x, y, z) {
  obj.position.set(obj.position.x + x, obj.position.y + y, obj.position.z + z)
}

function getSelectedBound() {
  let first = true
  let xMin, yMin, zMin, xMax, yMax, zMax
  objects.forEach(o => {
    // console.log(o.position)

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
    console.log('xMin', 'yMin', 'zMin', 'xMax', 'yMax', 'zMax', xMin, yMin, zMin, xMax, yMax, zMax)
    console.log('furniture', o)
    if (o.name.includes('furniture')) {
      if ((o.position.x >= xMin && o.position.x <= xMax) && (o.position.z >= (zMin - 0.3) && o.position.z <= (zMax + 0.3))
        && (o.position.y >= (yMin - 0.6) && o.position.y <= (yMax + 0.6))
      ) {
        arr.push(o)
      }
      // if (o.position.x >= xMin && o.position.x <= xMax
      //   && o.position.y >= yMin - 0.5 && o.position.x <= yMax + 0.5
      //   && o.position.z >= zMin && o.position.z <= zMax) {
      //   console.log("HAHA")
      //   arr.push(o)
      // }
    }
  })
  return arr
}











// //convert string based position to position object
// function getPos(str) {
//   let poses = str.split(',')
//   return {
//     x: parseInt(poses[0]),
//     y: parseInt(poses[1]),
//     z: parseInt(poses[2])
//   }
// }

// function getPattern(poses) {
//   // console.log(poses)
//   let arrXZ = poses.filter(ele => ele.y === 0)
//   let arrXY = poses.filter(ele => ele.z === 0)
//   let arrYZ = poses.filter(ele => ele.x === 0)


//   // console.log(arrXY)
//   for (let i = 0; i < arrXY.length; ++i) {
//     for (let j = 0; j < arrXY.length; ++j) {
//       if (i !== j) {
//         let smallX = Math.min(arrXY[i].x, arrXY[j].x)
//         let smallY = Math.min(arrXY[i].y, arrXY[j].y)
//         console.log('smallX')
//         console.log(smallX)
//         console.log('smallY')
//         console.log(smallY)
//         console.log(" ")
//         for (let m = 0; m < Math.abs(arrXY[i].x - arrXY[j].x); ++m) {
//           for (let n = 0; n < Math.abs(arrXY[i].y - arrXY[i].y); ++n) {
//             let temp = arrXY.some(ele => {
//               return ele.x === smallX + m && ele.y === smallY + n
//             }
//             )
//             console.log(temp)
//           }
//         }
//       }
//     }
//   }

//   //findWindow on XY and YZ

//   //find bed and table on XZ


//   return true
// }

export { World };
