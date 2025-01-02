import * as Matter from "matter-js";
import { useGameState } from "./state-utils";
import { getSoundManager } from './sounds';
import { useEffect, useRef, useState } from "react";
import { Cross, Minus, Plus } from "lucide-react";
import { Button } from "@/components/custom_ui/button";
import React from 'react';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Position {
  x: any;
  y: any;
}

interface Vector {
  x: number;
  y: number;
}

export default function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const leftPlatformRef1 = useRef<Matter.Composite | null>(null);
  const leftPlatformRef2 = useRef<Matter.Body | null>(null);
  const containerRef = useRef<Matter.Composite | null>(null);
  const rightPlatformRef1 = useRef<Matter.Composite | null>(null);
  const rightPlatformRef2 = useRef<Matter.Body | null>(null);
  const finalContainerRef = useRef<Matter.Composite | null>(null);
  const [slingPosition, setSlingPosition] = useState<Position[]>([
  //   { x: 300, y: 68 },
  //   { x: 380, y: 68 }

      { x: 200, y: 68 },
      { x: 480, y: 68 }
  ])

  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState<React.ReactNode>("");

  useEffect(() => {
    const message = (() => {
      switch (currentStep) {
        case 0:
          return "Let's play a game to solve this. Imagine you have 8 green, 7 blue marbles and a slingshot!!"; 
        case 1:
          return "And a container to collect the marbles";
        case 2:
          if(gameStateRef.current.greenScore === 8) {
            return <>Let's start! <br/> Step 1 : Finish shooting the green marbles into the marble holder!  </>;
          } else {
            return "Keep shooting until the container is full!";
          }
        case 3:
          return <> We have filled all 8 green ones. <br/> Step 2 : Let's fill the blue ones.</>;
        case 4: 
          return "Oops! The container is full. Let's see how many marbles we have";
        case 5:
          return "Look! 8+7 is same as 10+5";
        case 6:
          return "Step 3 : Click on empty to add 10+5";
        case 7:
          return "Let us see how many marbles we have collected. Let's empty them in a box";
        case 8:
          return "Step 4 : Let us count the total marbles in the box";
        case 9:
          return "Great Job! You calculated the answer";
        default:
          return "";
      }
    })();

    setStepMessage(message);
  }, [currentStep, gameStateRef.current.greenScore]);

  const duration = 5000;

  const [finalAnswer, setFinalAnswer] = useState<number>(0);

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
      const score = gameStateRef.current.containerScore;
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

  const updateContainerColors = () => {
    const bodies = Matter.Composite.allBodies(containerRef.current!);
    console.log('Bodies:', bodies);
    bodies.forEach(body => {
      if (body.label?.startsWith('container_segment_')) {
        const score = gameStateRef.current.containerScore;
        const index = parseInt(body.label.split('_')[2]);
        const isActive = index < score;
        body.render.fillStyle = isActive ? "#BA69EF" : "#fff";
      }
    });
  };

  const createFinalContainer = () => {
    const containerWidth = 400;  
    const containerHeight = 100;
    const containerPosition = { x: 550, y: 500 }; 

    const containerComposite = Matter.Composite.create();

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
        containerPosition.y,
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.back,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
      // Left face
      Matter.Bodies.fromVertices(
        containerPosition.x - containerWidth / 2 - 10,
        containerPosition.y + 10,
        leftFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.left,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
      // Bottom face
      Matter.Bodies.fromVertices(
        containerPosition.x - 10,
        containerPosition.y + containerHeight / 2 + 10,
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
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
       // Right face
       Matter.Bodies.fromVertices(
        containerPosition.x + containerWidth / 2 - 10,
        containerPosition.y + 10,
        rightFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.right,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002 ,
            mask: 0x0000
          }
        }
      ),
      // Front face (semi-transparent)
      Matter.Bodies.rectangle(
        containerPosition.x - 20,
        containerPosition.y + 20, // Slight offset for 3D effect
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: "rgba(232, 248, 255, 0.3)", // Semi-transparent front
            strokeStyle: "#000",
            lineWidth: 1,
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
      Matter.Bodies.rectangle(containerPosition.x - containerWidth / 2 - 10, containerPosition.y - containerHeight/2+10 , 1, containerHeight, {
        isStatic: true,
        render: {
          fillStyle: "#000"
        },
        collisionFilter: { category: 0x0004 }
      }),

      // Right invisible border
      Matter.Bodies.rectangle(containerPosition.x + containerWidth / 2 - 10, containerPosition.y - containerHeight/2 + 10, 1, containerHeight, {
        isStatic: true,
        render: {
          fillStyle: "#000"
        },
        collisionFilter: { category: 0x0004 }
      }),

      // Bottom invisible border
      Matter.Bodies.rectangle(containerPosition.x - 10, containerPosition.y + 10, containerWidth, 1, {
        isStatic: true,
        render: {
          fillStyle: "#000"
        },
        collisionFilter: { category: 0x0004 }
      }),
      
      Matter.Bodies.rectangle(containerPosition.x, containerPosition.y+10, 800, 20, {
        isStatic: true,
        render: {
          visible: false
        },
      }),
  
    ]


    Matter.Composite.add(containerComposite, [...parts, ...visualparts]);
    finalContainerRef.current = containerComposite;
    return containerComposite;
  };

  const flipContainerAndPlatform = () => {
    if (!containerRef.current || !worldRef.current || !rightPlatformRef2.current || !rightPlatformRef1.current) return;

    // Hide left platform, container, and scores
    if (worldRef.current) {
      const bodies = Matter.Composite.allBodies(worldRef.current);
      bodies.forEach(body => {
        if (body.position.x < 400) {
          Matter.Composite.remove(worldRef.current!, body);
        }
      });
    }

    // Create and add final container
    const finalContainer = createFinalContainer();
    Matter.Composite.add(worldRef.current, finalContainer);

    // Don't set showEmptyButton
    setGameStateRef(prevState => ({
      ...prevState,
      showAdditionStep: true
    }));

    // 
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
         getSoundManager().play('complete');
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

    const reduceScoreAndUpdateColor = () => {
      if (gameStateRef.current.containerScore > 0) {
        setGameStateRef(prevState => ({ ...prevState, containerScore: prevState.containerScore - 1 }));
        getSoundManager().play('pop');
        updateContainerColors();
        setTimeout(reduceScoreAndUpdateColor, 200);
      }else{
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
          lineWidth: 15
        },
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

    setGameStateRef(prevState => ({
      ...prevState,
      activeBallLeft: null,
      activeBallRight: null,
      leftContainerBalls: createContainerBalls(leftContainerX, "#4CAF50", 8),
      rightContainerBalls: createContainerBalls(rightContainerX, "#3498db", 7),
      showAdditionStep: true
    }));

    // Don't set showEmptyButton
    setGameStateRef(prevState => ({
      ...prevState,
      showAdditionStep: true
    }));

    Matter.Composite.add(world, [
      ...gameStateRef.current.leftContainerBalls,
      ...gameStateRef.current.rightContainerBalls
    ]);

    return { render, runner, engine };
  };

  // function movePlatform(
  //   platform: Matter.Body,
  //   targetX: number,
  //   steps: number = 60
  // ) {
  //   if (!platform) return;

  //   const dx = targetX - platform.position.x;
  //   const stepX = dx / steps;
  //   let currentStep = 0;

  //   function animate() {
  //     if (currentStep >= steps) {
  //       Matter.Body.setPosition(platform, {
  //         x: targetX,
  //         y: platform.position.y
  //       });
  //       return;
  //     }
  //     Matter.Body.setPosition(platform, {
  //       x: platform.position.x + stepX,
  //       y: platform.position.y
  //     });
  //     currentStep++;
  //     requestAnimationFrame(animate);
  //   }
  //   animate();
  // }

  const launchBall = (color: 'green' | 'blue') => {
    if (gameStateRef.current.clickDisabled) return;
    
    getSoundManager().play('shoot');
    if ((color === 'green' && gameStateRef.current.activePhase !== 'left') || (color === 'blue' && gameStateRef.current.activePhase !== 'right')) return;

    setGameStateRef(prevState => ({ ...prevState, clickDisabled: true }));

    const isGreen = color === 'green';
    const platformX = isGreen ? 170 : 623;
    let activeBall = isGreen ? gameStateRef.current.activeBallLeft : gameStateRef.current.activeBallRight;
    console.log('Active ball:', activeBall);
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

    const containerBalls = isGreen ? gameStateRef.current.leftContainerBalls : gameStateRef.current.rightContainerBalls;



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
        [isGreen ? 'greenScore' : 'blueScore']: prevState[isGreen ? 'greenScore' : 'blueScore'] - 1,
        containerScore: prevState.containerScore + 1
      }));
      updateContainerColors();
      getSoundManager().play('collect');
    }, 1000);

    setTimeout(() => {
      if (!worldRef.current) return;
      setTimeout(() => {
        if (containerBalls.length > 0 && gameStateRef.current.containerScore < 10) {
          const ballToMove = containerBalls[containerBalls.length - 1]; 

          Matter.Body.setPosition(ballToMove, { x: platformX, y: 130 });
          attachStringsToBall(ballToMove, anchor1, anchor2);

          setGameStateRef(prevState => ({
            ...prevState,
            [isGreen ? 'activeBallLeft' : 'activeBallRight']: ballToMove,
            [isGreen ? 'leftContainerBalls' : 'rightContainerBalls']: containerBalls.slice(0, -1),
            clickDisabled: false
          }));
        } else {
          setGameStateRef(prevState => ({
            ...prevState,
            [isGreen ? 'activeBallLeft' : 'activeBallRight']: null,
            clickDisabled: false
          }));
        }
      }, 500);
    }, 1000);
  };

  const launchGreen = () => {
    launchBall('green');
    if (gameStateRef.current.greenScore === 1 && gameStateRef.current.activePhase === 'left') {
      setTimeout(() => {
        setGameStateRef(prevState => ({
          ...prevState,
          activePhase: 'right'
        }));
        setCurrentStep(3);
        progressStep(3);
      }, 1500);
    }
  }
  const launchBlue = () => {
    launchBall('blue');
    if (gameStateRef.current.containerScore === 9) {
      setTimeout(() => {
        setCurrentStep(4);
        progressStep(4);
      }, 1500);
    }
  }
  const handlefinalCount = (i:number) => {
    if (i === -1 ) setFinalAnswer((prev) => prev - 1);
    else setFinalAnswer((prev) => {
      if (prev === 14) {
          getSoundManager().play('complete');
          setTimeout(() => {
            setCurrentStep(9);
            progressStep(9);
          }, 500);
        }
      return prev + 1;
    });
    
  }

  const handleAddition = () => {
    setCurrentStep(7);
    setGameStateRef(prevState => ({
      ...prevState,
      additionStarted: true,
      showAddButton: false
    }));

    getSoundManager().play('rotate');

    setTimeout(() => {
      flipContainerAndPlatform();
    }, 1000);
  }

  const progressStep = (step: number = currentStep) => {
    if (step === 0) {
      setTimeout(() => {
        setCurrentStep(1);  
        progressStep(1);
      }, duration);

    } else if (step === 1) {
      if (!containerRef.current) createMainContainer();
      setTimeout(() => {
        setCurrentStep(2);
        progressStep(2);
      }, duration);
      
    } else if (step === 2) {
      if (!gameStateRef.current.activeBallLeft) {
        const activeball = gameStateRef.current.leftContainerBalls[gameStateRef.current.leftContainerBalls.length - 1];
        setGameStateRef(prevState => ({ 
          ...prevState,
          activeBallLeft: activeball,
          activePhase: 'left',
          leftContainerBalls: gameStateRef.current.leftContainerBalls.slice(0, -1)
        }));
        console.log('Active ball:', activeball);
        if (activeball) {
          Matter.Body.setPosition(activeball, { x: 170, y: 130 });
          attachStringsToBall(activeball, { x: 230, y: 100 }, { x: 213, y: 100 });
          console.log('Active ball set to left container.');
        }
      }

    } else if (step === 3) {
      if (!gameStateRef.current.activeBallRight) {

        const activeball = gameStateRef.current.rightContainerBalls[gameStateRef.current.rightContainerBalls.length - 1];
        setGameStateRef(prevState => ({
          ...prevState,
          activeBallRight: activeball,
          activePhase: 'right',
          rightContainerBalls: gameStateRef.current.rightContainerBalls.slice(0, -1)
        }));
        console.log('Active ball:', activeball);
        if (activeball) {
          Matter.Body.setPosition(activeball, { x: 623, y: 130 });
          attachStringsToBall(activeball, { x: 563, y: 100 }, { x: 580, y: 100 });
          console.log('Active ball set to right container.');
        }
      }
    } else if (step === 4) {
      setTimeout(() => {
        setCurrentStep(5);
        progressStep(5);
      }, duration);

    } else if (step === 5) {
      Matter.Composite.remove(worldRef.current!, leftPlatformRef1.current!);
      Matter.Composite.remove(worldRef.current!, leftPlatformRef2.current!);
      Matter.Composite.remove(worldRef.current!, rightPlatformRef2.current!);
      leftPlatformRef1.current

      setTimeout(() => {
        setCurrentStep(6);
        progressStep(6);
      }, duration);

    } else if (step === 6) {
      const finalcontainer = createFinalContainer();
      finalContainerRef.current = finalcontainer;
      Matter.Composite.add(worldRef.current!, finalcontainer);

    } else if (step === 8) {
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

    // Matter.Events.on(engine, 'beforeUpdate', () => {
    //   updateContainerColors();
    // });

    progressStep(0);

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
    if (gameStateRef.current.containerScore === 10 && !gameStateRef.current.showAddButton) {
      setGameStateRef(prevState => ({
        ...prevState,
        showAddButton: true,
        clickDisabled: true
      }));
    }
  }, [gameStateRef.current.containerScore]);


  return (
    <div className="h-full w-full bg-white">
    <div className="flex flex-col h-full w-full justify-center items-center font-gaegu bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
      <div className="relative w-[800px] mx-auto ">
        <section className="h-52 flex flex-col justify-center">
          <h3 className="text-5xl font-bold text-center pb-10">
            8 + 7 = ?
          </h3>
          <div className={`w-2/3 mx-auto text-2xl ${currentStep===4? 'bg-purple-600' : 'bg-purple-100'} border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-5`}>
          <p className={`font-bold text-center ${currentStep===4? 'text-purple-100' : ' text-purple-600'}`}>
            {stepMessage}
          </p>
          </div>
        </section>

        <div className="relative w-full">
          {currentStep < 5 &&
            <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-green-500 z-10 text-green-500" style={{
              top: slingPosition[0].y - 50,
              left: slingPosition[0].x - 160
            }}>
              {gameStateRef.current.greenScore}
            </div>
          }
          {currentStep <= 5 &&
            <div className="absolute text-5xl font-bold px-4 py-2 bg-white border border-blue-500 z-10 text-blue-500" style={{
              top: slingPosition[1].y - 50,
              left: slingPosition[1].x + 220
            }}>
              {gameStateRef.current.blueScore}
            </div>
          }

            {currentStep > 1 && currentStep <= 5 &&
            <div className={`absolute ${currentStep === 5 ? "left-1/2 top-[2.5rem]" :  "bottom-1/4 left-1/3" } transform -translate-x-1/3 -translate-y-1/4  text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500`}>
              {gameStateRef.current.containerScore}
            </div>
            }

            {currentStep < 5 && <>
              <img 
                src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/catapult-full.png" 
                alt="Arrow" 
                className="absolute z-10 w-28 h-18" 
                style={{
                  top: slingPosition[0].y,
                  left: slingPosition[0].x
                }}
              />
              <img 
                src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/catapult-half.png" 
                alt="Arrow" 
                className="absolute z-10 w-28 h-18"
                style={{
                  top: slingPosition[0].y, 
                  left: slingPosition[0].x 
                }}
              />
              <img 
                src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/catapult-full-2.png"
                alt="Arrow" 
                className="absolute z-10 w-28 h-18"
                style={{
                  top: slingPosition[1].y,
                  left: slingPosition[1].x 
                }}
              />
              <img 
                src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/catapult-half-2.png" 
                alt="Arrow" 
                className="absolute z-10 w-28 h-18"
                style={{
                  top: slingPosition[1].y,
                  left: slingPosition[1].x
                }}
              />
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
              <Button
                onClick={launchGreen}
                disabled={gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'left'}
                className={`absolute left-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'left') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </Button>
          }

          {currentStep === 3 &&
              <Button
                onClick={launchBlue}
                disabled={gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'right'}
                className={`absolute right-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'right') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </Button>
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
              className={`absolute right-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                ${currentStep != 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Empty
            </Button>
          }

          { currentStep === 8 && (
            <div className="absolute h-10 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
              <p className="flex">
                  <Button 
                    onClick={() => handlefinalCount(-1)}
                    className="text-purple-500"
                  >
                    <Minus size={24} />
                  </Button>
                  <p className="text-2xl px-4 mx-8 font-bold border-2 border-purple-500 bg-white text-purple-500">
                    count
                  </p>
                  <Button 
                    onClick={() => handlefinalCount(1)}
                    className="text-purple-500"
                  >
                    <Plus size={24} />
                  </Button>

              </p>
              <p className="text-4xl font-bold text-purple-500">
                {finalAnswer}
              </p>
            </div>
          )}

          {currentStep === 9 && (
            <div className="absolute h-30 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
              <p className="text-7xl text-center font-bold text-purple-500">
                15
              </p>
              <p className="text-7xl text-center font-bold text-black">
                great job! <br/> correct answer
              </p>
            </div>
          )}
          </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');

        .font-gaegu {
          font-family: 'Gaegu', cursive;
        }
      `}</style>
    </div>
  </div>
  );
};
