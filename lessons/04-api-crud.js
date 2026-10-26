window.lesson04 = {
  "id": "crud",
  "navTitle": "04 · API CRUD",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 04 · APRENDIZAJE ASISTIDO",
    "title": "Un contrato HTTP completo y coherente",
    "description": "Organiza los handlers TypeScript y prueba consultas, creación, sustitución, cambio parcial y eliminación simuladas.",
    "chips": [
      "TypeScript",
      "Festival Control"
    ]
  },
  "validation": {
    "sourceLanguage": "typescript"
  },
  "phases": [
    {
      "id": "destino",
      "navTitle": "Destino",
      "title": "Reconoce el resultado antes de construir",
      "description": "Organiza los handlers TypeScript y prueba consultas, creación, sustitución, cambio parcial y eliminación simuladas.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "Un contrato HTTP completo y coherente",
          "objective": "Disponer de cinco métodos sobre /events y /events/{id}, con 200/201, 400 y 404 comprobables.",
          "prior": "Bloques 01–03: GET dinámico, POST, validación y compilación hacia dist.",
          "new": "Módulo compartido, catálogo fijo, recurso inexistente, PUT frente a PATCH y CORS para el siguiente cliente.",
          "boundary": "Los dos eventos son datos fijos. POST, PUT, PATCH y DELETE sólo responden: una consulta posterior conserva la lista original. No es una API con persistencia.",
          "request": "GET http://localhost:3000/dev/events",
          "response": "200 OK\n[\n  {\n    \"id\": \"EVT-101\",\n    \"artist\": \"Neon Waves\",\n    \"space\": \"Main Stage\",\n    \"time\": \"22:30\",\n    \"status\": \"CONFIRMED\"\n  },\n  {\n    \"id\": \"EVT-102\",\n    \"artist\": \"Midnight Session\",\n    \"space\": \"Club Stage\",\n    \"time\": \"23:45\",\n    \"status\": \"CONFIRMED\"\n  }\n]\n",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "CRUD y HTTP",
              "En este tour modelamos contratos de crear, leer, actualizar y eliminar. Su efecto persistente queda fuera de esta práctica."
            ],
            [
              "GET conocido y 404",
              "Ahora GET busca EVT-101 o EVT-102. El eco arbitrario de 02 se sustituye por una consulta real a este catálogo fijo."
            ],
            [
              "PUT y PATCH",
              "PUT exige el objeto completo, incluido status. PATCH acepta únicamente {\"status\":\"CANCELLED\"} o CONFIRMED."
            ],
            [
              "Módulo y CORS",
              "model.ts reúne tipos, catálogo y respuesta. cors: true configura OPTIONS; el header de json permite leer la respuesta desde otro origen web."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "Cliente HTTP",
            "Método + ruta",
            "Handler de src/events",
            "Validación y catálogo",
            "Estado + JSON"
          ],
          "text": "Las rutas siguen siendo acumulativas y hello se conserva. La separación de handlers no exige servicios distintos."
        }
      ]
    },
    {
      "id": "prepara",
      "navTitle": "Prepara",
      "title": "Recupera el punto de partida",
      "description": "Continúas en el mismo repositorio del alumno. Comprueba el bloque anterior antes de modificar archivos.",
      "sections": [
        {
          "type": "wizard",
          "id": "preparacion",
          "label": "HAZLO · OBSERVA · DIAGNOSTICA",
          "title": "Prepara la carpeta y el checkpoint",
          "steps": [
            {
              "id": "punto-partida",
              "shortTitle": "Carpeta y bloque anterior",
              "title": "Carpeta y bloque anterior",
              "learn": "El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.",
              "text": "Abre Git Bash en VS Code. Verifica el POST de 03 con body completo. Crea src/events desde VS Code. Detén Offline con Ctrl+C antes de editar su configuración.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/backend\npwd\nnode -v\nnpm run typecheck",
              "expected": "Estás en backend, Node muestra v22 y TypeScript termina sin errores.",
              "help": [
                [
                  "La terminal está en otra carpeta",
                  "Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile."
                ],
                [
                  "Error de TypeScript",
                  "Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck."
                ]
              ],
              "check": "Si el punto de partida falla, vuelve al cierre del bloque anterior. Después abre las pestañas de Construye."
            }
          ]
        },
        {
          "type": "note",
          "id": "mapa",
          "title": "Árbol del incremento",
          "text": "backend/src/events/ contendrá model.ts, list.ts, get.ts, create.ts, replace.ts, update.ts y delete.ts. Conserva hello.ts y, durante la transición, getEvent.ts y createEvent.ts de 02–03: el nuevo YAML ya no los invoca. Evitamos borrar trabajo previo. Sólo se editan fuentes en src; dist se regenera."
        },
        {
          "type": "code",
          "id": "mapa-archivos",
          "label": "MIRA EL MAPA · ANTES DE CONSTRUIR",
          "title": "Proyecto acumulado al finalizar este bloque",
          "filename": "Workspace del alumno",
          "text": "El árbol es una referencia. Crea cada archivo por separado en las pestañas de Construye; las llaves del esquema agrupan nombres, no forman parte del nombre real. Conserva el resto del trabajo del bloque anterior.",
          "code": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── package.json + package-lock.json\n    ├── tsconfig.json\n    ├── serverless.yml\n    ├── src/hello.ts\n    ├── src/events/{model,list,get,create,replace,update,delete}.ts\n    └── dist/ (generado por npm run build)\n"
        }
      ]
    },
    {
      "id": "construye",
      "navTitle": "Construye",
      "title": "Construye una pieza cada vez",
      "description": "Primero comprende su responsabilidad; después copia el archivo completo y comprueba su ruta.",
      "sections": [
        {
          "type": "fileLab",
          "id": "archivos",
          "label": "CONSTRUYE · ARCHIVOS COMPLETOS",
          "title": "Archivos de este bloque",
          "intro": "Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.",
          "tabs": [
            {
              "title": "model.ts",
              "filename": "model.ts",
              "path": "backend/src/events/model.ts",
              "responsibility": "Definir el contrato, catálogo fijo y validación compartida.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "Omit<FestivalEvent, 'id'>",
                  "Deriva la entrada de escritura: el cliente no asigna id. En 04 status pasa a ser obligatorio en POST y PUT."
                ],
                [
                  "value is EventInput",
                  "Este type guard comunica al compilador que las comprobaciones han validado todos los campos."
                ],
                [
                  "Record<string, unknown>",
                  "Tras comprobar objeto no nulo ni array, podemos consultar claves; cada valor sigue requiriendo validación."
                ],
                [
                  "json y CORS",
                  "Todas las respuestas, incluidos errores, entregan JSON y permiten al navegador leerlas. El catálogo no se modifica."
                ]
              ],
              "code": "import type { APIGatewayProxyResult } from 'aws-lambda';\n\nexport type EventStatus = 'CONFIRMED' | 'CANCELLED';\nexport interface FestivalEvent {\n  id: string;\n  artist: string;\n  space: string;\n  time: string;\n  status: EventStatus;\n}\nexport type EventInput = Omit<FestivalEvent, 'id'>;\n\nexport const catalog: FestivalEvent[] = [\n  { id: 'EVT-101', artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' },\n  { id: 'EVT-102', artist: 'Midnight Session', space: 'Club Stage', time: '23:45', status: 'CONFIRMED' }\n];\n\nexport const json = (statusCode: number, value: unknown): APIGatewayProxyResult => ({\n  statusCode,\n  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },\n  body: JSON.stringify(value)\n});\n\nexport function readBody(text: string | null): Record<string, unknown> | null {\n  try {\n    const value: unknown = JSON.parse(text ?? 'null');\n    return typeof value === 'object' && value !== null && !Array.isArray(value)\n      ? value as Record<string, unknown> : null;\n  } catch { return null; }\n}\n\nexport function isEventInput(value: Record<string, unknown> | null): value is EventInput {\n  return value !== null &&\n    typeof value.artist === 'string' && value.artist.trim().length > 0 &&\n    typeof value.space === 'string' && value.space.trim().length > 0 &&\n    typeof value.time === 'string' && /^([01]\\d|2[0-3]):[0-5]\\d$/.test(value.time) &&\n    (value.status === 'CONFIRMED' || value.status === 'CANCELLED');\n}\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "list.ts",
              "filename": "list.ts",
              "path": "backend/src/events/list.ts",
              "responsibility": "Devolver las dos actuaciones fijas.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { catalog, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  console.log('LIST eventos:', event.httpMethod);\n  return json(200, catalog);\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "get.ts",
              "filename": "get.ts",
              "path": "backend/src/events/get.ts",
              "responsibility": "Buscar un id conocido o devolver 404.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { catalog, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const id = event.pathParameters?.id;\n  console.log('GET evento:', id);\n  if (!id) return json(400, { message: 'Falta id' });\n  const found = catalog.find(item => item.id === id);\n  return found ? json(200, found) : json(404, { message: 'Evento no encontrado' });\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "create.ts",
              "filename": "create.ts",
              "path": "backend/src/events/create.ts",
              "responsibility": "Validar un objeto completo y devolver una creación simulada.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { readBody, isEventInput, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const input = readBody(event.body);\n  if (!isEventInput(input)) return json(400, { message: 'JSON con artist, space, time HH:mm y status válido requerido' });\n  console.log('POST evento:', input.artist);\n  return json(201, { id: 'EVT-NEW', artist: input.artist, space: input.space, time: input.time, status: input.status });\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "replace.ts",
              "filename": "replace.ts",
              "path": "backend/src/events/replace.ts",
              "responsibility": "Simular la sustitución completa de una actuación conocida.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { catalog, readBody, isEventInput, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const id = event.pathParameters?.id;\n  if (!id) return json(400, { message: 'Falta id' });\n  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });\n  const input = readBody(event.body);\n  if (!isEventInput(input)) return json(400, { message: 'PUT requiere artist, space, time HH:mm y status válido' });\n  console.log('PUT evento:', id);\n  return json(200, { id, artist: input.artist, space: input.space, time: input.time, status: input.status, operation: 'REPLACED' });\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "update.ts",
              "filename": "update.ts",
              "path": "backend/src/events/update.ts",
              "responsibility": "Simular el cambio parcial de status, único campo permitido aquí.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { catalog, readBody, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const id = event.pathParameters?.id;\n  if (!id) return json(400, { message: 'Falta id' });\n  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });\n  const input = readBody(event.body);\n  if (!input || Object.keys(input).length !== 1 || (input.status !== 'CONFIRMED' && input.status !== 'CANCELLED')) {\n    return json(400, { message: 'PATCH admite únicamente status CONFIRMED o CANCELLED' });\n  }\n  console.log('PATCH evento:', id);\n  return json(200, { id, changes: { status: input.status }, operation: 'UPDATED' });\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "delete.ts",
              "filename": "delete.ts",
              "path": "backend/src/events/delete.ts",
              "responsibility": "Simular la eliminación de una actuación conocida.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "import … './model.js'",
                  "NodeNext usa la extensión de ejecución .js en el import; TypeScript encuentra model.ts y genera model.js."
                ],
                [
                  "Guardas y retorno anticipado",
                  "Un id ausente devuelve 400; un recurso desconocido, 404. Las escrituras se validan antes del 200/201."
                ],
                [
                  "Contrato simulado",
                  "El JSON describe la operación. Ninguna función muta catalog ni conserva cambios entre peticiones."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\nimport { catalog, json } from './model.js';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const id = event.pathParameters?.id;\n  if (!id) return json(400, { message: 'Falta id' });\n  if (!catalog.some(item => item.id === id)) return json(404, { message: 'Evento no encontrado' });\n  console.log('DELETE evento:', id);\n  return json(200, { id, operation: 'DELETED' });\n};\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "serverless.yml",
              "filename": "serverless.yml",
              "path": "backend/serverless.yml",
              "responsibility": "Relacionar cada método y ruta HTTP con el export handler del JavaScript compilado.",
              "instruction": "Sustituye el YAML completo por esta versión acumulativa. Conserva hello y todas las rutas anteriores.",
              "learn": [
                [
                  "handler: dist/… .handler",
                  "La parte anterior al punto es la ruta sin extensión; handler es el nombre exportado. El archivo que editas sigue siendo .ts en src."
                ],
                [
                  "events → http",
                  "Usamos REST API, compatible con APIGatewayProxyEvent. Conserva sangrías con espacios."
                ],
                [
                  "cors: true",
                  "Configura preflight OPTIONS para el cliente web. Las respuestas Lambda también devolverán Access-Control-Allow-Origin en el bloque 04."
                ]
              ],
              "code": "service: festival-control-api\nframeworkVersion: ~4.45.0\n\nprovider:\n  name: aws\n  runtime: nodejs22.x\n\nplugins:\n  - serverless-offline\n\nfunctions:\n  hello:\n    handler: dist/hello.handler\n    events:\n      - http:\n          path: hello\n          method: get\n          cors: true\n\n  getEvent:\n    handler: dist/events/get.handler\n    events:\n      - http:\n          path: events/{id}\n          method: get\n          cors: true\n\n  createEvent:\n    handler: dist/events/create.handler\n    events:\n      - http:\n          path: events\n          method: post\n          cors: true\n\n  listEvents:\n    handler: dist/events/list.handler\n    events:\n      - http:\n          path: events\n          method: get\n          cors: true\n\n  replaceEvent:\n    handler: dist/events/replace.handler\n    events:\n      - http:\n          path: events/{id}\n          method: put\n          cors: true\n\n  updateEvent:\n    handler: dist/events/update.handler\n    events:\n      - http:\n          path: events/{id}\n          method: patch\n          cors: true\n\n  deleteEvent:\n    handler: dist/events/delete.handler\n    events:\n      - http:\n          path: events/{id}\n          method: delete\n          cors: true\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            }
          ]
        }
      ]
    },
    {
      "id": "prueba",
      "navTitle": "Prueba",
      "title": "Prueba por capas y conserva las evidencias",
      "description": "No avances porque una pantalla parezca correcta. Contrasta acción, respuesta y diagnóstico.",
      "sections": [
        {
          "type": "wizard",
          "id": "pruebas",
          "label": "HAZLO · OBSERVA · DIAGNOSTICA",
          "title": "Ejecuta las pruebas del bloque",
          "steps": [
            {
              "id": "compila",
              "shortTitle": "Tipos y ejecución",
              "title": "Tipos y ejecución",
              "learn": "npm start comprueba y compila antes de ejecutar Offline. El navegador todavía no interviene.",
              "text": "Detén la ejecución anterior con Ctrl+C. En Git Bash, dentro de backend, ejecuta estos comandos. Conserva esta terminal abierta; utiliza una segunda para curl.",
              "code": "npm run typecheck\nnpm start",
              "expected": "Cero errores de tipos y lista de rutas HTTP. Mantén /dev, el puerto y los métodos anunciados por Offline.",
              "help": [
                [
                  "No aparece una ruta",
                  "Comprueba el YAML completo, su indentación y dist/..., y reinicia después de guardar."
                ],
                [
                  "Framework pide acceso",
                  "Completa la cuenta/autenticación del bloque 01. Esta cuenta es distinta de las credenciales AWS Academy."
                ],
                [
                  "La terminal está en otra carpeta",
                  "Ejecuta pwd. Los comandos del backend van en /d/DEVOPS/04-PILARES-SERVERLESS/backend; los de Expo, en mobile."
                ],
                [
                  "Error de TypeScript",
                  "Lee archivo y línea del primer error. Compara ese archivo completo, guarda y repite npm run typecheck."
                ]
              ],
              "check": "Copia la URL anunciada. Si el puerto difiere de 3000, adapta las peticiones; no pruebes una ruta ausente."
            },
            {
              "id": "lista",
              "shortTitle": "GET lista y detalle",
              "title": "GET lista y detalle",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i http://localhost:3000/dev/events\ncurl -i http://localhost:3000/dev/events/EVT-101\ncurl -i http://localhost:3000/dev/events/NO-EXISTE",
              "expected": "200 con dos eventos; 200 con EVT-101; 404 para NO-EXISTE. EVT-104 ya no pertenece al catálogo.",
              "help": [
                [
                  "Connection refused",
                  "Arranca npm start en backend y deja esa terminal abierta."
                ],
                [
                  "404 o Missing Authentication Token",
                  "Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes."
                ]
              ],
              "check": "Contrasta estado y cuerpo; después relaciona la petición con el log de la función."
            },
            {
              "id": "escrituras",
              "shortTitle": "POST y PUT",
              "title": "POST y PUT",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{\"artist\":\"Nova Pulse\",\"space\":\"Main Stage\",\"time\":\"21:00\",\"status\":\"CONFIRMED\"}'\ncurl -i -X PUT http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{\"artist\":\"Nova Pulse\",\"space\":\"Main Stage\",\"time\":\"21:00\",\"status\":\"CONFIRMED\"}'",
              "expected": "POST: 201 y EVT-NEW. PUT: 200 con id EVT-101 y operation REPLACED.",
              "help": [
                [
                  "Connection refused",
                  "Arranca npm start en backend y deja esa terminal abierta."
                ],
                [
                  "404 o Missing Authentication Token",
                  "Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes."
                ]
              ],
              "check": "Contrasta estado y cuerpo; después relaciona la petición con el log de la función."
            },
            {
              "id": "parcial",
              "shortTitle": "PATCH y DELETE",
              "title": "PATCH y DELETE",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X PATCH http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{\"status\":\"CANCELLED\"}'\ncurl -i -X DELETE http://localhost:3000/dev/events/EVT-102",
              "expected": "PATCH: 200 con changes.status CANCELLED y operation UPDATED. DELETE: 200 con id EVT-102 y operation DELETED.",
              "help": [
                [
                  "Connection refused",
                  "Arranca npm start en backend y deja esa terminal abierta."
                ],
                [
                  "404 o Missing Authentication Token",
                  "Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes."
                ]
              ],
              "check": "Contrasta estado y cuerpo; después relaciona la petición con el log de la función."
            },
            {
              "id": "errores",
              "shortTitle": "Errores y ausencia de persistencia",
              "title": "Errores y ausencia de persistencia",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X PUT http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{\"status\":\"CANCELLED\"}'\ncurl -i -X PATCH http://localhost:3000/dev/events/EVT-101 -H 'Content-Type: application/json' -d '{\"time\":\"22:00\"}'\ncurl -i http://localhost:3000/dev/events",
              "expected": "Ambas escrituras inválidas: 400. GET conserva dos eventos y status CONFIRMED. Repite la secuencia válida en Thunder Client.",
              "help": [
                [
                  "Connection refused",
                  "Arranca npm start en backend y deja esa terminal abierta."
                ],
                [
                  "404 o Missing Authentication Token",
                  "Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes."
                ]
              ],
              "check": "Contrasta estado y cuerpo; después relaciona la petición con el log de la función."
            },
            {
              "id": "cors",
              "shortTitle": "Preflight para el navegador",
              "title": "Preflight para el navegador",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X OPTIONS http://localhost:3000/dev/events -H 'Origin: http://localhost:8081' -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'",
              "expected": "OPTIONS responde 2xx, permite el origen y el método POST, y admite Content-Type. En un GET normal también aparece Access-Control-Allow-Origin.",
              "help": [
                [
                  "No hay headers CORS",
                  "Revisa cors: true en todos los eventos HTTP y los headers del helper json. Reinicia Offline."
                ],
                [
                  "Connection refused",
                  "Arranca npm start en backend y deja esa terminal abierta."
                ],
                [
                  "404 o Missing Authentication Token",
                  "Compara método, /dev y ruta con el servidor. /events y /events/EVT-101 son rutas diferentes."
                ]
              ],
              "check": "Contrasta estado y cuerpo; después relaciona la petición con el log de la función."
            }
          ]
        }
      ]
    },
    {
      "id": "entiende",
      "navTitle": "Entiende",
      "title": "Explica por qué ha funcionado",
      "description": "Relaciona la instrucción con el efecto observado antes de modificarla.",
      "sections": [
        {
          "type": "explainRows",
          "id": "explicacion",
          "title": "Del código al comportamiento",
          "rows": [
            [
              "catalog.find / catalog.some",
              "find devuelve la ficha; some comprueba si existe el id antes de simular una escritura."
            ],
            [
              "isEventInput(input)",
              "POST y PUT validan el objeto entero, incluido status."
            ],
            [
              "Object.keys(input).length !== 1",
              "Este PATCH sólo admite status: no anuncia cambios que no implementa."
            ],
            [
              "json(200, { operation: … })",
              "Devuelve el resultado del contrato; no modifica el array."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "Después de DELETE EVT-102, ¿cuántos eventos trae GET /events?",
          "answer": "Dos. La simulación devuelve DELETED pero no modifica catalog. Demostrar este límite forma parte del aprendizaje."
        }
      ]
    },
    {
      "id": "modifica",
      "navTitle": "Modifica",
      "title": "Introduce un cambio pequeño y compruébalo",
      "description": "La modificación utiliza lo que acabas de aprender y conserva el contrato necesario para continuar.",
      "sections": [
        {
          "type": "guidedChange",
          "id": "cambio",
          "title": "Contrasta sustitución y cambio parcial",
          "steps": [
            "Envía sólo status CANCELLED mediante PUT a EVT-101.",
            "Envía exactamente el mismo body mediante PATCH.",
            "Consulta de nuevo EVT-101 y explica por qué conserva CONFIRMED."
          ],
          "expected": "PUT parcial → 400\nPATCH de status → 200, operation UPDATED\nGET posterior → 200, status CONFIRMED",
          "constraints": "No añadas persistencia ni desactives las validaciones. Guarda en evidencias el método, body y estado de cada intento."
        }
      ]
    },
    {
      "id": "comprueba",
      "navTitle": "Comprueba",
      "title": "Contrasta tu comprensión",
      "description": "Estas preguntas son formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.",
      "sections": [
        {
          "type": "quiz",
          "id": "pregunta-0",
          "question": "¿Qué entrada acepta este PATCH?",
          "options": [
            "Cualquier campo desconocido",
            "El evento entero",
            "Sólo status válido",
            "Un array de eventos"
          ],
          "correct": 2,
          "explanation": "Este contrato de cambio parcial se limita a status; rechaza más claves y estados desconocidos."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué falta para que DELETE cambie futuras consultas?",
          "options": [
            "Otro console.log",
            "Almacenamiento y operaciones de persistencia",
            "Cambiar 200 por 204",
            "Renombrar .ts a .js"
          ],
          "correct": 1,
          "explanation": "La respuesta HTTP por sí sola no conserva datos. No añadimos almacenamiento en este cuaderno."
        }
      ]
    },
    {
      "id": "cierra",
      "navTitle": "Cierra",
      "title": "Documenta y deja el proyecto recuperable",
      "description": "Marca sólo las comprobaciones que has realizado en tu ordenador.",
      "sections": [
        {
          "type": "fileLab",
          "id": "evidencia",
          "label": "CONSTRUYE · ARCHIVOS COMPLETOS",
          "title": "Deja una evidencia breve y recuperable",
          "intro": "Recorre las pestañas de izquierda a derecha. Cada una contiene un archivo completo, no un fragmento que debas adivinar.",
          "tabs": [
            {
              "title": "README.md",
              "filename": "README.md",
              "path": "evidencias/04/README.md",
              "responsibility": "Documentar lo que tú has comprobado, sin inventar evidencias.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "Resultado",
                  "Completa cada apartado con tu ejecución. Este texto es una plantilla para tus respuestas."
                ],
                [
                  "Sin credenciales",
                  "No incluyas AWSDetails, tokens ni archivos .aws en capturas, Git o README."
                ]
              ],
              "code": "# Bloque 04\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            }
          ]
        },
        {
          "type": "wizard",
          "id": "hito",
          "label": "HAZLO · OBSERVA · DIAGNOSTICA",
          "title": "Guarda el hito del bloque",
          "steps": [
            {
              "id": "git",
              "shortTitle": "Git",
              "title": "Git · revisa y guarda",
              "learn": "Un commit permite recuperar el proyecto acumulado en este punto. Revisar el diff evita subir archivos ajenos al ejercicio.",
              "text": "Desde la raíz, completa el README de evidencias/04 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add backend/src/events backend/serverless.yml evidencias/04/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 04\"\ngit push\ngit log -1 --oneline",
              "expected": "El commit contiene tu documentación y los archivos de trabajo revisados. No aparecen node_modules, dist, .serverless, .env ni .aws.",
              "help": [
                [
                  "No hay cambios preparados",
                  "Añade las rutas concretas que muestra git status y que pertenecen al bloque. No copies la línea de ejemplo si no corresponde a tus archivos."
                ],
                [
                  "Push rechazado o remoto ausente",
                  "Consulta la configuración Git del cierre del bloque 01. Conserva el commit local y resuelve acceso/remoto; no uses push --force."
                ]
              ],
              "check": "Anota el hash con git log -1 --oneline y verifica en GitHub el contenido del commit."
            }
          ]
        },
        {
          "type": "checklist",
          "id": "cierre",
          "title": "Checkpoint · listo para continuar",
          "items": [
            "He probado los cinco métodos y los errores 400/404.",
            "El YAML conserva hello y apunta a dist/events.",
            "He observado OPTIONS y las cabeceras CORS.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 05: construirás la interfaz React Native en TypeScript; primero con datos locales, después con esta API."
        }
      ]
    }
  ]
};
