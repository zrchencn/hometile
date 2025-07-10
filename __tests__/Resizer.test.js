import { Resizer } from '../public/src/World/systems/Resizer.js';

describe('Resizer', () => {
  test('sets size on construction and on resize event', () => {
    const container = { clientWidth: 100, clientHeight: 50 };
    const camera = { updateProjectionMatrix: jest.fn(), aspect: 0 };
    const renderer = { setSize: jest.fn(), setPixelRatio: jest.fn() };
    // set window.devicePixelRatio for test
    Object.defineProperty(window, 'devicePixelRatio', { value: 2, configurable: true });
    const addEvent = jest.spyOn(window, 'addEventListener');
    const resizer = new Resizer(container, camera, renderer);

    expect(camera.aspect).toBe(2);
    expect(camera.updateProjectionMatrix).toHaveBeenCalled();
    expect(renderer.setSize).toHaveBeenCalledWith(100, 50);
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2);

    // simulate resize event
    const resizeCallback = addEvent.mock.calls.find(c => c[0] === 'resize')[1];
    container.clientWidth = 200;
    container.clientHeight = 100;
    resizeCallback();
    expect(camera.aspect).toBe(2); // 200/100
    expect(renderer.setSize).toHaveBeenCalledWith(200, 100);
    addEvent.mockRestore();
  });
});
