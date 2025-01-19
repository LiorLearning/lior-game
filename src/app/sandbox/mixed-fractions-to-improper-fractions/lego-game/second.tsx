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
  const [pieces, setPieces] = React.useState<THREE.Group[]>([]);
  const [holders, setHolders] = React.useState<THREE.Group[]>([]);
  const { gameStateRef } = useGameState();
  const { step, fraction, denomOptions } = gameStateRef.current.state2;
  const textsRef = React.useRef<THREE.Group[]>([]);

  const createHolder = (scene: THREE.Scene | null, position: [number, number, number], count: number) => {
    if (!scene) return null;
    const holder = createLegoHolder(scene, position, count);
    scene.add(holder.group);
    setHolders(prev => [...prev, holder.group]);
    return holder;
  }

  const cleanUpHolders = (scene: THREE.Scene | null, holders: THREE.Group[]) => {
    if (!scene) return;
    holders.forEach(holder => {
      scene.remove(holder);
      if (holder instanceof THREE.Mesh) {
        holder.geometry.dispose();
        holder.material.dispose();
      }
    });
  }

  const createPiece = ({ scene, position, color }: CreatePieceProps) => {
    if (!scene) return null;
    const piece = createLegoPiece(color, 4/fraction.denominator);
    piece.position.set(...position);
    scene.add(piece);
    setPieces(prev => [...prev, piece]);
    return piece;
  }
  
  const cleanUpPieces = (scene: THREE.Scene | null, pieces: THREE.Group[]) => {
    if (!scene) return;
    pieces.forEach(piece => {
      scene.remove(piece);
      piece.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    });
  }

  const cleanUpTexts = (scene: THREE.Scene | null) => {
    if (!scene) return;
    textsRef.current.forEach(text => {
      scene.remove(text);
    });
  }


  useEffect(() => {
    if (step === 0) {
      createHolder(scene, [0, 0, 0], fraction.denominator);

      for (let i = 0; i < fraction.denominator; i++) {
        const fractionalText = createText(scene!, [-0.2, 1.9, 1 + i * (fraction.denominator/2)], `1/${fraction.denominator}`, {
          textColor: COLORS.MAGENTA,
          orientation: 'orthogonal',
          centered: true,
        });
        if (fractionalText) {
          scene?.add(fractionalText);
          textsRef.current = [...textsRef.current, fractionalText];
        }
      }
      
    } else if (step === 1) {
      cleanUpTexts(scene!);
      cleanUpPieces(scene!, pieces);
      setPieces([]);
      cleanUpHolders(scene!, holders);
      setHolders([]);

      for (let i = 0; i < denomOptions.length; i++) {
        const position: [number, number, number] = [-1 + i * 2.2, 0, 2 - i * 2.2];
        createHolder(scene, position, denomOptions[i]);
      }

      // for (let i = 0; i < fraction.numerator; i++) {
      //   const row = Math.floor(i / 4);  // 4 pieces per row
      //   const col = i % 4;              // Position within the row
      //   const position: [number, number, number] = [-3.5 + col, 0, -3 + row * 1.5];
      //   createPiece({ scene: scene!, position: position, color: COLORS.GREEN });
      // }

    } else if (step === 2) {
      cleanUpPieces(scene!, pieces);
      setPieces([]);
      cleanUpHolders(scene!, holders);
      setHolders([]);

      createHolder(scene, [2, 0, -3], fraction.denominator);

      const mid = Math.floor(fraction.numerator / 2);
      for (let i = 0; i < fraction.numerator; i++) {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const position: [number, number, number] = [-3 + col * 1.2, 0, -2 + row * 1.5];
        createPiece({ scene: scene!, position: position, color: COLORS.GREEN });
      }

    } else if (step === 3) {
      cleanUpPieces(scene!, pieces);
      setPieces([]);
      cleanUpHolders(scene!, holders);
      setHolders([]);
    } else if (step === 4) {
      const numHolder = Math.ceil(fraction.numerator / fraction.denominator);
      for (let i = 0; i < numHolder; i++) {
        const position: [number, number, number] = [-3 + i * 2.2, 0, - i * 2.2];
        createHolder(scene, position, fraction.denominator);
      }

      for (let i = 0; i < fraction.numerator; i++) {
        const holder = i % numHolder;
        const index = Math.floor(i / numHolder);
        const color = holder === numHolder - 1 ? COLORS.GREEN : COLORS.MAGENTA;
        const position: [number, number, number] = [-2.95 + holder * 2.2, 0.1, 0.2 -holder * 2.2 + ((4 * index)/fraction.denominator)];
        createPiece({ scene: scene!, position: position, color: color });
      }
    }

  }, [step, scene]);

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