import sdk from 'sdk'

const defaultAvatar = `https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png`

export function createImageUrl(imgId, key) {
  const {url} = sdk
  if(key) return `${url}/assets/${imgId}?key=${key}`
  return `${url}/assets/${imgId}`
}

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

export function normalizeImages(images) {
  const {url} = sdk
  return images.map(({directus_files_id}) => {
    const {id, width, height} = directus_files_id
    return {
      tiny: createImageUrl(id, 'tiny'),
      small: createImageUrl(id, 'small'),
      smallCropped: createImageUrl(id, 'small-cropped'),
      medium: createImageUrl(id, 'medium'),
      mediumCropped: createImageUrl(id, 'medium-cropped'),
      large: createImageUrl(id, 'large'),
      largeCropped: createImageUrl(id, 'large-cropped'),
      original: createImageUrl(id),
      width, height
    }
  })
}

export function normalizeGQLBook(book) {
  const {
    id,
    title,
    content,
    images: _images,
    tags,
    user_created
  } = book
  const {first_name, last_name, avatar, id: userId} = user_created
  const author = {
    id: userId,
    displayName: `${first_name.trim()} ${last_name.trim()}`,
    avatar: avatar && createImageUrl(avatar.id, 'small') || defaultAvatar
  }
  const images = normalizeImages(_images)

  return {
    id,
    title,
    content,
    images,
    tags,
    author
  }
}

export function normalizeGQLBooks(books) {
  return books.map(book => normalizeGQLBook(book))
}

export function normalizeBooks(books) {
  return books.map(book => normalizeBook(book))
}