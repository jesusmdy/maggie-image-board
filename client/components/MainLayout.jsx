import { SearchIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading, HStack, Spacer, Text, VStack, Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import Link from "next/link"

const navbarStyles = {
  bg: 'white',
  borderBottom: '1px',
  borderColor: 'gray.100',
  position: 'sticky',
  top: 0,
  zIndex: 1
}

function SearchBox() {
  return (
    <Box p={2} w="lg">
      <InputGroup>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
        <Input
          variant="filled"
          placeholder="Search books, tags and users"
        />
      </InputGroup>
    </Box>
  )
}

export function Navbar() {
  return (
    <Box {...navbarStyles}>
      <Flex maxW="container.xl" mx="auto" p={2}>
        <Link href="/" passHref>
          <Heading display="block" fontSize="lg" as="a" p={4}>ImageBoard</Heading>
        </Link>
        <Spacer />
        <SearchBox />
        <Spacer />
        <Box p={2}>
          <HStack>
            <Link href="/auth/login" passHref>
              <Button as="a" variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register" passHref>
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
    <>
      <Navbar />
      <Container maxW="container.xl" my={4}>
        {children}
      </Container>
    </>
  )
}