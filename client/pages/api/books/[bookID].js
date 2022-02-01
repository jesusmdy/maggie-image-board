import sdk from 'sdk'
import { normalizeBook } from 'utils/normalizeBooks'

export default async function handler(req, res) {
  const { query } = req
  const { bookID } = query
  const bookQuery = sdk.items('book')
  try {
    const book = await bookQuery.readOne(bookID, {
      fields: '*.*'
    })
    res.status(200).json(normalizeBook(book))
  } catch(e) {
    res.status(404).send()
  }
}
