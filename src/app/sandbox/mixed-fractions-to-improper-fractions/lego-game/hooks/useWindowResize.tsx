import { useEffect } from 'react';
import * as THREE from 'three';

interface UseWindowResizeProps {
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  mountRef: React.RefObject<HTMLDivElement>;
}

export const useWindowResize = ({ camera, renderer, mountRef }: UseWindowResizeProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, renderer, mountRef]);
};
