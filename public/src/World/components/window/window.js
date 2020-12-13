import { OBJLoader } from
    '../../../../vendor/three/examples/jsm/loaders/OBJLoader.js';

import { setupModel } from './setupModel.js';

import { createRectLight } from '../lights.js';

import {
    MathUtils,
    MeshStandardMaterial,
} from '../../../../vendor/three/build/three.module.js';

async function createWindow(colour) {
    const loader = new OBJLoader();

    const [win, sofa, bed, table] = await Promise.all([
        loader.loadAsync('./assets/models/window.obj'),
        loader.loadAsync('./assets/models/sofa.obj'),
        loader.loadAsync('./assets/models/bed.obj'),
        loader.loadAsync('./assets/models/table.obj'),
    ]);

    const objs = [win, sofa, bed, table]
    objs.forEach(o => {
        o.children.forEach(child => {
            child.material = new MeshStandardMaterial()
        })
    })

    sofa.scale.set(2, 2, 2)
    sofa.position.set(0, 0.31 - 0.5, 0)

    bed.scale.set(.018, .019, .02)
    bed.rotation.x = MathUtils.degToRad(-90);
    bed.position.set(0, 1.05 - 0.5, 0)

    table.scale.set(.02, .02, .02)
    table.rotation.y = MathUtils.degToRad(90);
    table.position.set(0, 0.27 - 0.5, 0)

    win.scale.set(.03, .05, .05)
    win.rotation.y = MathUtils.degToRad(-90);
    win.position.set(0, 0, .2 - 0.5)

    const { rectLight, rectLight2 } = createRectLight(2, 4, colour);
    win.add(rectLight)
    win.add(rectLight2)
    return { win, sofa, bed, table }
}

export { createWindow }