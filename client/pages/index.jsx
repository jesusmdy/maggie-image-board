import { Box, Heading, Text} from '@chakra-ui/react'
import MainLayout from 'components/mainlayout'
import Head from 'next/head';
import BooksMasonry from 'components/booksMasonry'
import { useQuery } from '@apollo/client'
import BOOKS_QUERY from 'apollo/queries/previews'
import { useEffect } from 'react'
import { useState } from 'react'
import { normalizePreviews } from 'utils/normalizePreviews'

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

function Loading() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} / Loading...</title>
      </Head>
      <MainLayout>
        <Text fontSize="lg">Loading...</Text>
      </MainLayout>
    </>
  )
}

export default function Index() {
  const [books, setBooks] = useState([])
  const { loading, error, data } = useQuery(BOOKS_QUERY, {
    variables: {
      page: 1,
      sort: ['-date_created'],
      filter: {},
      limit: 20
    }
  })
  useEffect(() => {
    !loading && !error & setBooks(normalizePreviews(data.book))
  }, [loading, error, data])
  if(loading) return <Loading />
  if(!books) return <NoPosts />
  if(error) return <Box>Error</Box>
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} / Images</title>
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
