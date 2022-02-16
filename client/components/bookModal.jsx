import { Box, Heading, Text, Modal, ModalOverlay, ModalContent, HStack, IconButton, Icon, Divider, Img, Grid, GridItem, Spacer, Button, Stat, StatLabel, StatNumber, ModalCloseButton, Tag, TagLeftIcon, TagLabel, Badge, Wrap } from '@chakra-ui/react'
import { GoHeart, GoX } from 'react-icons/go'
import { useRouter} from "next/router"
import { IoArrowForward, IoBookmark, IoBookmarkOutline, IoCalendar, IoClose, IoEllipsisVertical, IoHeart, IoHeartOutline, IoImage } from 'react-icons/io5'
import useTimeago from 'hooks/useTimeago'
import Link from 'next/link'

const modalStyles = {
  bg: 'white',
  rounded: 16,
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
  const { title, medium, createdAt, bookUrl, nsfw } = book
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
          <Box
            height="lg"
            bgImage={medium}
            bgSize="cover"
            bgPosition="center"
            rounded={16}  
            >
            <Img
              src={medium}
              w="full"
              objectFit="contain"
              backdropFilter="blur(25px)"
              height="lg"
              rounded={16}  
              p={4}
            />
            <ModalCloseButton />
          </Box>
          <Box p={8}>
            <HStack>
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
            <HStack mt={4}>
              <Wrap>
                <Tag size="lg">
                  <TagLeftIcon as={IoCalendar} />
                  <TagLabel>{useTimeago(new Date(createdAt))}</TagLabel>
                </Tag>
                <Tag size="lg">
                  <TagLeftIcon as={IoImage} />
                  <TagLabel>32</TagLabel>
                </Tag>
                {
                  nsfw &&
                  <Tag size="lg" colorScheme="red">NSFW</Tag>
                }
              </Wrap>
              <Spacer />
              <Link href={bookUrl} passHref>
                <Button
                  as="a"
                  colorScheme="messenger"
                  rounded="full"
                  variant="outline"
                  rightIcon={<Icon as={IoArrowForward} />}
                >View book</Button>
              </Link>
            </HStack>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}
