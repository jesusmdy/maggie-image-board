import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import '@fontsource/lato/400.css'
import '@fontsource/outfit/400.css'
import '../styles/globals.css'

const theme = extendTheme({
  fonts: {
    heading: 'Outfit',
    body: 'Lato'
  }
})

function ImageBoard({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default ImageBoard
