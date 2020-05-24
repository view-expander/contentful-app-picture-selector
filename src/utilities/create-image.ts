export const createImage = (
  arrayBuffer: ArrayBuffer,
  type = 'application/octet-stream'
): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = new Image()

  img.onload = (): void => resolve(img)
  img.onended = (err): void => reject(err)

  img.src = URL.createObjectURL(new Blob([arrayBuffer], { type }))
})
