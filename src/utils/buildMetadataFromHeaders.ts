export function buildMetadataFromHeaders(headers: any) {
  const responseMetadata: any = {}

  Array.from(headers).forEach(([key, value]: any) => {
    responseMetadata[key.replace(/-/g, '_')] = value
  })

  return responseMetadata
}
