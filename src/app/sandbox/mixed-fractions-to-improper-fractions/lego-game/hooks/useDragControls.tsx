import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HOLDER_POSITION, SNAPPABLE_POSITIONS } from '../utils/constants';

interface DragControlsProps {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  /** The Meshes we want to make draggable. */
  dragObjects: THREE.Group[];
  /** Tracks which piece (if any) is occupying each container index. */
  containerAssignmentsRef: React.MutableRefObject<Array<THREE.Group | null>>;
  /** The OrbitControls in your scene. */
  orbitControls: OrbitControls | null;
  /**
   * Called at the end of a drag, passing the number of pieces 
   * that are currently snapped onto the container plane (y=1).
   */
  onDragEnd: (count: number) => void;
}

/**
 * A robust React hook that attaches drag-and-drop interaction
 * to the given meshes (`dragObjects`) and manages container/snapping logic.
 */
export const useDragControls = ({
  scene,
  camera,
  renderer,
  dragObjects,
  containerAssignmentsRef,
  orbitControls,
  onDragEnd,
}: DragControlsProps) => {
  const dragControlsRef = useRef<DragControls | null>(null);

  useEffect(() => {
    if (!scene || !camera || !renderer || dragObjects.length === 0 || !orbitControls) return;

    // Create the DragControls instance
    const controls = new DragControls(dragObjects, camera, renderer.domElement);
    controls.transformGroup = true;
    dragControlsRef.current = controls;

    // Initialize userData on each piece if needed
    dragObjects.forEach((piece) => {
      if (typeof piece.userData.containerIndex !== 'number') {
        piece.userData.containerIndex = -1;
      }
    });

    /**
     * Helper: Clear a container slot if it is currently occupied by this piece.
     */
    const clearContainerSlot = (mesh: THREE.Group) => {
      const prevIndex = mesh.userData.containerIndex;
      if (
        typeof prevIndex === 'number' &&
        prevIndex >= 0 &&
        prevIndex < containerAssignmentsRef.current.length
      ) {
        // Only clear if that slot is indeed occupied by this mesh
        if (containerAssignmentsRef.current[prevIndex] === mesh) {
          containerAssignmentsRef.current[prevIndex] = null;
          mesh.userData.containerIndex = -1;
        }
      }
    };

    /**
     * Helper: Assign this piece to a container slot (index).
     */
    const occupyContainerSlot = (mesh: THREE.Group, index: number) => {
      // Clear any previous occupant
      clearContainerSlot(mesh);

      // Just as a sanity check, also clear if any occupant is there
      const occupant = containerAssignmentsRef.current[index];
      if (occupant) {
        occupant.userData.containerIndex = -1;
      }
      containerAssignmentsRef.current[index] = mesh;
      mesh.userData.containerIndex = index;
    };

    /**
     * Attempt to snap the piece to the nearest available container slot.
     * If the best slot is within snapThreshold, snap and assign. Otherwise, fallback.
     */
    const handleSnap = (mesh: THREE.Group) => {
      const piecePos = mesh.position.clone();
      piecePos.y = HOLDER_POSITION[1] + 0.5; // Slightly above the holder plane

      let minDist = Infinity;
      let closestIndex = -1;
      SNAPPABLE_POSITIONS.forEach((pos, idx) => {
        // Only consider if unoccupied
        if (!containerAssignmentsRef.current[idx]) {
          const dist = piecePos.distanceTo(pos);
          if (dist < minDist) {
            minDist = dist;
            closestIndex = idx;
          }
        }
      });

      const snapThreshold = 2.5; // Adjust to taste
      if (closestIndex !== -1 && minDist < snapThreshold) {
        // Snap
        const snapPos = SNAPPABLE_POSITIONS[closestIndex].clone();
        snapPos.y += 0.1; // slightly above container plane
        mesh.position.copy(snapPos);
        // Occupy the container slot
        occupyContainerSlot(mesh, closestIndex);
      } else {
        // Fallback assignment
        handleFallback(mesh);
      }
    };

    /**
     * Fallback if we fail to snap to the ideal location.
     * This is where you can define your "default" or "lowest index" approach.
     */
    const handleFallback = (mesh: THREE.Group) => {
      // Attempt to find the first free slot
      const fallbackIndex = containerAssignmentsRef.current.findIndex((occupant) => occupant === null);
      if (fallbackIndex !== -1) {
        const fallbackPos = SNAPPABLE_POSITIONS[fallbackIndex].clone();
        fallbackPos.y += 0.1;
        mesh.position.copy(fallbackPos);
        occupyContainerSlot(mesh, fallbackIndex);
      } else {
        // If no free slot, do nothing or place it somewhere else
        console.warn('No fallback slot available. Leaving piece where it is.');
      }
    };

    // === Event: onDragStart ===
    const onDragStart = (event: THREE.Event) => {
      if (!orbitControls) return;
      orbitControls.enabled = false; // Disable orbiting while dragging
      const mesh = (event as unknown as { object: THREE.Object3D }).object as THREE.Group;
      const pieceBody = mesh.children.find(child => child.name === 'LegoPieceBody') as THREE.Mesh;
      const mat = pieceBody.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.6;

      // Clear old slot assignment if this piece was occupying a slot
      clearContainerSlot(mesh);
    };

    // === Event: onDrag === (optional if you want some live feedback)
    const onDrag = (event: THREE.Event) => {
      // For example, you can do real-time boundary checking, etc.
    };

    // === Event: onDragEnd ===
    const onDragEndInternal = (event: THREE.Event) => {
      if (!orbitControls) return;
      orbitControls.enabled = true;
      const mesh = (event as unknown as { object: THREE.Object3D }).object as THREE.Group;
      const pieceBody = mesh.children.find(child => child.name === 'LegoPieceBody') as THREE.Mesh;
      const mat = pieceBody.material as THREE.MeshStandardMaterial;
      mat.opacity = 1.0;

      // Attempt to snap
      handleSnap(mesh);

      // Count how many pieces are on the container plane (y ~ 1.0)
      const piecesAtYOne = dragObjects.filter((obj) => Math.abs(obj.position.y - 1) < 0.2).length;
      onDragEnd(piecesAtYOne);
    };

    // Attach listeners
    controls.addEventListener('dragstart', onDragStart);
    controls.addEventListener('drag', onDrag);
    controls.addEventListener('dragend', onDragEndInternal);

    return () => {
      // Clean up on unmount or re-init
      controls.removeEventListener('dragstart', onDragStart);
      controls.removeEventListener('drag', onDrag);
      controls.removeEventListener('dragend', onDragEndInternal);
      controls.dispose();
      dragControlsRef.current = null;
    };
  }, [scene, camera, renderer, dragObjects, orbitControls]);

  return dragControlsRef.current;
};
