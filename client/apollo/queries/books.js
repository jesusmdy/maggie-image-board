import { gql } from '@apollo/client'

const query = gql`
  query($page: Int!) {
    book(page: $page) {
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
