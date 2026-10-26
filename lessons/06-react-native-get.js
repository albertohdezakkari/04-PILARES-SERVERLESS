window.lesson06 = {
  "id": "rn-get",
  "navTitle": "06 · React Native + GET",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 06 · APRENDIZAJE ASISTIDO",
    "title": "La pantalla recibe datos de la API",
    "description": "Sustituye el array local por un GET y distingue carga, respuesta y error.",
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
      "description": "Sustituye el array local por un GET y distingue carga, respuesta y error.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "La pantalla recibe datos de la API",
          "objective": "Cargar dos actuaciones desde backend y mostrar un error recuperable si el servidor se detiene.",
          "prior": "Interfaz de 05 y API completa de 04. Mantén sus tipos y la configuración CORS.",
          "new": "fetch, Promises, efecto inicial y estados de carga/error.",
          "boundary": "La vía de aula es navegador y backend en el mismo PC. Localhost sirve aquí; en un teléfono identifica al teléfono, no al ordenador.",
          "request": "React Native Web → GET http://localhost:3000/dev/events",
          "response": "200 OK → dos tarjetas recibidas por HTTP",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "Dos orígenes",
              "Expo suele usar 8081 y backend 3000. El navegador exige CORS aunque ambos estén en localhost."
            ],
            [
              "API_URL",
              "Es la base de la API, con /dev, sin /events ni barra final. El helper añade la ruta."
            ],
            [
              "fetch y response.ok",
              "La Promise puede resolverse aun con 400/404. response.ok permite convertirlo en un error visible."
            ],
            [
              "Carga y recuperación",
              "useEffect inicia la primera carga; finally libera el estado; GET recargar vuelve a intentarlo."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "useEffect / botón",
            "getEvents()",
            "fetch a /events",
            "JSON validado",
            "setEvents → tarjetas"
          ],
          "text": "El cliente importa tipos, pero no el catálogo fijo del backend. Una petición visible en Network demuestra el origen HTTP."
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
              "id": "api",
              "shortTitle": "Backend primero",
              "title": "Backend primero",
              "learn": "Separar la API del cliente permite localizar el fallo antes de revisar React.",
              "text": "En una terminal de backend, ejecuta npm start. En otra prueba GET con curl. Conserva la primera abierta.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/backend\nnpm start",
              "expected": "Se anuncian las rutas de 04. En la segunda terminal curl -i http://localhost:3000/dev/events devuelve 200 y dos actuaciones.",
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
              "check": "Si GET no funciona fuera del frontend, corrige backend antes de abrir Expo."
            },
            {
              "id": "cliente",
              "shortTitle": "Cliente",
              "title": "Cliente · punto de partida",
              "learn": "Expo y el backend son procesos distintos; cada uno necesita su propia terminal.",
              "text": "Desde mobile, verifica el proyecto previo. Para 06 y 07 deja además backend activo con npm start.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/mobile\nnpm run typecheck",
              "expected": "El cliente compila sin errores; backend mantiene las rutas de 04 si este bloque usa HTTP.",
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
              "check": "Corrige el primer error antes de sustituir archivos. No ejecutes los comandos Expo dentro de backend."
            }
          ]
        },
        {
          "type": "code",
          "id": "mapa-archivos",
          "label": "MIRA EL MAPA · ANTES DE CONSTRUIR",
          "title": "Proyecto acumulado al finalizar este bloque",
          "filename": "Workspace del alumno",
          "text": "El árbol es una referencia. Crea cada archivo por separado en las pestañas de Construye; las llaves del esquema agrupan nombres, no forman parte del nombre real. Conserva el resto del trabajo del bloque anterior.",
          "code": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── package.json + package-lock.json\n    ├── tsconfig.json\n    ├── serverless.yml\n    ├── src/hello.ts\n    ├── src/events/{model,list,get,create,replace,update,delete}.ts\n    └── dist/ (generado por npm run build)\n\n└── mobile/\n    ├── package.json + package-lock.json\n    ├── app.json + tsconfig.json\n    ├── App.tsx\n    └── src/\n        ├── types.ts\n        └── api.ts\n"
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
              "title": "api.ts",
              "filename": "api.ts",
              "path": "mobile/src/api.ts",
              "responsibility": "Centralizar URL, métodos, serialización y errores HTTP.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "API_URL",
                  "URL base del servidor, sin barra final y sin /events. En el navegador de este PC, localhost se refiere a ese mismo PC."
                ],
                [
                  "fetch + response.ok",
                  "fetch puede completar con 400/404. response.ok distingue esos errores de una respuesta correcta."
                ],
                [
                  "unknown y type guard",
                  "Antes de renderizar una lista, comprobamos su forma. Los tipos estáticos no validan JSON remoto."
                ],
                [
                  "encodeURIComponent",
                  "GET no envía body ni Content-Type innecesario."
                ]
              ],
              "code": "import type { FestivalEvent } from './types';\n\n// URL base sin /events al final. Sustituye sólo este valor en el bloque 09.\nexport const API_URL = 'http://localhost:3000/dev';\n\nasync function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {\n  const response = await fetch(API_URL + path, {\n    method,\n    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})\n  });\n  const value: unknown = await response.json();\n  if (!response.ok) {\n    const message = typeof value === 'object' && value !== null && 'message' in value\n      ? String(value.message) : response.statusText;\n    throw new Error('HTTP ' + response.status + ': ' + message);\n  }\n  return value;\n}\n\nfunction isFestivalEvent(value: unknown): value is FestivalEvent {\n  return typeof value === 'object' && value !== null &&\n    'id' in value && typeof value.id === 'string' &&\n    'artist' in value && typeof value.artist === 'string' &&\n    'space' in value && typeof value.space === 'string' &&\n    'time' in value && typeof value.time === 'string' &&\n    'status' in value && (value.status === 'CONFIRMED' || value.status === 'CANCELLED');\n}\n\nexport async function getEvents(): Promise<FestivalEvent[]> {\n  const value = await request('/events');\n  if (!Array.isArray(value) || !value.every(isFestivalEvent)) throw new Error('La API no devolvió una lista de actuaciones válida');\n  return value;\n}\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "App.tsx",
              "filename": "App.tsx",
              "path": "mobile/App.tsx",
              "responsibility": "Dibujar la pantalla y expresar sus estados de interacción.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "TSX y componentes",
                  "View organiza, Text muestra texto, ScrollView permite recorrer la pantalla y Pressable activa una acción. Las llaves insertan expresiones TypeScript en JSX."
                ],
                [
                  "useState",
                  "Cambiar estado provoca un nuevo render. No modifica el servidor."
                ],
                [
                  "useEffect + loadEvents",
                  "El efecto solicita datos al montar; el botón permite repetir la carga. try/catch/finally actualiza carga, error y resultado."
                ],
                [
                  "StyleSheet",
                  "La UI del producto es negra y rosa; el cuaderno mantiene azul, cian y blanco."
                ]
              ],
              "code": "import { useEffect, useState } from 'react';\nimport { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';\nimport { StatusBar } from 'expo-status-bar';\nimport type { FestivalEvent } from './src/types';\nimport { getEvents } from './src/api';\n\nexport default function App() {\n  const [events, setEvents] = useState<FestivalEvent[]>([]);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState('');\n  async function loadEvents() {\n    setLoading(true);\n    setError('');\n    try { setEvents(await getEvents()); }\n    catch (cause) { setError(cause instanceof Error ? cause.message : 'Error de red'); }\n    finally { setLoading(false); }\n  }\n  useEffect(() => { void loadEvents(); }, []);\n  return (\n    <View style={styles.page}>\n      <StatusBar style=\"light\" />\n      <ScrollView contentContainerStyle={styles.content}>\n        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>\n        <Text style={styles.title}>Programación</Text>\n        <Text style={styles.text}>Catálogo recibido por HTTP</Text>\n        {events.map(item => (\n          <View key={item.id} style={styles.card}>\n            <Text style={styles.tag}>{item.id} · {item.status}</Text>\n            <Text style={styles.artist}>{item.artist}</Text>\n            <Text style={styles.text}>{item.space} · {item.time}</Text>\n          </View>\n        ))}\n        <Pressable accessibilityRole=\"button\" disabled={loading} style={styles.button} onPress={() => void loadEvents()}>\n          <Text style={styles.buttonText}>{loading ? 'Cargando…' : 'GET recargar'}</Text>\n        </Pressable>\n        {error ? <Text accessibilityRole=\"alert\" style={styles.error}>{error}</Text> : null}\n      </ScrollView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  page: { flex: 1, backgroundColor: '#08090d' },\n  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },\n  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },\n  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },\n  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },\n  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },\n  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },\n  tag: { color: '#ff8fc0', fontWeight: '700' },\n  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },\n  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },\n  error: { color: '#ffb4b4', fontSize: 16 },\n  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }\n});\n",
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
              "id": "expo",
              "shortTitle": "Expo",
              "title": "Expo · navegador del aula",
              "learn": "React Native Web utiliza los componentes React Native en el navegador. Esta es la vía común del ejercicio, sin instalar Expo Go.",
              "text": "En una terminal exclusiva de mobile ejecuta npm run web. Acepta abrir el navegador o pulsa w. Conserva la URL que muestra Expo; si 8081 está ocupado, usa el puerto que proponga.",
              "code": "npm run typecheck\nnpm run web",
              "expected": "La pestaña muestra Festival Control, fondo negro y acentos rosas; no hay error de Metro.",
              "help": [
                [
                  "Cannot find module",
                  "Dentro de mobile ejecuta npm install con el package.json completo de 05."
                ],
                [
                  "Puerto ocupado",
                  "Acepta un puerto libre. El API_URL sigue apuntando al backend, no al puerto de Expo."
                ],
                [
                  "Expo Go / teléfono",
                  "La práctica principal usa navegador. El teléfono es opcional y exige versión compatible del SDK, URL LAN del PC y red permitida. No uses localhost en un teléfono para llegar al PC."
                ]
              ],
              "check": "Anota la URL del frontend por separado de la URL del backend."
            },
            {
              "id": "red",
              "shortTitle": "Comprueba Network",
              "title": "Comprueba Network",
              "learn": "Las tarjetas por sí solas no demuestran una llamada. La pestaña Network registra método, URL, estado y body.",
              "text": "Abre F12 → Network (Red), filtra events, recarga y selecciona la petición. Comprueba el panel Response.",
              "code": "GET http://localhost:3000/dev/events",
              "expected": "GET 200, respuesta con dos actuaciones y tarjetas que corresponden a esos datos.",
              "help": [
                [
                  "CORS",
                  "Revisa cors: true y el helper json del bloque 04, incluido en respuestas de error. No desactives la protección del navegador."
                ],
                [
                  "404",
                  "API_URL debe acabar en /dev, no en /events; confirma ruta y puerto con curl."
                ]
              ],
              "check": "Guarda una evidencia que relacione respuesta y tarjetas."
            },
            {
              "id": "fallo",
              "shortTitle": "Detén y recupera",
              "title": "Detén y recupera",
              "learn": "La recuperación forma parte del comportamiento esperado, no es un fallo a ocultar.",
              "text": "Detén sólo backend con Ctrl+C. Pulsa GET recargar. Después arranca backend otra vez y pulsa de nuevo.",
              "code": "Backend detenido → GET recargar\nBackend activo → GET recargar",
              "expected": "Aparece error de red al detener backend; con el servidor activo desaparece el error y reaparecen/actualizan las dos tarjetas.",
              "help": [
                [
                  "No hay error",
                  "Comprueba que has pulsado recargar y detenido la terminal correcta."
                ],
                [
                  "Error persistente",
                  "Prueba curl de nuevo y comprueba API_URL."
                ]
              ],
              "check": "Explica qué capa fallaba y cuál continuaba funcionando."
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
              "getEvents(): Promise<FestivalEvent[]>",
              "La función entrega datos comprobados; el componente no concatena URLs."
            ],
            [
              "setLoading(true) / finally",
              "La interfaz vuelve a estar disponible tanto al acertar como al fallar."
            ],
            [
              "setError(…)",
              "El alumno puede ver el error en pantalla y volver a intentar la operación."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "Si recibes HTTP 404, ¿fetch entra automáticamente en catch?",
          "answer": "No por el estado HTTP. Nuestro helper revisa response.ok y lanza Error; ese throw hace que el componente entre en catch."
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
          "title": "Distingue ruta incorrecta de servidor detenido",
          "steps": [
            "En api.ts cambia temporalmente /events por /ruta-inexistente dentro de getEvents.",
            "Con backend activo, pulsa recargar y observa Network: hay respuesta HTTP aunque sea 404.",
            "Restaura /events, guarda y comprueba GET 200."
          ],
          "expected": "Ruta errónea → respuesta HTTP de error\nRuta restaurada → GET 200 y dos tarjetas",
          "constraints": "No cambies los handlers ni CORS. Deja api.ts con /events antes de continuar."
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
          "question": "¿Dónde se configura el destino HTTP?",
          "options": [
            "En StyleSheet",
            "En API_URL de src/api.ts",
            "En un token AWS del cliente",
            "En cada Text"
          ],
          "correct": 1,
          "explanation": "La base se centraliza en api.ts. El frontend no necesita credenciales AWS para esta API pública de práctica."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué confirma que los datos vienen por HTTP?",
          "options": [
            "El color rosa",
            "Ver una tarjeta",
            "La petición GET y su respuesta en Network",
            "Que exista types.ts"
          ],
          "correct": 2,
          "explanation": "Network permite relacionar URL, método, estado y datos reales de la respuesta."
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
              "path": "evidencias/06/README.md",
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
              "code": "# Bloque 06\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/06 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add mobile/src/api.ts mobile/App.tsx evidencias/06/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 06\"\ngit push\ngit log -1 --oneline",
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
            "GET 200 aparece en Network y alimenta la lista.",
            "He probado fallo de red y recuperación sin ocultar el error.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 07: el cliente disparará las cuatro escrituras simuladas y mostrará sus respuestas."
        }
      ]
    }
  ]
};
