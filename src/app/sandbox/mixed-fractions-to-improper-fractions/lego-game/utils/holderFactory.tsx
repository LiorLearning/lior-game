import * as THREE from 'three';
import { COLORS } from './constants';

export const createHolder = (scene: THREE.Scene, position: [number, number, number], count: number) => {
  const group = new THREE.Group();
  const wallDepth = 4 / count;
  const thickness = 0.02;

  // Create base holder
  const baseGeom = new THREE.BoxGeometry(1, thickness, 4);
  const baseMat = new THREE.MeshPhongMaterial({
    color: COLORS.HOLDER_BASE,
    transparent: false,
    shininess: 100,
    specular: 0x111111,
    reflectivity: 0.5
  });
  const baseMesh = new THREE.Mesh(baseGeom, baseMat);
  baseMesh.position.set(position[0], position[1]-0.5, position[2]+1.5);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  // Create back holder
  const backGeom = new THREE.BoxGeometry(thickness, 1, 4);
  const backMat = new THREE.MeshPhongMaterial({
    color: COLORS.HOLDER_BACK,
    transparent: false,
    shininess: 100,
    specular: 0x111111,
    reflectivity: 0.5
  });
  const backMesh = new THREE.Mesh(backGeom, backMat);
  backMesh.position.set(position[0]-0.5, position[1], position[2]+1.5);
  backMesh.castShadow = true;
  backMesh.receiveShadow = true;
  group.add(backMesh);

  // Create walls
  for (let i = 0; i < count+1; i++) {
    const cellGeom = new THREE.BoxGeometry(1, 1, thickness);
    const cellMat = new THREE.MeshPhongMaterial({
      color: COLORS.HOLDER_CELL,
      transparent: false,
      shininess: 100,
      specular: 0x111111,
      reflectivity: 0.5
    });

    const cellMesh = new THREE.Mesh(cellGeom, cellMat);
    cellMesh.position.set(position[0], position[1], position[2] - 0.5 + i * wallDepth);
    
    // Add subtle border
    const edgeGeometry = new THREE.EdgesGeometry(cellGeom);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: COLORS.HOLDER_EDGE, linewidth: 2 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cellMesh.add(edges);

    cellMesh.castShadow = true;
    cellMesh.receiveShadow = true;
    group.add(cellMesh);
  }

  scene.add(group);
  return { group };
};