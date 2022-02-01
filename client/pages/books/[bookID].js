import {
  Box,
  Img,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBoolean,
  Heading
} from "@chakra-ui/react"
import MainLayout from "components/MainLayout"
import absoluteUrl from "next-absolute-url"
import Head from "next/head"
import Link from "next/link"
import { useRef } from "react"
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
  const imageBox = useRef()
  const doScroll = ({target}) => {
    target.scrollIntoView()
  }
  return (
    <Box {...styles.imageItem} ref={imageBox} onClick={doScroll}>
      <Img
        src={image.original}
        loading="lazy"
        cursor="zoom-in"
        onClick={onOpen}
      />
      <ImageModal
        image={image}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

function ExpandableOverlay({onOpen}) {
  return (
    <Box {...styles.expandibleOverlay}>
      <Button {...styles.expandButton} onClick={onOpen}>See All</Button>
    </Box>
  )
}

function ExpandableSection({book}) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { images } = book
  return (
    <Box
      maxH={isOpen ? 'auto' : '2xl'}
      my={2}
      borderColor="gray.200"
      rounded={8}
      overflow="hidden"
      position="relative"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
    >
      {
        images.map((image, n) => <ImageItem key={n} image={image} />)
      }
      {
        !isOpen &&
        <ExpandableOverlay onOpen={onOpen} />
      }
    </Box>
  )
}

function BookContent({book}) {
  const { title, content, tags } = book
  return (
    <Box p={8}>
      <Heading>{book.title}</Heading>
      <ReackMarkdown children={book.content} />
      <Box as="ul">
        {
          tags.map((tag, n) => (
            <li key={n} style={styles.tagsStyle}>
              <Link href={`/tags/${tag}`}>
                <a style={{ display: 'block' }} as="a">{tag}</a>
              </Link>
            </li>
          ))
        }
      </Box>
    </Box>
  )
}

export default function Book({book}) {
  return (
    <>
      <Head>
        <title>ImageBoard / {book.title}</title>
      </Head>
      <MainLayout>
        <Flex>
          <Box flex={1}>
            <ExpandableSection book={book} />
            <BookContent book={book} />
          </Box>
          <Box w="xs">
            lorem
          </Box>
        </Flex>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context
  const {bookID} = query
  const {origin} = absoluteUrl(req)
  const bookQuery = await fetch(`${origin}/api/books/${bookID}`)
  if(bookQuery.ok) {
    const book = await bookQuery.json()
    return {
      props: { book }
    }
  } else {
    return {
      props: {}
    }
  }
}
