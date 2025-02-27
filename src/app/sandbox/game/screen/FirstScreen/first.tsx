import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen1Step0 from './Step0';
import Screen1Step1 from './Step1';
import Screen1Step2 from './Step2';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  
    
  
  if (gameStateRef.current.state1.step == 0) {
    return (
      <Screen1Step0 sendAdminMessage={sendAdminMessage}/>
    )
  } else if (gameStateRef.current.state1.step == 1) {
    return (
      <Screen1Step1 sendAdminMessage={sendAdminMessage}/>
    )
  } else if (gameStateRef.current.state1.step == 2) {
    return (
      <Screen1Step2 sendAdminMessage={sendAdminMessage}/>
    )
  }
}