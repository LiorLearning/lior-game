const playSound = (soundName: string) => {
  const audio = new Audio(`/sounds/${soundName}.mp3`);
  audio.play().catch(e => console.log('Audio play failed:', e));
};

export const sounds = {
  drag: () => playSound('drag'),
  drop: () => playSound('drop'),
  correct: () => playSound('correct'),
  wrong: () => playSound('wrong'),
  button: () => playSound('button'),
}; 