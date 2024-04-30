export const getBanner = async () => {
  const kw = ["Nature", "3D Renders", "Travel", "Architecture & Interiors", "Textures & Patterns", "Street Photography", "Film", "Archival"]
  const response = await fetch(`https://source.unsplash.com/random/1920x1080?=nature${kw[Math.floor(Math.random() * kw.length)]}`)
  const imageUrl = response.url;
  return imageUrl
}