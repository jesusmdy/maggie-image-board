import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import getBooks from 'apollo/getBooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BookCard from './BookCard'

function Title({userId}) {
  return (
    <Flex p={2}>
      <Text
        fontSize="md"
        flex={1}
        color="gray.600"
      >Recent work</Text>
      <Box>
        <Link href={`/user/${userId}`} passHref>
          <Text color="blue.500" fontWeight="bold" as="a">View all</Text>
        </Link>
      </Box>
    </Flex>
  )
}

export default function RecentWorks({userId}) {
  const [recent, setRecent] = useState([])
  useEffect(() => {
    const getRecent = async (userId) => {
      const recentQuery = await getBooks({
        limit: 4,
        filter: {
          user_created: {
            id: {
              _eq: userId
            }
          }
        }
      })
      return recentQuery
    }
    getRecent(userId)
    .then(setRecent)
  }, [userId])
  return (
    <Box
      bgColor="rgba(25 25 25 / 2%)"
      p={4}
      mx={6}
      rounded={8}
    >
      <Title userId={userId} />
      <SimpleGrid
        columns={{
          sm: 2,
          md: 2,
          lg: 4
        }}
        gap={2}
      >
        {
          recent &&
          recent.map((book, n) => <BookCard key={n} showLabel={false} book={book} />)
        }
      </SimpleGrid>
    </Box>
  )
}