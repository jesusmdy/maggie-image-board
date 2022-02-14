import { Box, Button, Divider, Heading, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import AuthLayout from 'components/authLayout'
import Head from 'next/head'

export const cardStyle = {
  borderTop: '1px',
  borderTopColor: 'rgba(255 255 255 / 70%)',
  maxW: 'sm',
  minW: 'xs',
  w: 'md',
  h: 'lg',
  rounded: 16,
  bg: 'rgba(255 255 255 / 60%)',
  backdropFilter: 'blur(25px)',
  shadow: 'lg'
}

export const labelStyles = {
  fontSize: 'sm',
  fontWeight: 'bold',
  cursor: 'pointer',
  mb: 2,
  display: 'block'
}

// background-color: #99201c;
// background-image: linear-gradient(316deg, #99201c 0%, #f56545 74%);

export const buttonStyles = {
  rounded: 8,
  colorScheme: 'red',
  borderTop: '1px',
  borderTopColor: 'red.100',
  color: 'white',
  w: 'full'
}

export default function Login() {
  const appTitle = process.env.NEXT_PUBLIC_APP_NAME
  return (
    <>
      <Head>
        <title>{appTitle} / Sign In</title>
      </Head>
      <AuthLayout>
        <VStack {...cardStyle}>
          <Box p={8} w="full">
            <Heading as="h4" fontSize="lg">{appTitle}</Heading>
            <Text>Sign in with your account...</Text>
          </Box>
          <Box flex={1} w="full">
            <VStack alignItems="center" p={8} h="full">
              <Box w="full" my={2}>
                <Text {...labelStyles} as="label" htmlFor="email">Your email address</Text>
                <Input id="email" variant="filled" type="email" placeholder="myemail@domain.com" />
              </Box>
              <Box w="full" my={2}>
                <Text {...labelStyles} as="label" htmlFor="password">Your password</Text>
                <Input id="password" variant="filled" type="password" placeholder="••••••••" />
              </Box>
              <Box w="full" my={4}>
                <Button {...buttonStyles}>Continue</Button>
              </Box>
            </VStack>
          </Box>
          <Box>Actions</Box>
        </VStack>
      </AuthLayout>
    </>
  )
}
