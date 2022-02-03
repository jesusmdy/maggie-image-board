import { Box, Heading, HStack, SimpleGrid, Text, Wrap } from '@chakra-ui/react'
import BookCard from 'components/BookCard'
import MainLayout from 'components/MainLayout'
import getBooks from 'apollo/getBooks'
import Head from 'next/head';

export default function Index({books}) {
  console.log(books);
  if(!books) return <NoPosts />
  return (
    <>
      <Head>
        <title>ImageBoard / Images</title>
      </Head>
      <MainLayout>
        <Box my={4} borderBottom="2px" borderColor="gray.100">
          <Heading
            my={2}
            fontSize="3xl"
            color="gray.600"
            userSelect="none"
          >Image books</Heading>
        </Box>
        <SimpleGrid
          columns={{
            sm: 1,
            md: 2,
            lg: 4,
            xl: 6
          }}
        >
          {
            books.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          }
        </SimpleGrid>
      </MainLayout>
    </>
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
    const books = await getBooks({})
    console.log(books);
    return {
      props: {books}
    }
  } catch(e) {
    return {
      props: {}
    }
  }
}