import apolloClient from 'apollo'
import { normalizeGQLBook } from 'utils/normalizeBooks'
import query from './queries/booksById'

export default async function getBook(id) {
  const { data } = await apolloClient.query({
    query,
    variables: { id }
  })
  const { book_by_id: book } = data
  return normalizeGQLBook(book)
}