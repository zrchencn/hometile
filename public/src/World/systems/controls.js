import { OrbitControls } from '../../../vendor/three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from '../../../vendor/three/examples/jsm/controls/FirstPersonControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  // const controls = new FirstPersonControls(camera, canvas);

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true;
  controls.enableDamping = true;

  controls.tick = () => { controls.update() };

  return controls;
}

export { createControls };
