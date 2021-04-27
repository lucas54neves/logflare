import { LogResponseType } from "./LogResponseType"
import { LogRequestType } from "./LogRequestType"

export type LogDataType = {
  credentials: {
    sourceKey: string
    apiKey: string
  }
  request?: LogRequestType
  response?: LogResponseType
  message: string
}
