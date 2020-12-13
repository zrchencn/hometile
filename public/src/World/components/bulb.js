import {
    LatheBufferGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    Vector2,
    TextureLoader,
} from '../../../vendor/three/build/three.module.js';

import { createBulbLight } from './lights.js'

function createMaterial() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture
    const texture = textureLoader.load(
        './assets/textures/uv-test-col.png',
        // './assets/textures/crate1_diffuse.png',
    );

    // create a "standard" material using
    // the texture we just loaded as a color map
    const material = new MeshStandardMaterial({
        map: texture,
        opacity: 0.8,
        transparent: true,
    });

    return material;
}

// function createCube() {
//   const geometry = new BoxBufferGeometry(2, 2, 2);
//   const material = createMaterial();
//   const cube = new Mesh(geometry, material);

//   cube.rotation.set(-0.5, -0.1, 0.8);

//   const radiansPerSecond = MathUtils.degToRad(30);

//   cube.tick = (delta) => {
//     // increase the cube's rotation each frame
//     cube.rotation.z += delta * radiansPerSecond;
//     cube.rotation.x += delta * radiansPerSecond;
//     cube.rotation.y += delta * radiansPerSecond;
//   };

//   return cube;
// }

function createBulb() {
    const points = [];
    const radiansPerSecond = MathUtils.degToRad(30);
    for (let i = 0; i < 10; i++) {
        let pos = new Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2 - 4)
        pos.divideScalar(10)
        points.push(pos);
    }
    const geometry = new LatheBufferGeometry(points);
    const material = createMaterial();

    // geometry.translate(0.5, 0.5, 0.5)

    const bulb = new Mesh(geometry, material);

    bulb.rotation.x = MathUtils.degToRad(180)
    bulb.position.set(10, 12, 8)

    bulb.tick = (delta) => {
        // increase the bulb's rotation each frame
        //   bulb.rotation.z += delta * radiansPerSecond;
        //   bulb.rotation.x += delta * radiansPerSecond;
        bulb.rotation.y += delta * radiansPerSecond;
    };

    bulb.castShadow = true
    bulb.receiveShadow = true

    const light = createBulbLight()
    light.name = 'light'
    bulb.add(light)

    return bulb;
}

export { createBulb };
