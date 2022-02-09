import { Avatar, Box, Button, Divider, Flex, HStack, Icon, IconButton, Img, Spacer, Tag, TagLabel, Text} from "@chakra-ui/react"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import {
  IoHeartOutline,
  IoBookmarkOutline,
  IoChatbubbleOutline,
  IoShareSocialOutline
} from "react-icons/io5"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import useTimeago from "hooks/useTimeago"

function BookCardAuthorLabel({book}) {
  const { author, createdAt } = book
  const { displayName, avatar, id, verified } = author
  return (
    <HStack w="full" p={2}>
      <Box flex={1}>
        <Link href={`/user/${id}`} passHref>
          <HStack as="a" w="full">
            <Avatar src={avatar} size="xs" />
            <Text isTruncated fontSize="sm" fontWeight="bold">{displayName}</Text>
            {
              verified &&
              <Icon color="blue.500" as={GoVerified} />
            }
          </HStack>
        </Link>
      </Box>
      <Text fontSize="xs" isTruncated>{useTimeago(new Date(createdAt))}</Text>
      <IconButton size="sm" variant="ghost">
        <Icon as={BiDotsHorizontalRounded} />
      </IconButton>
    </HStack>
  )
}

function BookCardLabel({book}) {
  const { title, nsfw } = book
  return (
    <HStack p={2}>
      <Text
        as="a"
        display="block"
        isTruncated
        fontSize="sm"
        flex={1}
      >{title}</Text>
      {
        nsfw &&
        <Tag colorScheme="red" size="sm">
          <TagLabel fontWeight="bold">NSFW</TagLabel>
        </Tag>
      }
    </HStack>
  )
}

const buttonStyle = {
  variant: 'ghost',
  size: 'sm',
}

function BookActions() {
  return (
    <HStack p={2}>
      <IconButton {...buttonStyle}>
        <Icon as={IoHeartOutline} />
      </IconButton>
      <IconButton {...buttonStyle}>
        <Icon as={IoChatbubbleOutline} />
      </IconButton>
      <IconButton {...buttonStyle}>
        <Icon as={IoBookmarkOutline} />
      </IconButton>
      <Spacer />
      <IconButton {...buttonStyle}>
        <Icon as={IoShareSocialOutline} />
      </IconButton>
    </HStack>
  )
}

export default function BookCard({book, showLabel = true}) {
  const { images, author,  bookUrl } = book
  const preview = images[0].mediumCropped
  return (
    <Flex
      bg="white"
      border="1px"
      rounded={8}
      borderColor="gray.100"
      flexDirection="column"
    >
      {
        showLabel &&
        <>
          <BookCardAuthorLabel book={book} author={author} />
          <Divider />
        </>
      }
      <Box flex={1} bg="gray.300" w="full">
        <Link href={bookUrl} passHref>
          <Box as="a" display="block" m={0} flex="1">
            <Img
              rounded={showLabel ? 0 : 8}
              mx="auto"
              w="full"
              src={preview}
            />
          </Box>
        </Link>
      </Box>
      {
        showLabel &&
        <>
          <Divider />
          <BookCardLabel book={book} />
          <BookActions />
        </>
      }
    </Flex>
  )
}