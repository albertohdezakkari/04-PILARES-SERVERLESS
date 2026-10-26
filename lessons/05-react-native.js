window.lesson05 = {
  "id": "react-native",
  "navTitle": "05 · React Native",
  "revision": 1,
  "modeLabel": "Aprendizaje asistido · TypeScript · sin nota",
  "hero": {
    "eyebrow": "BLOQUE 05 · APRENDIZAJE ASISTIDO",
    "title": "Una interfaz TypeScript con datos locales",
    "description": "Construye Festival Control en React Native y comprueba su primera interacción en el navegador del aula.",
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
      "description": "Construye Festival Control en React Native y comprueba su primera interacción en el navegador del aula.",
      "sections": [
        {
          "type": "orientation",
          "id": "objetivo",
          "title": "Una interfaz TypeScript con datos locales",
          "objective": "Mostrar dos tarjetas y cambiar una selección mediante estado local.",
          "prior": "TypeScript y backend de 04 terminado. En este bloque el backend puede estar detenido.",
          "new": "Expo, TSX, componentes React Native, estilos y estado de interfaz.",
          "boundary": "Creamos un cliente en mobile, dentro del mismo repositorio. Todavía no hace fetch ni simula un backend en la interfaz.",
          "request": "Navegador → Festival Control → Seleccionar EVT-101",
          "response": "Dos tarjetas visibles\nSelección: EVT-101",
          "caption": "Resultado esperado que contrastarás con tu ejecución.",
          "requestLabel": "Acción en la interfaz",
          "responseLabel": "Interfaz del alumno",
          "previewLabel": "MIRA EL DESTINO · RESULTADO ESPERADO",
          "requestKind": "schema"
        },
        {
          "type": "conceptGrid",
          "id": "conceptos",
          "title": "Las piezas que necesitas comprender",
          "items": [
            [
              "Expo y versiones",
              "Expo organiza el desarrollo React Native. Usamos SDK 54 y versiones fijadas para este cuaderno, con Node 22; no mezclamos versiones latest."
            ],
            [
              "TSX",
              "Es TypeScript con sintaxis de interfaz. App.tsx exporta el componente raíz."
            ],
            [
              "View, Text y Pressable",
              "Contenedor, texto y acción. Un botón necesita onPress para producir un comportamiento."
            ],
            [
              "useState",
              "Guarda un valor de interfaz entre renders y solicita actualizar la pantalla cuando cambia."
            ]
          ]
        },
        {
          "type": "routeDiagram",
          "id": "recorrido",
          "title": "Sigue el dato de principio a fin",
          "items": [
            "App.tsx",
            "Array local tipado",
            "map → tarjetas",
            "onPress",
            "setSelected → nuevo render"
          ],
          "text": "Separamos claramente el origen de los datos: ahora un array del cliente; en 06 será una respuesta HTTP."
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
              "id": "crea-mobile",
              "shortTitle": "Crea mobile",
              "title": "Crea mobile",
              "learn": "El backend y el cliente tienen package.json y node_modules diferentes. No se instala Expo en backend.",
              "text": "Desde la raíz crea mobile/src y abre el workspace completo con code .: backend y mobile deben verse como carpetas hermanas. Todas las rutas de las pestañas se leen desde esa raíz; no crees mobile/mobile. Si ya existe un intento anterior, consérvalo en Git antes de reemplazar archivos. Crea los archivos completos de Construye. No ejecutes npm install hasta haber guardado mobile/package.json.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\nmkdir -p mobile/src\ncode .",
              "expected": "VS Code muestra mobile y su carpeta src. Aún no tiene dependencias; se instalarán al probar.",
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
              "check": "Comprueba que backend sigue siendo una carpeta hermana de mobile."
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
          "code": "04-PILARES-SERVERLESS/\n└── backend/\n    ├── package.json + package-lock.json\n    ├── tsconfig.json\n    ├── serverless.yml\n    ├── src/hello.ts\n    ├── src/events/{model,list,get,create,replace,update,delete}.ts\n    └── dist/ (generado por npm run build)\n\n└── mobile/\n    ├── package.json + package-lock.json\n    ├── app.json + tsconfig.json\n    ├── App.tsx\n    └── src/\n        ├── types.ts\n"
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
              "title": "package.json",
              "filename": "package.json",
              "path": "mobile/package.json",
              "responsibility": "Fijar dependencias y comandos reproducibles del cliente.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "expo/AppEntry",
                  "Expo carga App.tsx como raíz sin crear un index.js propio."
                ],
                [
                  "Versiones exactas",
                  "Instala estas versiones juntas. package-lock.json se genera con npm install y se guarda en Git."
                ],
                [
                  "web y typecheck",
                  "Un script sirve la interfaz; el otro verifica TS/TSX sin generar archivos."
                ]
              ],
              "code": "{\n  \"name\": \"festival-control-mobile\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"main\": \"expo/AppEntry\",\n  \"scripts\": {\n    \"start\": \"expo start\",\n    \"web\": \"expo start --web\",\n    \"typecheck\": \"tsc --noEmit\",\n    \"build:web\": \"expo export --platform web\"\n  },\n  \"dependencies\": {\n    \"@expo/metro-runtime\": \"6.1.2\",\n    \"expo\": \"54.0.38\",\n    \"expo-status-bar\": \"3.0.9\",\n    \"react\": \"19.1.0\",\n    \"react-dom\": \"19.1.0\",\n    \"react-native\": \"0.81.5\",\n    \"react-native-web\": \"0.21.4\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"19.1.17\",\n    \"typescript\": \"5.9.3\"\n  },\n  \"engines\": {\n    \"node\": \">=22.13.0 <23\"\n  }\n}\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "app.json",
              "filename": "app.json",
              "path": "mobile/app.json",
              "responsibility": "Identificar la aplicación y usar Metro para web.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "expo",
                  "La configuración pertenece a Expo; no contiene claves AWS ni la URL de la API."
                ]
              ],
              "code": "{\n  \"expo\": {\n    \"name\": \"Festival Control\",\n    \"slug\": \"festival-control\",\n    \"version\": \"1.0.0\",\n    \"web\": {\n      \"bundler\": \"metro\"\n    }\n  }\n}\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "tsconfig.json",
              "filename": "tsconfig.json",
              "path": "mobile/tsconfig.json",
              "responsibility": "Aplicar la configuración TypeScript compatible con Expo.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "extends",
                  "Recupera la base del SDK; el cliente usa resolución de módulos distinta del NodeNext del backend."
                ],
                [
                  "strict",
                  "Mantiene las comprobaciones que ya utilizas en TypeScript."
                ]
              ],
              "code": "{\n  \"extends\": \"expo/tsconfig.base\",\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noEmit\": true\n  }\n}\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": "types.ts",
              "filename": "types.ts",
              "path": "mobile/src/types.ts",
              "responsibility": "Nombrar el contrato HTTP en el cliente sin importar módulos de Node o del backend.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "FestivalEvent",
                  "Tiene los mismos campos que el JSON de la API. No se importa el catálogo del servidor."
                ],
                [
                  "EventInput",
                  "El cliente envía los datos, el servidor asigna el id simulado."
                ]
              ],
              "code": "export type EventStatus = 'CONFIRMED' | 'CANCELLED';\nexport interface FestivalEvent {\n  id: string;\n  artist: string;\n  space: string;\n  time: string;\n  status: EventStatus;\n}\nexport type EventInput = Omit<FestivalEvent, 'id'>;\n",
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
                  "key={item.id}",
                  "Cada tarjeta conserva una identidad estable durante el render de la lista."
                ],
                [
                  "StyleSheet",
                  "La UI del producto es negra y rosa; el cuaderno mantiene azul, cian y blanco."
                ]
              ],
              "code": "import { useState } from 'react';\nimport { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';\nimport { StatusBar } from 'expo-status-bar';\nimport type { FestivalEvent } from './src/types';\n\nconst localEvents: FestivalEvent[] = [\n  { id: 'EVT-101', artist: 'Neon Waves', space: 'Main Stage', time: '22:30', status: 'CONFIRMED' },\n  { id: 'EVT-102', artist: 'Midnight Session', space: 'Club Stage', time: '23:45', status: 'CONFIRMED' }\n];\n\nexport default function App() {\n  const [selected, setSelected] = useState<string | null>(null);\n  const events = localEvents;\n  return (\n    <View style={styles.page}>\n      <StatusBar style=\"light\" />\n      <ScrollView contentContainerStyle={styles.content}>\n        <Text style={styles.eyebrow}>FESTIVAL CONTROL</Text>\n        <Text style={styles.title}>Programación</Text>\n        <Text style={styles.text}>Datos locales · todavía sin llamadas HTTP</Text>\n        {events.map(item => (\n          <View key={item.id} style={styles.card}>\n            <Text style={styles.tag}>{item.id} · {item.status}</Text>\n            <Text style={styles.artist}>{item.artist}</Text>\n            <Text style={styles.text}>{item.space} · {item.time}</Text>\n          </View>\n        ))}\n        <Pressable accessibilityRole=\"button\" style={styles.button} onPress={() => setSelected('EVT-101')}>\n          <Text style={styles.buttonText}>Seleccionar EVT-101</Text>\n        </Pressable>\n        <Text accessibilityLiveRegion=\"polite\" style={styles.text}>Selección: {selected ?? 'ninguna'}</Text>\n      </ScrollView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  page: { flex: 1, backgroundColor: '#08090d' },\n  content: { padding: 24, paddingTop: 48, gap: 16, width: '100%', maxWidth: 760, alignSelf: 'center' },\n  eyebrow: { color: '#ff4b9b', fontWeight: '700', letterSpacing: 2 },\n  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },\n  text: { color: '#d2d3df', fontSize: 16, lineHeight: 24 },\n  card: { padding: 20, gap: 8, borderRadius: 16, borderWidth: 1, borderColor: '#353644', backgroundColor: '#151620' },\n  artist: { color: '#ffffff', fontSize: 22, fontWeight: '700' },\n  tag: { color: '#ff8fc0', fontWeight: '700' },\n  button: { padding: 14, backgroundColor: '#cf236e', borderRadius: 10, alignItems: 'center' },\n  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },\n  error: { color: '#ffb4b4', fontSize: 16 },\n  result: { color: '#afffcf', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }\n});\n",
              "stop": "Guarda con Ctrl+S. Comprueba nombre, extensión y ruta antes de pasar a la siguiente pestaña."
            },
            {
              "title": ".gitignore",
              "filename": ".gitignore",
              "path": ".gitignore",
              "responsibility": "Excluir dependencias, compilaciones, configuración temporal y credenciales.",
              "instruction": "Crea las carpetas de la ruta si faltan. Abre el archivo en VS Code, lee la explicación y guarda el contenido completo.",
              "learn": [
                [
                  "package-lock.json",
                  "Se conserva en Git. No excluyas los archivos .ts, .tsx o tus evidencias."
                ]
              ],
              "code": "backend/node_modules/\nbackend/dist/\nbackend/.serverless/\nbackend/.env\nbackend/.env.*\nmobile/node_modules/\nmobile/dist/\nmobile/.expo/\nmobile/.env\nmobile/.env.*\n.aws/\n.DS_Store\n",
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
              "id": "instala",
              "shortTitle": "Instala dependencias",
              "title": "Instala dependencias",
              "learn": "npm install genera node_modules y package-lock.json a partir del manifiesto fijado.",
              "text": "Desde mobile, después de guardar todos los archivos, ejecuta:",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS/mobile\nnpm install\nnpm run typecheck",
              "expected": "Instalación completada y cero errores de TypeScript.",
              "help": [
                [
                  "Unsupported engine",
                  "Revisa node -v: usa Node 22.13 o superior dentro de la rama 22."
                ],
                [
                  "Errores de descarga",
                  "Comprueba conexión/proxy del aula; repite npm install sin cambiar versiones al azar."
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
              "check": "Conserva el lockfile. En otro equipo, con ese lockfile, npm ci reproduce la instalación."
            },
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
              "id": "seleccion",
              "shortTitle": "Interacción local",
              "title": "Interacción local",
              "learn": "Una selección demuestra que el botón está conectado a un cambio de estado.",
              "text": "Pulsa Seleccionar EVT-101 y observa el texto inferior. Recarga la página y contrasta el estado inicial.",
              "code": "Acción: seleccionar → recargar navegador",
              "expected": "Selección EVT-101 después de pulsar; ninguna tras recargar. Las dos tarjetas permanecen.",
              "help": [
                [
                  "No cambia",
                  "Comprueba onPress y setSelected en App.tsx."
                ],
                [
                  "Página en blanco",
                  "Revisa la primera excepción de Metro y npm run typecheck."
                ]
              ],
              "check": "Explica por qué la selección no se conserva tras recargar."
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
              "events.map",
              "Convierte datos en componentes, sin ejecutar HTTP."
            ],
            [
              "useState<string | null>(null)",
              "La selección puede no existir todavía; no se inventa un id inicial."
            ],
            [
              "onPress={() => setSelected(…)}",
              "La función se ejecuta al pulsar, no al dibujar el botón."
            ]
          ]
        },
        {
          "type": "predict",
          "id": "prediccion",
          "title": "Predice antes de probar",
          "question": "¿Aparecerá una llamada a /events al abrir la pantalla?",
          "answer": "No. App.tsx usa localEvents. La integración con fetch empieza en 06."
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
          "title": "Selecciona la segunda tarjeta",
          "steps": [
            "En App.tsx cambia el valor de setSelected a EVT-102.",
            "Cambia el texto del botón a Seleccionar EVT-102.",
            "Guarda, pulsa y comprueba el nuevo texto. Después restaura EVT-101 para conservar el hito base."
          ],
          "expected": "Selección: EVT-102",
          "constraints": "Conserva las dos tarjetas y los campos del contrato. Cambia sólo selección y etiqueta, sin introducir HTTP."
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
          "question": "¿Qué provoca el nuevo render al pulsar?",
          "options": [
            "El nombre del archivo",
            "setSelected",
            "serverless.yml",
            "JSON.stringify"
          ],
          "correct": 1,
          "explanation": "El setter de useState comunica a React un cambio de estado."
        },
        {
          "type": "quiz",
          "id": "pregunta-1",
          "question": "¿De dónde vienen estas tarjetas?",
          "options": [
            "De AWS",
            "De Offline",
            "Del array local tipado",
            "De una base de datos"
          ],
          "correct": 2,
          "explanation": "En 05 los datos están en App.tsx. No hay llamadas de red."
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
              "path": "evidencias/05/README.md",
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
              "code": "# Bloque 05\n\n## Resultado\n- Qué añadí al proyecto:\n- Ruta o pantalla comprobada:\n- Estado y respuesta observados:\n\n## Comprensión\n- Recorrido del dato, explicado con mis palabras:\n- Cambio guiado y resultado:\n- Error encontrado y cómo lo resolví:\n\n## Evidencias\n- Captura o transcripción breve, sin credenciales:\n- Limitaciones del ejercicio:\n",
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
              "text": "Desde la raíz, completa el README de evidencias/05 y revisa los cambios. Los comandos añaden únicamente los archivos de este bloque. Antes del commit lee git diff --cached y verifica que el lockfile y las fuentes correctas están preparados.",
              "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\ngit status --short\ngit diff\ngit add mobile/package.json mobile/package-lock.json mobile/app.json mobile/tsconfig.json mobile/src/types.ts mobile/App.tsx .gitignore evidencias/05/README.md\ngit diff --cached\ngit commit -m \"Completa bloque 05\"\ngit push\ngit log -1 --oneline",
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
            "He instalado mobile con su propio package.json y guardado package-lock.json.",
            "Veo dos tarjetas y la selección responde al botón.",
            "He explicado mi resultado en el README y guardado un commit recuperable."
          ]
        },
        {
          "type": "note",
          "id": "siguiente",
          "title": "Siguiente paso",
          "text": "Bloque 06: sustituirás el array local por datos recibidos del backend mediante GET."
        }
      ]
    }
  ]
};
