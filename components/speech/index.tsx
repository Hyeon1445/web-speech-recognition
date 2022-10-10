import Three from '@components/three'
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
    setText(text)
  }
  speechToText.onspeechend = () => {
    // speech end
  }
  speechToText.onnomatch = (event: any) => {
    console.log('Sorry')
  }
  speechToText.onstart = () => {
    // speech start
    console.log('on start')
  }
  speechToText.onend = () => {
    // speech end
    console.log('on end')
  }
  speechToText.onerror = (event: any) => {
    // error
    console.log('on error')
  }
  console.log(speechToText)
  speechToText.start()
}

const Speech = () => {
  const [text, setText] = useState('-')

  return (
    <div>
      <p>{text}</p>
      <button onClick={() => handleSpeech(setText)}>speak</button>
      <Canvas
        gl={{ antialias: false }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [-60, 0, 0],
        }}
      >
        <Three />
      </Canvas>
    </div>
  )
}

export default Speech
