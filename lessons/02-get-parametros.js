window.lesson02 = {
  "id": "get",
  "navTitle": "02 · GET + parámetros",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 02 · APRENDIZAJE ASISTIDO",
    "title": "La URL lleva el identificador",
    "description": "Recibe un parámetro de ruta, sigue su valor en el handler TypeScript y contrástalo con la respuesta.",
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
      "description": "Recibe un parámetro de ruta, sigue su valor en el handler TypeScript y contrástalo con la respuesta.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "La URL lleva el identificador",
          "objective": "Consultar /events/EVT-104 y demostrar que el id de la URL llega a pathParameters.",
          "prior": "Bloque 01 terminado: backend TypeScript, compilación y GET /hello funcionando.",
          "new": "Ruta dinámica, parámetro opcional y diferencias entre configuración y URL real.",
          "boundary": "La ficha es simulada. En este bloque cualquier id no vacío se devuelve con los mismos datos; todavía no se busca en un catálogo.",
          "request": "GET http://localhost:3000/dev/events/EVT-104",
          "response": "{\n  \"id\": \"EVT-104\",\n  \"artist\": \"Neon Waves\",\n  \"space\": \"Main Stage\",\n  \"time\": \"22:30\",\n  \"status\": \"CONFIRMED\"\n}\n",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "GET",
              "Pide información. El dato identificador viaja en la URL."
            ],
            [
              "/events/{id}",
              "Las llaves se escriben en YAML. En el cliente se sustituyen por un valor: /events/EVT-104."
            ],
            [
              "event.pathParameters?.id",
              "Optional chaining contempla que el evento no traiga parámetros. El tipo resultante es string | undefined."
            ],
            [
              "400 y 200",
              "400 expresa una entrada insuficiente; 200 confirma la respuesta correcta. El tipo HTTP es numérico."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "Cliente",
            "GET /events/EVT-104",
            "{ id: \"EVT-104\" }",
            "getEvent.handler",
            "200 + JSON"
          ],
          "text": "Offline interpreta el YAML y construye event. El console.log muestra el id, no demuestra que exista una base de datos."
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
              "text": "Abre Git Bash en VS Code. Comprueba que GET /hello funciona con el hito 01. Detén Offline con Ctrl+C antes de editar su configuración.",
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
          "type": "code",
          "id": "mapa-archivos",
          "label": "MIRA EL MAPA · ANTES DE CONSTRUIR",
          "title": "Proyecto acumulado al finalizar este bloque",
          "filename": "Workspace del alumno",
          "text": "El árbol es una referencia. Crea cada archivo por separado en las pestañas de Construye; las llaves del esquema agrupan nombres, no forman parte del nombre real. Conserva el resto del trabajo del bloque anterior.",
          "code": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── package.json + package-lock.json\n    ├── tsconfig.json\n    ├── serverless.yml\n    ├── src/hello.ts\n    ├── src/getEvent.ts\n    └── dist/ (generado por npm run build)\n"
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
              "title": "getEvent.ts",
              "filename": "getEvent.ts",
              "path": "backend/src/getEvent.ts",
              "responsibility": "Leer el id y construir una respuesta HTTP tipada.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "APIGatewayProxyEvent",
                  "Tipo de la entrada REST; la importación type desaparece al compilar."
                ],
                [
                  "if (!id)",
                  "Corta la ejecución si no llega identificador; evita devolver undefined."
                ],
                [
                  "JSON.stringify",
                  "Convierte el objeto TypeScript en el texto exigido por body."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  const id = event.pathParameters?.id;\n  console.log('GET evento:', id);\n  if (!id) return { statusCode: 400, body: JSON.stringify({ message: 'Falta id' }) };\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ id, artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' })\n  };\n};\n",
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
              "code": "service: festival-control-api\nframeworkVersion: ~4.45.0\n\nprovider:\n  name: aws\n  runtime: nodejs22.x\n\nplugins:\n  - serverless-offline\n\nfunctions:\n  hello:\n    handler: dist/hello.handler\n    events:\n      - http:\n          path: hello\n          method: get\n          cors: true\n\n  getEvent:\n    handler: dist/getEvent.handler\n    events:\n      - http:\n          path: events/{id}\n          method: get\n          cors: true\n",
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
              "id": "primer-id",
              "shortTitle": "Primer id",
              "title": "Primer id",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i http://localhost:3000/dev/events/EVT-104",
              "expected": "200 y body con id EVT-104. En backend aparece GET evento: EVT-104.",
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
              "id": "segundo-id",
              "shortTitle": "Otro cliente e id",
              "title": "Otro cliente e id",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i http://localhost:3000/dev/events/EVT-205",
              "expected": "200 con id EVT-205, sin editar TypeScript. Repite GET desde Thunder Client con el mismo valor.",
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
              "path: events/{id}",
              "La configuración acepta un segmento variable."
            ],
            [
              "event.pathParameters?.id",
              "El valor de ese segmento llega como string."
            ],
            [
              "id dentro del body",
              "La respuesta refleja el dato recibido; los otros campos siguen siendo literales."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "¿Qué pasa si solicitas EVT-999 sin tocar el código?",
          "answer": "Recibirás id EVT-999 y la misma ficha simulada. El bloque 04 introducirá una búsqueda en dos eventos conocidos y su 404."
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
          "title": "Sigue un tercer identificador",
          "steps": [
            "Solicita /events/EVT-330 con curl y Thunder.",
            "Predice id antes de pulsar Send.",
            "Contrasta el JSON y el log; no modifiques la función para cada id."
          ],
          "expected": "200 OK\n{\"id\":\"EVT-330\",\"artist\":\"Neon Waves\",\"space\":\"Main Stage\",\"time\":\"22:30\",\"status\":\"CONFIRMED\"}",
          "constraints": "Conserva la ruta dinámica, hello y la fuente .ts. No conviertas el identificador en un literal."
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
          "question": "¿Dónde llega EVT-104?",
          "options": [
            "En event.body",
            "En event.pathParameters.id",
            "En package.json",
            "En el nombre del archivo"
          ],
          "correct": 1,
          "explanation": "La ruta events/{id} convierte el segmento recibido en pathParameters.id."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué demuestra la ficha devuelta?",
          "options": [
            "Que hay una base de datos",
            "Que se ha guardado un evento",
            "Que el handler recibió el id y creó una respuesta simulada",
            "Que se desplegó en AWS"
          ],
          "correct": 2,
          "explanation": "La función usa literales para los datos y refleja el id. Aún no hay catálogo ni persistencia."
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
              "path": "evidencias/02/README.md",
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
              "code": "# Bloque 02\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/02 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add backend/src/getEvent.ts backend/serverless.yml evidencias/02/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 02\"\ngit push\ngit log -1 --oneline",
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
            "Dos ids diferentes han llegado al mismo handler.",
            "GET /hello sigue respondiendo y comprendo la simulación.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 03: el cliente enviará un objeto en el body mediante POST."
        }
      ]
    }
  ]
};
