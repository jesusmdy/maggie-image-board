import apolloClient from 'apollo'
import { normalizeGQLBooks } from 'utils/normalizeBooks'
import query from './queries/books'

export default async function getBooks({
    page = 1,
    sort = ["-date_created"],
    filter = {
      private: {
        _eq: false
      }
    },
    limit = 25
  }) {
  const { data } = await apolloClient.query({
    query,
    variables: { page, sort, filter, limit }
  })
  const { book } = data
  return normalizeGQLBooks(book)
}