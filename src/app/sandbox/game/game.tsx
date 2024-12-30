import React from 'react';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const Game = ({sendAdminMessage}: GameProps) => {
  return <div>This is the default game.</div>;
};

export default Game;
