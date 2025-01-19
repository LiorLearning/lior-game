import { useEffect } from 'react';
import { useRef } from 'react';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper';


interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  const { step: step3 } = gameStateRef.current.state3;
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step1, step2, step3]);

  return (
    <div className="mx-auto game font-medium">
      <DevHelper />
      {/* Game screens */}
      {screen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'second' && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}

      
      {/* Select font */}
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


// Screen 1:
// - Clicking join initially leads to bug 
// - Remove the green background behind chocolate (check updated figma design)
// - Fraction counter should be a little to the left of chocolate with border (check updated figma design)
// - Compare visually on top should be single line, 2/3 in step should be one on top of the other
// - Add sound effects as per comment in figma for all level upgrades
// - Add sound effects for all correct answers

// Screen 2:
// - Conversation is different and some of it is updated right now
// - Have changed step 1 content in box (now has q; check figma)
// - Colors of options is diff
// - Step 2 onwards: colors are messed up, step 2 question is wrong
// - Step 3: One by one box inputs, conversation is messed up (refer figma, previous ones missing + added new ones); header is rewrite fractions and not "fraction"
// - Step 4: Drop down of "<", ">", "="

// Screen 3:
// - Boxes should be enabled one by one (step 1 should be denominator only), step 2 should be on same screen (not below it)
// - Conversations are missing
// - Alignment is messed up
// - Correct should be just like the others (confetti + text)