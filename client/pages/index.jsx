import { Box, Divider, Heading, HStack, SimpleGrid, Text, Wrap } from '@chakra-ui/react'
import BookCard from 'components/BookCard'
import MainLayout from 'components/MainLayout'
import getBooks from 'apollo/getBooks'
import Head from 'next/head';

const styles = {
  headingBoxStyle: {
    py: 8
  },
  headingStyle: {
    userSelect: 'none',
    fontWeight: 'light',
    color: 'gray.500'
  }
}

export default function Index({books}) {
  if(!books) return <NoPosts />
  return (
    <>
      <Head>
        <title>ImageBoard / Images</title>
      </Head>
      <MainLayout>
        <Box {...styles.headingBoxStyle}>
          <Heading {...styles.headingStyle}>Recent books for you</Heading>
        </Box>
        <SimpleGrid
          columns={{
            sm: 2,
            md: 2,
            lg: 4,
            xl: 6
          }}
          gap={4}
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
    return {
      props: {books}
    }
  } catch(e) {
    return {
      props: {}
    }
  }
}