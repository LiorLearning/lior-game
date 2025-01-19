import * as THREE from 'three';

export const setupLights = (scene: THREE.Scene) => {
  const lights = new THREE.Group();

  // Bright white directional light with very high intensity for shiny objects
  const mainLight = new THREE.DirectionalLight(0xffffff, 3);
  mainLight.position.set(10, 20, -10);
  mainLight.castShadow = true;
  mainLight.intensity = 4; // Significantly increased intensity for extra brightness
  lights.add(mainLight);

  // Bright white ambient light with higher intensity for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  lights.add(ambientLight);

  // Bright point lights to enhance shine and highlight surfaces
  const textPositions = [
    [-2, 2, 3],        // Central position covering most areas
    [0, 4, 5],         // Higher elevated position
    [-5, 3, 6]         // Offset position to ensure full coverage
  ];

  textPositions.forEach(pos => {
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(pos[0] + 2, pos[1] + 2, pos[2] + 2);
    lights.add(pointLight);
  });

  scene.add(lights);
  return lights;
};