import * as Matter from "matter-js";
import { useGameState } from "../state-utils";
import { useEffect, useRef } from "react";
import { Button } from "@/components/custom_ui/button";
import { Catapult } from "./catapult";
import { COLORS } from "../utils/constants";

export default function ComparisonPage({}) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { maxGreenMarbles, maxBlueMarbles } = gameStateRef.current.state1;

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const leftPlatformRef1 = useRef<Matter.Composite | null>(null);
  const leftPlatformRef2 = useRef<Matter.Body | null>(null);
  const containerRef = useRef<Matter.Composite | null>(null);
  const rightPlatformRef1 = useRef<Matter.Composite | null>(null);
  const rightPlatformRef2 = useRef<Matter.Body | null>(null);
  const secondrightPlatformRef1 = useRef<Matter.Composite | null>(null);
  const secondrightPlatformRef2 = useRef<Matter.Body | null>(null);
  const leftContainerBallsRef = useRef<Matter.Body[]>([]);
  const rightContainerBallsRef = useRef<Matter.Body[]>([]);
  const secondRightContainerBallsRef = useRef<Matter.Body[]>([]);
  const activeBallLeftRef = useRef<Matter.Body | null>(null);
  const activeBallRightRef = useRef<Matter.Body | null>(null);

  const slingPosition = [
    { x: 200, y: 68 },
    { x: 480, y: 68 }
  ];

  const setCurrentStep = (_step: number) => {
    setGameStateRef(prev => ({ 
      ...prev, 
      state1: {
        ...prev.state1,
        step: _step
      }
    }));
  };


  function attachStringsToBall(
    body: Matter.Body,
    anchor1: Matter.Vector,
    anchor2: Matter.Vector,
  ) {
    const createString = (bodyA: Matter.Body, pointB: Matter.Vector) => {
      return Matter.Constraint.create({
        bodyA,
        pointB,
        stiffness: 0,
        damping: 0,
        render: {
          visible: true,
          strokeStyle: "#000",
          lineWidth: 1,
        },
      });
    };
    const stringA = createString(body, anchor1);
    const stringB = createString(body, anchor2);
    Matter.World.add(worldRef.current!, [stringA, stringB]);
  }

  const progressStep = () => {
    createMainContainer();
    
    if (!activeBallLeftRef.current) {
      const activeball = leftContainerBallsRef.current[leftContainerBallsRef.current.length - 1];
      activeBallLeftRef.current = activeball;
      leftContainerBallsRef.current = leftContainerBallsRef.current.slice(0, -1);
      // setGameStateRef(prevState => ({ 
      //   ...prevState,
      //   state1: {
      //     ...prevState.state1,
      //     activePhase: 'left',
      //   }
      // }));
      if (activeball) {
        Matter.Body.setPosition(activeball, { x: 170, y: 130 });
        attachStringsToBall(activeball, { x: 230, y: 100 }, { x: 213, y: 100 });
        console.log('Active ball set to left container.');
      }
    }

    if (!activeBallRightRef.current) {
      const activeball = rightContainerBallsRef.current[rightContainerBallsRef.current.length - 1];
      activeBallRightRef.current = activeball;
      rightContainerBallsRef.current = rightContainerBallsRef.current.slice(0, -1);
      // setGameStateRef(prevState => ({
      //   ...prevState,
      //   state1: {
      //     ...prevState.state1,
      //     activePhase: 'right',
      //   }
      // }));
      if (activeball) {
        Matter.Body.setPosition(activeball, { x: 623, y: 130 });
        attachStringsToBall(activeball, { x: 563, y: 100 }, { x: 580, y: 100 });
        console.log('Active ball set to right container.');
      }
    }

  };

  const createPlatform1 = (x: number, y: number, width: number) => {
    const height = 60;
    const wallThickness = 2;

    const composite = Matter.Composite.create();

    const base = Matter.Bodies.rectangle(x, y, width, wallThickness, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    const leftWall = Matter.Bodies.rectangle(x - width / 2 + wallThickness / 2, y - height / 2, wallThickness, height, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent",
      },
    });

    const rightWall = Matter.Bodies.rectangle(x + width / 2 - wallThickness / 2, y - height / 2, wallThickness, height, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent",
      },
    });

    Matter.Composite.add(composite, [ base, leftWall, rightWall]);
    return composite;
  };

  const createPlatform2 = (x: number, y: number, width: number) => {
    return Matter.Bodies.rectangle(x, y, width, 2, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });
  };

  const createMainContainer = () => {
    const containerWidth = 40;
    const containerHeight = 240;
    const containerPosition = { x: 150, y: 400 };
    const visualWidth = containerWidth + 10;

    const containerComposite = Matter.Composite.create();

    const parts = [
      Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, containerPosition.y + containerHeight/2, containerWidth+20, 12, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
      Matter.Bodies.rectangle(containerPosition.x, containerPosition.y + 10, 12, containerHeight + 20, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
      Matter.Bodies.rectangle(containerPosition.x + containerWidth, containerPosition.y + 10, 12, containerHeight + 20, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
    ];

    const visualParts = Array.from({length: 10}, (_, i) => {
      const y = containerPosition.y + containerHeight/2 - (i + 0.5) * (containerHeight/10);
      const segment = Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, y, visualWidth, containerHeight/10, {
        isStatic: true,
        isSensor: true,
        render: { 
          fillStyle: "#fff",
          strokeStyle: "#000",
          lineWidth: 2
        },
        collisionFilter: { category: 0x0002 },
        label: `container_segment_${i}`
      });

      const circleRadius = 5;
      const circle = Matter.Bodies.circle(containerPosition.x + containerWidth/2, y, circleRadius, {
        isStatic: true,
        isSensor: true,
        render: {
          fillStyle: "#fff",
          strokeStyle: "#fff",
          lineWidth: 1
        },
        collisionFilter: { category: 0x0002 },
        label: `container_circle_${i}`
      });

      return [segment, circle];
    }).flat();

    Matter.Composite.add(containerComposite, [...parts, ...visualParts]);
    containerRef.current = containerComposite;
    Matter.Composite.add(worldRef.current!, containerComposite);
  };

  const bodies = containerRef.current ? Matter.Composite.allBodies(containerRef.current!) : [];
  bodies.forEach(body => {
    if (body.label?.startsWith('container_segment_')) {
      const score = 10;
      const index = parseInt(body.label.split('_')[2]);
      const isActive = index < score;
      body.render.fillStyle = isActive ? "#BA69EF" : "#fff";
    }
  });

  const createContainerBalls = (startX: number, color: string, count: number, startY: number = 160) => {
    const balls = [];
    const spacing = 20;

    for (let i = 0; i < count; i++) { 
      const ball = Matter.Bodies.circle(
        startX + (i % 4) * spacing - 30,
        startY - Math.floor(i / 4) * spacing,
        8,
        {
          restitution: 0.1,
          render: {
            fillStyle: color,
            strokeStyle: "transparent",
            lineWidth: 15,
          },
          label: "ball"
      });
      balls.push(ball);
    }
    return balls;
  };

  const initializeScene = () => {
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

    const platformWidth = 100;
    const containerWidth = 80;

    const leftPlatformX =  slingPosition[0].x - platformWidth / 2 + 30;
    const leftContainerX = leftPlatformX - containerWidth / 2 - platformWidth / 2;  

    const leftPlat1 = createPlatform1(leftPlatformX-platformWidth, 180, platformWidth);
    leftPlatformRef1.current = leftPlat1;
    const leftPlatform = createPlatform2(leftPlatformX, 180, platformWidth);
    leftPlatformRef2.current = leftPlatform;

    const rightPlatformX = slingPosition[1].x + platformWidth / 2 + 80;
    const rightContainerX = rightPlatformX + containerWidth / 2 + platformWidth / 2;  

    const rightPlatform1 = createPlatform1(rightPlatformX+platformWidth, 180, platformWidth);
    rightPlatformRef1.current = rightPlatform1;
    const rightPlatform = createPlatform2(rightPlatformX, 180, platformWidth);
    rightPlatformRef2.current = rightPlatform;

    const secondRightPlatform1 = createPlatform1(rightPlatformX+platformWidth, 510, platformWidth);
    secondrightPlatformRef1.current = secondRightPlatform1;
    const secondRightPlatform = createPlatform2(rightPlatformX, 510, platformWidth);
    secondrightPlatformRef2.current = secondRightPlatform;

    Matter.Composite.add(world, [
      leftPlat1,
      leftPlatform,
      rightPlatform1,
      rightPlatform,
      secondRightPlatform1,
      secondRightPlatform
    ]);

    const leftContainerBalls = createContainerBalls(leftContainerX, "#4CAF50", maxGreenMarbles);
    const rightContainerBalls = createContainerBalls(rightContainerX, "#3498db", maxBlueMarbles); 
    const secondRightContainerBalls = createContainerBalls(rightContainerX, "#3498db", maxBlueMarbles+maxGreenMarbles-10, 490); 
    leftContainerBallsRef.current = leftContainerBalls;
    rightContainerBallsRef.current = rightContainerBalls;
    secondRightContainerBallsRef.current = secondRightContainerBalls;
    activeBallLeftRef.current = null;
    activeBallRightRef.current = null;


    // setGameStateRef(prevState => ({
    //   ...prevState,
    //   state1: {
    //     ...prevState.state1,
    //     showAdditionStep: true
    //   }
    // }));

    Matter.Composite.add(world, [
      ...leftContainerBalls,
      ...rightContainerBalls,
      ...secondRightContainerBalls
    ]);

    return { render, runner, engine };
  };

  const handleProceed = () => {
    setCurrentStep(6);
  };

  useEffect(() => {
    const { render, runner, engine } = initializeScene();

    progressStep();

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

  return (
    <div className="relative w-[800px] mx-auto ">
      <section className="mt-16 h-52 flex flex-col justify-center">
        <div className="text-5xl font-bold text-center pb-10">
          <h3 className="border-2 border-black shadow-[-5px_5px_0_0] w-[40%] mx-auto" style={{
            backgroundColor: COLORS.white,
          }}>
            {`${maxGreenMarbles} + ${maxBlueMarbles} = ?`}
          </h3>
        </div>
        <div className={`w-2/3 mx-auto text-3xl border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-5`} style={{
          backgroundColor: COLORS.white
        }}>
          <p className={`text-center font-jersey`} style={{
            color: COLORS.blue
          }}>
            {`Look! ${maxGreenMarbles} + ${maxBlueMarbles} is same as 10+${maxGreenMarbles + maxBlueMarbles - 10}`}
          </p>
        </div>
      </section>

      <div className="relative w-full">
        <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-green-500 z-10 text-green-500" style={{
          top: slingPosition[1].y + 100,
          left: slingPosition[1].x - 200
        }}>
          {maxGreenMarbles}
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 z-10 text-black transform rotate-90 origin-center" style={{
          top: slingPosition[1].y + 100,
          left: slingPosition[1].x - 100
        }}>
          +
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-blue-500 z-10 text-blue-500" style={{
          top: slingPosition[1].y + 100,
          left: slingPosition[1].x
        }}>
          {maxBlueMarbles}
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 z-10 text-black transform rotate-90 origin-center" style={{
          top: slingPosition[1].y + 220,
          left: slingPosition[1].x - 100
        }}>
          &gt;&gt;
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500" style={{
          top: slingPosition[1].y + 350,
          left: slingPosition[1].x - 200
        }}>
          10
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 border-purple-500 z-10 text-purple-500" style={{
          top: slingPosition[1].y + 350,
          left: slingPosition[1].x - 85
        }}>
          +
        </div>

        <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500" style={{
          top: slingPosition[1].y + 350,
          left: slingPosition[1].x
        }}>
          {maxGreenMarbles + maxBlueMarbles - 10}
        </div>

        <Catapult position={slingPosition[0]} type="half" side="left" />
        <Catapult position={slingPosition[0]} type="full" side="left" />
        <Catapult position={slingPosition[1]} type="half" side="right" />
        <Catapult position={slingPosition[1]} type="full" side="right" />

        <div
          ref={sceneRef}
          className="w-[800px] h-[600px] z-30 mx-auto rounded-lg bg-transparent"
        />

      </div>
      <div className="fixed bottom-5 left-2/3 transform -translate-x-1/2 z-50 flex justify-center items-center">
        <Button 
          onClick={() => handleProceed()} 
          className="text-lg border-2 shadow-[-5px_5px_0_0] shadow-black border-black p-2 px-6 rounded-none"
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.blue
          }}
        >
          <p className="font-bold font-jersey" style={{
            color: COLORS.blue
          }}>Proceed &gt;&gt;</p>
        </Button>
      </div>
    </div>  
  );
}