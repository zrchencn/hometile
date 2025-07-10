import { Loop } from '../public/src/World/systems/Loop.js';

jest.mock('../public/vendor/three/build/three.module.js', () => {
  return {
    Clock: jest.fn().mockImplementation(() => ({ getDelta: jest.fn(() => 0.16) }))
  };
});

describe('Loop', () => {
  test('tick calls tick on updatables with delta', () => {
    const renderer = { render: jest.fn(), setAnimationLoop: jest.fn() };
    const camera = {};
    const scene = {};
    const loop = new Loop(camera, scene, renderer);
    const obj = { tick: jest.fn() };
    loop.updatables.push(obj);
    loop.tick();
    expect(obj.tick).toHaveBeenCalledWith(0.16);
  });

  test('start and stop set animation loop correctly', () => {
    const renderer = { render: jest.fn(), setAnimationLoop: jest.fn() };
    const camera = {};
    const scene = {};
    const loop = new Loop(camera, scene, renderer);
    loop.start();
    expect(renderer.setAnimationLoop).toHaveBeenCalledTimes(1);
    const callback = renderer.setAnimationLoop.mock.calls[0][0];
    expect(typeof callback).toBe('function');
    renderer.setAnimationLoop.mockClear();
    loop.stop();
    expect(renderer.setAnimationLoop).toHaveBeenCalledWith(null);
  });
});
