import {
    PlaneBufferGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
} from '../../../vendor/three/build/three.module.js';

function createMaterial() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture

    const texture2 = textureLoader.load(
        './assets/textures/wall5.png',
        // './assets/textures/crate1_diffuse.png',
    );



    const material = new MeshStandardMaterial({
        map: texture2,
        bumpMap: texture2,
        // normalMap: texture
    });

    return material;
}

function createMaterial2() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture
    const texture = textureLoader.load(
        './assets/textures/stone.png',
        // './assets/textures/crate1_diffuse.png',
    );



    const material = new MeshStandardMaterial({
        map: texture,
        bumpMap: texture,
        // normalMap: texture
    });

    return material;
}


function createFloorMaterial() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture
    const texture = textureLoader.load(
        './assets/textures/floor.png',
        // './assets/textures/crate1_diffuse.png',
    );
    const material = new MeshStandardMaterial({
        map: texture,
        bumpMap: texture,
    });

    // const material = new MeshStandardMaterial({
    // });

    return material;
}

function createFloorMaterial2() {
    // create a texture loader.
    const textureLoader = new TextureLoader();

    // load a texture
    const textureColor = textureLoader.load(
        './assets/textures/cyber-colour.png',
        // './assets/textures/crate1_diffuse.png',
    );
    const textureBump = textureLoader.load(
        './assets/textures/cyber-bump.png',
        // './assets/textures/crate1_diffuse.png',
    );
    const textureNormal = textureLoader.load(
        './assets/textures/cyber-normal.png',
        // './assets/textures/crate1_diffuse.png',
    );
    const material = new MeshStandardMaterial({
        map: textureColor,
        bumpMap: textureBump,
        normalMap: textureNormal
    });

    // const material = new MeshStandardMaterial({
    // });

    return material;
}

function createWall(size, theme) {
    const { sizeX, sizeY, sizeZ } = size
    // const sizeX = 20
    // const sizeY = 12
    // const sizeZ = 16
    let material
    let floorMaterial

    let arr = []

    const geometryYZ = new PlaneBufferGeometry(sizeZ, sizeY);
    const geometryXZ = new PlaneBufferGeometry(sizeX, sizeZ);
    const geometryXY = new PlaneBufferGeometry(sizeX, sizeY);
    if (theme === 'cyberpunk') {
        material = createMaterial();
        floorMaterial = createFloorMaterial2();
    }
    else {
        material = createMaterial2();
        floorMaterial = createFloorMaterial();
    }



    const wallYZ = new Mesh(geometryYZ, material);
    const wallXZ = new Mesh(geometryXZ, floorMaterial);
    const wallXY = new Mesh(geometryXY, material);

    wallYZ.receiveShadow = true;
    wallXZ.receiveShadow = true;
    wallXY.receiveShadow = true;

    //yz
    wallYZ.rotation.y = MathUtils.degToRad(90);
    wallYZ.position.set(0, sizeY / 2, sizeZ / 2)
    arr.push(wallYZ)
    //xz
    wallXZ.rotation.x = MathUtils.degToRad(270);
    wallXZ.position.set(sizeX / 2, 0, sizeZ / 2)
    arr.push(wallXZ)
    //xy
    wallXY.position.set(sizeX / 2, sizeY / 2, 0)
    arr.push(wallXY)
    return arr;
}



export { createWall };
