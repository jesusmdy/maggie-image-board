import { Box, Heading, Input } from "@chakra-ui/react"
import AuthLayout from "components/AuthLayout"

export const cardStyle = {
  border: "2px",
  borderColor: "gray.50",
  rounded: 'xl',
  my: 16,
  mx: 'auto'
}

export default function Register() {
  return (
    <AuthLayout>
      <Box {...cardStyle}>
        <Heading p={8} textAlign="center">Create a new account</Heading>
        <Box p={16} pt={8}>
          <Input size="lg" variant="filled" placeholder="Your email" rounded="xl" />
        </Box>
      </Box>
    </AuthLayout>
  )
}