import * as Matter from "matter-js";
import { useGameState } from "./state-utils";
import { useSoundEffects } from "./utils/sound";
import { useEffect, useRef, useState } from "react";
import { Cross } from "lucide-react";
import { Button } from "@/components/custom_ui/button";
import { Position, Vector } from "./components/types";
import { Catapult } from "./components/catapult";
import { Counter } from "./components/counter";
import { ShootButton } from "./components/shoot-button";
import { COLORS } from "./utils/constants";

interface FirstProps {
  sendAdminMessage: (agent: string, message: string) => void;
  visible: boolean;
}

export default function First({ sendAdminMessage, visible }: FirstProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const soundEffects = useSoundEffects();
  const { greenScore, blueScore, containerScore, activePhase, currentStep, finalAnswer, clickDisabled, showAddButton, additionStarted } = gameStateRef.current.state1;
  const { maxGreenMarbles, maxBlueMarbles } = gameStateRef.current;

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const leftPlatformRef1 = useRef<Matter.Composite | null>(null);
  const leftPlatformRef2 = useRef<Matter.Body | null>(null);
  const containerRef = useRef<Matter.Composite | null>(null);
  const rightPlatformRef1 = useRef<Matter.Composite | null>(null);
  const rightPlatformRef2 = useRef<Matter.Body | null>(null);
  const finalContainerRef = useRef<Matter.Composite | null>(null);
  const leftContainerBallsRef = useRef<Matter.Body[]>([]);
  const rightContainerBallsRef = useRef<Matter.Body[]>([]);
  const activeBallLeftRef = useRef<Matter.Body | null>(null);
  const activeBallRightRef = useRef<Matter.Body | null>(null);
  const gameStartedRef = useRef(false);

  const [slingPosition, setSlingPosition] = useState<Position[]>([
      { x: 200, y: 68 },
      { x: 480, y: 68 }
  ]);

  const STEPS_WITH_PROCEED = [0, 1, 4, 5];
  // const STEPS_WITH_PROCEED = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const setCurrentStep = (step: number) => {
    setGameStateRef(prev => ({ 
      ...prev, 
      state1: {
        ...prev.state1,
        currentStep: step
      }
    }));
  };

  const [positions, setPositions] = useState({
    leftPlatform: { x: 190, y: 180 },
    rightPlatform: { x: 610, y: 180 },
    centerContainer: { x: 390, y: 340 },
    finalContainer: { x: 550, y: 500 }
  });

  const createPlatform1 = (x: number, y: number, width: number) => {
    const height = 60;
    const wallThickness = 2;

    const composite = Matter.Composite.create();

    // Background
    // const bg = Matter.Bodies.rectangle(x, y - height/2, width, height, {
    //   isStatic: true,
    //   isSensor: true,  // Makes it not collide
    //   render: {
    //     fillStyle: "transparent",  // Light gray background
    //   },
    // });

    // Bottom
    const base = Matter.Bodies.rectangle(x, y, width, wallThickness, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    // // Top
    // const top = Matter.Bodies.rectangle(x, y - height, width, wallThickness, {
    //   isStatic: true,
    //   render: {
    //     fillStyle: "#666", 
    //     strokeStyle: "transparent",
    //   },
    // });

    // Left wall
    const leftWall = Matter.Bodies.rectangle(x - width / 2 + wallThickness / 2, y - height / 2, wallThickness, height, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent",
      },
    });

    // Right wall
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
    // Create the non-interactable base platform
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
    const containerPosition = { x: 390, y: 340 };
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
    
    const getColorForIndex = (index: number) => {
      const score = containerScore;
      const isActive = index >= 10 - score;
      return isActive ? "#BA69EF" : "#fff";
    };

    const visualParts = Array.from({length: 10}, (_, i) => {
      const y = containerPosition.y + containerHeight/2 - (i + 0.5) * (containerHeight/10);
      const segment = Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, y, visualWidth, containerHeight/10, {
        isStatic: true,
        isSensor: true,
        render: { 
          fillStyle: getColorForIndex(i),
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

  useEffect(() => {
    const bodies = containerRef.current ? Matter.Composite.allBodies(containerRef.current!) : [];
    bodies.forEach(body => {
      if (body.label?.startsWith('container_segment_')) {
        const score = containerScore;
        const index = parseInt(body.label.split('_')[2]);
        const isActive = index < score;
        body.render.fillStyle = isActive ? "#BA69EF" : "#fff";
      }
    });
  }, [containerScore]);

  useEffect(() => {
    if (currentStep === 6) {
      sendAdminMessage('agent', `Let us empty the marbles in one place to add them`);
    }
  }, [currentStep])

  const createFinalContainer = () => {
    const containerWidth = 440;  
    const containerHeight = 50;
    const containerPosition = { x: 460, y: 450 };

    const containerComposite = Matter.Composite.create();
    console.log("createFinalContainer");

    const colors = {
      front: "#E8F8FF",    // Light blue for front face
      back: "#E8F8FF",     // Light blue for back face
      left: "#B8E8FF",     // Medium blue for left side
      right: "#AAD3E5",    // Grayish blue for right side
      bottom: "#6FA8C3",   // Darker blue for bottom
    };

    const leftFaceVertices: Vector[][] = [[
      { x: 0, y: 20 },
      { x: 20, y: 0 },
      { x: 20, y: containerHeight },
      { x: 0, y: containerHeight + 20 }
    ]];
  
    const bottomFaceVertices: Vector[][] = [[
      { x: -containerWidth / 2, y: 0 },
      { x: containerWidth / 2, y: 0 },
      { x: containerWidth / 2 - 20, y: 20 },
      { x: -containerWidth / 2 - 20, y: 20 }
    ]];
  
    const rightFaceVertices: Vector[][] = [[
      { x: 0, y: 20 },
      { x: 20, y: 0 },
      { x: 20, y: containerHeight },
      { x: 0, y: containerHeight + 20 }
    ]];

    const visualparts = [
      // Back face
      Matter.Bodies.rectangle(
        containerPosition.x,
        containerPosition.y+30,
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.back,
            strokeStyle: "#000",
            lineWidth: 1,
            opacity: 0.3,
          },
          collisionFilter: { 
            category: 0x0000,
            mask: 0x0000
          }
        }
      ),
      // Left face
      Matter.Bodies.fromVertices(
        containerPosition.x - containerWidth / 2 - 10,
        containerPosition.y + 40,
        leftFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.left,
            strokeStyle: "#000",
            lineWidth: 1,
            opacity: 0.7,
          },
          collisionFilter: { 
            category: 0x0000,
            mask: 0x0000
          }
        }
      ),
      // Bottom face
      Matter.Bodies.fromVertices(
        containerPosition.x - 10,
        containerPosition.y + containerHeight / 2 + 40,
        bottomFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.bottom,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0000,
            mask: 0x0000
          }
        }
      ),
       // Right face
       Matter.Bodies.fromVertices(
        containerPosition.x + containerWidth / 2 - 10,
        containerPosition.y + 40,
        rightFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.right,
            strokeStyle: "#000",
            lineWidth: 1,
            opacity: 0.7,
          },
          collisionFilter: { 
            category: 0x0000 ,
            mask: 0x0000
          }
        }
      ),
      // Front face (semi-transparent)
      Matter.Bodies.rectangle(
        containerPosition.x - 20,
        containerPosition.y + 50, // Slight offset for 3D effect
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: "rgba(232, 248, 255, 0.3)", // Semi-transparent front
            strokeStyle: "#000",
            lineWidth: 1,
            opacity: 0.3,
          },
          collisionFilter: { 
            category: 0x0008 ,
            mask: 0x0000
          }
        }
      ),
    ];

    const parts = [
      // Left invisible border
      Matter.Bodies.rectangle(containerPosition.x - containerWidth / 2 - 10, containerPosition.y - containerHeight/2 + 50, 4, containerHeight, {
        isStatic: true,
        render: {
          visible: false
        },
        collisionFilter: { category: 0x0004 }
      }),

      // Right invisible border
      Matter.Bodies.rectangle(containerPosition.x + containerWidth / 2 - 10, containerPosition.y - containerHeight/2 + 50, 4, containerHeight, {
        isStatic: true,
        render: {
          visible: false
        },
        collisionFilter: { category: 0x0004 }
      }),

      // Bottom invisible border
      Matter.Bodies.rectangle(containerPosition.x - 10, containerPosition.y + 50, containerWidth, 4, {
        isStatic: true,
        render: {
          visible: false
        },
        collisionFilter: { category: 0x0004 }
      }),
    ]


    Matter.Composite.add(containerComposite, [...parts, ...visualparts]);
    finalContainerRef.current = containerComposite;
    return containerComposite;
  };

  const flipContainerAndPlatform = () => {
    if (!containerRef.current || !worldRef.current || !rightPlatformRef2.current || !rightPlatformRef1.current) return;

    // Hide left platform, container, and scores
    const bodies = Matter.Composite.allBodies(worldRef.current!);
    bodies.forEach(body => {
      if (body.position.x < 400) {
        Matter.Composite.remove(worldRef.current!, body);
      }
    });

    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        showAdditionStep: true
      }
    }));

    // Center container pivot
    const containerPivot = { x: 400, y: 300 };
    // Right side pivot (between platform and container)
    const rightPivot = { x: 660, y: 180 }; // Middle point between platform and container

    const targetAngle = 4 * Math.PI / 5;
    const flip_steps = 60;
    const containerAngleStep = targetAngle / flip_steps;
    const rightAngleStep = -targetAngle / flip_steps; // Opposite direction
    let flip_currentStep = 0;

    const animate = () => {
      if (flip_currentStep >= flip_steps) {
        soundEffects.complete.play();
        return;
      }

      // Rotate center container
      const containerBodies = Matter.Composite.allBodies(containerRef.current!);
      containerBodies.forEach(body => {
        const dx = body.position.x - containerPivot.x;
        const dy = body.position.y - containerPivot.y;
        
        const cos = Math.cos(containerAngleStep);
        const sin = Math.sin(containerAngleStep);
        
        const newX = containerPivot.x + (dx * cos - dy * sin);
        const newY = containerPivot.y + (dx * sin + dy * cos);
        
        Matter.Body.setPosition(body, { x: newX, y: newY });
        Matter.Body.rotate(body, containerAngleStep);
      });

      // Rotate right platform and container together
      const rightPlatform = rightPlatformRef2.current!;
      const rightContainer = rightPlatformRef1.current!;

      // Platform rotation
      const platformDx = rightPlatform.position.x - rightPivot.x;
      const platformDy = rightPlatform.position.y - rightPivot.y;
      
      const rightCos = Math.cos(rightAngleStep);
      const rightSin = Math.sin(rightAngleStep);
      
      const newPlatformX = rightPivot.x + (platformDx * rightCos - platformDy * rightSin);
      const newPlatformY = rightPivot.y + (platformDx * rightSin + platformDy * rightCos);
      
      Matter.Body.setPosition(rightPlatform, { x: newPlatformX, y: newPlatformY });
      Matter.Body.rotate(rightPlatform, rightAngleStep);

      // Container rotation
      const containerBodiesRight = Matter.Composite.allBodies(rightContainer);
      containerBodiesRight.forEach(body => {
        const dx = body.position.x - rightPivot.x;
        const dy = body.position.y - rightPivot.y;
        
        const newX = rightPivot.x + (dx * rightCos - dy * rightSin);
        const newY = rightPivot.y + (dx * rightSin + dy * rightCos);
        
        Matter.Body.setPosition(body, { x: newX, y: newY });
        Matter.Body.rotate(body, rightAngleStep);
      });

      flip_currentStep++;
      if (flip_currentStep < flip_steps) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const totalSteps = containerScore;
    let dropBallStep = 0;

    const reduceScoreAndUpdateColor = () => {
      if (dropBallStep < totalSteps) {
        setGameStateRef(prevState => {
          const newContainerScore = prevState.state1.containerScore - 1;
          return {
            ...prevState,
            state1: {
              ...prevState.state1,
              containerScore: newContainerScore
            }
          };
        });
        soundEffects.pop.play();
        dropBallStep++;
        setTimeout(reduceScoreAndUpdateColor, 200);
      } else {
        setTimeout(() => {
          setCurrentStep(8);
          progressStep(8);
        }, 1000);
      }
    };

    setTimeout(reduceScoreAndUpdateColor, 1000);
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
        // no length here, so the distance is free to change
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

  // Create initial balls in containers (n-1 balls)
  const createContainerBalls = (startX: number, color: string, count: number) => {
    const balls = [];
    const spacing = 20;
    const startY = 160;

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

    // Create platforms and containers side by side
    const platformWidth = 100;
    const containerWidth = 80;

    // Left side setup 
    const leftPlatformX =  slingPosition[0].x - platformWidth / 2 + 30
    const leftContainerX = leftPlatformX - containerWidth / 2 - platformWidth / 2;  

    const leftPlat1 = createPlatform1(leftPlatformX-platformWidth, 180, platformWidth);
    leftPlatformRef1.current = leftPlat1;
    const leftPlatform = createPlatform2(leftPlatformX, 180, platformWidth);
    leftPlatformRef2.current = leftPlatform;

    // Right side setup 
    const rightPlatformX = slingPosition[1].x + platformWidth / 2 + 80
    const rightContainerX = rightPlatformX + containerWidth / 2 + platformWidth / 2;  

    const rightPlatform1 = createPlatform1(rightPlatformX+platformWidth, 180, platformWidth);
    rightPlatformRef1.current = rightPlatform1;
    const rightPlatform = createPlatform2(rightPlatformX, 180, platformWidth);
    rightPlatformRef2.current = rightPlatform;

    Matter.Composite.add(world, [
      leftPlat1,
      leftPlatform,
      rightPlatform1,
      rightPlatform
    ]);

    const leftContainerBalls = createContainerBalls(leftContainerX, "#4CAF50", maxGreenMarbles);
    const rightContainerBalls = createContainerBalls(rightContainerX, "#3498db", maxBlueMarbles); 
    leftContainerBallsRef.current = leftContainerBalls;
    rightContainerBallsRef.current = rightContainerBalls;
    activeBallLeftRef.current = null;
    activeBallRightRef.current = null;


    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        showAdditionStep: true
      }
    }));

    // Don't set showEmptyButton
    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        showAdditionStep: true
      }
    }));

    Matter.Composite.add(world, [
      ...leftContainerBalls,
      ...rightContainerBalls
    ]);

    return { render, runner, engine };
  };

  const launchBall = (color: 'green' | 'blue') => {
    if (clickDisabled) return;
    soundEffects.shoot.play();

    if ((color === 'green' && activePhase !== 'left') || (color === 'blue' && activePhase !== 'right')) return;

    setGameStateRef(prevState => ({ 
      ...prevState, 
      state1: {
        ...prevState.state1,
        clickDisabled: true
      }
    }));

    const isGreen = color === 'green';
    const platformX = isGreen ? 170 : 623;

    let activeBall = isGreen ? activeBallLeftRef.current : activeBallRightRef.current;
    const velocity = isGreen ? { x: 6.5, y: -5 } : { x: -5.8, y: -5 };

    // anchor points
    const leftAnchor1 = { x: 230, y: 100 };
    const leftAnchor2 = { x: 213, y: 100 };
    const rightAnchor1 = { x: 563, y: 100 };
    const rightAnchor2 = { x: 580, y: 100 };

    let anchor1: Matter.Vector, anchor2: Matter.Vector;
    if (color === 'green') {
      anchor1 = leftAnchor1;
      anchor2 = leftAnchor2;
    } else {
      anchor1 = rightAnchor1;
      anchor2 = rightAnchor2;
    }

    const containerBalls = isGreen ? leftContainerBallsRef.current : rightContainerBallsRef.current;

    if (!activeBall){ return; }

    // Remove strings attached to the active ball
    const allConstraints = Matter.Composite.allConstraints(worldRef.current!).filter(constraint => 
      constraint.bodyA === activeBall
    );
    allConstraints.forEach(constraint => {
      Matter.World.remove(worldRef.current!, constraint);
    });
    Matter.Body.setStatic(activeBall, false);
    Matter.Body.setVelocity(activeBall, velocity);
    setTimeout(() => {
      // Reduce score and manage ball movement
      setGameStateRef(prevState => ({
        ...prevState,
        state1: {
          ...prevState.state1,
          [isGreen ? 'greenScore' : 'blueScore']: prevState.state1[isGreen ? 'greenScore' : 'blueScore'] - 1,
          containerScore: prevState.state1.containerScore + 1,
        }
      }));
      soundEffects.collect.play();
    }, 1000);

    setTimeout(() => {
      if (!worldRef.current) return;
      setTimeout(() => {
        if (containerBalls.length > 0 && containerScore < 9) {
          const ballToMove = containerBalls[containerBalls.length - 1]; 

          Matter.Body.setPosition(ballToMove, { x: platformX, y: 130 });
          attachStringsToBall(ballToMove, anchor1, anchor2);

          if (isGreen) {
            activeBallLeftRef.current = ballToMove;
            leftContainerBallsRef.current = containerBalls.slice(0, -1);
          } else {
            activeBallRightRef.current = ballToMove;
            rightContainerBallsRef.current = containerBalls.slice(0, -1);
          }

          setGameStateRef(prevState => ({
            ...prevState,
            state1: {
              ...prevState.state1,
              clickDisabled: false
            }
          }));
        } else {
          isGreen ? activeBallLeftRef.current = null : activeBallRightRef.current = null;
          setGameStateRef(prevState => ({
            ...prevState,
            state1: {
              ...prevState.state1,
              clickDisabled: false
            }
          }));
        }
      }, 500);
    }, 1100);
  };

  const launchGreen = () => {
    launchBall('green');
    if (greenScore === 1 && activePhase === 'left') {
      setTimeout(() => {
        setGameStateRef(prevState => ({
          ...prevState,
          state1: {
            ...prevState.state1,
            activePhase: 'right'
          }
        }));
        setCurrentStep(3);
        progressStep(3);
      }, 1500);
    }
  }
  const launchBlue = () => {
    launchBall('blue');
    if (containerScore === 9) {
      setTimeout(() => {
        setCurrentStep(4);
        progressStep(4);
      }, 1500);
    }
  }

  const handlefinalCount = (i: number) => {
    const bodies = Matter.Composite.allBodies(worldRef.current!);
    if (i === -1) {
      const blackBalls = bodies.filter(body => body.label === 'black_ball');
      if (blackBalls.length > 0) {
        blackBalls[0].render.fillStyle = 'gray';
        blackBalls[0].label = 'ball';
      }
      setGameStateRef(prev => ({ 
        ...prev, 
        state1: { 
          ...prev.state1, 
          blackScore: Math.max(0, prev.state1.blackScore - 1),
          finalAnswer: Math.max(0, finalAnswer - 1) 
        } 
      }));
    } else {
      const balls = bodies.filter(body => body.label === 'ball');
      const firstNonBlackBall = balls.find(ball => ball.label !== 'black');
      if (firstNonBlackBall) {
        firstNonBlackBall.render.fillStyle = 'black';
        firstNonBlackBall.label = 'black_ball';
      }
      setGameStateRef(prev => {
        const newAnswer = finalAnswer + 1;
        if (newAnswer === (maxGreenMarbles + maxBlueMarbles)) {
          soundEffects.complete.play();
          setTimeout(() => {
            setCurrentStep(9);
            progressStep(9);
          }, 500);
        }
        return { ...prev, state1: { ...prev.state1, finalAnswer: newAnswer, blackScore: Math.max(0, prev.state1.blackScore - 1) } };
      });
    }
  };

  const handleAddition = () => {
    setCurrentStep(7);
    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        additionStarted: true,
        showAddButton: false
      }
    }));

    soundEffects.rotate.play();

    setTimeout(() => {
      flipContainerAndPlatform();
    }, 1000);
  }

  const handleProceed = (currentStep: number) => {
    setCurrentStep(currentStep+1);
    progressStep(currentStep+1);
  }

  const progressStep = (step: number = currentStep) => {
    if (step === 0) {
      setGameStateRef(prevState => ({
        ...prevState,
        state1: {
          ...prevState.state1,
          greenScore: maxGreenMarbles,
          blueScore: maxBlueMarbles,
          containerScore: 0,
          showAddButton: false,
          clickDisabled: false,
          activePhase: 'left'
        }
      }));
      if (!gameStartedRef.current) {
        sendAdminMessage('agent', `Let's play a game to solve this, imagine you have ${maxGreenMarbles} green marbles, ${maxBlueMarbles} blue marbles and slingshots. Click on proceed to move forward`);
        gameStartedRef.current = true;
      }

    } else if (step === 1) {
      if (!containerRef.current) createMainContainer();
      sendAdminMessage('agent', `And with that you have a container to collect the marbles after you shoot.`);

      setTimeout(() => {
        sendAdminMessage('agent', `But remember! The container can only hold 10 marbles at once`);
      }, 5000);
      
    } else if (step === 2) {
      sendAdminMessage('agent', `Let's begin! First let's finish shooting the green marbles into the marble holder!`);
      if (!activeBallLeftRef.current) {
        const activeball = leftContainerBallsRef.current[leftContainerBallsRef.current.length - 1];
        activeBallLeftRef.current = activeball;
        leftContainerBallsRef.current = leftContainerBallsRef.current.slice(0, -1);
        setGameStateRef(prevState => ({ 
          ...prevState,
          state1: {
            ...prevState.state1,
            activePhase: 'left',
          }
        }));
        if (activeball) {
          Matter.Body.setPosition(activeball, { x: 170, y: 130 });
          attachStringsToBall(activeball, { x: 230, y: 100 }, { x: 213, y: 100 });
          console.log('Active ball set to left container.');
        }
      }

    } else if (step === 3) {
      sendAdminMessage('agent', `Awesome! We have filled all ${maxGreenMarbles} green ones. Step 2 : Let's fill the blue ones.`);
      if (!activeBallRightRef.current) {
        const activeball = rightContainerBallsRef.current[rightContainerBallsRef.current.length - 1];
        activeBallRightRef.current = activeball;
        rightContainerBallsRef.current = rightContainerBallsRef.current.slice(0, -1);
        setGameStateRef(prevState => ({
          ...prevState,
          state1: {
            ...prevState.state1,
            activePhase: 'right',
          }
        }));
        if (activeball) {
          Matter.Body.setPosition(activeball, { x: 623, y: 130 });
          attachStringsToBall(activeball, { x: 563, y: 100 }, { x: 580, y: 100 });
          console.log('Active ball set to right container.');
        }
      }
    } else if (step === 4) {
      sendAdminMessage('agent', `Oops! The container is full. Let's count how many marbles we have now`);

    } else if (step === 5) {
      sendAdminMessage('agent', `Look we made it easy. ${maxGreenMarbles} + ${maxBlueMarbles} is same as 10+${maxGreenMarbles + maxBlueMarbles - 10}`);
      Matter.Composite.remove(worldRef.current!, leftPlatformRef1.current!);
      Matter.Composite.remove(worldRef.current!, leftPlatformRef2.current!);
      Matter.Composite.remove(worldRef.current!, rightPlatformRef2.current!);
      progressStep(6);

    } else if (step === 6) {
      const bodies = Matter.Composite.allBodies(worldRef.current!);
      const balls = bodies.filter(body => body.label === 'ball');
      balls.forEach(ball => {
        Matter.Composite.remove(worldRef.current!, ball);
      });

      // Create and add final container
      const finalContainer = createFinalContainer();
      worldRef.current = Matter.World.add(worldRef.current!, finalContainer);

      worldRef.current = Matter.World.add(worldRef.current, balls);
    } else if (step === 7) {
      sendAdminMessage('agent', `Let us empty the marbles in one place to add them`);
    } else if (step === 8) {
      sendAdminMessage('agent', `Click on plus to count the number of marbles we have collected`);
      Matter.Composite.remove(worldRef.current!, containerRef.current!);
      Matter.Composite.remove(worldRef.current!, rightPlatformRef1.current!);
    } else if (step === 9) {
      Matter.Composite.remove(worldRef.current!, finalContainerRef.current!);
      
      // change ball colors
      // const containerBalls = gameStateRef.current.leftContainerBalls.concat(gameStateRef.current.rightContainerBalls);
      // containerBalls.forEach(ball => {
      //   ball.render.fillStyle = "#000";
      // });
      // Matter.Composite.add(worldRef.current!, containerBalls);
    }
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

  useEffect(() => {
    if (containerScore === 10 && !showAddButton) {
      setGameStateRef(prevState => ({
        ...prevState,
        state1: {
          ...prevState.state1,
          showAddButton: true,
          clickDisabled: true
        }
      }));
    }
  }, [containerScore]);

  if (!visible) return null;

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
          backgroundColor: currentStep === 4 ? COLORS.blue : COLORS.white
        }}>
        <p className={`text-center font-jersey`} style={{
          color: currentStep === 4 ? COLORS.white : COLORS.blue
        }}>
          {(() => {
            switch (currentStep) {
              case 0:
                return `Let's play a game to solve this. Imagine you have ${maxGreenMarbles} green, ${maxBlueMarbles} blue marbles and a slingshot!!`; 
              case 1:
                return "And a container to collect the marbles";
              case 2:
                if(greenScore === maxGreenMarbles) {
                  return <>Let's start! <br/> Step 1 : Finish shooting the green marbles into the marble holder!  </>;
                } else {
                  return "Keep shooting until the container is full!";
                }
              case 3:
                return <> We have filled all {maxGreenMarbles} green ones. <br/> Step 2 : Let's fill the blue ones.</>;
              case 4: 
                return "Oops! The container is full. Let's see how many marbles we have";
              case 5:
                return `Look! ${maxGreenMarbles} + ${maxBlueMarbles} is same as 10+${maxGreenMarbles + maxBlueMarbles - 10}`;
              case 6:
                return `Step 3 : Click on empty to add 10+${maxGreenMarbles + maxBlueMarbles - 10}`;
              case 7:
                return "Let us see how many marbles we have collected. Let's empty them in a box";
              case 8:
                return "Step 4 : Let us count the total marbles in the box";
              case 9:
                return "Great Job! You calculated the answer"
            }
          })()}
        </p>
        </div>
      </section>

      <div className="relative w-full">
        {currentStep < 5 &&
          <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-green-500 z-10 text-green-500" style={{
            top: slingPosition[0].y - 50,
            left: slingPosition[0].x - 160
          }}>
            {greenScore}
          </div>
        }
        {currentStep <= 5 &&
          <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-blue-500 z-10 text-blue-500" style={{
            top: slingPosition[1].y - 50,
            left: slingPosition[1].x + 220
          }}>
            {blueScore}
          </div>
        }

          {currentStep > 1 && currentStep <= 5 &&
          <div className={`absolute ${currentStep === 5 ? "left-1/2 top-[2.5rem]" :  "bottom-1/4 left-1/3" } transform -translate-x-1/3 -translate-y-1/4  text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500`}>
            {containerScore}
          </div>
          }

          {currentStep < 5 && <>
            <Catapult position={slingPosition[0]} type="half" side="left" />
            <Catapult position={slingPosition[0]} type="full" side="left" />
            <Catapult position={slingPosition[1]} type="half" side="right" />
            <Catapult position={slingPosition[1]} type="full" side="right" />
          </>}


        <div
          ref={sceneRef}
          className="w-[800px] h-[600px] z-30 mx-auto rounded-lg bg-transparent"
        />
        {currentStep === 1 &&
          <div className="absolute right-20 top-80 w-60 mx-auto text-xl  bg-purple-100 border-2 shadow-[-5px_5px_0_0] border-black p-1">
            <p className="font-bold text-center text-purple-600">
              Can hold a maximum of 10 marbles
            </p>
          </div>
        }

        {currentStep === 2 &&
            <ShootButton 
              onClick={launchGreen}
              disabled={clickDisabled || activePhase !== 'left'}
              position="left"
            />
        }

        {currentStep === 3 &&
            <ShootButton 
              onClick={launchBlue}
              disabled={clickDisabled || activePhase !== 'right'}
              position="right"
            />
        }

        {currentStep === 5 &&
          <span className="absolute right-1/4 top-[1.6rem] text-black fill-black">
            <Cross size={56} fill="#a855f7" />
          </span>
        }

        {currentStep === 6 &&
          <Button
            onClick={handleAddition}
            disabled={currentStep != 6}
            className={`absolute right-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 rounded-none
              ${currentStep != 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Empty
          </Button>
        }

        { currentStep === 8 && (
          <div className="absolute h-24 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
            <Counter onIncrement={() => handlefinalCount(1)} onDecrement={() => handlefinalCount(-1)} />
          </div>
        )}

        {currentStep === 9 && (
          <div className="absolute h-30 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
            <p className="text-7xl text-center font-bold text-purple-500">
              {maxGreenMarbles + maxBlueMarbles}
            </p>
            <p className="text-7xl text-center font-bold text-black">
              great job! <br/> correct answer
            </p>
            <Button onClick={() => setGameStateRef(prevState => ({...prevState, screen: 'second'}))} className="text-2xl bg-purple-500 text-white">Next</Button>
          </div>
        )}

      </div>
      {STEPS_WITH_PROCEED.includes(currentStep) && (
        <>
          <div className="absolute right-[-40px] top-[-24px]">
            <Button 
              onClick={() => handleProceed(currentStep)} 
              className="text-lg bg-purple-100 border-2 shadow-[-5px_5px_0_0] shadow-black border-black p-2 px-6 mb-5 rounded-none"
              style={{
                backgroundColor: COLORS.white,
              }}
            >
              <p className="font-bold font-jersey" style={{
                color: COLORS.blue
              }}>Proceed &gt;&gt;</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
