import { Box, Heading, SimpleGrid, Img, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, VStack, HStack, IconButton, Icon, Divider } from '@chakra-ui/react'
import MainLayout from 'components/mainlayout'
import getBooks from 'apollo/getBooks'
import Head from 'next/head';
import { withRouter } from 'next/router'

import BooksMasonry from 'components/booksMasonry'

function Index({books}) {
  
  if(!books) return <NoPosts />
  return (
    <>
      <Head>
        <title>ImageBoard / Books</title>
      </Head>
      <MainLayout>
        <Box my={6}>
          <BooksMasonry asModal={true} books={books} />
        </Box>
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

export default withRouter(Index)

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