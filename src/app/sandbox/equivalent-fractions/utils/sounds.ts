const soundFiles = {
  button: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  correct: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  wrong: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/chocolate-break.mp3',
  complete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
};

const soundVolumes: { [key: string]: number } = {
  button: 0.5,
  correct: 0.6,
  wrong: 0.4,
  complete: 0.8,
};

export const sounds = {
  button: () => {
    const audio = new Audio(soundFiles.button);
    audio.volume = soundVolumes.button;
    audio.play().catch(e => console.log('Audio play failed:', e));
  },
  correct: () => {
    const audio = new Audio(soundFiles.correct);
    audio.volume = soundVolumes.correct;
    audio.play().catch(e => console.log('Audio play failed:', e));
  },
  wrong: () => {
    const audio = new Audio(soundFiles.wrong);
    audio.volume = soundVolumes.wrong;
    audio.play().catch(e => console.log('Audio play failed:', e));
  },
  complete: () => {
    const audio = new Audio(soundFiles.complete);
    audio.volume = soundVolumes.complete;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
}; 