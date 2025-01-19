import React, { useEffect } from 'react';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useWindowResize } from './hooks/useWindowResize';
import { createLegoPiece } from './utils/pieceFactory';
import * as THREE from 'three';
import { useGameState } from '../state-utils';
import { COLORS } from './utils/constants';
import { createHolder as createLegoHolder } from './utils/holderFactory';
import { createText } from './utils/textFactory';

interface CreatePieceProps {
  scene: THREE.Scene | null;
  position: [number, number, number];
  color: number;
}

const LegoGame = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const hasInitialized = React.useRef(false);
  const { scene, camera, renderer } = useThreeSetup(mountRef, hasInitialized);
  // const [pieces, setPieces] = React.useState<THREE.Group[]>([]);
  // const [holders, setHolders] = React.useState<THREE.Group[]>([]);
  const { gameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state3;

  const createHolder = (scene: THREE.Scene | null, position: [number, number, number], count: number) => {
    if (!scene) return null;
    const holder = createLegoHolder(scene, position, count);
    scene.add(holder.group);
    // setHolders(prev => [...prev, holder.group]);
    return holder;
  }

  const createPiece = ({ scene, position, color }: CreatePieceProps) => {
    if (!scene) return null;
    const piece = createLegoPiece(color, 4/fraction.denominator);
    piece.position.set(...position);
    scene.add(piece);
    // setPieces(prev => [...prev, piece]);
    return piece;
  }

  useEffect(() => {
    const numHolder = Math.ceil(fraction.numerator / fraction.denominator);
    for (let i = 0; i < numHolder; i++) {
      const position: [number, number, number] = [-1 + i * 3, 0, - i * 3];
      createHolder(scene, position, fraction.denominator);
    }

    createText(scene!, [0, 0, 6], "1 Whole Block", {
      textColor: COLORS.MAGENTA,
      orientation: 'orthogonal',
      size: 0.3,
      centered: true,
    });
    
    for (let i = 0; i < fraction.numerator; i++) {
      const holder = i % numHolder;
      const index = Math.floor(i / numHolder);
      const color = holder === numHolder - 1 ? COLORS.GREEN : COLORS.MAGENTA;
      const position: [number, number, number] = [-1 + holder * 3, 0.1, -0.1 -holder * 3 + ((4 * index)/fraction.denominator)];
      createPiece({ scene: scene!, position: position, color: color });
    }

    createText(scene!, [4, 0, 2], `${fraction.numerator % fraction.denominator}/${fraction.denominator}`, {
      textColor: COLORS.GREEN,
      orientation: 'orthogonal',
      size: 0.3,
      centered: true,
      // offset: [0, 0, 0.1]
    });


  }, [scene]);

  useWindowResize({ camera: camera as THREE.OrthographicCamera, renderer: renderer as THREE.WebGLRenderer, mountRef });

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '800px', 
        height: '400px',
      }}
    />
  );
};

export default LegoGame;