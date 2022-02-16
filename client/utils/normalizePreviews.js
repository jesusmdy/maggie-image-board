import { normalizeUser } from './normalizeUser'
import { normalizeImage } from './normalizeImages'

export function normalizePreview(preview) {
  const {
    id,
    title,
    nsfw,
    tags,
    date_created,
    user_created,
    images
  }  = preview
  const author = normalizeUser(user_created)
  console.log(images);
  const image = normalizeImage(images[0].directus_files_id)
  const bookUrl = `/books/${id}`
  return {
    id,
    title,
    nsfw,
    tags,
    createdAt: date_created,
    author,
    bookUrl,
    ...image
  }
}

export function normalizePreviews(previews) {
  return previews.map(normalizePreview)
}
