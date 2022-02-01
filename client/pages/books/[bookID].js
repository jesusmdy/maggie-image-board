import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Img,
  Link,
  ScaleFade,
  SlideFade,
  Spacer,
  Flex,
  Wrap,
  IconButton,
} from "@chakra-ui/react"
import MainLayout from "components/MainLayout"
import absoluteUrl from "next-absolute-url"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

export default function Book({book}) {
  const [selected, setSelected] = useState(0)
  const {images} = book
  const total = images.length -1
  
  const next = () => {
    if(selected == total) setSelected(0)
    else setSelected(selected+1)
  }

  const previous = () => {
    if(selected == 0) setSelected(total)
    else setSelected(selected-1)
  }

  const isCurrent = n => {
    return n == selected
  }
  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      top={0}
      bottom={0}
      w="full"
      h="full"
      bgColor="gray.900"
    >
      <Flex
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          border="1px"
          borderColor="gray.700"
          boxSize="2xl"
          rounded={8}
          bgColor="gray.800"
          color="white"
          position="relative"
        >
          {
            images.map((image, n) => (
              <ScaleFade
                key={n}
                in={isCurrent(n)}
                unmountOnExit={true}
              >
                <Box
                  bgImage={image.large}
                  rounded={8}
                >
                  <Img
                    src={image.large}
                    objectFit="contain"
                    objectPosition="center"
                    boxSize="2xl"
                    rounded={8}
                    filter="drop-shadow(1px 1px 7px #222)"
                    backdropFilter="blur(15px)"
                  />
                </Box>
              </ScaleFade>
            ))
          }
          <Flex
            flexDirection="column"
            position="absolute"
            h="full"
            w="full"
            top={0}
          >
            <Spacer />
            <Flex p={4}>
              <IconButton
                variant="solid"
                colorScheme="whiteAlpha"
                size="lg"
                onClick={previous}
                icon={<ArrowLeftIcon />}
                filter="drop-shadow(2px 4px 6px black)"
              />
              <Spacer />
              <IconButton
                variant="solid"
                colorScheme="whiteAlpha"
                size="lg"
                onClick={next}
                icon={<ArrowRightIcon />}
                filter="drop-shadow(2px 4px 6px black)"
              />
            </Flex>
            <Spacer />
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context
  const {bookID} = query
  const {origin} = absoluteUrl(req)
  const bookQuery = await fetch(`${origin}/api/books/${bookID}`)
  if(bookQuery.ok) {
    const book = await bookQuery.json()
    return {
      props: { book }
    }
  } else {
    return {
      props: {}
    }
  }
}
