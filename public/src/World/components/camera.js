import { PerspectiveCamera, OrthographicCamera } from '../../../vendor/three/build/three.module.js';

function createCamera() {
  // const cons = 10

  const camera = new PerspectiveCamera(35, 1, 0.1, 200);
  // const camera = new OrthographicCamera(35, 1, 0.1, 100)

  // camera.position.set(cons * 2, cons * 2, cons * 2);

  return camera;
}

export { createCamera };
