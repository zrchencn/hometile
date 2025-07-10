export function movePositionBy(obj, x, y, z) {
  obj.position.set(obj.position.x + x, obj.position.y + y, obj.position.z + z);
}

export function getSelectedBound(objects) {
  let first = true;
  let xMin, yMin, zMin, xMax, yMax, zMax;
  objects.forEach(o => {
    if (o.name.includes('selected')) {
      if (first) {
        xMax = o.position.x;
        xMin = o.position.x;
        yMin = o.position.y;
        yMax = o.position.y;
        zMin = o.position.z;
        zMax = o.position.z;
        first = false;
      }
      xMax = Math.max(xMax, o.position.x);
      yMax = Math.max(yMax, o.position.y);
      zMax = Math.max(zMax, o.position.z);
      xMin = Math.min(xMin, o.position.x);
      yMin = Math.min(yMin, o.position.y);
      zMin = Math.min(zMin, o.position.z);
    }
  });
  return { xMin, yMin, zMin, xMax, yMax, zMax };
}

export function getBoundFurniture(objects) {
  const arr = [];
  const { xMin, yMin, zMin, xMax, yMax, zMax } = getSelectedBound(objects);
  objects.forEach(o => {
    if (o.name.includes('furniture')) {
      if ((o.position.x >= xMin && o.position.x <= xMax) &&
          (o.position.z >= (zMin - 0.3) && o.position.z <= (zMax + 0.3)) &&
          (o.position.y >= (yMin - 0.6) && o.position.y <= (yMax + 0.6))) {
        arr.push(o);
      }
    }
  });
  return arr;
}
