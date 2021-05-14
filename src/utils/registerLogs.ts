import { LogDataType } from '../dtos/LogDataType'
import { makeIdLogs } from './makeIdLogs'

export async function registerLogs(data: LogDataType) {
  const metadata = {
    logflare_worker: {
      worker_id: makeIdLogs(6)
    }
  }

  const headers = {
    'X-API-KEY': data.credentials.apiKey,
    'Content-Type': 'application/json'
  }

  if (data.request) {
    metadata['request'] = {
      url: data.request.url,
      userAgent: data.request.userAgent,
      host: data.request.host,
      cfRay: data.request.cfRay,
      cfConnectingIp: data.request.cfConnnectingIp,
      cf: data.request.cf,
      headers: data.request.headers,
      body: data.request.body
    }

    if (data.request.host) {
      headers['User-Agent'] = `Cloudflare Worker via ${data.request.host}`
    }
  }

  if (data.response) {
    metadata['response'] = {
      origin_time: data.response.responseTime,
      status_code: data.response.statusCode,
      body: data.response.body,
      headers: data.response.metadata
    }
  }

  const logflareEventBody = {
    source: data.credentials.sourceKey,
    log_entry: data.message,
    metadata
  }

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(logflareEventBody)
  }

  await fetch('https://api.logflare.app/logs', init)
}
