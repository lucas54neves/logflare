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
    if (request.url) {
      metadata['request']['url'] = request.url
    }

    if (request.userAgent) {
      metadata['request']['userAgent'] = request.userAgent
    }

    if (request.host) {
      metadata['request']['host'] = request.host

      headers['User-Agent'] = `Cloudflare Worker via ${request.host}`
    }

    if (request.cfRay) {
      metadata['request']['cfRay'] = request.cfRay
    }

    if (request.cfConnectingIp) {
      metadata['request']['cfConnectingIp'] = request.cfConnectingIp
    }

    if (request.cf) {
      metadata['request']['cf'] = request.cf
    }

    if (request.headers) {
      metadata['request']['headers'] = request.headers
    }

    if (request.body) {
      metadata['request']['body'] = request.body
    }
  }

  if (response) {
    if (response.responseTime) {
      metadata['response']['responseTime'] = response.responseTime
    }

    if (response.statusCode) {
      metadata['response']['statusCode'] = response.statusCode
    }

    if (response.body) {
      metadata['response']['body'] = response.body
    }

    if (response.metadata) {
      metadata['response']['headers'] = response.metadata
    }
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
