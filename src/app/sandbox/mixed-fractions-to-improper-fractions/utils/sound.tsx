const soundFiles = {
  join: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
};

const soundVolumes: { [key: string]: number } = {
  join: 0.7,
};

export const useSoundEffects = () => {
  const soundEffects = Object.entries(soundFiles).reduce((acc, [name, path]) => {
    const audio = new Audio(path);
    audio.volume = soundVolumes[name];
    acc[name as keyof typeof soundFiles] = {
      play: () => audio.play(),
      sound: audio
    };
    return acc;
  }, {} as {
    [K in keyof typeof soundFiles]: {
      play: () => Promise<void>,
      sound: HTMLAudioElement
    }
  });
  return soundEffects;
};