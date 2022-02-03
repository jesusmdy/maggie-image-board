import {
  Box,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBoolean,
  Heading,
  Divider,
  Container,
  VStack,
  SimpleGrid
} from "@chakra-ui/react"
import getBook from "apollo/getBook"
import MainLayout from "components/MainLayout"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import ReackMarkdown from "react-markdown"
import styles from "styles/bookPage"

function ImageModal({image, isOpen, onClose}) {
  const [zoom, setZoom] = useBoolean()
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={zoom ? 'full' : '2xl'}
      >
      <ModalOverlay />
      <ModalContent>
        <Img
          cursor={zoom ? 'zoom-out' : 'zoom-in'}
          onClick={setZoom.toggle}
          src={image.original}
        />
      </ModalContent>
    </Modal>
  )
}

function ImageItem({image}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [horizontal, setHorizontal] = useState(false)
  const imgRef = useRef()
  useEffect(() => {
    const {current: img} = imgRef
    if(img?.width > img?.height) setHorizontal(true)
  }, [imgRef])
  return (
    <Box p={2}>
      <Img
        ref={imgRef}
        src={image.mediumCropped}
        loading="lazy"
        cursor="zoom-in"
        onClick={onOpen}
        rounded={4}
      />
      <ImageModal
        image={image}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

function ExpandableSection({book}) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { images } = book
  return (
    <Box
      maxH={isOpen ? 'auto' : '2xl'}
      borderColor="gray.200"
      overflow="hidden"
      position="relative"
      p={4}
    >
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 4,
          xl: 6
        }}
      >
        {
          images.map((image, n) => <ImageItem key={n} image={image} />)
        }
      </SimpleGrid>
    </Box>
  )
}

function BookContent({book}) {
  const { title, content } = book
  return (
    <Box p={6}>
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2
        }}
      >
        <Box>
          <Heading fontSize="2xl" color="gray.600">Book</Heading>
          <Heading>{title}</Heading>
          <ReackMarkdown children={content} />
        </Box>
        <Box>
          <Heading fontSize="2xl" color="gray.600">
            Comments
          </Heading>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default function Book({book}) {
  if (!book) return <MainLayout>Not found</MainLayout>
  return (
    <>
      <Head>
        <title>ImageBoard / {book.title}</title>
      </Head>
      <MainLayout>
        <VStack>
          <Container {...styles.contentBox} maxW="container.xl">
            <ExpandableSection book={book} />
            <Divider />
            <BookContent book={book} />
          </Container>
        </VStack>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context
  const { bookID } = query
  try {
    const book = await getBook(bookID)
    return {
      props: { book }
    }
  } catch(e) {
    return {
      props: {}
    }
  }
}
