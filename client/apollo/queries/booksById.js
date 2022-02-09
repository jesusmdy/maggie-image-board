import { gql } from '@apollo/client'

const query = gql`
  query($id: ID!, $commentByBook: comment_filter!) {
    book_by_id(id: $id) {
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
    },
    comment(filter: $commentByBook) {
      id,
      user_created {
        id,
        first_name,
        last_name,
        avatar {
          id
        }
      },
      date_created,
      content
    }
  }
`

export default query
