'use client'

import { ChocolateBarScreen } from './chocolate-bar-screen'
import { DenominatorScreen } from './denominator-screen'
import { useGameState } from './state-utils'

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState()

  const handleProceed = () => {
    setGameStateRef({ currentScreen: 'denominator' })
  }

  return (
    <div className="bg-white rounded-lg">
      {gameStateRef.current.currentScreen === 'chocolate' ? (
        <ChocolateBarScreen onProceed={handleProceed} sendAdminMessage={sendAdminMessage} />
      ) : (
        <DenominatorScreen sendAdminMessage={sendAdminMessage} />
      )}
    </div>
  )
}
