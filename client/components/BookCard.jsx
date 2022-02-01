import {Avatar, Box, Flex, HStack, Icon, Image, Text} from "@chakra-ui/react"
import { CopyIcon } from '@chakra-ui/icons'
import sdk from "sdk"
import Link from "next/link"

export default function BookCard({book}) {
  const {title, images, author, id} = book
  const preview = images[0].mediumCropped
  const fallback = images[0].tiny
  return (
    <Box
    boxSize="xs"
    border="2px"
    borderColor="gray.100"
    rounded={8}
    as="li"
    backgroundImage={preview}
    backgroundPosition="center"
    backgroundSize="100% auto"
    >
      <Link href={`/books/${id}`}>
        <Box as="a" display="block" position="relative" p={2} h="xs">
          <img style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: 0
          }} src={preview} alt={title} />
        </Box>
      </Link>
    </Box>
  )
}