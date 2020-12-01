import { WebGLRenderer, PCFSoftShadowMap } from '../../../vendor/three/build/three.module.js';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = PCFSoftShadowMap;

  return renderer;
}

export { createRenderer };
