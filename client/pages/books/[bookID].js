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
  Wrap,
  TagLabel,
  VStack,
  Icon,
  TagLeftIcon
} from "@chakra-ui/react"
import getBook from "apollo/getBook"
import CommentElement from "components/commentElement"
import MainLayout from "components/mainlayout"
import RecentWorks from "components/recentWorks"
import useTimeago from "hooks/useTimeago"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BiHash } from "react-icons/bi"
import { GoPlus, GoVerified } from "react-icons/go"
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

export function BookImages({book}) {
  const { images } = book
  if(images.length > 1) return (
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
  return (
    <Img
      src={images[0].large}
      w="full"
      rounded={8}
    />
  )
}

function AddCommentBox({book}) {
  return (
    <Box my={4} rounded={8}>
      <Flex>
        <Textarea
          mr={4}
          bg="white"
          placeholder="Add comment"
          rounded={8}
          rows={2}
          border="none"
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
    <Box p={6} bg="rgba(25 25 25 / 2%)" my={4} rounded={8}>
      <Heading fontSize="2xl" color="gray.500">
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

export function UserInfo({book}) {
  const { author, createdAt } = book
  const { displayName, avatar, verified, id } = author
  return (
    <Link href={`/user/${id}`} passHref>
      <Box as="a" display="block">
        <Text color="gray.500" fontSize="sm" mb={2}>Posted by</Text>
        <Flex>
          <Avatar
            size="md"
            src={avatar}
            name={displayName}
          />
          <Flex px={2} flexDir="column" flex={1}>
            <HStack>
              <Text
                fontWeight="bold"
                fontSize="lg"
                _hover={{ textDecor: 'underline' }}
              >{displayName}</Text>
              {
                verified &&
                  <Icon color="blue.500" as={GoVerified} />
              }
              <Divider orientation="vertical" />
              <Button
                rightIcon={<Icon as={GoPlus} />}
                colorScheme="blue"
                variant="ghost"
                size="sm"
              >
                <Text>Follow</Text>
              </Button>
            </HStack>
            <Text color="gray.500" fontSize="xs">{useTimeago(new Date(createdAt))}</Text>
          </Flex>
        </Flex>
        <Divider my={4} />
      </Box>
    </Link>
  )
}

export function InfoSection({book}) {
  const { title, content } = book
  return (
    <Box>
      <UserInfo book={book} />
      <Heading fontSize="3xl">{title}</Heading>
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
                  size="sm"
                >
                  <TagLeftIcon as={BiHash} />
                  <TagLabel>{tag}</TagLabel>
                </Tag>
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
  if (!book) return <MainLayout>Not found</MainLayout>
  const { author } = book
  const { id: userId, displayName } = author
  return (
    <>
      <Head>
        <title>ImageBoard / {book.title} by {displayName}</title>
      </Head>
      <MainLayout>
        <SimpleGrid
          rounded={8}
          my={4}
          columns={{ sm: 1, md: 2}}
        >
          <Box
            bg="white"
            border="1px"
            borderColor="gray.100"
            rounded={8}
          >
            <BookImages book={book} />
          </Box>
          <Box>
            <BookContent book={book} />
            <RecentWorks userId={userId} />
          </Box>
          <Box>
            <CommentsSection book={book} />
          </Box>
        </SimpleGrid>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
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
