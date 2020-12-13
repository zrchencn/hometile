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
    './assets/textures/uv-test-bw.png',
    // './assets/textures/crate1_diffuse.png',
  );

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    map: texture,
  });

  return material;
}

function createCube() {
  const geometry = new BoxBufferGeometry(1, 1, 1);
  // geometry.translate(0.5, 0.5, 0.5)
  const material = createMaterial();
  const cube = new Mesh(geometry, material);

  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += delta * radiansPerSecond;
    cube.rotation.x += delta * radiansPerSecond;
    cube.rotation.y += delta * radiansPerSecond;
  };

  cube.castShadow = true
  cube.receiveShadow = true

  return cube;
}

export { createCube };
