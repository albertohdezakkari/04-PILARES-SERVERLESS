window.lesson09 = {
  "id": "cloud",
  "navTitle": "09 · Cloud Launch",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 09 · APRENDIZAJE ASISTIDO",
    "title": "La misma pantalla consume el endpoint AWS",
    "description": "Cambia la URL base, comprueba los cinco métodos y demuestra que las peticiones llegan a las Lambdas cloud.",
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
      "description": "Cambia la URL base, comprueba los cinco métodos y demuestra que las peticiones llegan a las Lambdas cloud.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "La misma pantalla consume el endpoint AWS",
          "objective": "Usar Festival Control contra AWS con Offline detenido y observar las invocaciones reales.",
          "prior": "Interfaz de 07 y despliegue verificado de 08. Sesión del lab vigente y variables de región/servicio/rol preparadas.",
          "new": "Cambio de entorno, diagnóstico por capas y evidencia completa de cliente a Lambda.",
          "boundary": "Conservamos los datos fijos y las escrituras simuladas. El navegador del aula consume HTTPS; no recibe credenciales Academy.",
          "request": "React Native Web → HTTPS → API Gateway → Lambda",
          "response": "GET 200 · POST 201 · PUT/PATCH/DELETE 200\nRespuestas en pantalla + Network + logs cloud",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "URL base real",
              "Se obtiene con serverless info del servicio de ese alumno, región y stage. El texto TU_API es un marcador que debes sustituir antes de ejecutar."
            ],
            [
              "Contrato estable",
              "Los métodos, rutas y campos de 04–07 se conservan. La interfaz no tiene que conocer nombres internos de Lambda."
            ],
            [
              "Prueba por capas",
              "Primero curl/Thunder contra AWS, después navegador y finalmente logs. Así distingues endpoint, CORS, cliente y ejecución."
            ],
            [
              "Evidencia cloud",
              "Offline detenido y una invocación en CloudWatch permiten demostrar el destino real; dos tarjetas similares no bastan."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "Pressable / useEffect",
            "api.ts con HTTPS",
            "API Gateway",
            "Lambda desplegada",
            "JSON → pantalla + logs"
          ],
          "text": "El cambio de entorno se concentra en API_URL. Conservar el contrato evita reescribir App.tsx."
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
              "id": "sesion",
              "shortTitle": "Recupera sesión y endpoint",
              "title": "Recupera sesión y endpoint",
              "learn": "Las variables exportadas no están en una terminal nueva. Si vuelves otro día, repite perfil y variables de Prepara en 08 antes de usar Serverless.",
              "text": "Detén únicamente Offline. En backend consulta el servicio desplegado; copia la base real hasta /dev. Si cambiaste STUDENT_CODE, estarías consultando otro servicio.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/backend\naws sts get-caller-identity --profile academy\nnpx serverless info --stage dev --region \"$AWS_REGION\"",
              "expected": "STS válido y endpoint real del servicio de 08. El servidor local queda detenido.",
              "help": [
                [
                  "Framework solicita login",
                  "Autentica Serverless Framework como en 01. Es independiente de la sesión Academy."
                ],
                [
                  "AccessDenied / CREATE_FAILED",
                  "Lee el primer recurso y permiso denegado en CloudFormation → Events. Comunica al profesor recurso y acción, sin claves. No añadas permisos ni repitas despliegues a ciegas."
                ],
                [
                  "Token caducado",
                  "Renueva las tres credenciales de academy y comprueba STS de nuevo."
                ],
                [
                  "Variables env ausentes",
                  "Vuelve a Prepara y usa la misma terminal con AWS_REGION, STUDENT_CODE y LAMBDA_ROLE_ARN."
                ]
              ],
              "check": "No reutilices una URL de otro alumno ni el marcador del ejemplo."
            },
            {
              "id": "base",
              "shortTitle": "Verifica AWS antes de Expo",
              "title": "Verifica AWS antes de Expo",
              "learn": "El endpoint debe responder independientemente de React Native.",
              "text": "Introduce la URL obtenida y verifica el catálogo. Después repite GET con Thunder.",
              "code": "read -r -p \"URL base AWS real, hasta /dev: \" API_BASE\ncurl -i \"$API_BASE/events\"",
              "expected": "200 con dos actuaciones y cabecera Access-Control-Allow-Origin.",
              "help": [
                [
                  "Falla curl",
                  "Resuelve endpoint, deploy o lab antes de modificar el cliente."
                ],
                [
                  "No hay CORS",
                  "Revisa YAML y json del bloque 04, vuelve a desplegar y repite la prueba."
                ]
              ],
              "check": "Backend cloud comprobado. Sólo ahora cambia api.ts."
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
              "code": "import type { FestivalEvent, EventInput, EventStatus } from './types';\n\n// URL base sin /events al final. Sustituye sólo este valor en el bloque 09.\nexport const API_URL = 'https://TU_API.execute-api.TU_REGION.amazonaws.com/dev';\n\nasync function request(path: string, method = 'GET', body?: unknown): Promise<unknown> {\n  const response = await fetch(API_URL + path, {\n    method,\n    ...(body !== undefined ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})\n  });\n  const value: unknown = await response.json();\n  if (!response.ok) {\n    const message = typeof value === 'object' && value !== null && 'message' in value\n      ? String(value.message) : response.statusText;\n    throw new Error('HTTP ' + response.status + ': ' + message);\n  }\n  return value;\n}\n\nfunction isFestivalEvent(value: unknown): value is FestivalEvent {\n  return typeof value === 'object' && value !== null &&\n    'id' in value && typeof value.id === 'string' &&\n    'artist' in value && typeof value.artist === 'string' &&\n    'space' in value && typeof value.space === 'string' &&\n    'time' in value && typeof value.time === 'string' &&\n    'status' in value && (value.status === 'CONFIRMED' || value.status === 'CANCELLED');\n}\n\nexport async function getEvents(): Promise<FestivalEvent[]> {\n  const value = await request('/events');\n  if (!Array.isArray(value) || !value.every(isFestivalEvent)) throw new Error('La API no devolvió una lista de actuaciones válida');\n  return value;\n}\n\nexport const createEvent = (input: EventInput) => request('/events', 'POST', input);\nexport const replaceEvent = (id: string, input: EventInput) => request('/events/' + encodeURIComponent(id), 'PUT', input);\nexport const updateEvent = (id: string, status: EventStatus) => request('/events/' + encodeURIComponent(id), 'PATCH', { status });\nexport const deleteEvent = (id: string) => request('/events/' + encodeURIComponent(id), 'DELETE');\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            }
          ]
        },
        {
          "type": "note",
          "id": "url-real",
          "title": "STOP · sustituye el marcador antes de ejecutar",
          "text": "En API_URL pega la base HTTPS real obtenida de tu despliegue. No dejes TU_API o TU_REGION, no añadas /events ni pongas claves. Conserva App.tsx y types.ts completos de 07. La única diferencia del archivo respecto a 07 es el valor de API_URL."
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
              "id": "e2e",
              "shortTitle": "Comprueba los cinco métodos",
              "title": "Comprueba los cinco métodos",
              "learn": "Cada petición debe ir al dominio execute-api real. No basta con conservar una pestaña de una sesión anterior.",
              "text": "Con Offline detenido abre Network, recarga el navegador y prueba GET recargar y los cuatro botones. Selecciona las peticiones y revisa Request URL, Method, Payload, Status y Response.",
              "code": "GET /events → 200\nPOST /events → 201\nPUT /events/EVT-101 → 200\nPATCH /events/EVT-101 → 200\nDELETE /events/EVT-102 → 200",
              "expected": "Todas las URLs son HTTPS del endpoint de tu servicio. El resultado se muestra en pantalla; GET conserva dos eventos tras las escrituras.",
              "help": [
                [
                  "Sigue llamando a localhost",
                  "Guarda api.ts y recarga. Comprueba que ejecutas mobile del repositorio correcto."
                ],
                [
                  "CORS sólo en escrituras",
                  "Inspecciona OPTIONS, cors: true y Content-Type. Revisa errores del backend: también necesitan headers CORS."
                ],
                [
                  "Falla toda la API",
                  "Comprueba curl/Thunder de nuevo; el lab o endpoint pueden haber dejado de estar disponibles."
                ]
              ],
              "check": "Guarda una tabla de las cinco peticiones y sus resultados, sin capturar credenciales."
            },
            {
              "id": "traza",
              "shortTitle": "Prueba la ejecución cloud",
              "title": "Prueba la ejecución cloud",
              "learn": "La evidencia final conecta la acción con la Lambda desplegada.",
              "text": "En backend consulta logs de updateEvent, pulsa PATCH y vuelve a consultar. Repite listEvents después de recargar la lista. Usa la terminal con las variables de 08.",
              "code": "npx serverless logs -f updateEvent --stage dev --region \"$AWS_REGION\"\nnpx serverless logs -f listEvents --stage dev --region \"$AWS_REGION\"",
              "expected": "Logs muestran PATCH evento: EVT-101 y LIST eventos: GET coincidiendo con tus acciones.",
              "help": [
                [
                  "No aparece el log todavía",
                  "Espera unos segundos y consulta otra vez. Confirma función, servicio, región y stage."
                ],
                [
                  "AccessDenied de logs",
                  "Registra la restricción del lab para el profesor. No inventes trazas ni cambies políticas."
                ]
              ],
              "check": "Relaciona la hora aproximada, acción, petición y log; identifica expresamente la ausencia de persistencia."
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
              "API_URL = https://…/dev",
              "Centraliza la selección del destino sin cambiar los componentes."
            ],
            [
              "Network → Request URL",
              "Demuestra a qué origen se envió la petición del navegador."
            ],
            [
              "logs -f updateEvent",
              "Corrobora el destino con una ejecución cloud de la función que atiende PATCH."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "¿Necesita el navegador aws_access_key_id para llamar a esta API?",
          "answer": "No. La API de práctica es pública, sin autenticación. Las credenciales temporales se usan para administrar el despliegue desde el equipo y jamás se incorporan al cliente."
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
          "title": "Compara entornos sin reescribir la interfaz",
          "steps": [
            "Anota la URL local de 07 y la base cloud real de este bloque.",
            "Conserva una captura de GET y PATCH cloud en Network y sus logs.",
            "Explica qué línea cambiarías para volver a local y qué proceso tendrías que arrancar. Deja la configuración final apuntando a cloud."
          ],
          "expected": "Local: http://localhost:3000/dev + Offline activo\nCloud: endpoint HTTPS real + Lambdas desplegadas\nMismos métodos, rutas y campos",
          "constraints": "Conserva las funciones api.ts y App.tsx de 07. No añadas SDK AWS ni credenciales al cliente."
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
          "question": "¿Qué prueba completa la demostración cloud?",
          "options": [
            "Sólo ver las tarjetas",
            "Offline detenido, URL HTTPS real en Network e invocación en logs",
            "Cambiar el título",
            "Un comentario que diga AWS"
          ],
          "correct": 1,
          "explanation": "La evidencia combina origen de la petición y ejecución en Lambda, no sólo una interfaz visualmente parecida."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué has construido al terminar?",
          "options": [
            "Un sistema con persistencia",
            "Una interfaz sin HTTP",
            "Un recorrido full stack con contratos simulados, ejecutado en local y AWS",
            "Una base de datos en el cliente"
          ],
          "correct": 2,
          "explanation": "El recorrido cubre código, HTTP, interfaz y despliegue; almacenar cambios queda fuera del tour."
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
              "path": "evidencias/09/README.md",
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
              "code": "# Bloque 09\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/09 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add mobile/src/api.ts evidencias/09/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 09\"\ngit push\ngit log -1 --oneline",
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
            "Los cinco métodos apuntan al endpoint real y muestran los estados esperados.",
            "He relacionado las peticiones con logs cloud y conservado las evidencias.",
            "Comprendo el alcance de la simulación y puedo distinguir local de cloud.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Entrenamiento Venue Control: transfieres el aprendizaje a espacios del recinto, con requisitos y rúbrica, sin receta ni archivos solución."
        }
      ]
    }
  ]
};
