import {
    BoxBufferGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
} from '../../../vendor/three/build/three.module.js';

function createMaterial() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture
    const texture = textureLoader.load(
        './assets/textures/uv-test-col.png',
    );

    // create a "standard" material using
    // the texture we just loaded as a color map
    const material = new MeshStandardMaterial({
        map: texture,
    });

    return material;
}

const rand = (min, max) => {
    if (max === undefined) {
        max = min; min = 0;
    }
    return min + (max - min) * Math.random();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function createCubes() {
    let arr = []
    const num = 5
    const geometry = new BoxBufferGeometry(1, 1, 1);
    // geometry.translate(0.5, 0.5, 0.5)
    const material = createMaterial();

    for (let i = 0; i < num; ++i) {
        const cube = new Mesh(geometry, material);
        // cube.position.set(rand(0, 10) + 0.5, rand(0, 10) + 0.5, rand(0, 10) + 0.5)
        cube.position.set(getRandomInt(10) + 0.5, getRandomInt(10) + 0.5, getRandomInt(10) + 0.5)
        cube.name = `${cube.position.x - 0.5},${cube.position.y - 0.5},${cube.position.z - 0.5}`
        // cube.position.set(getRandomInt(10), getRandomInt(10), getRandomInt(10))
        arr.push(cube)
    }

    return arr;
}

export { createCubes };
