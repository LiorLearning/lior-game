# lior-game

`lior-game` is a React package that transforms any interactive game into a conversation-based learning experience. It adds an AI assistant that guides users through gameplay, providing real-time feedback and instructions in a chat-like interface.

## Features

- 🤖 AI-powered conversational interface
- 💬 Real-time feedback system
- 🎮 Game state management
- 🔄 Seamless integration with existing games
- 📱 Responsive design
- ⚡ Built-in UI components

## Installation

```bash
npm install lior-game
# or
yarn add lior-game
# or
pnpm add lior-game
```

## Quick Start

1. First, wrap your game component with the necessary providers:

```jsx
import { LiorGameProvider, useSandboxContext } from 'lior-game';
import { GameStateProvider, useGameState } from './your-game';

function GameWrapper() {
  const { gameState } = useGameState();
  
  return (
    <LiorGameProvider gameState={gameState} desc={gameDescription}>
      <YourGame />
    </LiorGameProvider>
  );
}
```

2. Add conversation capabilities to your game component:

```jsx
function YourGame({ sendAdminMessage }) {
  // Use sendAdminMessage to communicate with the AI assistant
  const handleUserAction = () => {
    sendAdminMessage('agent', 'Great move! Now try...');
  };

  return (
    // Your game UI
  );
}
```

## Core Components

### LiorGameProvider

The main provider that sets up the conversational context.

```jsx
<LiorGameProvider 
  gameState={gameState}  // Your game's current state
  desc={description}     // Game description and rules
>
  {children}
</LiorGameProvider>
```

### useSandboxContext

A hook that provides communication with the AI assistant.

```jsx
const { sendAdminMessage } = useSandboxContext();

// Send messages from the AI assistant
sendAdminMessage('agent', 'Try clicking the blue button');
```

## Built-in Components

The package includes several pre-styled components:

- `Card`: A styled container component
- `Button`: An interactive button with hover states
- `SuccessAnimation`: A celebration animation for achievements

```jsx
import { Card, Button, SuccessAnimation } from 'lior-game';

function GameComponent() {
  return (
    <Card>
      <Button onClick={handleAction}>Play</Button>
      {isSuccess && <SuccessAnimation />}
    </Card>
  );
}
```

## Game State Management

To integrate with the conversation system, your game should:

1. Define a game state interface
2. Create a context provider for your game state
3. Create a custom hook to access the game state

Example:

```jsx
// GameStateProvider
export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialState);
  
  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

// Custom hook
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within GameStateProvider');
  }
  return context;
};
```

## Best Practices

1. **Clear Instructions**: Provide clear game descriptions in the `desc` prop
2. **Timely Feedback**: Send messages at key interaction points
3. **Progressive Guidance**: Break down complex actions into simple steps
4. **Error Handling**: Provide helpful messages when users make mistakes
5. **State Management**: Keep game state synchronized with the conversation

## Example Implementation

Here's a complete example of how to structure your game:

```jsx
'use client'

import { Suspense } from 'react';
import { LiorGameProvider, useSandboxContext } from 'lior-game';
import Game, { desc, GameStateProvider, useGameState } from './game/game';

// Wrapper to access context
function LiorGameWrapper() {
  const { sendAdminMessage } = useSandboxContext();
  return <Game sendAdminMessage={sendAdminMessage} />;
}

// Game state wrapper
function GameWrapper() {
  const { gameState } = useGameState();

  return (
    <LiorGameProvider gameState={gameState ?? {}} desc={desc}>
      <LiorGameWrapper />
    </LiorGameProvider>
  );
}

// Page component
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameStateProvider>
        <GameWrapper />
      </GameStateProvider>
    </Suspense>
  );
}
```

## TypeScript Support

The package includes TypeScript definitions out of the box. Define your game state interface and use it with the providers:

```typescript
interface GameState {
  score: number;
  level: number;
  // ... other state properties
}

const LiorGameProvider: React.FC<{
  gameState: GameState;
  desc: string;
  children: ReactNode;
}>;
```

## License

MIT © Lior Learning Inc

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.