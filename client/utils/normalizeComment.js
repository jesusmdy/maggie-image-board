import { normalizeUser } from './normalizeUser'

export function normalizeComment(comment) {
  const {
    id,
    user_created,
    date_created: createdAt,
    content
  } = comment
  const author = normalizeUser(user_created)
  return {
    id,
    content,
    author,
    createdAt
  }
}

export function normalizeComments(comments) {
  return comments.map(normalizeComment)
}
