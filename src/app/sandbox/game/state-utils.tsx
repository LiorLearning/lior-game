// import { fetchGameState } from "@/hooks/get-game-state";
import { GameState, initialGameState, descriptions } from "./game-state";
import { createContext, useContext, useReducer, useRef, ReactNode, useEffect } from 'react';
// import { mergeGameState } from "@/hooks/merge-game-state";
import  checkGameStateLimits  from './state-limits';

const GameStateContext = createContext<{
    gameStateRef: React.MutableRefObject<GameState>;
    setGameStateRef: (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => void;
    getDescription: () => string;
    setGameState: (newState: Partial<GameState>) => void;
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
  const queryParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const id = queryParams.get('id');

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

  const setGameState = (newState: Partial<GameState>) => {
    // setGameStateRef(mergeGameState(gameStateRef.current, newState))
  }


  useEffect(() => {
    const loadGameState = async () => {
      const currentGame = window.location.search.split('game=')[1]?.split('&')[0] || 'template-game';

      try {
        // const fetchedGameState = (id ? 
        //   // await fetchGameState(id) as Partial<GameState> : 
        //   (localStorage.getItem(currentGame) ? 
        //     JSON.parse(localStorage.getItem(currentGame) || '{}') as Partial<GameState> : 
        //     initialGameState)
        // );

        // const updatedGameState = mergeGameState(initialGameState, fetchedGameState);
        // const validationResult = checkGameStateLimits(updatedGameState);
        
        // if (validationResult.isValid) {
        //   setGameStateRef(updatedGameState);
        // } else {
        //   alert(`Invalid game state: ${validationResult.reason}`);
        // }
      } catch (e) {
        console.error('Error fetching game state:', e);
      }
    };

    loadGameState();
  }, [id]);
  

  const getDescription = () => {
    const description = descriptions.find(d => d.title === gameStateRef.current.screen)?.description;
    return description || '';
  }

  return (
    <GameStateContext.Provider value={{ 
      gameStateRef,
      setGameStateRef,
      getDescription,
      setGameState
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