window.lesson01 = {
  "id": "primer-serverless",
  "navTitle": "01 · Primer Serverless",
  "revision": 2,
  "hero": {
    "eyebrow": "BLOQUE 01 · BACKEND LOCAL · APRENDIZAJE ASISTIDO",
    "title": "Tu primera función Serverless",
    "description": "Construye una función, invócala por HTTP y demuestra el recorrido de la petición.",
    "chips": [
      "Node 22",
      "Serverless Framework",
      "HTTP",
      "Sin despliegue AWS"
    ]
  },
  "phases": [
    {
      "id": "destino",
      "navTitle": "Destino",
      "title": "Mira qué vas a conseguir",
      "description": "Primero reconoce el resultado. Después construiremos las piezas que lo hacen posible.",
      "sections": [
        {
          "type": "orientation",
          "id": "lee",
          "objective": "Recibir GET /dev/hello en tu ordenador y devolver un mensaje JSON con estado 200.",
          "prior": "Node 22, npm, VS Code y Git Bash preparados en el <a href=\"#preparacion\">bloque 00 · Preparación</a>.",
          "new": "Un servicio describe una ruta HTTP; un handler recibe la petición y devuelve la respuesta.",
          "boundary": "Hoy ejecutas en local. Todavía no creas recursos en AWS ni una aplicación móvil.",
          "request": "GET http://localhost:3000/dev/hello",
          "response": "HTTP/1.1 200 OK\n\n{\n  \"message\": \"Festival Control API online\"\n}",
          "caption": "Vista del resultado esperado. La URL exacta la anunciará tu terminal al arrancar Offline."
        },
        {
          "type": "conceptGrid",
          "id": "piezas",
          "title": "Cuatro piezas, cuatro responsabilidades",
          "items": [
            [
              "Serverless Framework",
              "Lee la configuración del servicio. Más adelante también podrá desplegarlo; hoy nos ayuda a organizarlo."
            ],
            [
              "serverless.yml",
              "Declara la plataforma, el runtime, la función y la petición que la activa. Es configuración YAML."
            ],
            [
              "src/hello.js",
              "Contiene el handler: la función JavaScript que recibe event y prepara la respuesta."
            ],
            [
              "serverless-offline",
              "Emula localmente la entrada HTTP y la ejecución. No crea una Lambda real."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue una sola petición",
          "items": [
            "Thunder o curl",
            "GET /dev/hello",
            "Offline + serverless.yml",
            "src/hello.handler",
            "200 + JSON"
          ],
          "text": "Cliente → petición HTTP → función → respuesta. Cuando se ejecute, el console.log del handler aparecerá en la terminal del backend."
        },
        {
          "type": "note",
          "id": "como-seguir",
          "title": "Cómo trabajar esta fase",
          "text": "El índice superior permite consultar cualquier fase. «Marcar fase y continuar» registra lo que ya has hecho. Las comprobaciones se guardan en este navegador. Al cerrar el bloque, comprobarás el conjunto antes de darlo por terminado."
        }
      ]
    },
    {
      "id": "prepara",
      "navTitle": "Prepara",
      "title": "Prepara backend desde cero",
      "description": "Usa la terminal integrada de VS Code con perfil Git Bash. Espera a que termine cada comando.",
      "sections": [
        {
          "type": "wizard",
          "id": "entorno",
          "label": "PREPARA EL EJERCICIO",
          "title": "Carpeta, proyecto y dependencias",
          "sideTitle": "La estructura que estamos construyendo",
          "sideCode": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── src/\n    │   └── hello.js       ← tu función\n    ├── package.json      ← proyecto Node y dependencias\n    ├── package-lock.json ← árbol de versiones de npm\n    ├── node_modules/     ← dependencias descargadas\n    └── serverless.yml    ← función y ruta HTTP",
          "steps": [
            {
              "id": "carpeta",
              "shortTitle": "Carpeta",
              "title": "Crea backend y comprueba dónde estás",
              "learn": "backend separa las funciones del futuro cliente. mkdir -p conserva las carpetas existentes; pwd muestra la ruta actual.",
              "text": "Entra en el workspace del alumno. Si ya hay archivos de esta práctica, revísalos antes de repetir pasos; no borres tu trabajo.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\nmkdir -p backend/src\ncd backend\npwd\nls",
              "expected": "pwd termina en /04-PILARES-SERVERLESS/backend y ls muestra src/.",
              "help": [
                [
                  "No existe /d",
                  "Vuelve al bloque 00 y usa la ruta acordada con el profesor."
                ],
                [
                  "Estoy dentro de otra carpeta",
                  "Repite el cd absoluto antes de continuar."
                ]
              ],
              "check": "La terminal está en backend. Después inicializarás el proyecto Node."
            },
            {
              "id": "npm",
              "shortTitle": "Node",
              "title": "Crea package.json y activa módulos ESM",
              "learn": "npm init registra el proyecto. type: module permite escribir import y export en archivos .js. npm no crea nuestro handler ni el YAML.",
              "text": "Ejecuta desde backend. Este paso es para un proyecto nuevo; si package.json ya existe, léelo antes de reinicializarlo.",
              "code": "npm init -y\nnpm pkg set type=module\ncat package.json",
              "expected": "package.json existe y contiene \"type\": \"module\".",
              "help": [
                [
                  "npm no responde",
                  "Comprueba node --version y npm --version en una terminal nueva: usamos Node 22."
                ],
                [
                  "¿Qué significa -y?",
                  "Acepta los metadatos iniciales por defecto. No escribe la lógica de la aplicación."
                ]
              ],
              "check": "Ya existe un proyecto Node que entiende export. Después instalarás sus herramientas."
            },
            {
              "id": "dependencias",
              "shortTitle": "Dependencias",
              "title": "Instala las herramientas dentro del proyecto",
              "learn": "--save-dev registra herramientas de desarrollo. --save-exact fija la versión npm. node_modules contiene los paquetes y package-lock.json registra su árbol. npx utiliza el ejecutable del proyecto.",
              "text": "No necesitas instalar Serverless globalmente. Desde backend:",
              "code": "npm install --save-dev --save-exact serverless@4.45.0 serverless-offline@14.8.4\nnpm ls serverless serverless-offline\nnpx serverless --version",
              "expected": "npm ls muestra serverless@4.45.0 y serverless-offline@14.8.4. El comando de versión responde. La primera ejecución puede descargar componentes adicionales.",
              "help": [
                [
                  "Falla una descarga",
                  "Comprueba Internet. Además del registro npm, el Framework descarga desde install.serverless.com. Si la red del centro lo bloquea, consulta al profesor."
                ],
                [
                  "Versión global distinta",
                  "Comprueba que estás en backend y usas npx."
                ],
                [
                  "Ya tengo el proyecto en otro equipo",
                  "Con package.json y package-lock.json existentes, npm ci instala el árbol guardado; no repitas npm init."
                ]
              ],
              "check": "Las herramientas están instaladas localmente. Después resolverás el acceso del Framework."
            },
            {
              "id": "acceso",
              "shortTitle": "Acceso",
              "title": "Resuelve la autenticación del Framework",
              "learn": "La sesión de Serverless Framework v4 es independiente de AWS Academy. Instalar el paquete y obtener un número de versión no acredita el acceso a sus comandos.",
              "text": "Ejecuta login, completa el acceso o registro en la página oficial que abra el navegador y vuelve a la terminal. Usa la cuenta o licencia acordada en clase. Si se exige una licencia que tu cuenta no cumple, consulta al profesor.",
              "code": "npx serverless login",
              "expected": "La terminal confirma el acceso del Framework o el profesor ha resuelto el mecanismo de licencia del aula.",
              "help": [
                [
                  "El navegador no se abre",
                  "Utiliza el enlace que muestre la terminal. Después vuelve a ella."
                ],
                [
                  "Pide credenciales AWS",
                  "Esta fase resuelve el acceso del Framework. No ejecutes deploy ni configures AWS Academy ahora."
                ],
                [
                  "¿Debo crear org o app?",
                  "No las añadimos al YAML de esta práctica; no utilizaremos las funciones del Dashboard."
                ]
              ],
              "check": "Entorno y acceso listos. La siguiente fase crea los dos archivos de nuestra función."
            }
          ]
        },
        {
          "type": "checklist",
          "id": "preparacion-lista",
          "title": "STOP · antes de construir",
          "items": [
            "Estoy dentro de backend y puedo localizar src/.",
            "package.json contiene type: module.",
            "Las dos dependencias aparecen con npm ls y el acceso del Framework está resuelto."
          ]
        }
      ]
    },
    {
      "id": "construye",
      "navTitle": "Construye",
      "title": "Crea dos archivos y relaciona sus responsabilidades",
      "description": "Empieza por la configuración. Después crea la función a la que apunta. Cada pestaña contiene un archivo completo.",
      "sections": [
        {
          "type": "fileLab",
          "id": "archivos",
          "label": "CONSTRUYE · ARCHIVOS COMPLETOS",
          "title": "Configuración y código, uno junto al otro",
          "intro": "Lee primero las instrucciones y la sintaxis de cada archivo. Créalo en la ruta indicada y copia su contenido completo. El modo maximizado se mantiene al cambiar de archivo.",
          "tabs": [
            {
              "title": "1 · serverless.yml",
              "filename": "serverless.yml",
              "path": "backend/serverless.yml",
              "responsibility": "Relaciona una ruta HTTP con la función que se ejecutará.",
              "instruction": "En el Explorador de VS Code, selecciona backend → Nuevo archivo → serverless.yml. Debe quedar al mismo nivel que package.json, fuera de src.",
              "learn": [
                [
                  "service",
                  "Nombre del servicio completo, no de una función."
                ],
                [
                  "provider / runtime",
                  "Plataforma prevista y entorno Node. Declarar aws no despliega nada por sí solo."
                ],
                [
                  "plugins",
                  "Activa serverless-offline."
                ],
                [
                  "functions.hello",
                  "hello es el nombre lógico de esta función."
                ],
                [
                  "handler: src/hello.handler",
                  "src/hello identifica el archivo .js; lo que va detrás del punto identifica la función exportada."
                ],
                [
                  "events / http / path / method",
                  "GET /hello activa la función. Offline añadirá normalmente el stage /dev."
                ]
              ],
              "code": "service: festival-control-api\n\n# Conservamos la línea del Framework preparada para la práctica.\nframeworkVersion: ~4.45.0\n\nprovider:\n  name: aws\n  runtime: nodejs22.x\n\nplugins:\n  - serverless-offline\n\nfunctions:\n  hello:\n    # Archivo src/hello.js y función exportada handler.\n    handler: src/hello.handler\n    events:\n      - http:\n          path: hello\n          method: get",
              "stop": "Comprueba los espacios de indentación. YAML utiliza espacios, no tabulaciones. Después crea hello.js en la siguiente pestaña."
            },
            {
              "title": "2 · hello.js",
              "filename": "hello.js",
              "path": "backend/src/hello.js",
              "responsibility": "Recibe el evento de la petición, deja un log y devuelve estado HTTP y contenido JSON.",
              "instruction": "En el Explorador, selecciona backend/src → Nuevo archivo → hello.js. Guarda con Ctrl+S después de copiar. No lo crees junto a package.json.",
              "learn": [
                [
                  "export const handler",
                  "Exporta la función con el nombre que espera el YAML."
                ],
                [
                  "async (event) =>",
                  "La función puede trabajar de forma asíncrona. event reúne los datos de esta invocación."
                ],
                [
                  "console.log",
                  "Deja evidencia en la terminal; no es el cuerpo de la respuesta HTTP."
                ],
                [
                  "statusCode: 200",
                  "Indica al cliente que la operación fue correcta."
                ],
                [
                  "JSON.stringify(...)",
                  "Convierte nuestro objeto JavaScript en el texto JSON que viajará en body."
                ]
              ],
              "code": "export const handler = async (event) => {\n  // Evidencia: esta petición llegó a nuestra función.\n  console.log('EVENT RECIBIDO:', event);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      message: 'Festival Control API online'\n    })\n  };\n};",
              "stop": "Guarda ambos archivos. Antes de arrancar, compara tus carpetas con el árbol de la fase Prepara."
            }
          ]
        },
        {
          "type": "checklist",
          "id": "archivos-listos",
          "title": "STOP · antes de ejecutar",
          "items": [
            "serverless.yml está en backend, al nivel de package.json.",
            "hello.js está dentro de backend/src y exporta handler.",
            "El handler del YAML es src/hello.handler y ambos archivos están guardados."
          ]
        }
      ]
    },
    {
      "id": "prueba",
      "navTitle": "Prueba",
      "title": "Demuestra el backend con dos clientes",
      "description": "Una terminal mantiene el servidor. La otra permite probarlo. Comprueba tanto la respuesta como el log.",
      "sections": [
        {
          "type": "wizard",
          "id": "prueba-local",
          "label": "PRUEBA POR CAPAS",
          "title": "Servidor → Thunder → curl",
          "steps": [
            {
              "id": "offline",
              "shortTitle": "1 · Servidor",
              "title": "Arranca Offline en la terminal del backend",
              "learn": "El servidor debe seguir ejecutándose mientras haces peticiones. Esta terminal será la consola de la función.",
              "text": "En VS Code abre una terminal Git Bash y ejecuta:",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/backend\nnpx serverless offline",
              "expected": "La terminal muestra una ruta GET, normalmente http://localhost:3000/dev/hello. Conserva la URL exacta que anuncie TU proceso.",
              "help": [
                [
                  "No encuentra el plugin",
                  "Revisa npm ls serverless-offline y plugins en el YAML."
                ],
                [
                  "Error de configuración",
                  "Revisa nombre de archivo, indentación y handler."
                ],
                [
                  "Puerto ocupado",
                  "Detén con Ctrl+C el servidor anterior de esta práctica antes de repetir."
                ],
                [
                  "Acceso del Framework pendiente",
                  "Vuelve al paso Acceso de la fase Prepara."
                ]
              ],
              "check": "La terminal queda escuchando. No la cierres: prueba ahora desde Thunder."
            },
            {
              "id": "thunder",
              "shortTitle": "2 · Thunder",
              "title": "Envía la primera petición HTTP",
              "learn": "Thunder Client es el cliente; el handler es el servidor. Un 200 y un log nuevo demuestran dos partes del recorrido.",
              "text": "En VS Code: icono de Thunder Client → New Request → selecciona GET → pega la URL anunciada por Offline → Send. Aquí la línea inferior representa la petición: no es un comando Bash.",
              "code": "GET http://localhost:3000/dev/hello",
              "expected": "Thunder muestra Status 200 y { \"message\": \"Festival Control API online\" }. La terminal del backend añade EVENT RECIBIDO y el evento.",
              "help": [
                [
                  "404",
                  "El servidor respondió, pero la ruta o método no coinciden. Compara /dev/hello con la salida de Offline."
                ],
                [
                  "ECONNREFUSED",
                  "No se alcanza el proceso en esa dirección/puerto. Comprueba que Offline sigue ejecutándose."
                ],
                [
                  "500",
                  "La petición llegó, pero la función falló. Lee el error de la terminal."
                ]
              ],
              "check": "Comprueba respuesta y log. Después repite la misma petición con curl.",
              "codeKind": "request"
            },
            {
              "id": "curl",
              "shortTitle": "3 · curl",
              "title": "Repite desde una segunda terminal Git Bash",
              "learn": "curl es otro cliente HTTP. -i muestra también la línea de estado y las cabeceras. No necesitas cambiar el backend.",
              "text": "Conserva la terminal de Offline abierta. Usa el botón + del panel Terminal para abrir otra Git Bash. Sustituye la URL si tu proceso mostró una diferente.",
              "code": "curl -i http://localhost:3000/dev/hello",
              "expected": "La segunda terminal muestra HTTP 200 y el mismo JSON que Thunder. La primera registra una nueva invocación.",
              "help": [
                [
                  "Connection refused",
                  "Comprueba la primera terminal y su puerto."
                ],
                [
                  "404",
                  "Copia la URL exacta, incluido el stage si aparece."
                ],
                [
                  "¿Dónde escribo si el servidor ocupa la terminal?",
                  "Usa otra terminal con el botón +. No escribas comandos encima del proceso de Offline."
                ]
              ],
              "check": "Dos clientes han recibido la misma respuesta. Continúa para explicar por qué."
            }
          ]
        },
        {
          "type": "checklist",
          "id": "pruebas-listas",
          "title": "CHECKPOINT · evidencias locales",
          "items": [
            "Offline sigue ejecutándose y anuncia GET /hello.",
            "Thunder recibe 200 y el mensaje esperado.",
            "curl recibe el mismo JSON y veo una invocación nueva en el log."
          ]
        }
      ]
    },
    {
      "id": "entiende",
      "navTitle": "Entiende",
      "title": "Explica qué acaba de pasar",
      "description": "Relaciona lo que has visto con cada archivo. Esto prepara el trabajo con parámetros del bloque 02.",
      "sections": [
        {
          "type": "explainRows",
          "id": "recorrido-explicado",
          "title": "De la petición a la respuesta",
          "rows": [
            [
              "GET /dev/hello",
              "El cliente solicita un recurso del servidor local. /dev es el stage anunciado por Offline en este ejemplo."
            ],
            [
              "path: hello + method: get",
              "La configuración asocia esa petición con functions.hello."
            ],
            [
              "handler: src/hello.handler",
              "Offline carga src/hello.js y busca su exportación handler."
            ],
            [
              "event",
              "Es la entrada de esta invocación. Puedes inspeccionarla en EVENT RECIBIDO; no es una variable compartida por todas las peticiones."
            ],
            [
              "console.log(...)",
              "Sale por la terminal del backend. El cliente no recibe este log como respuesta."
            ],
            [
              "return { statusCode, body }",
              "Define lo que recibe el cliente: estado HTTP y texto de respuesta."
            ],
            [
              "JSON.stringify({ message: ... })",
              "El objeto JavaScript se transforma en texto JSON; Thunder o curl muestran ese contenido."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "predice",
          "title": "Predice antes de comprobar",
          "question": "Si cambias únicamente el texto de message, ¿cambiará la URL, el log o el contenido de la respuesta?",
          "answer": "Cambiará el contenido del body. La ruta seguirá siendo la misma porque no has cambiado el YAML. El handler seguirá ejecutando console.log al recibir cada petición. En la siguiente fase lo demostrarás."
        },
        {
          "type": "note",
          "id": "limite",
          "title": "Qué hemos demostrado",
          "text": "Has ejecutado una función local a través de HTTP. No has demostrado un despliegue AWS, una base de datos ni persistencia. El nombre provider: aws describe el destino previsto; sólo ejecutar deploy crearía recursos cloud."
        }
      ]
    },
    {
      "id": "modifica",
      "navTitle": "Modifica",
      "title": "Cambia una cosa y demuestra su efecto",
      "description": "Una modificación guiada: conserva la ruta y cambia la respuesta. No necesitas otro proyecto.",
      "sections": [
        {
          "type": "guidedChange",
          "id": "cambio-message",
          "title": "Identifica tu servicio en la respuesta",
          "steps": [
            "Abre backend/src/hello.js.",
            "Cambia message por Festival Control · equipo preparado y añade service: hello dentro del objeto de JSON.stringify.",
            "Conserva export const handler, el log y statusCode: 200. No cambies serverless.yml.",
            "Guarda. Detén Offline con Ctrl+C y vuelve a ejecutar npx serverless offline para cargar el cambio de forma explícita.",
            "Repite la MISMA URL en Thunder y curl. Observa un log nuevo y el nuevo JSON."
          ],
          "expected": "HTTP 200\n\n{\n  \"message\": \"Festival Control · equipo preparado\",\n  \"service\": \"hello\"\n}",
          "constraints": "Mismo método GET, misma ruta, mismo handler y estado 200. Sólo cambia el contenido del body."
        },
        {
          "type": "fileLab",
          "id": "solucion-guiada",
          "label": "CONTRASTA TU MODIFICACIÓN",
          "title": "hello.js completo después del cambio",
          "intro": "Haz primero la modificación en tu editor. Utiliza este archivo completo para contrastar el resultado o recuperarte si aparece un error.",
          "tabs": [
            {
              "title": "hello.js modificado",
              "filename": "hello.js",
              "path": "backend/src/hello.js",
              "responsibility": "Devuelve la identificación del servicio conservando el contrato de la función.",
              "instruction": "Este archivo sustituye al hello.js inicial. El YAML se conserva. Puedes mantener este cambio al pasar al bloque 02.",
              "learn": [
                [
                  "message y service",
                  "Son propiedades del objeto que se convierte en JSON. No definen rutas ni funciones nuevas."
                ]
              ],
              "code": "export const handler = async (event) => {\n  // Evidencia: esta petición llegó a nuestra función.\n  console.log('EVENT RECIBIDO:', event);\n\n  return {\n    statusCode: 200,\n    body: JSON.stringify({\n      message: 'Festival Control · equipo preparado',\n      service: 'hello'\n    })\n  };\n};",
              "stop": "Comprueba una respuesta 200 con ambos campos. Si ves el texto anterior, confirma que guardaste el archivo y reiniciaste el proceso correcto."
            }
          ]
        },
        {
          "type": "checklist",
          "id": "modificacion-lista",
          "title": "CHECKPOINT · transferencia guiada",
          "items": [
            "La misma URL devuelve el nuevo message y service: hello.",
            "He conservado el 200 y aparece una nueva invocación en la terminal.",
            "Puedo explicar por qué no cambié serverless.yml."
          ]
        }
      ]
    },
    {
      "id": "comprueba",
      "navTitle": "Comprueba",
      "title": "Comprueba que puedes explicarlo",
      "description": "Preguntas formativas, sin nota. Si fallas, lee la explicación y vuelve a intentarlo.",
      "sections": [
        {
          "type": "quiz",
          "id": "pregunta-handler",
          "question": "El YAML contiene handler: src/hello.handler. ¿Qué debe existir?",
          "options": [
            "Un archivo llamado handler dentro de src/hello/.",
            "El archivo src/hello.js que exporta una función llamada handler.",
            "Una función llamada hello dentro de serverless.yml.",
            "Un recurso Lambda ya desplegado en AWS."
          ],
          "correct": 1,
          "explanation": "Antes del punto está el módulo src/hello; después está la exportación handler. El archivo y el nombre de la función deben coincidir con esa declaración."
        },
        {
          "type": "quiz",
          "id": "pregunta-log",
          "question": "Thunder recibe el JSON, pero ¿dónde buscas EVENT RECIBIDO?",
          "options": [
            "En el body de la respuesta HTTP.",
            "En la consola del navegador que muestra el cuaderno.",
            "En la terminal de VS Code donde está ejecutándose Offline.",
            "En CloudWatch, porque provider dice aws."
          ],
          "correct": 2,
          "explanation": "El log se produce en el proceso del backend. En esta práctica ese proceso es local. CloudWatch se utilizará cuando realmente despleguemos y ejecutemos en AWS."
        },
        {
          "type": "quiz",
          "id": "pregunta-cliente",
          "question": "Thunder y curl reciben el mismo JSON. ¿Qué demuestra esa comparación?",
          "options": [
            "Que el backend responde por HTTP y puede ser consumido por clientes distintos.",
            "Que Thunder ejecuta el comando curl internamente.",
            "Que el JSON está guardado en una base de datos.",
            "Que se ha desplegado la función en AWS."
          ],
          "correct": 0,
          "explanation": "Has cambiado el cliente y conservado servidor, método y URL. El contrato HTTP permite esa independencia. No demuestra persistencia ni despliegue."
        }
      ]
    },
    {
      "id": "cierra",
      "navTitle": "Cierra",
      "title": "Guarda una evidencia y deja preparado el siguiente bloque",
      "description": "Cierra con el proyecto guardado, una explicación breve y una versión recuperable.",
      "sections": [
        {
          "type": "checklist",
          "id": "cierre-listo",
          "title": "He aprendido y puedo demostrarlo",
          "items": [
            "Localizo la relación entre serverless.yml y src/hello.js.",
            "Puedo repetir GET con Thunder y curl y relacionarlo con un log nuevo.",
            "He comprobado la modificación sin cambiar la ruta.",
            "He guardado el proyecto, una evidencia y he verificado el commit en mi repositorio GitHub."
          ]
        },
        {
          "type": "fileLab",
          "id": "documentacion",
          "label": "DOCUMENTA · ARCHIVOS DE LA RAÍZ",
          "title": "Una explicación breve y un repositorio limpio",
          "intro": "Crea estos archivos en D:/DEVOPS/04-PILARES-SERVERLESS, fuera de backend. Sustituye los textos entre corchetes del README por tus respuestas reales. No incluyas claves ni tokens.",
          "tabs": [
            {
              "title": "README.md",
              "filename": "README.md",
              "path": "04-PILARES-SERVERLESS/README.md",
              "responsibility": "Explica qué has construido y cómo has comprobado que funciona.",
              "instruction": "Resume el aprendizaje; no necesitas una memoria extensa.",
              "learn": [
                [
                  "Evidencia",
                  "Guarda una captura o salida de la petición y el log que permita relacionar ambas cosas."
                ]
              ],
              "code": "# Festival Control · Bloque 01\n\n## Qué he construido\n[Describe la función y la ruta local que has probado.]\n\n## Qué he comprendido\n[Explica src/hello.handler y dónde aparece EVENT RECIBIDO.]\n\n## Qué he modificado\n[Explica qué cambió en el JSON y por qué no cambió la URL.]\n\n## Cómo lo he comprobado\n[Indica resultado de Thunder, curl y log. Adjunta una evidencia propia.]",
              "stop": "El README cuenta lo que tú has comprobado; no copies resultados como si ya los hubieras obtenido."
            },
            {
              "title": ".gitignore",
              "filename": ".gitignore",
              "path": "04-PILARES-SERVERLESS/.gitignore",
              "responsibility": "Evita versionar dependencias, artefactos y archivos de entorno.",
              "instruction": "Créalo antes de git add. Si ya existe, añade estas reglas sin borrar las anteriores.",
              "learn": [
                [
                  "node_modules",
                  "Se recupera mediante npm; no debe subirse al repositorio."
                ],
                [
                  "package-lock.json",
                  "Sí se conserva: describe las versiones instaladas."
                ]
              ],
              "code": "backend/node_modules/\nbackend/.serverless/\nbackend/.env\nbackend/.env.*\n.aws/\n.DS_Store",
              "stop": "Comprueba git status antes de crear el commit. Las credenciales no deben estar dentro del proyecto."
            }
          ]
        },
        {
          "type": "wizard",
          "id": "versiona",
          "label": "GUARDA UN PUNTO DE RECUPERACIÓN",
          "title": "Git y GitHub, con un primer commit comprobado",
          "steps": [
            {
              "id": "repositorio",
              "shortTitle": "1 · Repositorio",
              "title": "Prepara un repositorio GitHub del alumno",
              "learn": "El código de tu aplicación vive aparte del repositorio que publica el cuaderno. Un repositorio remoto es el destino de tus commits.",
              "text": "Entra en tu cuenta GitHub → New repository → escribe 04-PILARES-SERVERLESS → crea el repositorio vacío, sin inicializar README ni gitignore. Si ya tienes un repositorio para esta práctica, conserva ese y no crees otro. Copia su URL HTTPS. Todavía no ejecutes push.",
              "code": "git --version",
              "expected": "Tienes una URL HTTPS de TU repositorio y Git responde.",
              "help": [
                [
                  "No tengo cuenta o acceso",
                  "Resuélvelo con el profesor. Guarda mientras tanto el proyecto y sus evidencias localmente."
                ],
                [
                  "Ya tengo origin configurado",
                  "En el siguiente paso comprueba git remote -v y conserva el remoto correcto."
                ]
              ],
              "check": "Destino identificado. Después prepararás el commit local."
            },
            {
              "id": "commit",
              "shortTitle": "2 · Commit",
              "title": "Revisa y guarda los archivos del bloque",
              "learn": "Un commit es un punto recuperable del proyecto. La identidad se configura aquí sólo para este repositorio, no para otros alumnos del equipo.",
              "text": "Ejecuta desde la raíz del alumno. Cambia los textos de nombre y correo por tu identidad de autor de GitHub. git init conserva un repositorio existente; si git status muestra trabajo ajeno a esta práctica, detente y revisa la carpeta.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit init\ngit config user.name \"TU NOMBRE Y APELLIDOS\"\ngit config user.email \"TU CORREO DE AUTOR EN GITHUB\"\ngit status\n\n# Revisa que .gitignore existe antes de añadir archivos\ngit add .gitignore README.md backend/\ngit diff --cached --stat\ngit commit -m \"Bloque 01 - Primera funcion Serverless local\"",
              "expected": "El commit incluye código, configuración, package.json, package-lock.json y README; no incluye node_modules, .serverless ni secretos.",
              "help": [
                [
                  "Aparece node_modules en el resumen",
                  "Detente antes del commit. Revisa .gitignore y retira las dependencias del área de preparación con git rm -r --cached --ignore-unmatch backend/node_modules."
                ],
                [
                  "Nothing to commit",
                  "Puede estar ya guardado. Comprueba git log -1 --oneline y git status."
                ]
              ],
              "check": "Punto local guardado. Después verifica el remoto y sube el commit."
            },
            {
              "id": "push",
              "shortTitle": "3 · Verifica",
              "title": "Publica y comprueba el resultado en GitHub",
              "learn": "Un push correcto debe verse también en el repositorio remoto. El login GitHub no es el login de Serverless Framework.",
              "text": "Comprueba primero git remote -v. Sólo si no existe origin, ejecuta git remote add origin sustituyendo la URL de ejemplo por la tuya. Si origin ya existe, omite esa línea y comprueba que corresponde a tu repositorio. Para un repositorio nuevo, usa main como rama de la práctica. En Windows puede abrirse el navegador para autorizar GitHub.",
              "code": "git remote -v\n\n# Sólo si origin NO existe: sustituye USUARIO por tu cuenta\ngit remote add origin https://github.com/TU_USUARIO/04-PILARES-SERVERLESS.git\n\n# En el repositorio nuevo de esta práctica\ngit branch -M main\ngit push -u origin main\n\ngit status\ngit log -1 --oneline",
              "expected": "GitHub muestra el commit y los archivos del bloque 01. git status no indica cambios pendientes del bloque.",
              "help": [
                [
                  "No existe origin",
                  "Configura el remoto con tu URL antes del push."
                ],
                [
                  "Autenticación fallida",
                  "Completa el acceso GitHub mediante el mecanismo del centro. No pegues contraseñas o tokens en los archivos."
                ],
                [
                  "Push rechazado porque ya hay commits remotos",
                  "No uses force push. Consulta el estado con el profesor antes de integrar trabajo previo."
                ]
              ],
              "check": "Abre GitHub y confirma el commit. Ya puedes cerrar el bloque."
            }
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente · 02 · GET + parámetros",
          "text": "Conservarás backend, package.json, las dependencias y el handler hello. En el bloque 02 añadirás otra función para observar cómo un id de la URL llega a event.pathParameters. Puedes mantener el hello.js modificado: su ruta sigue siendo /hello."
        }
      ]
    }
  ]
};
