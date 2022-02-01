import sdk from 'sdk'

export function normalizeBook(book) {
  const {url} = sdk
  const {id, title, content, tags, user_created, images: _images} = book
  const images = _images.map(({directus_files_id: imgId}) => {
    return {
      tiny: `${url}/assets/${imgId}?key=tiny`,
      small: `${url}/assets/${imgId}?key=small`,
      smallCropped: `${url}/assets/${imgId}?key=small-cropped`,
      medium: `${url}/assets/${imgId}?key=medium`,
      mediumCropped: `${url}/assets/${imgId}?key=medium-cropped`,
      large: `${url}/assets/${imgId}?key=large`,
      original: `${url}/assets/${imgId}`
    }
  })
  const author = {
    ...user_created,
    avatar: `${url}/assets/${user_created.avatar}?key=small`,
  }
  return { id, title, content, tags, images, author }
}

export function normalizeBooks(books) {
  return books.map(book => normalizeBook(book))
}