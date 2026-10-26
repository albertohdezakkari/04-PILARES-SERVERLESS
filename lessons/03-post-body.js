window.lesson03 = {
  "id": "post",
  "navTitle": "03 · POST + body",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 03 · APRENDIZAJE ASISTIDO",
    "title": "El cliente envía un objeto JSON",
    "description": "Lee, valida y responde a un POST sin perder el backend que ya funciona.",
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
      "description": "Lee, valida y responde a un POST sin perder el backend que ya funciona.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "El cliente envía un objeto JSON",
          "objective": "Enviar una actuación y obtener 201 con EVT-NEW; rechazar JSON o campos inválidos con 400.",
          "prior": "Bloques 01 y 02; TypeScript, rutas HTTP y JSON.stringify ya utilizados.",
          "new": "Body como texto, JSON.parse, unknown y validación del dato externo.",
          "boundary": "201 es una respuesta didáctica de creación. El id EVT-NEW es fijo y no se guarda nada; GET todavía no recupera este envío.",
          "request": "POST http://localhost:3000/dev/events\nContent-Type: application/json\n\n{\n  \"artist\": \"Nova Pulse\",\n  \"space\": \"Main Stage\",\n  \"time\": \"21:00\",\n  \"status\": \"CONFIRMED\"\n}\n",
          "response": "201 Created\n{\n  \"id\": \"EVT-NEW\",\n  \"artist\": \"Nova Pulse\",\n  \"space\": \"Main Stage\",\n  \"time\": \"21:00\",\n  \"status\": \"CONFIRMED\"\n}\n",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "POST",
              "Envía un objeto en body. Content-Type anuncia que ese texto tiene formato JSON."
            ],
            [
              "JSON.parse y try/catch",
              "Parse convierte texto en un valor. Un JSON roto lanza una excepción que transformamos en 400."
            ],
            [
              "unknown y comprobaciones",
              "El cliente puede enviar null, un array o campos de otro tipo. Comprobamos forma y propiedades antes de leerlas como strings."
            ],
            [
              "Validación de dominio",
              "artist y space no pueden estar vacíos; time usa HH:mm de 00:00 a 23:59; status admite CONFIRMED o CANCELLED."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "Cliente + JSON",
            "POST /events",
            "event.body (texto)",
            "parse + validación",
            "201 o 400"
          ],
          "text": "TypeScript comprueba tu código. La validación comprueba el valor que envía el cliente durante la ejecución; ambas son necesarias."
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
              "text": "Abre Git Bash en VS Code. Recupera GET /hello y GET /events/EVT-104. Detén Offline con Ctrl+C antes de editar su configuración.",
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
          "code": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── package.json + package-lock.json\n    ├── tsconfig.json\n    ├── serverless.yml\n    ├── src/hello.ts\n    ├── src/getEvent.ts\n    ├── src/createEvent.ts\n    └── dist/ (generado por npm run build)\n"
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
              "title": "createEvent.ts",
              "filename": "createEvent.ts",
              "path": "backend/src/createEvent.ts",
              "responsibility": "Validar datos externos y devolver 201 o un error 400 comprensible.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "event.body ?? 'null'",
                  "La entrada puede no tener body. El valor null se rechazará por forma."
                ],
                [
                  "typeof / in / trim",
                  "Acotan unknown antes de usar propiedades; trim detecta textos compuestos sólo por espacios."
                ],
                [
                  "Expresión HH:mm",
                  "La expresión regular limita hora y minutos. No valida fecha ni zona horaria."
                ],
                [
                  "status",
                  "Si se omite, usa CONFIRMED; un valor desconocido se rechaza."
                ]
              ],
              "code": "import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';\n\nexport const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {\n  let body: unknown;\n  try {\n    body = JSON.parse(event.body ?? 'null');\n  } catch {\n    return { statusCode: 400, body: JSON.stringify({ message: 'JSON inválido' }) };\n  }\n  if (typeof body !== 'object' || body === null || Array.isArray(body)) {\n    return { statusCode: 400, body: JSON.stringify({ message: 'Se espera un objeto JSON' }) };\n  }\n  if (!('artist' in body) || typeof body.artist !== 'string' || !body.artist.trim() ||\n      !('space' in body) || typeof body.space !== 'string' || !body.space.trim() ||\n      !('time' in body) || typeof body.time !== 'string' || !/^([01]\\d|2[0-3]):[0-5]\\d$/.test(body.time)) {\n    return { statusCode: 400, body: JSON.stringify({ message: 'artist, space y time (HH:mm) son obligatorios' }) };\n  }\n  const status = 'status' in body ? body.status : 'CONFIRMED';\n  if (status !== 'CONFIRMED' && status !== 'CANCELLED') {\n    return { statusCode: 400, body: JSON.stringify({ message: 'status debe ser CONFIRMED o CANCELLED' }) };\n  }\n  console.log('POST evento:', body.artist);\n  return {\n    statusCode: 201,\n    body: JSON.stringify({ id: 'EVT-NEW', artist: body.artist.trim(), space: body.space.trim(), time: body.time, status })\n  };\n};\n",
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
              "code": "service: festival-control-api\nframeworkVersion: ~4.45.0\n\nprovider:\n  name: aws\n  runtime: nodejs22.x\n\nplugins:\n  - serverless-offline\n\nfunctions:\n  hello:\n    handler: dist/hello.handler\n    events:\n      - http:\n          path: hello\n          method: get\n          cors: true\n\n  getEvent:\n    handler: dist/getEvent.handler\n    events:\n      - http:\n          path: events/{id}\n          method: get\n          cors: true\n\n  createEvent:\n    handler: dist/createEvent.handler\n    events:\n      - http:\n          path: events\n          method: post\n          cors: true\n",
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
              "id": "post-valido",
              "shortTitle": "POST válido",
              "title": "POST válido",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{\"artist\":\"Nova Pulse\",\"space\":\"Main Stage\",\"time\":\"21:00\",\"status\":\"CONFIRMED\"}'",
              "expected": "201 con EVT-NEW y los campos enviados. En Thunder: método POST, Body → JSON, misma URL y objeto.",
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
              "id": "campos",
              "shortTitle": "Campo ausente",
              "title": "Campo ausente",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{\"artist\":\"Nova Pulse\"}'",
              "expected": "400 con mensaje sobre artist, space y time. No se acepta una actuación incompleta.",
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
              "id": "json-roto",
              "shortTitle": "JSON roto",
              "title": "JSON roto",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i -X POST http://localhost:3000/dev/events -H 'Content-Type: application/json' -d '{'",
              "expected": "400 con message JSON inválido. El servidor continúa activo.",
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
              "id": "no-guarda",
              "shortTitle": "Comprueba el límite",
              "title": "Comprueba el límite",
              "learn": "curl -i permite contrastar el estado HTTP con el cuerpo JSON. El cliente y el handler son piezas diferentes.",
              "text": "En una segunda terminal Git Bash, con el servidor activo, ejecuta:",
              "code": "curl -i http://localhost:3000/dev/events/EVT-NEW",
              "expected": "200 con ficha fija Neon Waves. No recupera Nova Pulse: el GET del bloque 02 no lee lo que envías por POST.",
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
              "unknown",
              "No se confía en el tipo del body por haberlo enviado desde nuestro cliente."
            ],
            [
              "try/catch",
              "La sintaxis JSON se valida antes de acceder a propiedades."
            ],
            [
              "statusCode: 201",
              "Expresa el resultado del contrato simulado; no añade persistencia."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "¿Un body con time: \"29:80\" devolverá 201?",
          "answer": "No. La comprobación HH:mm lo rechaza con 400, aunque los tipos de TypeScript sean strings."
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
          "title": "Valida un valor de dominio",
          "steps": [
            "Repite el POST válido con status CANCELLED.",
            "Después envía status PAUSED y time 29:80 en peticiones separadas.",
            "Contrasta los dos 400 con el 201 anterior y restaura un body válido."
          ],
          "expected": "status CANCELLED → 201\nstatus PAUSED → 400\ntime 29:80 → 400",
          "constraints": "Conserva los nombres de campos, EVT-NEW y la validación. No añadas almacenamiento."
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
          "question": "¿Por qué el body se trata como unknown?",
          "options": [
            "Porque TypeScript no admite JSON",
            "Porque la red puede traer cualquier valor y hay que comprobarlo",
            "Porque toda propiedad es opcional",
            "Porque evita compilar"
          ],
          "correct": 1,
          "explanation": "El tipo estático no valida la entrada externa. El handler debe comprobarla durante la ejecución."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Dónde se conserva el POST?",
          "options": [
            "En un array permanente",
            "En AWS",
            "En ningún almacenamiento de este ejercicio",
            "En serverless.yml"
          ],
          "correct": 2,
          "explanation": "La función sólo construye y devuelve el JSON. Un envío posterior no modifica GET."
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
              "path": "evidencias/03/README.md",
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
              "code": "# Bloque 03\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/03 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add backend/src/createEvent.ts backend/serverless.yml evidencias/03/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 03\"\ngit push\ngit log -1 --oneline",
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
            "POST válido devuelve 201; JSON roto y campos inválidos devuelven 400.",
            "He contrastado por separado sintaxis, tipos de entrada y reglas de dominio.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 04: organizarás los handlers y completarás los métodos HTTP sobre un catálogo fijo."
        }
      ]
    }
  ]
};
