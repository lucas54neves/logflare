// FIXME: Encontrar melhor forma de representar os tipos
export type LogRequestType = {
  method?: string
  url?: string
  userAgent?: string
  host?: string
  cfRay?: string
  cfConnnectingIp?: string
  cf?: string
  headers?: any
  body?: any
}
