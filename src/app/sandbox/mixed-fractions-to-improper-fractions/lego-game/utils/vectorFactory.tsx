import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


export const createVectorArrow = (start: THREE.Vector3 | number[], end: THREE.Vector3 | number[], options: {
  color?: number;
  arrowHeadSize?: number;
  thickness?: number;
  curvature?: number;
  linewidth?: number;
} = {}) => {
  const {
    color = 0xff0000,
    arrowHeadSize = 0.02,
    thickness = 0.1,
    curvature = 2,
    linewidth = 0.5,
  } = options;

  const arrowGroup = new THREE.Group();

  // Convert positions to Vector3 if they aren't already
  const startVec = start instanceof THREE.Vector3 ? start : new THREE.Vector3(...start);
  const endVec = end instanceof THREE.Vector3 ? end : new THREE.Vector3(...end);

  // Create a curved line
  const controlPoint = new THREE.Vector3(
    (startVec.x + endVec.x) / 2, 
    (startVec.y + endVec.y) / 2 + curvature, 
    (startVec.z + endVec.z) / 2
  );

  const curve = new THREE.QuadraticBezierCurve3(startVec, controlPoint, endVec);
  const points = curve.getPoints(50);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth });
  const line = new THREE.Line(lineGeometry, lineMaterial);

  // Create arrow head
  const direction = new THREE.Vector3().subVectors(endVec, controlPoint).normalize();
  
  // Create arrow head geometry
  const coneGeometry = new THREE.ConeGeometry(thickness, arrowHeadSize, 3);
  const coneMaterial = new THREE.MeshBasicMaterial({ color });
  const arrowHead = new THREE.Mesh(coneGeometry, coneMaterial);

  // Position the arrow head
  arrowHead.position.copy(endVec);
  
  // Calculate the rotation for the arrow head
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  arrowHead.setRotationFromQuaternion(quaternion);

  // Add everything to the group
  arrowGroup.add(line);
  arrowGroup.add(arrowHead);

  return arrowGroup;
};