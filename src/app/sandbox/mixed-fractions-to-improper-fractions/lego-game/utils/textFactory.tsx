import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { COLORS } from './constants';

const getOrthogonalVector = (position: [number, number, number] | THREE.Vector3) => {
  const pos = Array.isArray(position) ? position : [position.x, position.y, position.z];
  return new THREE.Vector3(pos[0] + 1, pos[1] + 1, pos[2] + 1);
};

export const createText = (
  scene: THREE.Scene,
  position: [number, number, number],
  value: string,
  options: {
    textColor?: number;
    bgColor?: number;
    orientation?: 'axial' | 'orthogonal' | 'top';
    size?: number;
    offset?: [number, number, number];
    centered?: boolean;
  } = {}
) => {
  if (!scene) return null;

  const textGroup = new THREE.Group();
  const quality = 'high';

  // Quality presets
  const qualitySettings = {
    high: {
      curveSegments: 12,
      bevelSegments: 8,
      bevelSize: 0.005, // Reduced from 0.015
      bevelThickness: 0.001, // Reduced from 0.015
      height: 0.01 // Reduced from 0.04
    },
  };

  const fontLoader = new FontLoader();
  

  const jersey = 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/fonts/Jersey+25+Regular.json';
  // const k2d = 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/fonts/K2D+SemiBold+Regular.json'
  // const droid = 'https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json'
  fontLoader.load(jersey, (font) => {
    const settings = qualitySettings[quality];
    const textGeom = new TextGeometry(value, {
      font: font,
      size: options.size || 0.25,
      height: settings.height,
      curveSegments: settings.curveSegments,
      bevelEnabled: true,
      bevelThickness: settings.bevelThickness,
      bevelSize: settings.bevelSize,
      bevelSegments: settings.bevelSegments
    });

    const rotations = {
      axial: new THREE.Euler(0, Math.PI / 2, 0),
      top: new THREE.Euler(0, 0, 0)
    };
    const selectedOrientation = options.orientation || 'axial';

    // Enhanced materials with better visual quality
    if (options.textColor !== undefined && !options.bgColor) {
      const textMat = new THREE.MeshStandardMaterial({
        color: options.textColor,
        opacity: 1,
        transparent: false,
        envMapIntensity: 1
      });
      
      // Add subtle normal mapping for enhanced detail
      const normalMap = new THREE.TextureLoader().load('https://threejs.org/examples/textures/normal/normal_map.jpg');
      textMat.normalMap = normalMap;
      textMat.normalScale.set(0.5, 0.5);

      const textMesh = new THREE.Mesh(textGeom, textMat);
      
      textMesh.position.set(position[0], position[1], position[2]);
      
      if (selectedOrientation === 'orthogonal') {
        textMesh.lookAt(getOrthogonalVector(position));
      } else {
        textMesh.rotation.copy(rotations[selectedOrientation]);
      }
      
      textGroup.add(textMesh);
    } 
    else if (options.bgColor !== undefined) {
      const textMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2
      });
      
      const bgMat = new THREE.MeshStandardMaterial({
        color: options.bgColor,
        metalness: 0.1,
        roughness: 0.3,
        envMapIntensity: 1.2
      });
      
      const borderMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0,
        roughness: 0.8
      });

      textGeom.computeBoundingBox();
      const textWidth = textGeom.boundingBox!.max.x - textGeom.boundingBox!.min.x;
      const textHeight = textGeom.boundingBox!.max.y - textGeom.boundingBox!.min.y;

      // Improved background dimensions for better text framing
      const padding = quality === 'high' ? 0.5 : 0.3; // Reduced padding
      const bgWidth = textWidth + padding;
      const bgHeight = textHeight + padding;
      const bgDepth = settings.height * 1.2; // Reduced depth
      
      const bgGeom = new THREE.BoxGeometry(bgWidth, bgHeight, bgDepth);
      const bgMesh = new THREE.Mesh(bgGeom, bgMat);
      // Removed castShadow and receiveShadow

      // Enhanced border with rounded edges
      const borderWidth = bgWidth + 0.04; // Reduced border width
      const borderHeight = bgHeight + 0.04; // Reduced border height
      const borderGeom = new THREE.BoxGeometry(borderWidth, borderHeight, bgDepth - 0.01);
      const borderMesh = new THREE.Mesh(borderGeom, borderMat);
      // Removed castShadow and receiveShadow

      const textMesh = new THREE.Mesh(textGeom, textMat);
      // Removed castShadow

      const finalPosition = [
        position[0] + (options.offset?.[0] || 0),
        position[1] + (options.offset?.[1] || 0),
        position[2] + (options.offset?.[2] || 0)
      ];

      // Improved text centering
      textGeom.computeBoundingBox();
      const centerOffset = new THREE.Vector3();
      textGeom.boundingBox!.getCenter(centerOffset);
      textGeom.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);

      // Adjusted layering for better depth perception
      const zOffset = quality === 'high' ? 0.01 : 0.008; // Reduced z-offset
      borderMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2]);
      bgMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2] + zOffset);
      textMesh.position.set(finalPosition[0], finalPosition[1], finalPosition[2] + zOffset * 2);
      
      if (selectedOrientation === 'orthogonal') {
        const target = getOrthogonalVector(position);
        [textMesh, bgMesh, borderMesh].forEach(mesh => mesh.lookAt(target));
      } else {
        const rotation = rotations[selectedOrientation];
        [textMesh, bgMesh, borderMesh].forEach(mesh => mesh.rotation.copy(rotation));
      }

      textGroup.add(borderMesh);
      textGroup.add(bgMesh);
      textGroup.add(textMesh);
    }
    else {
      const textMat = new THREE.MeshStandardMaterial({
        color: COLORS.PURPLE,
        metalness: 0.1,
        roughness: 0.3,
        envMapIntensity: 1
      });
      
      const textMesh = new THREE.Mesh(textGeom, textMat);
      // Removed castShadow and receiveShadow
      textMesh.position.set(position[0], position[1], position[2]);
      
      if (selectedOrientation === 'orthogonal') {
        textMesh.lookAt(getOrthogonalVector(position));
      } else {
        textMesh.rotation.copy(rotations[selectedOrientation]);
      }
      
      textGroup.add(textMesh);
    }

    scene.add(textGroup);
  });

  return textGroup;
};