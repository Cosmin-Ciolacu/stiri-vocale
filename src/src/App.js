import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const App = () => {
    const commands = [
        {
            command: 'scrie *',
            callback: word => console.log(word)
        }
    ]
  const { transcript, resetTranscript } = useSpeechRecognition({commands})
  

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={() => SpeechRecognition.startListening({language : 'ro-RO'})}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}

export default App
