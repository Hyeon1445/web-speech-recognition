import type { NextPage } from 'next'
import styled from '@emotion/styled'
import Speech from '@components/speech'

const Home: NextPage = () => {
  return (
    <Container>
      <Speech />
    </Container>
  )
}

const Container = styled.div`
  background-color: yellow;
`
export default Home
