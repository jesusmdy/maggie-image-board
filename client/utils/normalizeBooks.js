import sdk from 'sdk'
import { generateSizes, normalizeImage } from './normalizeImages'
import { normalizeUser } from './normalizeUser'

export function normalizeBook(book) {
  const {url} = sdk
  const {id, title, content, tags, user_created, images: _images} = book
  const images = _images.map(({directus_files_id: imgId}) => generateSizes(imgId))
  const author = normalizeUser(user_created)
  return { id, title, content, tags, images, author }
}

export function normalizeImages(images) {
  const {url} = sdk
  return images.map(({directus_files_id: image}) => normalizeImage(image))
}

export function normalizeGQLBook(book) {
  const {
    id,
    title,
    content,
    images: _images,
    tags,
    nsfw,
    user_created
  } = book
  const author = normalizeUser(user_created)
  const images = normalizeImages(_images)
  const bookUrl = `/books/${id}`
  return {
    id,
    bookUrl,
    nsfw,
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