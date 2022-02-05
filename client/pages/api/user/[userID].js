import sdk from 'sdk'
import { normalizeUser } from 'utils/normalizeUser'

export default async function handler(req, res) {
  const { query } = req
  const { userID } = query
  const userQuery = sdk.items('directus_users')
  try {
    const user = await userQuery.readOne(userID, {
      fields: '*.*'
    })
    res.status(200).json(normalizeUser(user))
  } catch(e) {
    console.log(e);
    res.status(404).send()
  }
}
