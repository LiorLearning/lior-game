import { useEffect, useRef } from 'react';
import * as Matter from 'matter-js';

export const useGameEngine = (sceneRef: React.RefObject<HTMLDivElement>) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;

    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'transparent',
      },
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return { engineRef, worldRef };
};
