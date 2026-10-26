window.lesson08 = {
  "id": "aws",
  "navTitle": "08 · Deploy AWS",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 08 · APRENDIZAJE ASISTIDO",
    "title": "Del backend local al laboratorio AWS",
    "description": "Comprueba sesión, región y rol; despliega el backend y contrasta una invocación cloud con sus logs.",
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
      "description": "Comprueba sesión, región y rol; despliega el backend y contrasta una invocación cloud con sus logs.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "Del backend local al laboratorio AWS",
          "objective": "Obtener un endpoint API Gateway del laboratorio y verificar una Lambda del mismo servicio TypeScript.",
          "prior": "Backend completo de 04, interfaz local de 07, AWS CLI v2 instalada y cuenta Framework validada en 01.",
          "new": "Credenciales temporales, perfil academy, rol Lambda, CloudFormation y trazabilidad cloud.",
          "boundary": "Requiere laboratorio activo y permisos autorizados por el centro. No crea una cuenta personal, no añade almacenamiento y no elimina recursos ajenos.",
          "request": "GET https://<api-real>.execute-api.<region>.amazonaws.com/dev/events",
          "response": "200 OK → las dos actuaciones del catálogo\nCloudWatch → LIST eventos: GET",
          "caption": "Resultado esperado que contrastarás con tu ejecución."
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "Sesión Academy",
              "Start Lab habilita recursos y credenciales temporales de esa sesión. Vuelve a comprobarla cada jornada."
            ],
            [
              "Perfil academy",
              "Se guarda fuera del repositorio, en ~/.aws/credentials. Incluye access key, secret key y session token."
            ],
            [
              "Identidad y rol Lambda",
              "STS comprueba quién despliega. El rol de ejecución es otra identidad, usada por Lambda. Copiar el Arn de STS en provider.iam.role es incorrecto."
            ],
            [
              "CloudFormation y permisos",
              "Serverless prepara recursos y CloudFormation aplica la plantilla. El lab debe permitir desplegarlos y pasar el rol existente; no todos los cursos Academy tienen los mismos permisos."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "tsc → dist",
            "Framework + perfil academy",
            "CloudFormation",
            "API Gateway → Lambda",
            "JSON + CloudWatch"
          ],
          "text": "Las fuentes y los contratos son los mismos que en local. La infraestructura y el lugar de ejecución cambian."
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
              "id": "lab",
              "shortTitle": "Inicia el laboratorio",
              "title": "Inicia el laboratorio",
              "learn": "Las credenciales de una sesión anterior pueden haber caducado aunque estén guardadas.",
              "text": "Abre AWS Academy → curso → Learner Lab / Learning Lab → Start Lab. Espera el indicador activo. Abre AWS Details y la consola AWS; localiza los datos AWS CLI de la sesión. No compartas ni captures las claves.",
              "code": "aws --version",
              "expected": "Laboratorio activo, consola abierta y AWS CLI v2 disponible en Git Bash.",
              "help": [
                [
                  "Start Lab no se habilita",
                  "Pide al profesor revisar matrícula, disponibilidad y presupuesto del laboratorio."
                ],
                [
                  "No hay credenciales CLI",
                  "Consulta las instrucciones del lab; no uses claves de otra persona ni de una cuenta personal."
                ]
              ],
              "check": "No avances hasta disponer de la sesión y sus datos temporales."
            },
            {
              "id": "perfil",
              "shortTitle": "Guarda el perfil academy",
              "title": "Guarda el perfil academy",
              "learn": "AWS lee el archivo del usuario. No pertenece a backend ni al repositorio.",
              "text": "En Git Bash ejecuta los comandos inferiores. En el archivo abierto conserva los otros perfiles. Añade o actualiza una única sección [academy] con los tres valores reales de AWS Details: aws_access_key_id, aws_secret_access_key y aws_session_token. Si te dieron [default], copia sus tres líneas bajo [academy]; no dupliques secciones. Guarda y cierra el archivo.",
              "code": "mkdir -p ~/.aws\ncode ~/.aws/credentials",
              "expected": "Existe [academy] con las tres credenciales actuales. Ruta Windows: carpeta de tu usuario → .aws → credentials, sin extensión .txt.",
              "help": [
                [
                  "No encuentra el perfil",
                  "Comprueba el nombre [academy], archivo credentials sin extensión y guardado."
                ],
                [
                  "Hay variables de credenciales anteriores",
                  "En esta terminal ejecuta unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_SECURITY_TOKEN antes de elegir academy; evita que claves antiguas sustituyan al perfil."
                ],
                [
                  "Token inválido",
                  "Copia de nuevo los tres valores de la misma sesión, sin comillas añadidas ni espacios dentro de las claves."
                ]
              ],
              "check": "El archivo permanece fuera de Git. No imprimas ni pegues su contenido en la entrega."
            },
            {
              "id": "variables",
              "shortTitle": "Región, servicio y rol",
              "title": "Región, servicio y rol",
              "learn": "Una variable de shell pertenece a esta terminal. Serverless necesita región, identificador y rol al resolver el YAML.",
              "text": "Con el laboratorio iniciado, localiza la región autorizada y el ARN del rol de ejecución Lambda en las instrucciones del lab o en IAM → Roles → rol autorizado (frecuentemente LabRole) → ARN. Si no puedes verlo, el profesor debe facilitar el ARN de tu cuenta. No inventes un ARN ni crees políticas. Introduce valores reales cuando cada pregunta te lo pida. Conserva esta terminal para todos los comandos Serverless de 08 y 09.",
              "code": "export AWS_PROFILE=academy\nread -r -p \"Región autorizada del lab: \" AWS_REGION\nexport AWS_REGION\nexport AWS_DEFAULT_REGION=\"$AWS_REGION\"\nread -r -p \"Código de alumno (ej. alumno01): \" STUDENT_CODE\nexport STUDENT_CODE\nread -r -p \"ARN del rol Lambda autorizado: \" LAMBDA_ROLE_ARN\nexport LAMBDA_ROLE_ARN\naws configure set region \"$AWS_REGION\" --profile academy\naws sts get-caller-identity --profile academy",
              "expected": "STS devuelve Account, UserId y Arn de la identidad temporal. Ese Arn de STS NO es el ARN del rol de ejecución Lambda. El profesor confirma que el rol elegido puede ser asumido por Lambda.",
              "help": [
                [
                  "ExpiredToken / InvalidClientTokenId",
                  "Renueva las tres credenciales desde la sesión actual, guarda y repite STS."
                ],
                [
                  "AccessDenied de IAM",
                  "El rol y los permisos del lab los determina el centro. El profesor debe confirmar ARN, iam:PassRole y permisos de CloudFormation/S3/Lambda/API Gateway antes de desplegar."
                ],
                [
                  "Abrí otra terminal",
                  "Vuelve a introducir estas variables allí. El archivo credentials conserva el perfil, pero las variables exportadas no pasan a terminales ya abiertas."
                ]
              ],
              "check": "Comprueba cuenta, región y rol autorizado. Si faltan permisos del lab, registra el bloqueo antes de intentar el deploy."
            },
            {
              "id": "punto-partida",
              "shortTitle": "Carpeta y bloque anterior",
              "title": "Carpeta y bloque anterior",
              "learn": "El backend sigue usando package.json, tsconfig.json, hello.ts y las dependencias fijadas en 01. No se crea un servicio nuevo.",
              "text": "Abre Git Bash en VS Code. No ejecutes npm start ahora: los comandos siguientes preparan AWS. La comprobación local de 04 debe estar superada. Detén Offline con Ctrl+C antes de editar su configuración.",
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
              "title": "serverless.yml",
              "filename": "serverless.yml",
              "path": "backend/serverless.yml",
              "responsibility": "Desplegar el mismo código compilado con región y rol existentes del laboratorio.",
              "instruction": "Conserva las siete funciones y sustituye el archivo completo. Los valores env se preparan en Prepara y se repiten al volver otro día.",
              "learn": [
                [
                  "service + STUDENT_CODE",
                  "Añade tu código de alumno para distinguir servicios si se comparte cuenta AWS. Debe contener sólo minúsculas, números y guiones, y ser breve."
                ],
                [
                  "${env:AWS_REGION}",
                  "Lee una variable de esta terminal. La región debe coincidir con la autorizada en el laboratorio."
                ],
                [
                  "provider.iam.role",
                  "Usa el ARN del rol Lambda autorizado por el laboratorio; así no pedimos crear un rol IAM nuevo."
                ],
                [
                  "dist/events/…",
                  "Se despliega el JavaScript que produce tsc; los fuentes de trabajo siguen siendo TypeScript."
                ]
              ],
              "code": "service: festival-control-api-${env:STUDENT_CODE}\nframeworkVersion: ~4.45.0\n\nprovider:\n  name: aws\n  runtime: nodejs22.x\n  region: ${env:AWS_REGION}\n  stage: dev\n  iam:\n    role: ${env:LAMBDA_ROLE_ARN}\n\nplugins:\n  - serverless-offline\n\nfunctions:\n  hello:\n    handler: dist/hello.handler\n    events:\n      - http:\n          path: hello\n          method: get\n          cors: true\n\n  getEvent:\n    handler: dist/events/get.handler\n    events:\n      - http:\n          path: events/{id}\n          method: get\n          cors: true\n\n  createEvent:\n    handler: dist/events/create.handler\n    events:\n      - http:\n          path: events\n          method: post\n          cors: true\n\n  listEvents:\n    handler: dist/events/list.handler\n    events:\n      - http:\n          path: events\n          method: get\n          cors: true\n\n  replaceEvent:\n    handler: dist/events/replace.handler\n    events:\n      - http:\n          path: events/{id}\n          method: put\n          cors: true\n\n  updateEvent:\n    handler: dist/events/update.handler\n    events:\n      - http:\n          path: events/{id}\n          method: patch\n          cors: true\n\n  deleteEvent:\n    handler: dist/events/delete.handler\n    events:\n      - http:\n          path: events/{id}\n          method: delete\n          cors: true\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            }
          ]
        },
        {
          "type": "note",
          "id": "fuente-ts",
          "title": "Conserva los handlers TypeScript",
          "text": "Este bloque cambia configuración de infraestructura, no el lenguaje ni el contrato. Conserva íntegros backend/src/hello.ts y backend/src/events/*.ts del bloque 04. npm run build genera dist antes de empaquetar; no se editan archivos .js."
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
              "id": "paquete",
              "shortTitle": "Compila y empaqueta",
              "title": "Compila y empaqueta",
              "learn": "El paquete debe incluir dist/events/*.js y referenciar las rutas de ejecución. Las dependencias de desarrollo no son el código de tus handlers.",
              "text": "Dentro de backend y en la terminal preparada, comprueba tipos, compila y prepara el paquete. No continúes si falta una variable o el paquete falla.",
              "code": "npm run typecheck\nnpm run build\nnpx serverless package --stage dev --region \"$AWS_REGION\"",
              "expected": "Se crea .serverless con el paquete y la plantilla de CloudFormation. Al abrir el ZIP puedes localizar dist/events/list.js y los demás handlers; el rol de la plantilla coincide con el autorizado.",
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
              "check": "Comprueba el paquete antes del despliegue. Esta operación no equivale a una invocación real en AWS."
            },
            {
              "id": "deploy",
              "shortTitle": "Despliega el servicio",
              "title": "Despliega el servicio",
              "learn": "deploy crea o actualiza únicamente el servicio de este proyecto en la cuenta y región seleccionadas.",
              "text": "Con el profesor habiendo confirmado permisos del lab, ejecuta en esa misma terminal:",
              "code": "npx serverless deploy --stage dev --region \"$AWS_REGION\"\nnpx serverless info --stage dev --region \"$AWS_REGION\"",
              "expected": "Deploy finaliza correctamente y muestra URLs HTTPS reales para las siete funciones. Copia la base hasta /dev, sin añadir /events.",
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
              "check": "Anota servicio, región, stage y URL base, sin secretos. Si hay un bloqueo de permisos, documenta el evento exacto y resuélvelo con el profesor antes de seguir."
            },
            {
              "id": "invoca",
              "shortTitle": "Invoca y observa",
              "title": "Invoca y observa",
              "learn": "Una URL publicada debe responder y producir evidencia de ejecución.",
              "text": "En Git Bash pide la base real al alumno con read. Después ejecuta curl. En Thunder utiliza esa misma URL con /events.",
              "code": "read -r -p \"URL base real, hasta /dev: \" API_BASE\ncurl -i \"$API_BASE/events\"\nnpx serverless logs -f listEvents --stage dev --region \"$AWS_REGION\"",
              "expected": "HTTP 200 y dos eventos; en logs aparece LIST eventos: GET.",
              "help": [
                [
                  "403 Missing Authentication Token",
                  "Revisa dominio, región, stage, método y ruta. No es automáticamente un problema del token Academy."
                ],
                [
                  "502 o error Lambda",
                  "Abre logs de listEvents; revisa handler dist/events/list.handler, compilación incluida y permisos del rol."
                ],
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
              "check": "Relaciona cliente → endpoint → Lambda. No basta con que deploy termine sin error."
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
              "AWS_PROFILE=academy",
              "El Framework obtiene credenciales del perfil temporal del usuario."
            ],
            [
              "provider.iam.role",
              "Es el rol existente que asumirá Lambda; no se sustituye por el usuario de STS."
            ],
            [
              "serverless package → deploy → info",
              "Preparar, aplicar y consultar son operaciones distintas."
            ],
            [
              "serverless logs -f listEvents",
              "Observa la ejecución cloud de la función nombrada en el YAML."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "Si STS funciona, ¿está garantizado que el despliegue también funcione?",
          "answer": "No. STS acredita una identidad válida; CloudFormation, S3, Lambda, API Gateway e iam:PassRole requieren permisos adicionales del laboratorio."
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
          "title": "Relaciona un parámetro con la Lambda cloud",
          "steps": [
            "Con el endpoint real pide /events/EVT-101 y después /events/NO-EXISTE.",
            "Comprueba 200 y 404 respectivamente.",
            "Consulta npx serverless logs -f getEvent --stage dev --region \"$AWS_REGION\" y localiza ambos ids."
          ],
          "expected": "EVT-101 → 200\nNO-EXISTE → 404\nLogs cloud → GET evento: id solicitado",
          "constraints": "Conserva cuenta, región, stage y rol. No cambies políticas IAM ni el catálogo para forzar una respuesta."
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
          "question": "¿Cuál es el rol de provider.iam.role?",
          "options": [
            "El Arn del usuario de STS",
            "El rol autorizado que asume Lambda",
            "La cuenta de GitHub",
            "Un token del frontend"
          ],
          "correct": 1,
          "explanation": "El usuario despliega; el rol de ejecución permite actuar a Lambda. Son identidades distintas."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿Qué debes renovar al caducar Academy?",
          "options": [
            "Sólo API_URL",
            "Sólo access key",
            "Las tres credenciales temporales de la sesión",
            "App.tsx completo"
          ],
          "correct": 2,
          "explanation": "Access key, secret key y session token deben pertenecer a la misma sesión actual."
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
              "path": "evidencias/08/README.md",
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
              "code": "# Bloque 08\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/08 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add backend/serverless.yml evidencias/08/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 08\"\ngit push\ngit log -1 --oneline",
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
            "STS identifica la cuenta correcta y el profesor ha confirmado rol y permisos.",
            "He obtenido GET 200 desde el endpoint real y su log cloud.",
            "He registrado servicio, región, stage y endpoint sin credenciales.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 09: conectarás el mismo cliente al endpoint HTTPS y comprobarás los cinco métodos en AWS."
        }
      ]
    }
  ]
};
