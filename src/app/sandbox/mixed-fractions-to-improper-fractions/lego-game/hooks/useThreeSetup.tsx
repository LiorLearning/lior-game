import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupLights } from '../utils/lightSetup';

interface ThreeSetup {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  orbitControls: OrbitControls | null;
}

export const useThreeSetup = (mountRef: React.RefObject<HTMLDivElement>, hasInitialized: React.MutableRefObject<boolean>): ThreeSetup => {
  const [setup, setSetup] = useState<ThreeSetup>({
    scene: null,
    camera: null,
    renderer: null,
    orbitControls: null,
  });

  useEffect(() => {
    if (!mountRef.current || hasInitialized.current) return;
    hasInitialized.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Grid setup for visual reference and alignment
    // const gridHelper = new THREE.GridHelper(12, 12, 0x888888, 0xcccccc);
    // scene.add(gridHelper);

    // Camera setup with higher pixel ratio for better resolution
    const camera = new THREE.OrthographicCamera(
      -6, 6, 4, -4,
      0.1, 1000
    );
    camera.position.set(7, 10, 7);
    camera.lookAt(0, 0, 0);

    // Renderer setup with high-quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Higher quality shadows
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    setupLights(scene);

    // Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableRotate = false;
    orbitControls.enableZoom = false;

    // Improved animation loop with performance optimization
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // orbitControls.update();
    };
    animate();

    setSetup({ scene, camera, renderer, orbitControls });

    return () => {
      renderer.dispose();
      // orbitControls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return setup;
};