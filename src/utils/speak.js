const speak = (text) => {
  const tts = new SpeechSynthesisUtterance();
  tts.lang = "ro-RO";
  tts.text = text;
  window.speechSynthesis.speak(tts);
};

export default speak;
