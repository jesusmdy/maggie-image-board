import { ApolloProvider } from '@apollo/client'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import apolloClient from 'apollo'
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
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default ImageBoard
