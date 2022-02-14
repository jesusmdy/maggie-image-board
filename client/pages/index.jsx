import { Box, Heading, SimpleGrid, } from '@chakra-ui/react'
import BookCard from 'components/bookCard'
import MainLayout from 'components/mainlayout'
import getBooks from 'apollo/getBooks'
import Head from 'next/head';
import BooksMasonry from 'components/booksMasonry';

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
        <BooksMasonry books={books} asModal={true} />
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