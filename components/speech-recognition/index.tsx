import RecognizedText from '@components/recognized-text'
import styled from '@emotion/styled'
import { Canvas } from '@react-three/fiber'
import { Dispatch, SetStateAction, useState } from 'react'

const handleSpeech = (setText: Dispatch<SetStateAction<string>>) => {
  const Recognition =
    //@ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Recognition) {
    console.log('Speech Recognition is not support in this browser')
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
  // speechToText.onspeechend = () => {
  //   // speech end
  // }
  speechToText.onnomatch = () => {
    console.log('Sorry')
  }
  speechToText.onstart = () => {
    setText('Listening...')
  }
  // speechToText.onend = () => {
  //   // speech end
  //   console.log('on end')
  // }
  speechToText.onerror = () => {
    console.log('on error')
    setText('...')
  }
  speechToText.start()
}

const SpeechRecognition = () => {
  const [text, setText] = useState('...')

  return (
    <div>
      <button onClick={() => handleSpeech(setText)}>speak</button>
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
    </div>
  )
}

export default SpeechRecognition
