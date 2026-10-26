window.lesson07 = {
  "id": "rn-crud",
  "navTitle": "07 · React Native CRUD",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 07 · APRENDIZAJE ASISTIDO",
    "title": "Cada acción de interfaz tiene su método HTTP",
    "description": "Envía POST, PUT, PATCH y DELETE desde la misma pantalla y muestra la respuesta del servidor.",
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
      "description": "Envía POST, PUT, PATCH y DELETE desde la misma pantalla y muestra la respuesta del servidor.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "Cada acción de interfaz tiene su método HTTP",
          "objective": "Relacionar cuatro botones con método, ruta, body, estado y respuesta; conservar GET y sus errores.",
          "prior": "GET integrado en 06 y contrato fijo de 04, incluidos EVT-101 y EVT-102.",
          "new": "Helper compartido para escrituras, callbacks asíncronos y bloqueo durante envío.",
          "boundary": "No se cambia la lista de forma optimista: las escrituras no persisten. Mostramos el resultado real para no simular un guardado inexistente.",
          "request": "Botón PATCH → /events/EVT-101\n{\"status\":\"CANCELLED\"}",
          "response": "200 OK\n{\n  \"id\": \"EVT-101\",\n  \"changes\": {\n    \"status\": \"CANCELLED\"\n  },\n  \"operation\": \"UPDATED\"\n}\n",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "Una función por operación",
              "api.ts traduce la intención a método y ruta. App.tsx decide cuándo invocarla."
            ],
            [
              "Objeto completo o parcial",
              "createEvent/replaceEvent reciben EventInput; updateEvent recibe sólo status. El tipo ayuda a respetar el contrato."
            ],
            [
              "run y busy",
              "run prepara el estado, espera la operación y muestra JSON o error. busy deshabilita botones durante el envío."
            ],
            [
              "Resultado frente a catálogo",
              "Una respuesta UPDATED demuestra la simulación atendida; GET sigue devolviendo el catálogo original."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "Pressable.onPress",
            "run(label, task)",
            "api.ts + método HTTP",
            "Handler simulado",
            "Resultado visible + Network"
          ],
          "text": "Se conservan dos procesos y una única URL base. No añadimos AWS SDK al cliente ni credenciales."
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
              "id": "servidor",
              "shortTitle": "API de 04 activa",
              "title": "API de 04 activa",
              "learn": "Las escrituras necesitan los handlers y CORS del bloque CRUD.",
              "text": "Arranca backend y confirma GET /events en otra terminal. Usa los ids conocidos, no EVT-104.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/backend\nnpm start",
              "expected": "Rutas GET, POST, PUT, PATCH y DELETE anunciadas y GET con dos actuaciones.",
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
              "check": "Deja backend abierto; vuelve a la terminal de mobile."
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
                  "Codifica un id al construir una URL. POST/PUT envían objeto completo; PATCH sólo status."
                ]
              ],
              "code": "import type { FestivalEvent, EventInput, EventStatus } from './types';\n\n// URL base sin /events al final. Sustituye sólo este valor en el bloque 09.\nexport const API_URL = 'http://localhost:3000/dev';\n\nasync function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {\n  const response = await fetch(API_URL + path, {\n    method,\n    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})\n  });\n  const value: unknown = await response.json();\n  if (!response.ok) {\n    const message = typeof value === 'object' && value !== null && 'message' in value\n      ? String(value.message) : response.statusText;\n    throw new Error('HTTP ' + response.status + ': ' + message);\n  }\n  return value;\n}\n\nfunction isFestivalEvent(value: unknown): value is FestivalEvent {\n  return typeof value === 'object' && value !== null &&\n    'id' in value && typeof value.id === 'string' &&\n    'artist' in value && typeof value.artist === 'string' &&\n    'space' in value && typeof value.space === 'string' &&\n    'time' in value && typeof value.time === 'string' &&\n    'status' in value && (value.status === 'CONFIRMED' || value.status === 'CANCELLED');\n}\n\nexport async function getEvents(): Promise<FestivalEvent[]> {\n  const value = await request('/events');\n  if (!Array.isArray(value) || !value.every(isFestivalEvent)) throw new Error('La API no devolvió una lista de actuaciones válida');\n  return value;\n}\n\nexport const createEvent = (input: EventInput) => request('/events', 'POST', input);\nexport const replaceEvent = (id: string, input: EventInput) => request('/events/' + encodeURIComponent(id), 'PUT', input);\nexport const updateEvent = (id: string, status: EventStatus) => request('/events/' + encodeURIComponent(id), 'PATCH', { status });\nexport const deleteEvent = (id: string) => request('/events/' + encodeURIComponent(id), 'DELETE');\n",
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
              "code": "import { useEffect, useState } from 'react';\nimport { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';\nimport { StatusBar } from 'expo-status-bar';\nimport type { FestivalEvent } from './src/types';\nimport { getEvents, createEvent, replaceEvent, updateEvent, deleteEvent } from './src/api';\n\nexport default function App() {\n  const [events, setEvents] = useState<FestivalEvent[]>([]);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState('');\n  async function loadEvents() {\n    setLoading(true);\n    setError('');\n    try { setEvents(await getEvents()); }\n    catch (cause) { setError(cause instanceof Error ? cause.message : 'Error de red'); }\n    finally { setLoading(false); }\n  }\n  useEffect(() => { void loadEvents(); }, []);\n  const [busy, setBusy] = useState(false);\n  const [result, setResult] = useState('');\n  async function run(label: string, task: () => Promise<unknown>) {\n    setBusy(true); setError(''); setResult('');\n    try {\n      const response = await task();\n      setResult(label + '\\n' + JSON.stringify(response, null, 2));\n    } catch (cause) {\n      setError(cause instanceof Error ? cause.message : 'Error de red');\n    } finally { setBusy(false); }\n  }\n  const input = { artist: 'Nova Pulse', space: 'Main Stage', time: '21:00', status: 'CONFIRMED' as const };\n  const actions: [string, () => Promise<unknown>][] = [\n    ['POST crear', () => createEvent(input)],\n    ['PUT reemplazar EVT-101', () => replaceEvent('EVT-101', input)],\n    ['PATCH cancelar EVT-101', () => updateEvent('EVT-101', 'CANCELLED')],\n    ['DELETE EVT-102', () => deleteEvent('EVT-102')]\n  ];\n  return (\n    <View style={styles.page}>\n      <StatusBar style=\"light\" />\n      <ScrollView contentContainerStyle={styles.content}>\n        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>\n        <Text style={styles.title}>Programación</Text>\n        <Text style={styles.text}>Catálogo recibido por HTTP</Text>\n        {events.map(item => (\n          <View key={item.id} style={styles.card}>\n            <Text style={styles.tag}>{item.id} · {item.status}</Text>\n            <Text style={styles.artist}>{item.artist}</Text>\n            <Text style={styles.text}>{item.space} · {item.time}</Text>\n          </View>\n        ))}\n        <Pressable accessibilityRole=\"button\" disabled={loading || busy} style={styles.button} onPress={() => void loadEvents()}>\n          <Text style={styles.buttonText}>{loading ? 'Cargando…' : 'GET recargar'}</Text>\n        </Pressable>\n        {error ? <Text accessibilityRole=\"alert\" style={styles.error}>{error}</Text> : null}\n        <Text style={styles.text}>Escrituras simuladas: el resultado se muestra debajo; la lista conserva sus dos eventos.</Text>\n        {actions.map(([label, task]) => (\n          <Pressable key={label} accessibilityRole=\"button\" disabled={busy || loading} style={styles.button} onPress={() => void run(label, task)}>\n            <Text style={styles.buttonText}>{label}</Text>\n          </Pressable>\n        ))}\n        {busy ? <Text style={styles.text}>Enviando…</Text> : null}\n        <Text accessibilityLiveRegion=\"polite\" style={styles.result}>{result}</Text>\n      </ScrollView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  page: { flex: 1, backgroundColor: '#08090d' },\n  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },\n  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },\n  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },\n  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },\n  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },\n  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },\n  tag: { color: '#ff8fc0', fontWeight: '700' },\n  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },\n  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },\n  error: { color: '#ffb4b4', fontSize: 16 },\n  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }\n});\n",
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
              "id": "operaciones",
              "shortTitle": "Cuatro botones y cuatro evidencias",
              "title": "Cuatro botones y cuatro evidencias",
              "learn": "Cada clic produce una petición real. La respuesta se muestra debajo de los botones.",
              "text": "Abre Network. Pulsa uno a uno POST crear, PUT reemplazar EVT-101, PATCH cancelar EVT-101 y DELETE EVT-102. Espera el resultado entre clics.",
              "code": "POST /events → 201\nPUT /events/EVT-101 → 200 REPLACED\nPATCH /events/EVT-101 → 200 UPDATED\nDELETE /events/EVT-102 → 200 DELETED",
              "expected": "Métodos y cuerpos coinciden con los helpers. Cada resultado JSON aparece en pantalla; las tarjetas no desaparecen tras DELETE.",
              "help": [
                [
                  "400",
                  "Compara el body con el contrato; PUT necesita todos los campos y PATCH únicamente status válido."
                ],
                [
                  "404",
                  "Usa EVT-101 o EVT-102 y conserva /dev en API_URL."
                ],
                [
                  "Failed to fetch en escrituras",
                  "Comprueba OPTIONS y Content-Type en Network, cors: true y headers del helper json."
                ]
              ],
              "check": "Documenta método, ruta, body y estado de las cuatro operaciones."
            },
            {
              "id": "catalogo",
              "shortTitle": "Recarga después de escribir",
              "title": "Recarga después de escribir",
              "learn": "El botón GET permite comprobar el efecto real sobre consultas posteriores.",
              "text": "Después de PATCH y DELETE pulsa GET recargar y compara con el resultado anterior.",
              "code": "GET /events después de escrituras",
              "expected": "Continúan dos actuaciones, con status CONFIRMED. El mensaje UPDATED/DELETED no implica persistencia.",
              "help": [
                [
                  "Esperabas que desapareciera una tarjeta",
                  "Relee el alcance de 04. Este cliente refleja un contrato simulado y no altera datos locales para fingir un guardado."
                ]
              ],
              "check": "Explica con tus palabras qué parte sí has demostrado."
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
              "() => createEvent(input)",
              "Pasa una tarea pendiente a run; no dispara POST durante el render."
            ],
            [
              "headers + JSON.stringify",
              "El helper transforma el objeto en el texto JSON que espera el backend."
            ],
            [
              "disabled={busy || loading}",
              "Evita nuevas acciones mientras se espera una respuesta."
            ],
            [
              "setResult(JSON.stringify(…))",
              "Muestra el valor devuelto sin asumir que el catálogo cambió."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "¿Qué petición lleva el botón de cancelar: PUT o PATCH?",
          "answer": "PATCH, con un body que sólo contiene status. Un PUT parcial se rechazaría con 400."
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
          "title": "Cambia el estado solicitado",
          "steps": [
            "En la acción PATCH cambia CANCELLED por CONFIRMED.",
            "Guarda, pulsa PATCH y comprueba Request Payload, estado 200 y changes.status.",
            "Restaura CANCELLED al terminar para mantener el hito del cuaderno."
          ],
          "expected": "PATCH /events/EVT-101\n200 → changes.status CONFIRMED",
          "constraints": "Conserva id conocido, método PATCH y un único campo status. No modifiques el catálogo."
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
          "question": "¿Por qué pasamos una función a run?",
          "options": [
            "Para ejecutar durante cada render",
            "Para que la tarea empiece al pulsar y pueda esperarse con await",
            "Para evitar TypeScript",
            "Para modificar YAML"
          ],
          "correct": 1,
          "explanation": "El callback representa el trabajo pendiente. onPress llama a run y run ejecuta task."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué debería ocurrir tras DELETE en esta práctica?",
          "options": [
            "Desaparece definitivamente de GET",
            "Se borra de AWS DynamoDB",
            "Aparece DELETED y GET conserva los dos datos fijos",
            "Se elimina App.tsx"
          ],
          "correct": 2,
          "explanation": "El backend simula la respuesta. El cliente enseña ese resultado sin inventar persistencia."
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
              "path": "evidencias/07/README.md",
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
              "code": "# Bloque 07\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/07 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add mobile/src/api.ts mobile/App.tsx evidencias/07/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 07\"\ngit push\ngit log -1 --oneline",
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
            "Los cinco métodos están visibles y comprobados en Network.",
            "La pantalla muestra respuestas y errores, y bloquea botones mientras envía.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 08: desplegarás este mismo backend compilado en el laboratorio AWS autorizado."
        }
      ]
    }
  ]
};
