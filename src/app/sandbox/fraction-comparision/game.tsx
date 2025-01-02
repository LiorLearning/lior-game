import React, { useEffect } from 'react';
import { Button} from "@/components/custom_ui/button";
import { Card } from "@/components/custom_ui/card";
import { SuccessAnimation } from "@/components/utils/success-animate";
import { Fraction, BarState, Bar } from './bar';
import { useGameState } from './state-utils';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const maxParts = 12;

const Game = ({sendAdminMessage}: GameProps) => {  
  const { gameStateRef, setGameStateRef } = useGameState();
  const gameState = gameStateRef.current;

  const checkFraction = (bar: BarState, targetFraction: Fraction) => {
    return bar.parts === targetFraction.denom && bar.selectedParts.length === targetFraction.num;
  };

  const handleCut = (barNumber: number) => {
    setGameStateRef(prev => ({
      ...prev,
      [barNumber === 1 ? 'bar1' : 'bar2']: {
        ...prev[barNumber === 1 ? 'bar1' : 'bar2'],
        parts: prev[barNumber === 1 ? 'bar1' : 'bar2'].parts + 1
      }
    }));
  };

  const handleJoin = (barNumber: number) => {
    setGameStateRef(prev => ({
      ...prev,
      [barNumber === 1 ? 'bar1' : 'bar2']: {
        ...prev[barNumber === 1 ? 'bar1' : 'bar2'],
        parts: Math.max(prev[barNumber === 1 ? 'bar1' : 'bar2'].parts - 1, 1)
      }
    }));
  };

  useEffect(() => {
    const isFirstFractionCorrect = checkFraction(gameState.bar1, gameState.fraction1);
    setGameStateRef(prev => ({ ...prev, isFirstFractionCorrect }));
    if (isFirstFractionCorrect) {
      sendAdminMessage('agent', `Awesome! Now try breaking and selecting from the second chocolate to give yourself ${gameState.fraction2.num}/${gameState.fraction2.denom}`);
    }
  }, [gameState.bar1]);

  useEffect(() => {
    const isSecondFractionCorrect = checkFraction(gameState.bar2, gameState.fraction2);
    setGameStateRef(prev => ({ ...prev, isSecondFractionCorrect }));
    if (gameState.isFirstFractionCorrect && isSecondFractionCorrect) {
      sendAdminMessage('agent', `Can you try comparing them visually - which one do you think is bigger?`);
    }
  }, [gameState.bar2]);

  const handleSelect = (barNumber: number, part: number) => {
    setGameStateRef(prev => ({
      ...prev,
      [barNumber === 1 ? 'bar1' : 'bar2']: {
        ...prev[barNumber === 1 ? 'bar1' : 'bar2'],
        selectedParts: prev[barNumber === 1 ? 'bar1' : 'bar2'].selectedParts.includes(part)
          ? prev[barNumber === 1 ? 'bar1' : 'bar2'].selectedParts.filter(p => p !== part)
          : [...prev[barNumber === 1 ? 'bar1' : 'bar2'].selectedParts, part]
      }
    }));
  };

  const handleAnswer = (answer: string) => {
    if (!gameState.isFirstFractionCorrect || !gameState.isSecondFractionCorrect) {
      return;
    }
    
    setGameStateRef(prev => ({
      ...prev,
      userAnswer: answer,
      showAnswer: true
    }));

    if (answer !== `${gameState.fraction1.num}/${gameState.fraction1.denom}`) {
      sendAdminMessage('agent', `Oops, try comparing them visually. Which one looks bigger?`);
    } else {
      sendAdminMessage('agent', `Great, let's move on to the next question`);
    }
  };

  const handleCompare = () => {
    if (!gameState.isFirstFractionCorrect || !gameState.isSecondFractionCorrect) {
      return;
    }
    setGameStateRef(prev => ({ ...prev, compareMode: true }));
  };

  const startGame = () => {
    setGameStateRef(prev => ({ 
      ...prev, 
      gameStarted: true 
    }));
    sendAdminMessage('agent', "We'll compare these fractions visually. First, try breaking the first chocolate and selecting pieces to give yourself " + gameState.fraction1.num + "/" + gameState.fraction1.denom);
  };

  return (
    <Card className="w-full max-h-4xl max-w-6xl p-16 bg-gradient-to-br from-[#faf4eb] to-[#f5e6d3] shadow-2xl rounded-2xl mx-4 overflow-auto">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#8B4513]">
            Which is bigger: {gameState.fraction1.num}/{gameState.fraction1.denom} or {gameState.fraction2.num}/{gameState.fraction2.denom}?
          </h2>
          <p className="text-lg text-[#8d6e63] italic">
            Split the bars and select pieces to explore! 🍫
          </p>
        </div>

        {/* Visualise Button */}
        {!gameState.gameStarted && (
          <div className="flex justify-center">
            <Button
              onClick={startGame}
              id="visualise-button"
              className="p-6 font-bold text-lg bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce"
            >
              Visualise
            </Button>
          </div>
        )}

        {/* Chocolate Bars Container */}
        {gameState.gameStarted && (
          <div className="space-y-12 relative">
            <div className={`transition-all duration-500 ${gameState.showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <span className="text-lg font-semibold text-[#5d4037]">First Bar: Make {gameState.fraction1.num}/{gameState.fraction1.denom}</span>
                  {gameState.isFirstFractionCorrect && (
                    <span className="ml-2 text-green-600 animate-bounce">✓</span>
                  )}
                </div>
              </div>
              <Bar
                parts={gameState.bar1.parts}
                selectedParts={gameState.bar1.selectedParts}
                onCut={() => handleCut(1)}
                onJoin={() => handleJoin(1)}
                onSelect={(part) => handleSelect(1, part)}
                maxParts={maxParts}
                compare={gameState.compareMode}
                disabled={gameState.isFirstFractionCorrect}
                label="first"
                expectedFraction={gameState.fraction1}
              />
            </div>
            
            {gameState.isFirstFractionCorrect && (
              <div className={`transition-all duration-500 ${gameState.showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                  <span className="text-lg font-semibold text-[#5d4037]">Second Bar: Make {gameState.fraction2.num}/{gameState.fraction2.denom}</span>
                  {gameState.isSecondFractionCorrect && (
                    <span className="ml-2 text-green-600 animate-bounce">✓</span>
                  )}
                </div>
              </div>
              <Bar
                parts={gameState.bar2.parts}
                selectedParts={gameState.bar2.selectedParts}
                onCut={() => handleCut(2)}
                onJoin={() => handleJoin(2)}
                onSelect={(part) => handleSelect(2, part)}
                maxParts={maxParts}
                compare={gameState.compareMode}
                disabled={gameState.isSecondFractionCorrect}
                label="second"
                expectedFraction={gameState.fraction2}
              />
              </div>
            )}
          </div>
        )}

        {/* Comparison Buttons */}
        {!gameState.showAnswer && !gameState.compareMode && gameState.gameStarted && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <Button
                onClick={handleCompare}
                id="compare-button"
                className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${gameState.isFirstFractionCorrect && gameState.isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!gameState.isFirstFractionCorrect || !gameState.isSecondFractionCorrect}
              >
                Compare Bars
              </Button>
            </div>
          </div>
        )}

        {gameState.compareMode && !gameState.showAnswer && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <Button
                onClick={() => handleAnswer(`${gameState.fraction1.num}/${gameState.fraction1.denom}`)}
                id="fraction1-button"
                className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl`}
              >
                {gameState.fraction1.num}/{gameState.fraction1.denom} is bigger
              </Button>
              <Button
                onClick={() => handleAnswer(`${gameState.fraction2.num}/${gameState.fraction2.denom}`)}
                id="fraction2-button"
                className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${gameState.isFirstFractionCorrect && gameState.isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!gameState.isFirstFractionCorrect || !gameState.isSecondFractionCorrect}
              >
                {gameState.fraction2.num}/{gameState.fraction2.denom} is bigger
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {gameState.showAnswer && (
          <>
          {gameState.userAnswer === `${gameState.correctAnswer.num}/${gameState.correctAnswer.denom}` && <SuccessAnimation />}
          <div className="mt-8">
            <div className={`rounded-xl p-8 shadow-lg backdrop-blur-sm
              ${gameState.userAnswer === `${gameState.correctAnswer.num}/${gameState.correctAnswer.denom}` ? 'bg-green-200' : 'bg-red-200'}`}>
              <div className="text-center space-y-6">
                {gameState.userAnswer === `${gameState.correctAnswer.num}/${gameState.correctAnswer.denom}` ? (
                  <>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-green-600">
                        🎉 Great job!
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-[#5d4037] flex items-center justify-center gap-3">
                    <span>Not quite! Retry</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default Game;
