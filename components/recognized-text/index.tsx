import * as React from 'react'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import NanumGothic from 'public/NanumGothicExtraBold_Regular.json'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: ReactThreeFiber.Node<TextGeometry, typeof TextGeometry>
    }
  }
}

const RecognizedText = ({ text = '-' }: { text: string }) => {
  extend({ TextGeometry })
  const font = new FontLoader().parse(NanumGothic)
  const meshRef = useRef<THREE.Mesh>(null)
  const textOption = {
    font,
    size: 22,
    height: 10,
    curveSegments: 3, // 글씨 깨짐 방지 설정
  }

  useFrame((state) => {
    meshRef.current?.geometry.computeBoundingBox()
    const boundingBox = meshRef.current?.geometry.boundingBox
    const center = new Vector3(0, 0, 0)
    boundingBox?.getCenter(center)
    meshRef.current!.geometry.translate(-center.x, -center.y, -center.z)
    const time = state.clock.getElapsedTime()
    meshRef.current!.rotation.x = 0
    meshRef.current!.rotation.y = -1.5 + 0.2 * Math.sin(time)
    meshRef.current!.rotation.z = 0.1 * Math.sin(time)
  })

  return (
    <mesh ref={meshRef}>
      <textGeometry args={[text, textOption]} />
      <meshMatcapMaterial attach="material" color="#e2ffa7" />
    </mesh>
  )
}

export default RecognizedText
