import sdk from 'sdk'

export default async function handler(req, res) {
  const { query } = req
  const { bookID } = query
  const bookQuery = sdk.items('comment')
  try {
    const { data: comments } = await bookQuery.readMany(bookID, {
      fields: '*.*',
      filter: {
        book: {
          _eq: bookID
        }
      }
    })
    res.status(200).json(comments)
  } catch(e) {
    res.status(404).send()
  }
}
