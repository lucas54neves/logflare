import { LogDataType } from '../dtos'
import { makeIdLogs } from './makeIdLogs'

export async function registerLogs({
  credentials,
  message,
  request,
  response
}: LogDataType): Promise<Response> {
  const metadata: any = {}

  metadata.logflare_worker = {
    worker_id: makeIdLogs(6)
  }

  const headers: any = {
    'X-API-KEY': credentials.apiKey,
    'Content-Type': 'application/json'
  }

  if (request) {
    metadata['request'] = request

    if (request.host) {
      headers['User-Agent'] = `Cloudflare worker via ${request.host}`
    }
  }

  if (response) {
    metadata['response'] = response
  }

  const logflareEventBody = {
    source: credentials.sourceKey,
    log_entry: message,
    metadata
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(logflareEventBody)
  }

  return fetch('https://api.logflare.app/logs', init)
}
