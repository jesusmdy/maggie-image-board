import sdk from 'sdk'

export default async function handler(req, res) {
  const book = sdk.items('book')
  const {data: books} = await book.readMany({
    fields: '*.*'
  })
  res.status(200).json(books)
}
