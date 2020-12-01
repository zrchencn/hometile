import { AxesHelper, GridHelper, MathUtils } from '../../../vendor/three/build/three.module.js';

function createAxesHelper() {
    const helper = new AxesHelper(3);
    // helper.position.set(-4, 0, -4);
    return helper;
}

function createGridHelper() {
    const size = 100
    const s = size / 2
    let arr = []
    const helperYZ = new GridHelper(size, size, 'black', 'black');
    const helperXZ = new GridHelper(size, size, 'black', 'black');
    const helperXY = new GridHelper(size, size, 'black', 'black');
    //yz
    helperYZ.rotation.z = MathUtils.degToRad(90);
    helperYZ.position.set(0, s, s)
    arr.push(helperYZ)
    //xz
    helperXZ.position.set(s, 0, s)
    arr.push(helperXZ)
    //xy
    helperXY.rotation.x = MathUtils.degToRad(90);
    helperXY.position.set(s, s, 0)
    arr.push(helperXY)
    return arr;
}

export { createAxesHelper, createGridHelper };