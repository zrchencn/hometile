import { createCube } from '../public/src/World/components/cube.js';

jest.mock('../public/vendor/three/build/three.module.js', () => {
  class BoxBufferGeometry {
    constructor(w, h, d) { this.w = w; this.h = h; this.d = d; }
  }
  class Mesh {
    constructor(geometry, material) {
      this.geometry = geometry;
      this.material = material;
      this.rotation = { x: 0, y: 0, z: 0 };
    }
  }
  class MeshStandardMaterial { constructor(opts) { this.opts = opts; } }
  class TextureLoader { load() { return {}; } }
  const MathUtils = { degToRad: n => n * Math.PI / 180 };
  return { BoxBufferGeometry, Mesh, MeshStandardMaterial, TextureLoader, MathUtils };
});

describe('createCube', () => {
  test('creates cube with tick that rotates', () => {
    const cube = createCube();
    expect(cube.castShadow).toBe(true);
    expect(cube.receiveShadow).toBe(true);
    cube.tick(0.1);
    const rad = (Math.PI / 6) * 0.1; // radiansPerSecond * delta
    expect(cube.rotation.x).toBeCloseTo(rad);
    expect(cube.rotation.y).toBeCloseTo(rad);
    expect(cube.rotation.z).toBeCloseTo(rad);
  });
});
