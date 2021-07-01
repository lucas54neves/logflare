# Logflare npm package

Pacote do npm para padronização do registro dos logs usando o Logflare.

## Como usar

### Importação

```
import { registerLogs, buildMetadataFromHeaders } from '@lucas54neves/logflare'
```

### Parâmetros

Ao se chamar a função registerLogs, deve-se passar por parâmetro um objeto com o seguinte formato:

```
{
  credentials: {
    sourceKey: string
    apiKey: string
  }
  request?: {
    method: string
    url: string
    userAgent: string | null
    host: string | null
    cfRay: string | null
    cfConnnectingIp: string | null
    cf: IncomingRequestCfProperties
    metadata: object
    body?: any
  }
  response?: {
    metadata: object
    statusCode: number
    responseTime?: number
    body: any
  }
  message: string
}
```

No atributo credentials do objeto parâmetro da função, são armazenadas informações relativa à chave do source e a chave da API do Logflare, onde os logs serão armazenados. No atributo request (opcional), são armazenadas informações relativas à requisição que deseja realizar. No atributo response (opcional), informações relativas à resposta da requisição que foi realizadasão armazenadas. No atributo message, a mensagem que aparecerá no log é armazenada.

Para criar o request.metadata, deve-se utilizar a função buildMetadataFromHeaders, passando por parâmetro o headers da Request. O mesmo deve ser feito para criar o response.metadata.

```
const someRequest = new Request('http://localhost/api', {method: 'POST', body: '{"foo":"bar"}'})

const metadata = buildMetadataFromHeaders(someRequest.headers)
```

```
const someResponse = new Response('http://localhost/api', {body: '{"foo":"bar"}'})

const metadata = buildMetadataFromHeaders(someResponse.headers)
```

### Exemplo de uso

```
import { registerLogs, buildMetadataFromHeaders } from '@lucas54neves/logflare'

const request = await someFunctionThatReturnsARequest()

const requestBody = await request.json()

const requestData = {
  method: request.method,
  url: request.url,
  userAgent: request.headers.get("user-agent"),
  host: request.headers.get("host"),
  cfRay: request.headers.get("cf-ray"),
  cfConnnectingIp: request.headers.get("cf-connecting-ip"),
  cf: request.cf,
  metadata: buildMetadataFromHeaders(request.headers),
  body: requestBody
}

const begin = Date.now()

const response = await someFunctionThatReturnsAResponse()

const responseTime = Date.now() - begin

const responseData = {
  statusCode: response.status,
  metadata: buildMetadataFromHeaders(response.headers),
  body: data,
  responseTime
}

await registerLogs({
  credentials: {
    sourceKey: "123456789"
    apiKey: "456
  },
  request: requestData,
  response: responseData,
  message: 'This is a log'
})
```
