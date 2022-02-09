import { Avatar, Box, Center, Divider, Flex, Heading, Icon, Img, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import getBooks from 'apollo/getBooks'
import BookCard from 'components/BookCard'
import { FiBriefcase, FiMapPin, FiEdit3 } from 'react-icons/fi'
import { GoVerified } from 'react-icons/go'
import MainLayout from 'components/MainLayout'
import absoluteUrl from 'next-absolute-url'
import Head from 'next/head'

function NotFound() {
  return (
    <>
      <Head>
        <title>ImageBoard / 404</title>
      </Head>
      <MainLayout>
        <Center userSelect="none" flexDirection="column" color="gray.600" textTransform="uppercase" my={24}>
          <Heading>User not found!</Heading>
          <Heading fontSize="9xl">＞︿＜</Heading>
        </Center>
      </MainLayout>
    </>
  )
}

function InfoBadge({icon, title}) {
  return (
    <Flex>
      <Icon as={icon} my={1} mr={2} color="gray.500" />
      <Text fontSize="md" color="gray.600">{title}</Text>
    </Flex>
  )
}

function UserHeader({user}) {
  const { avatar, displayName, title, location, description, verified } = user
  return (
    <Box>
      <VStack>
        <Box w="full">
          <Avatar src={avatar} size="2xl" mt={-58} shadow="md" />
        </Box>
        <Box flex={1} py={4} w="full">
          <Flex>
            <Heading>{displayName}</Heading>
            {
              verified && (
                <Box flex={1}>
                  <Icon my={3} mx={2} color="blue.400" w={6} h={6} as={GoVerified} />
                </Box>
              )
            }
          </Flex>
          { location && <InfoBadge icon={FiMapPin} title={location} /> }
          { title && <InfoBadge icon={FiBriefcase} title={title} /> }
          { description && <InfoBadge icon={FiEdit3} title={description} /> }
        </Box>
      </VStack>
    </Box>
  )
}

function UserContent({books, user}) {
  const { displayName } = user
  return (
    <>
      <Box my={8}>
        <Heading
          as="h4"
          fontSize="2xl"
          fontWeight="normal"
          color="gray.600"
        >Books by {displayName}</Heading>
      </Box>
      <SimpleGrid columns={{ sm: 2, md: 4, lg: 4 }} my={8} gap={4}>
        {
          books.map((book, n) => (<BookCard key={n} book={book} />))
        }
      </SimpleGrid>
    </>
  )
}

function HeaderImage({header}) {
  return (
    <Img
      objectFit="cover"
      objectPosition="center"
      src={header.large}
      w="full"
      maxH="56"
    />
  )
}

export default function UserPage({user, books}) {
  if(!user) return <NotFound />
  const { header } = user
  return (
    <>
      <Head>
        <title>ImageBoard / {user.displayName}</title>
      </Head>
      <MainLayout outside={<HeaderImage header={header} />}>
        <UserHeader user={user} />
        <UserContent books={books} user={user} />
      </MainLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context
  const { origin } = absoluteUrl(req)
  const { userID } = query
  const userReq = await fetch(`${origin}/api/user/${userID}`)
  if (userReq.ok) {
    const user = await userReq.json()
    const books = await getBooks({
      filter: {
        user_created: {
          id: {
            _eq: userID
          }
        }
      }
    })
    return {
      props: { user, books }
    }
  } else {
    return {
      props: {}
    }
  }
}
