import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function CommentElement({ comment }) {
  const { content, author } = comment
  const { displayName, avatar, userUrl } = author
  return (
    <Flex p={4} bg="white" rounded={8} my={4}>
      <Link href={userUrl}>
        <a>
          <Avatar name={displayName} src={avatar} />
        </a>
      </Link>
      <Box flex={1} px={2}>
        <Link href={userUrl} passHref>
          <a>
            <Text _hover={{ textDecoration: 'underline' }} fontSize="sm" fontWeight="semibold">{displayName}</Text>
          </a>
        </Link>
        <Text color="gray.700" fontSize="md">{content}</Text>
      </Box>
    </Flex>
  )
}
