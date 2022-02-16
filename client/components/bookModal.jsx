import { Box, Heading, Text, Modal, ModalOverlay, ModalContent, HStack, IconButton, Icon, Divider, Img, Grid, GridItem, Spacer, Button, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { GoHeart, GoX } from 'react-icons/go'
import { useRouter} from "next/router"
import { IoBookmark, IoBookmarkOutline, IoClose, IoEllipsisVertical, IoHeart, IoHeartOutline } from 'react-icons/io5'
import useTimeago from 'hooks/useTimeago'

const modalStyles = {
  bg: 'white',
  rounded: 16,
  border: '1px',
  borderColor: 'gray.100',
  w: 'full',
  h: 'full',
  templateRows: 'repeat(2, 1fr)',
  templateColumns: 'repeat(6, 1fr)'
}

const topActionButtonStyle = {
  rounded: 'full',
  variant: 'ghost'
}

export default function BookModal({book, isOpen}) {
  const router = useRouter()
  const { title, medium, createdAt } = book
  const handleClose = () => {
    router.back()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent bg="none" shadow="none">
        <Box {...modalStyles}>
          <HStack p={2}>
            <IconButton
              {...topActionButtonStyle}
              icon={<Icon as={IoClose} />}
              onClick={handleClose}
              size="sm"
            />
            <Text
              isTruncated
              fontSize="sm"
              fontWeight="semibold"
            >{title}</Text>
            <Spacer />
            <IconButton
              {...topActionButtonStyle}
              icon={<Icon as={IoBookmarkOutline} />}
            />
            <IconButton
              {...topActionButtonStyle}
              icon={<Icon as={IoHeartOutline} />}
            />
            <IconButton
              {...topActionButtonStyle}
              icon={<Icon as={IoEllipsisVertical} />}
            />
          </HStack>
          <Divider />
          <Img
            src={medium}
            w="full"
            objectFit="contain"
            p={4}
          />
          <HStack p={4}>
            <Stat>
              <StatLabel>Images</StatLabel>
              <StatNumber>32</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Published</StatLabel>
              <StatNumber>{useTimeago(new Date(createdAt))}</StatNumber>
            </Stat>
            <Spacer />
            <Button colorScheme="messenger" rounded="full">View book</Button>
          </HStack>
        </Box>
      </ModalContent>
    </Modal>
  )
}
