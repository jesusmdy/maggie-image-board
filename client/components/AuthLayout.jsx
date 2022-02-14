import { Box, Flex } from '@chakra-ui/react'

const containerStyles = {
  bgColor: '#b1ade2',
  bgImage: ['linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%)'],
  position: 'fixed',
  w: 'full',
  h: 'full',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function AuthLayout({children}) {
  return (
    <Flex {...containerStyles}>
      {children}
    </Flex>
  )
}