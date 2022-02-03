import { gql } from '@apollo/client'

const query = gql`
  query($id: ID!) {
    book_by_id(id: $id) {
      id,
      title,
      content,
      tags,
      user_created {
        id,
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

export default query
