import { Box, Button, Flex, Icon, Img, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { GoPlus } from 'react-icons/go'
import { useContextualRouting } from 'next-use-contextual-routing'

const bookActionsStyles = {
  position: 'absolute',
  top: 0,
  w: 'full',
  p: 2,
  bg: 'linear-gradient(0deg, hsla(0, 0%, 35.29%, 0) 0%, hsla(0, 0%, 34.53%, 0.034375) 16.36%, hsla(0, 0%, 32.42%, 0.125) 33.34%, hsla(0, 0%, 29.18%, 0.253125) 50.1%, hsla(0, 0%, 24.96%, 0.4) 65.75%, hsla(0, 0%, 19.85%, 0.546875) 79.43%, hsla(0, 0%, 13.95%, 0.675) 90.28%, hsla(0, 0%, 7.32%, 0.765625) 97.43%, hsla(0, 0%, 0%, 0.8) 100%)',
  transition: '.2s'
}

function BookActions({book, isHover}) {
  const hidden = 'translateY(-100%)'
  const shown = 'translateY(0%)'
  return (
    <Flex {...bookActionsStyles} transform={isHover ? shown : hidden}>
      <Box flex={1}></Box>
      <Box>
        <Button
          colorScheme="red"
          rounded={12}
          rightIcon={<Icon as={GoPlus} />}
        >Save</Button>
      </Box>
    </Flex>
  )
}

function BookCardVertical({book, asModal = true, router}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { images, bookUrl, id } = book
  const preview = images[0].mediumVertical
  const { makeContextualHref, returnHref } = useContextualRouting()
  const handleRoute = (e) => {
    if(asModal) {
      e.stopPropagation()
      e.preventDefault()
      router.push(makeContextualHref({ bookID: id }), bookUrl, { shallow: true })
    }
  }
  return (
    <Box
      position="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      overflow="hidden"
      rounded={16}
      transition=".2s"
      shadow={isOpen ? 'md' : 'none'}
    >
      <BookActions book={book} isHover={isOpen} />
      <Link href={bookUrl} passHref>
        <Box as="a" onClick={handleRoute}>
          <Img src={preview} rounded={16} />
        </Box>
      </Link>
    </Box>
  )
}

export default withRouter(BookCardVertical)
