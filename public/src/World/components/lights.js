import { AmbientLight, DirectionalLight, PointLight, RectAreaLight } from '../../../vendor/three/build/three.module.js';

function createLights() {
  // const light = new DirectionalLight('white', 4);
  // light.target.position.set(10, 0, 16)
  const light = new AmbientLight('white', 0.5)
  // const light = new PointLight('white', 400, 0, 2)
  const windowLight = new RectAreaLight('white', 30, 2, 4)

  // light.castShadow = true;
  // light.shadowDarkness = 0.5;
  // light.shadowCameraVisible = true;



  //direct light pos
  // light.position.set(1, 1, 1);

  // light.position.set(10, 50, -50)

  // point light pos(ceiling)
  light.position.set(10, 12, 8);

  //rectArea light pos(window)
  windowLight.position.set(6, 3, 0)

  return { light };
}

function createBulbLight() {
  const light = new PointLight('white', 600, 0, 2)
  light.castShadow = true;
  light.shadowDarkness = 0.5;
  light.shadowCameraVisible = true;
  return light
}


function createRectLight(width, height, color) {
  let colour = (color !== undefined) ? color : 'white';
  const rectLight = new RectAreaLight(colour, 10, -width / 2, height)
  const rectLight2 = new RectAreaLight(colour, 10, width / 2, height)
  // rectLight.castShadow = true;
  // rectLight.shadowDarkness = 0.5;
  // rectLight.shadowCameraVisible = true;
  // rectLight2.castShadow = true;
  // rectLight2.shadowDarkness = 0.5;
  // rectLight2.shadowCameraVisible = true;
  return { rectLight, rectLight2 }
}

export { createLights, createRectLight, createBulbLight };
