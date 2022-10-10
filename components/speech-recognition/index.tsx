import RecognizedText from '@components/recognized-text'
import styled from '@emotion/styled'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

const SpeechRecognition = () => {
  const [text, setText] = useState('...')
  const [isListening, setIsListening] = useState(false)

  const handleSpeech = () => {
    const Recognition =
      //@ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      const warningText = 'This browser does not support speech recognition'
      setText(warningText.split(' ').join('\n'))
      return
    }
    const speechToText = new Recognition()
    speechToText.lang = 'ko-KR'
    speechToText.continuous = false
    speechToText.intermResults = false
    speechToText.maxAlternatives = 1
    speechToText.onresult = (event: any) => {
      const text = event.results[0][0].transcript
      console.log(text)
      setText(text.split(' ').join('\n'))
    }
    speechToText.onstart = () => {
      setText('Listening...')
      setIsListening(true)
    }
    speechToText.onend = () => {
      setIsListening(false)
      if (text === 'Listening...') {
        setText('...')
      }
    }
    speechToText.onerror = () => {
      setText('...')
    }
    speechToText.start()
  }

  return (
    <div>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [-500, 0, 0],
        }}
        style={{
          height: '100vh',
          backgroundColor: '#000',
        }}
      >
        <RecognizedText text={text} />
      </Canvas>
      {!isListening && (
        <SpeakButton className="material-icons md-36" onClick={handleSpeech}>
          mic
        </SpeakButton>
      )}
    </div>
  )
}

const SpeakButton = styled.button`
  background-color: #e2ffa7;
  position: absolute;
  bottom: 20vh;
  height: 3rem;
  width: 3rem;
  border-radius: 99px;
  left: calc(50% - 1.5rem);
`
export default SpeechRecognition
