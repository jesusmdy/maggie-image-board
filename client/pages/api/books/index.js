import sdk from 'sdk'
import { normalizeBooks } from 'utils/normalizeBooks'

export default async function handler(req, res) {
  const book = sdk.items('book')
  const {data: books} = await book.readMany({
    fields: '*.*'
  })
  res.status(200).json(normalizeBooks(books))
}