import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import BookCardVertical from 'components/bookCardVertical'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BookModal from 'components/bookModal'
import { useRouter } from 'next/router'

const breakpoints = {
  350: 2,
  750: 3,
  900: 4,
  1050: 5,
  1280: 6
}

export default function BooksMasonry({books, asModal = false}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [book, setBook] = useState(undefined)
  const router = useRouter()
  useEffect(() => {
    const { bookID } = router.query
    if(bookID) {
      onOpen()
      setBook(books.find(book => book.id == bookID))
    }
    else {
      onClose()
      setBook(undefined)
    }
  }, [router.query])
  return (
    <>
      {
        book &&
        <BookModal book={book} isOpen={isOpen} />
      }
      <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
        <Masonry gutter="16px">
          {
            books.map(book => (
              <BookCardVertical asModal={asModal} key={book.id} book={book} />
            ))
          }
        </Masonry>
      </ResponsiveMasonry>
    </>
  )
}