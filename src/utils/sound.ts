/**
 * Generates an audio chime using Web Audio API (no external asset needed)
 */
export function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play warm melodic arpeggio (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.12 + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 0.7);
    });
  } catch {
    // AudioContext might be restricted until user gesture; fails silently
  }
}
