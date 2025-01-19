import { GameState, initialGameState } from "./game-state";
import { createContext, useContext, useReducer, useRef, ReactNode } from 'react';


const GameStateContext = createContext<{
    gameStateRef: React.MutableRefObject<GameState>;
    setGameStateRef: (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => void;
  } | undefined>(undefined);
  
  const gameStateReducer = (state: GameState, action: Partial<GameState> | ((prevState: GameState) => GameState)): GameState => {
    if (typeof action === 'function') {
      return action(state);
    }
    return { ...state, ...action };
  };  

export const GameStateProvider: React.FC<{ 
  children: ReactNode 
}> = ({ children }) => {
  const gameStateRef = useRef<GameState>(initialGameState);
  const [, dispatch] = useReducer(gameStateReducer, initialGameState);
  
  const setGameStateRef = (newState: ((prevState: GameState) => GameState) | Partial<GameState>, shouldRerender = true) => {
    // Update the ref
    if (typeof newState === 'function') {
      const updatedState = newState(gameStateRef.current)
      gameStateRef.current = updatedState
    } else {
      gameStateRef.current = { ...gameStateRef.current, ...newState }
    }
    
    // Conditionally trigger a re-render
    if (shouldRerender) {
      dispatch(newState)
    }
  };

  return (
    <GameStateContext.Provider value={{ 
      gameStateRef,
      setGameStateRef,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
