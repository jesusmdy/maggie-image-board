import { createImageUrl } from './normalizeBooks'
const defaultAvatar = `https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png`

export function normalizeUser(user) {
  const {
    first_name: firstName,
    last_name: lastName,
    avatar: avatarFile,
    id,
    title,
    description
  } = user
  const displayName = `${firstName} ${lastName}`
  const avatar = avatarFile
    ? createImageUrl(avatarFile.id, 'small')
    : defaultAvatar
  const userUrl = `/user/${id}`
  return {
    id,
    userUrl,
    displayName,
    firstName,
    lastName,
    avatar,
    title: title || '',
    description: description || ''
  }
}