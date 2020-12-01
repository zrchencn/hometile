import { Raycaster, Vector2 } from '../../../vendor/three/build/three.module.js';

function createRaycaster() {
    const raycaster = new Raycaster()


    return raycaster;
}

// let mouse = new Vector2()
// let raycaster = new Raycaster()

// class Picker {
//     constructor(scene, camera, objects) {
//         this.scene = scene
//         this.camera = camera
//         this.objects = objects
//         this.raycaster = new Raycaster()

//     }

//     pick(event) {
//         mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
//         raycaster.setFromCamera(this.mouse, this.camera);
//         const intersects = raycaster.intersectObjects(this.objects);
//         if (intersects.length > 0) {

//             const intersect = intersects[0].object
//             // intersect.material.emissive.setHex(0xFF0000)
//             this.scene.remove(intersect)

//             console.log(intersect)

//         }
//     }
// }

export { createRaycaster };