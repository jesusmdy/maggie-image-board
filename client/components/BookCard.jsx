import { Avatar, Box, Flex, Img, Tag, Text } from "@chakra-ui/react"
import Link from "next/link"

const unsafeBadgeStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  m: 4,
  colorScheme: 'red',
  size: 'sm',
  variant: 'solid'
}

export default function BookCard({book, showLabel = true}) {
  const { id, images, title, author, nsfw, bookUrl } = book
  const { displayName, avatar } = author
  const preview = images[0].smallCropped
  return (
    <Link href={bookUrl}>
      <a>
        <Box position="relative" rounded={4} p={2} _hover={{ bgColor: "gray.50" }} >
          {
            nsfw &&
            <Tag {...unsafeBadgeStyles}>NSFW</Tag>
          }
          <Img src={preview} rounded={8} />
          {
            showLabel &&
            <>
              <Text fontWeight="bold" isTruncated>{title}</Text>
              <Flex my={2}>
                <Avatar colorScheme="cyan" size="xs" src={avatar} name={displayName} />
                <Text fontSize="sm" color="gray.600" ml={2} flex={1}>{displayName}</Text>
              </Flex>
            </>
          }
        </Box>
      </a>
    </Link>
  )
}