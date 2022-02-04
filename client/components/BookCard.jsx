import { Avatar, Box, Flex, Img, Tag, Text} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const unsafeBadgeStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  m: 2,
  colorScheme: 'red',
  size: 'sm',
  variant: 'solid',
}

function BookCardAuthorLabel({author}) {
  const { displayName, avatar, id } = author
  const router = useRouter()
  const openProfilePage = (e) => {
    e.stopPropagation()
    e.preventDefault()
    router.push(`/user/${id}`)
  }
  return (
    <>
      <Flex
        m={1}
        p={1}
        rounded={8}
        _hover={{ bgColor: "gray.200" }}
        position="relative"
        onClick={openProfilePage}
      >
        <Avatar colorScheme="cyan" size="xs" src={avatar} name={displayName} />
        <Text fontSize="sm" color="gray.600" ml={2} flex={1}>{displayName}</Text>
      </Flex>
    </>
  )
}

function BookCardLabel({book}) {
  const { title, author } = book
  return (
    <>
      <Text p={2} fontWeight="bold" isTruncated>{title}</Text>
      <BookCardAuthorLabel author={author} />
    </>
  )
}

export default function BookCard({book, showLabel = true}) {
  const { images, title, author, nsfw, bookUrl } = book
  const preview = images[0].smallCropped
  return (
    <Link href={bookUrl} passHref>
      <Box
        as="a"
        position="relative"
        rounded={8}
        _hover={{ bgColor: "gray.100" }}
      >
        {
          nsfw &&
          <Tag {...unsafeBadgeStyles}>NSFW</Tag>
        }
        <Img src={preview} rounded={8} />
        {
          showLabel &&
          <BookCardLabel book={book} />
        }
      </Box>
    </Link>
  )
}