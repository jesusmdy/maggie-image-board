import { Box, Heading, HStack, Text, Wrap } from '@chakra-ui/react'
import BookCard from 'components/BookCard'
import MainLayout from 'components/MainLayout'
import getBooks from 'apollo/getBooks'

export default function Index({books}) {
  console.log(books);
  if(!books) return <NoPosts />
  return (
    <MainLayout>
      <Box my={4} borderBottom="2px" borderColor="gray.100">
        <Heading
          my={2}
          fontSize="3xl"
          color="gray.600"
          userSelect="none"
        >Image books</Heading>
      </Box>
      <HStack>
        <Wrap>
          {
            books.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          }
        </Wrap>
      </HStack>
    </MainLayout>
  )
}

function NoPosts() {
  return (
    <MainLayout>
      <Heading p={8}>No posts</Heading>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const books = await getBooks()
    return {
      props: {books}
    }
  } catch(e) {
    return {
      props: {}
    }
  }
}