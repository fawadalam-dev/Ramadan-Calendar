// Convert 24-hour format to 12-hour format with AM/PM
export const convertTo12Hour = (time24) => {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  if (hour > 12) {
    hour = hour - 12;
  } else if (hour === 0) {
    hour = 12;
  }
  
  return `${hour}:${minutes} ${ampm}`;
};

// Get audio URL for alarm sound
export const getAlarmSound = () => {
  return 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==';
};

// Play alarm/ringtone
export const playAlarm = (duration = 3000) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800; // Frequency in Hz (high pitch)
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
};
