export function buildMetadataFromHeaders(headers: Headers) {
  const responseMetadata: any = {}

  Array.from(headers).forEach(([key, value]) => {
    responseMetadata[key.replace(/-/g, "_")] = value
  })

  return responseMetadata
}
