import sdk from 'sdk'

export function createImageUrl(imgId, key) {
  const {url} = sdk
  if(key) return `${url}/assets/${imgId}?key=${key}`
  return `${url}/assets/${imgId}`
}

export function generateSizes(id) {
  return {
    tiny: createImageUrl(id, 'tiny'),
    small: createImageUrl(id, 'small'),
    smallCropped: createImageUrl(id, 'small-cropped'),
    medium: createImageUrl(id, 'medium'),
    mediumCropped: createImageUrl(id, 'medium-cropped'),
    large: createImageUrl(id, 'large'),
    original: createImageUrl(id)
  }
}

export function normalizeImage(image) {
  const { width, height, id } = image
  const sizes = generateSizes(id)
  return {...sizes, width, height}
}
