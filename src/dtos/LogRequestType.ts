// FIXME: Encontrar melhor forma de representar os tipos
export type LogRequestType = {
  method?: string
  url?: string
  userAgent?: string | null
  host?: string | null
  cfRay?: string | null
  cfConnectingIp?: string | null
  cf?: string
  headers?: any
  body?: any
}
