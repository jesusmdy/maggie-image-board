import { Box, Container, Flex, Heading, HStack, Spacer, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link"

const navbarStyles = {
  rounded: 8,
  border: "2px",
  borderColor: 'gray.200'
}

export function Navbar() {
  return (
    <Box my={4} {...navbarStyles}>
      <Flex>
        <Link href="/">
          <Heading display="block" fontSize="lg" as="a" p={4}>ImageBoard</Heading>
        </Link>
        <Spacer />
        <Box p={2}>
          <HStack>
            <Link href="/auth/login">
              <Button as="a" variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button as="a" colorScheme="red">Register</Button>
            </Link>
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default function MainLayout({children}) {
  return (
    <VStack>
      <Container maxW="container.xl">
        <Navbar />
        {children}
      </Container>
    </VStack>
  )
}