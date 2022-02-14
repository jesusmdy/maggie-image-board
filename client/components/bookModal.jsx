import { Box, Heading, SimpleGrid, Modal, ModalOverlay, ModalContent, HStack, IconButton, Icon, Divider } from '@chakra-ui/react'
import { GoX } from 'react-icons/go'
import { BookImages, InfoSection } from 'pages/books/[bookID]'
import RecentWorks from 'components/recentWorks'
import { useRouter} from "next/router"

export default function BookModal({book, isOpen}) {
  const router = useRouter()
  const { title } = book
  const handleClose = () => {
    router.back()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent bg="none">
        <Box border="1px" borderColor="gray.200" bg="white" rounded={16}>
          <Box p={2}>
            <HStack>
              <IconButton onClick={handleClose} variant="ghost" rounded="full">
                <Icon as={GoX} />
              </IconButton>
              <Heading flex={1} w="full" fontSize="xl">{title}</Heading>
            </HStack>
          </Box>
          <Divider />
          <SimpleGrid columns={{sm: 1, md: 2 }}>
            <Box>
              <BookImages book={book} />
            </Box>
            <Box>
              <Box p={4}>
                <InfoSection book={book} />
              </Box>
              <RecentWorks userId={book.author.id} />
            </Box>
          </SimpleGrid>
        </Box>
      </ModalContent>
    </Modal>
  )
}
