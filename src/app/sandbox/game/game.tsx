import React, { useEffect, useRef } from 'react'
import First from './screenOne'
import Second from './screenTwo';
import ComparisonPage from './components/comparison-page';
import { useGameState } from './state-utils';
import { GameProps } from './components/types';
import { COLORS } from './utils/constants';

function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef } = useGameState();

  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col h-full w-full justify-start items-center font-gaegu relative overflow-y-auto" style={{ backgroundColor: COLORS.lightBlue }}>
        <img 
          src="https://mathtutor-images.s3.us-east-1.amazonaws.com/games/image/clouds.png" 
          alt="Game background" 
          className="absolute inset-0 w-full object-cover opacity-100 z-1 right-[120px]"
        />
        <div className="relative z-10 w-full pt-8">
          {gameStateRef.current.screen === 1 && (
            <>
              <First sendAdminMessage={sendAdminMessage} visible={true} />
              {gameStateRef.current.state1.step === 5 && (
                <div className="w-full absolute inset-0 z-10 rounded-lg shadow-lg" style={{
                  backgroundColor: COLORS.white
                }}>
                  <div className="h-full w-full">
                    <ComparisonPage />
                  </div>
                </div>
              )}
            </>
          )}
          {gameStateRef.current.screen === 2 &&
            <Second sendAdminMessage={sendAdminMessage} />
          }
        </div>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Jersey+20&family=Jersey+25&display=swap');
          
          .font-gaegu {
            font-family: 'Gaegu', cursive;
          }

          /* Update Jersey class to use proper specificity */
          .font-jersey {
            font-family: 'Jersey 20', sans-serif !important;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Game