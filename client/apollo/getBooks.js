import apolloClient from 'apollo'
import { normalizeGQLBooks } from 'utils/normalizeBooks'
import query from './queries/books'

export default async function getBooks(page = 1) {
  const { data } = await apolloClient.query({
    query,
    variables: { page }
  })
  const { book } = data
  return normalizeGQLBooks(book)
}