import { movePositionBy, getSelectedBound, getBoundFurniture } from '../public/src/World/utils/index.js';

describe('utils', () => {
  test('movePositionBy adjusts object position', () => {
    const obj = { position: { x: 1, y: 2, z: 3, set(x,y,z){ this.x=x; this.y=y; this.z=z; } } };
    movePositionBy(obj, 2, 3, 4);
    expect(obj.position.x).toBe(3);
    expect(obj.position.y).toBe(5);
    expect(obj.position.z).toBe(7);
  });

  test('getSelectedBound returns correct bounds', () => {
    const objects = [
      { name: 'cube-selected', position: { x: 1, y: 2, z: 3 } },
      { name: 'cube-selected', position: { x: 2, y: 1, z: 5 } },
      { name: 'other', position: { x: 10, y: 10, z: 10 } }
    ];
    const bounds = getSelectedBound(objects);
    expect(bounds).toEqual({ xMin: 1, yMin: 1, zMin: 3, xMax: 2, yMax: 2, zMax: 5 });
  });

  test('getBoundFurniture returns furniture in selected bounds', () => {
    const objects = [
      { name: 'tile-selected', position: { x: 0, y: 0, z: 0 } },
      { name: 'tile-selected', position: { x: 2, y: 0, z: 0 } },
      { name: 'furniture', position: { x: 1, y: 0, z: 0 } },
      { name: 'furniture', position: { x: 5, y: 0, z: 0 } }
    ];
    const res = getBoundFurniture(objects);
    expect(res.length).toBe(1);
    expect(res[0]).toBe(objects[2]);
  });
});
