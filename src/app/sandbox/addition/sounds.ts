// Sound effects manager for the addition game
type SoundName = 'shoot' | 'collect' | 'rotate' | 'score' | 'complete' | 'pop';

class SoundManager {
  private sounds: { [K in SoundName]: HTMLAudioElement } = {} as { [K in SoundName]: HTMLAudioElement };
  private isMuted: boolean = false;
  private isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
    if (this.isClient) {
      this.initializeSounds();
    }
  }

  private initializeSounds() {
    if (!this.isClient) return;

    const soundFiles = {
      shoot: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',        // Ball shooting sound
      collect: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',    // Ball collected in container
      rotate: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',      // Container rotation sound
      score: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',        // Score increment sound
      complete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',  // Game completion sound
      pop: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',           // Ball popping sound
    };

    // Preload all sounds
    Object.entries(soundFiles).forEach(([key, path]) => {
      if (typeof window !== 'undefined') {
        const audio = new window.Audio(path);
        audio.preload = 'auto';
        this.sounds[key as SoundName] = audio;
      }
    });
  }

  play(soundName: SoundName) {
    if (!this.isClient || this.isMuted || !this.sounds[soundName]) return;

    const sound = this.sounds[soundName].cloneNode() as HTMLAudioElement;
    sound.volume = this.getVolumeForSound(soundName);
    sound.play().catch(err => console.warn('Sound play failed:', err));
  }

  private getVolumeForSound(soundName: SoundName): number {
    const volumes: { [K in SoundName]: number } = {
      shoot: 0.7,
      collect: 0.5,
      rotate: 0.4,
      score: 0.6,
      complete: 0.8,
      pop: 0.3,
    };
    return volumes[soundName];
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }
}

// Create singleton instance
let soundManagerInstance: SoundManager | null = null;

export const getSoundManager = () => {
  if (typeof window === 'undefined') {
    return {
      play: () => {},
      toggleMute: () => false,
      getMuted: () => false,
      setMute: () => {},
    };
  }
  
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
};
