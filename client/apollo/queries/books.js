import { gql } from '@apollo/client'

const query = gql`
  query(
      $page: Int!, 
      $sort: [String!],
      $filter: book_filter!,
      $limit: Int!
    ) {
    book(
      page: $page,
      sort: $sort,
      filter: $filter,
      limit: $limit
    ) {
      id,
      title,
      nsfw,
      content,
      tags,
      date_created,
      user_created {
        id,
        first_name,
        last_name,
        verified,
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

export default query
