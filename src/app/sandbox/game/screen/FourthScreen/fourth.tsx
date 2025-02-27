import { useState } from 'react';
import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen4Step0 from './Step0';
import Screen4Step1 from './Step1';
import Screen4Step2 from './Step2';
import Screen4Step3 from './Step3';

export default function FourthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const [sliderValue, setSliderValue] = useState(0);

  
  if (gameStateRef.current.state4.step == 0) {
    return (
      <Screen4Step0 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state4.step == 1) {
    return (
      <Screen4Step1 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state4.step == 2) {
    return (
      <Screen4Step2 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state4.step == 3) {
    return (
      <Screen4Step3 sendAdminMessage={sendAdminMessage}/>
    )
  }
}