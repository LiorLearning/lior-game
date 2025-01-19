import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import FourthScreen from './screen/fourth';
import FifthScreen from './screen/fifth';
import SixthScreen from './screen/sixth';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper';
import { useEffect, useRef } from 'react';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
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

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step1, step2, step3, step4, step5, step6]);

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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
        .font-jersey {
          font-family: 'Jersey 25', cursive;
        }
      `}</style>
      <div ref={bottomRef} style={{ height: 0 }} />
    </div>
  )
}


/*
"2nd review:

- AI Conversation, throughout
    - Try with slower paced AI voice, current voice feels overwhelmingly fast.
    - AI should customise response as per current game state, not give general instructions

- Screen 3
    [TD] - Text changes to “ 5 pieces, split into 2 each, give __ total pieces”
*/