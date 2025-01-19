import * as THREE from 'three';
import { COLORS } from './constants';

export const createLegoPiece = (color: number, depth: number) => {
  const group = new THREE.Group();
  group.name = 'LegoPieceGroup';

  const geometry = new THREE.BoxGeometry(0.9, 1, depth * 0.9);
  const material = new THREE.MeshStandardMaterial({ 
    color,
    metalness: 0.4,  // Very metallic
    roughness: 0.1,  // Very smooth/shiny
    transparent: false,
    opacity: 1,
    // envMapIntensity: 1  // Increase environment map reflection
  });
  const piece = new THREE.Mesh(geometry, material);
  piece.name = 'LegoPieceBody';

  // Enable shadow casting and receiving
  piece.castShadow = true;
  piece.receiveShadow = true;

  // Add white thin border at edges
  const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: COLORS.WHITE, linewidth: 10 });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  edges.name = 'LegoPieceEdges';
  group.add(edges);

  // Add stud on top
  const studGeometry = new THREE.CylinderGeometry(0.16, 0.16, 0.3, 16);
  const studMaterial = new THREE.MeshStandardMaterial({ 
    color: COLORS.WHITE,
    metalness: 0.2,  // Very metallic
    roughness: 0.1   // Very smooth/shiny
  });
  const stud = new THREE.Mesh(studGeometry, studMaterial);
  stud.name = 'LegoStud';
  stud.position.y = 0.6;
  
  // Enable shadow for stud
  stud.castShadow = true;
  stud.receiveShadow = true;
  
  group.add(stud);

  group.add(piece);

  return group;
};