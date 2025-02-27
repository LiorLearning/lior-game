import { useState } from 'react';
import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen2Step0 from './Step0';
import Screen2Step1 from './Step1';
import Screen2Step2 from './Step2';
import Screen3Step3 from './Step3';

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const [sliderValue, setSliderValue] = useState(0);

  
  if (gameStateRef.current.state3.step == 0) {
    return (
      <Screen2Step0 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state3.step == 1) {
    return (
      <Screen2Step1 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state3.step == 2) {
    return (
      <Screen2Step2 sendAdminMessage={sendAdminMessage} sliderValue={sliderValue} setSliderValue={setSliderValue}/>
    )
  } else if (gameStateRef.current.state3.step == 3) {
    return (
      <Screen3Step3 sendAdminMessage={sendAdminMessage}/>
    )
  }
}