import * as THREE from 'three';

export const animateCamera = (camera: THREE.OrthographicCamera, targetPosition: THREE.Vector3, duration: number) => {
  if (!camera) return;
  const startPosition = camera.position.clone();
  const startTime = performance.now();

  const animateCamera = (time: number) => {
    const elapsed = (time - startTime) / 1000; // convert to seconds
    const progress = Math.min(elapsed / duration, 1); // clamp to [0, 1]

    camera.position.lerpVectors(startPosition, targetPosition, progress);

    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  };

  requestAnimationFrame(animateCamera);
}

export const animatePiece = (piece: THREE.Group, targetPosition: THREE.Vector3, duration: number) => {
  if (!piece) return;
  const startPosition = piece.position.clone();
  const startTime = performance.now();

  const animate = (time: number) => {
    const elapsed = (time - startTime) / 1000; // convert to seconds
    const progress = Math.min(elapsed / duration, 1); // clamp to [0, 1]

    piece.position.lerpVectors(startPosition, targetPosition, progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
