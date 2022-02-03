import { gql } from '@apollo/client'
import sdk from 'sdk'
import { normalizeBooks } from 'utils/normalizeBooks'
import apolloClient from 'apollo'

export default async function handler(req, res) {
  const books = await apolloClient
  .query({
    query: gql`
      query {
        book {
          title,
          content,
          tags,
          user_created {
            first_name,
            last_name,
            avatar {
              id
            }
          },
          images {
            id,
            directus_files_id {
              id,
              width,
              height
            }
          }
        }
      }
    `
  })
  console.log(books);
  res.status(200).json(books)
}