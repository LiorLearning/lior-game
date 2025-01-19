import * as THREE from 'three';

export const HOLDER_POSITION: [number, number, number] = [-2, 0, 0];

export const SNAPPABLE_POSITIONS = [
  new THREE.Vector3(0, 1, -4),
  new THREE.Vector3(0, 1, -2),
  new THREE.Vector3(2, 1, -4),
  new THREE.Vector3(2, 1, -2),
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(2, 1, 2),
  new THREE.Vector3(4, 1, -2),
  new THREE.Vector3(4, 1, 0),
  new THREE.Vector3(4, 1, 2),
  new THREE.Vector3(4, 1, 4),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2]),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 1),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 2),
  new THREE.Vector3(HOLDER_POSITION[0], HOLDER_POSITION[1], HOLDER_POSITION[2] + 3),
];

export const COLORS = {
  PINK: 0xff69b4,
  BLUE: 0x1e90ff,
  PURPLE: 0x800080,
  BLACK: 0x000000,
  GREEN: 0x66cc66, // Slightly muted green
  BROWN: 0xA0522D, // Sienna brown
  RED: 0xFF0000,
  ORANGE: 0xFFA500,
  YELLOW: 0xFFD700, // More golden yellow
  CYAN: 0x00FFFF,
  MAGENTA: 0xD625FE, // Vibrant magenta (deep pink)
  WHITE: 0xffffff,
  HOLDER_CELL: 0x7B3F00, // Vibrant brown
  HOLDER_BACK: 0xFFB300, // Bright yellowish brown
  HOLDER_BASE: 0x8B4513, // Slightly darker sienna
  HOLDER_EDGE: 0x8B5A2B, // Rich brown for edges
};

export const DURATION = 5000;