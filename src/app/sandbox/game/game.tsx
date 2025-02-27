import { useEffect } from 'react';
import { useRef } from 'react';
import FirstScreen from './screen/FirstScreen/first';
import SecondScreen from './screen/SecondScreen/second';
import ThirdScreen from './screen/ThirdScreen/third';
import FourthScreen from './screen/FourthScreen/fourth';
import FifthScreen from './screen/FifthScreen/fifth';
import SixthScreen from './screen/SixthScreen/sixth';
import SeventhScreen from './screen/SeventhScreen/seventh';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper';
import { sounds } from './utils/sound';
import { preloadAssets } from './utils/preloader';

interface GameProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  const { step: step4 } = gameStateRef.current.state4;
  const { step: step5 } = gameStateRef.current.state5;
  const { step: step6 } = gameStateRef.current.state6;
  const { step: step7 } = gameStateRef.current.state7;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  
  const hasGameStartedRef = useRef(false);
  
  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      
    }
  }, []);

  useEffect(() => {
    preloadAssets();
    console.log('--------------------------------');
  }, []);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step1, step2, step3, step4, step5, step6, step7, screen]);

  return (
    <div className="mx-auto game font-jersey">
      <DevHelper />
      {/* Game screens */}
      {screen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'second' && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'fourth' && <FourthScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'fifth' && <FifthScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'sixth' && <SixthScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'seventh' && <SeventhScreen sendAdminMessage={sendAdminMessage} />}
      <div ref={bottomRef} style={{ height: 0 }} />

      {/* Select font */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
            }
            @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
            .font-patrick {
              font-family: 'Patrick Hand', cursive;
              }
              `}</style>

    </div>
  )
}