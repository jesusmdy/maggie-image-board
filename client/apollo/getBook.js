import apolloClient from 'apollo'
import { normalizeGQLBook } from 'utils/normalizeBooks'
import { normalizeComments } from 'utils/normalizeComment'
import query from './queries/booksById'

export default async function getBook(id) {
  const commentByBook = {
    book: {
      id: {
        _eq: id
      }
    }
  }

  const { data } = await apolloClient.query({
    query,
    variables: { id, commentByBook }
  })
  const { book_by_id, comment } = data
  const comments = normalizeComments(comment)
  const book = normalizeGQLBook(book_by_id)
  return { ...book, comments }
}