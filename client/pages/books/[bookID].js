import {
  Box,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useBoolean,
  Heading,
  Flex,
  SimpleGrid,
  Avatar,
  Button,
  Textarea,
  Text,
  Tag,
  Divider,
  HStack,
  Wrap
} from "@chakra-ui/react"
import getBook from "apollo/getBook"
import CommentElement from "components/CommentElement"
import MainLayout from "components/MainLayout"
import RecentWorks from "components/recentWorks"
import Head from "next/head"
import Link from "next/link"
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
  return (
    <Box>
      <Img
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

function BookImages({book}) {
  const { images } = book
  return (
    <SimpleGrid
      m={6}
      gap={2}
      columns={{
        sm: 1,
        md: 2,
        lg: 4
      }}
    >
      {
        images.map((image, n) => <ImageItem key={n} image={image} />)
      }
    </SimpleGrid>
  )
}

function AddCommentBox({book}) {
  return (
    <Box my={4} rounded={8}>
      <Flex>
        <Textarea
          mr={4}
          colorScheme="gray"
          placeholder="Add comment"
          rounded={8}
          rows={2}
        />
        <Button
          colorScheme="messenger"
          w="20%"
          rounded={30}
        >Send</Button>
      </Flex>
    </Box>
  )
}

function CommentsSection({book}) {
  const { comments } = book
  return (
    <Box p={6}>
      <Heading fontSize="2xl" color="gray.600">
        Comments
      </Heading>
      <AddCommentBox book={book} />
      {
        comments &&
        comments.map((comment, n) => <CommentElement key={n} comment={comment} />)
      }
    </Box>
  )
}

function UserInfo({book}) {
  const { author } = book
  const { displayName, avatar } = author
  return (
    <Box>
      <Text color="gray.500" fontSize="sm" mb={2}>Posted by</Text>
      <Flex>
        <Avatar
          size="md"
          src={avatar}
          name={displayName}
        />
        <Box flex={1}>
          <Text
            my={2}
            ml={4}
            fontWeight="bold"
            fontSize="lg"
          >{displayName}</Text>
        </Box>
      </Flex>
      <Divider my={4} />
    </Box>
  )
}

function InfoSection({book}) {
  const { title, content } = book
  return (
    <Box>
      <UserInfo book={book} />
      <Heading>{title}</Heading>
      <ReackMarkdown>
        {content}
      </ReackMarkdown>
    </Box>
  )
}

function TagsSection({tags}) {
  return (
    <Box my={4}>
      <Text color="gray.500" fontSize="sm" mb={2}>Tags</Text>
      <HStack>
        <Wrap>
          {
            tags.map((tag, n) => (
              <Link href={`/tags/${tag}`} key={n} passHref>
                <Tag
                  as="a"
                  mr={2}
                >{tag}</Tag>
              </Link>
            ))
          }
        </Wrap>
      </HStack>
    </Box>
  )
}

function BookContent({book}) {
  const { tags } = book
  return (
    <Box p={6}>
      <InfoSection book={book} />
      {
        tags &&
        <TagsSection tags={tags} />
      }
    </Box>
  )
}

export default function Book({book}) {
  const { author } = book
  const { id: userId } = author
  if (!book) return <MainLayout>Not found</MainLayout>
  return (
    <>
      <Head>
        <title>ImageBoard / {book.title}</title>
      </Head>
      <MainLayout>
        <SimpleGrid
          rounded={8}
          shadow="md"
          columns={{ sm: 1, md: 2}}
          pb={8}
        >
          <Box>
            <BookImages book={book} />
            <CommentsSection book={book} />
          </Box>
          <Box>
            <BookContent book={book} />
            <RecentWorks userId={userId} />
          </Box>
        </SimpleGrid>
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
