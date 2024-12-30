'use client'

import { ChocolateBarScreen } from './chocolate-bar-screen'
import { DenominatorScreen } from './denominator-screen'
import { useGameState } from './state-utils'

export default function Game({ sendAdminMessage }: { sendAdminMessage: (role: string, content: string) => void }) {
  const { gameStateRef, setGameStateRef } = useGameState()

  const handleProceed = () => {
    setGameStateRef({ currentScreen: 'denominator' })
  }

  return (
    <div className="bg-white p-16 rounded-lg">
      {gameStateRef.current.currentScreen === 'chocolate' ? (
        <ChocolateBarScreen onProceed={handleProceed} />
      ) : (
        <DenominatorScreen />
      )}
    </div>
  )
}
