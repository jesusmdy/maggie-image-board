import { Box, Heading, Input, Button } from "@chakra-ui/react"
import AuthLayout from "components/AuthLayout"
import sdk from "sdk"

export const cardStyle = {
  border: "2px",
  borderColor: "gray.100",
  rounded: 'xl',
  my: 16,
  mx: 'auto'
}

export default function Register() {
  return (
    <AuthLayout>
      <Box {...cardStyle}>
        <Heading p={16} pb={4} textAlign="center">Continue with your account</Heading>
        <Box p={16} pt={8}>
          <Input
            size="lg"
            variant="outline"
            border="2px"
            placeholder="Your email"
            rounded="xl"
            mb={6}
          />
          <Input
            size="lg"
            variant="outline"
            border="2px"
            placeholder="Your password"
            rounded="xl"
            type="password"
            mb={6}
          />
          <Button w="full" colorScheme="red" py={6} rounded="xl">Continue</Button>
        </Box>
      </Box>
    </AuthLayout>
  )
}