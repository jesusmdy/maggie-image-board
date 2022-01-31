import { Container } from "@chakra-ui/react"

const containerStyles = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  w: 'full',
  h: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function AuthLayout({children}) {
  return (
    <Container {...containerStyles}>
      {children}
    </Container>
  )
}