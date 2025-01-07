import React, { useEffect, useRef } from 'react'
import First from './screenOne'
import Second from './screenTwo';
import ComparisonPage from './components/comparison-page';
import { useGameState } from './state-utils';
import { GameProps } from './components/types';

function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef } = useGameState();
  
  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col pb-96 h-full w-full justify-center items-center font-gaegu bg-[#BFF0FF] relative">
        <img 
          src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/cloud-bg.png" 
          alt="Game background" 
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-0 right-[80px]"
        />
        <div className="relative z-10">
          {gameStateRef.current.screen === 'first' && (
            <>
              <First sendAdminMessage={sendAdminMessage} visible={true} />
              {gameStateRef.current.state1.currentStep === 5 && (
                <div className="w-full absolute inset-0 z-10 bg-white rounded-lg shadow-lg">
                  <div className="h-full w-full">
                    <ComparisonPage sendAdminMessage={sendAdminMessage} />
                  </div>
                </div>
              )}
            </>
          )}
          {gameStateRef.current.screen === 'second' &&
            <Second sendAdminMessage={sendAdminMessage} />
          }
        </div>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');
          .font-gaegu {
            font-family: 'Gaegu', cursive;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Game