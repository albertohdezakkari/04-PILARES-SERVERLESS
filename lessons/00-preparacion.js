window.lesson00={
  "id": "preparacion",
  "navTitle": "00 · Preparación",
  "hero": {
    "eyebrow": "BLOQUE 00 · CONFIGURA EL ORDENADOR DESDE CERO",
    "title": "Prepara tu equipo paso a paso",
    "description": "Empieza con un Windows de aula y un navegador. Descarga, instala, configura y comprueba cada herramienta antes de escribir la primera función.",
    "chips": [
      "Windows 10/11",
      "Git Bash",
      "Node 22",
      "VS Code",
      "Thunder Client",
      "AWS CLI"
    ]
  },
  "sections": [
    {
      "type": "flow",
      "title": "Del ordenador sin herramientas al laboratorio preparado",
      "items": [
        "Requisitos",
        "Git + Git Bash",
        "Node 22 + npm",
        "VS Code",
        "Workspace",
        "Terminal Bash",
        "Thunder Client",
        "AWS CLI",
        "Primer Serverless"
      ]
    },
    {
      "type": "concept",
      "label": "LEE · PUNTO DE PARTIDA",
      "title": "Qué significa empezar desde cero",
      "text": "Windows ya está instalado. Necesitas conexión a Internet y permiso para instalar programas. No damos por hecho que tengas Git, Node, VS Code ni una terminal configurada. Si una herramienta ya existe, comprueba su versión y configuración en lugar de instalarla otra vez. Sigue los pasos en orden; no copies todos los comandos de golpe."
    },
    {
      "type": "tabs",
      "label": "CONCEPTOS ANTES DE INSTALAR",
      "title": "Qué aporta cada pieza",
      "tabs": [
        {
          "title": "Git y Git Bash",
          "text": "Git registra cambios del código. Git Bash es la terminal incluida en Git para Windows con la que ejecutaremos comandos como pwd, cd y mkdir. GitHub es el servicio web donde más adelante subiremos el proyecto: instalar Git no crea una cuenta GitHub."
        },
        {
          "title": "Node y npm",
          "text": "Node.js ejecuta JavaScript en el ordenador. npm se instala con Node y descarga las dependencias de un proyecto. Usaremos Node 22.x para mantener el mismo entorno durante el cuaderno; no elijas Current ni otra versión porque aparezca primero en la web."
        },
        {
          "title": "VS Code y PATH",
          "text": "VS Code es el editor. Su terminal integrada ejecutará Git Bash. PATH es la lista de carpetas donde Windows busca los programas: por eso un instalador puede terminar correctamente y una terminal antigua seguir sin encontrar node o code. Cierra y abre la terminal después de cada instalación."
        },
        {
          "title": "Herramienta y proyecto",
          "text": "Git, Node y VS Code se instalan en el equipo. Serverless Framework y serverless-offline se instalarán dentro de backend, mediante npm en el bloque 01. Cada proyecto conserva sus dependencias en package.json y package-lock.json; no instalaremos Serverless globalmente."
        },
        {
          "title": "Local y AWS",
          "text": "Thunder Client enviará peticiones a nuestra API local. AWS CLI permitirá trabajar después con AWS. Instalar AWS CLI no inicia Academy ni proporciona credenciales: las credenciales temporales se preparan cuando llegue el bloque de despliegue."
        }
      ]
    },
    {
      "type": "code",
      "label": "MIRA EL DESTINO · ANTES DE CREAR CARPETAS",
      "title": "Al terminar este bloque tendrás el equipo listo y esta carpeta",
      "filename": "Windows · estructura de trabajo",
      "text": "En el bloque 00 creamos únicamente el workspace. En el 01 aparecerá backend y más adelante mobile. No clones el repositorio del cuaderno dentro de esta carpeta: la web contiene instrucciones; aquí escribirás tu aplicación.",
      "code": "D:\\DEVOPS\\\n└── 04-PILARES-SERVERLESS\\   ← workspace del alumno\n\nBloque 01: backend/          ← funciones y configuración\nBloque 05: mobile/           ← aplicación Expo",
      "after": {
        "title": "DOS RESPONSABILIDADES",
        "text": "El navegador muestra el cuaderno. VS Code edita los archivos que tú creas en D:\\DEVOPS\\04-PILARES-SERVERLESS."
      }
    },
    {
      "type": "wizard",
      "label": "FASE 1 · INSTALA LAS HERRAMIENTAS DEL EQUIPO",
      "title": "Desde el navegador hasta Node funcionando",
      "steps": [
        {
          "shortTitle": "Windows",
          "title": "Comprueba el equipo antes de descargar",
          "learn": "Un instalador debe corresponder al sistema y a la arquitectura del ordenador. Los permisos del aula pueden requerir intervención del profesor.",
          "text": "<ol><li>Abre Inicio → Configuración → Sistema → Acerca de. Comprueba que utilizas Windows 10/11 y consulta Tipo de sistema.</li><li>Abre el Explorador con Win+E → Este equipo. Comprueba si existe la unidad D:.</li><li>Abre el navegador y entra en una web para comprobar Internet.</li><li>Usaremos instaladores para Windows x64 en los equipos Intel/AMD de 64 bits; si aparece ARM, consulta al profesor antes de descargar.</li></ol>",
          "expected": "Sabes qué Windows utilizas, tienes Internet y has localizado D:.",
          "help": [
            [
              "No existe D:",
              "Detente y avisa al profesor para acordar una ruta y adaptar los comandos. No crees particiones ni sustituyas rutas por tu cuenta."
            ],
            [
              "Windows pide contraseña de administrador",
              "Solicita la instalación al profesor o al responsable del equipo; no cambies las políticas de seguridad."
            ]
          ],
          "check": "CHECKPOINT: requisitos comprobados. SIGUIENTE: instala Git, que incluye Git Bash."
        },
        {
          "shortTitle": "Git + Bash",
          "title": "Descarga e instala Git para Windows",
          "learn": "Git Bash todavía no existe: lo instalaremos con Git para poder utilizar los comandos del cuaderno.",
          "text": "<ol><li>Abre <a href=\"https://git-scm.com/install/windows\" target=\"_blank\" rel=\"noopener noreferrer\">la descarga oficial de Git para Windows</a>.</li><li>Elige el instalador x64 Setup para el equipo del aula; no Portable.</li><li>Ejecuta el archivo descargado desde Descargas. Conserva la carpeta propuesta y los componentes de Git Bash.</li><li>En la opción de PATH elige Git from the command line and also from 3rd-party software. Conserva las opciones recomendadas del resto del asistente y pulsa Install → Finish.</li><li>Abre Inicio, escribe Git Bash y abre la aplicación. Ejecuta los comandos inferiores de uno en uno.</li></ol>",
          "code": "# Estos comandos se ejecutan DENTRO de Git Bash\ngit --version\nbash --version\ncurl --version",
          "expected": "Las tres órdenes muestran versiones. La ventana abierta es Git Bash, no PowerShell ni cmd.",
          "help": [
            [
              "No encuentro Git Bash en Inicio",
              "Comprueba que terminó el instalador de Git. Cierra y vuelve a abrir el menú Inicio."
            ],
            [
              "git: command not found",
              "Cierra la terminal y abre Git Bash de nuevo. Si persiste, revisa la instalación de Git y su opción de PATH."
            ]
          ],
          "check": "CHECKPOINT: puedo abrir Git Bash y git responde. SIGUIENTE: instala Node.js."
        },
        {
          "shortTitle": "Node 22",
          "title": "Instala Node.js 22 y npm",
          "learn": "El instalador de Node incluye npm. No necesitas instalar npm por separado ni una CLI global de Expo o Serverless.",
          "text": "<ol><li>Abre <a href=\"https://nodejs.org/en/download\" target=\"_blank\" rel=\"noopener noreferrer\">la página oficial de Node.js</a>. Selecciona la línea 22.x LTS y Windows.</li><li>Si no encuentras esa versión en el selector, utiliza <a href=\"https://nodejs.org/download/release/latest-v22.x/\" target=\"_blank\" rel=\"noopener noreferrer\">el directorio oficial de Node 22</a> y el archivo terminado en x64.msi.</li><li>Ejecuta el MSI y conserva Node.js runtime, npm package manager y Add to PATH.</li><li>Si ofrece herramientas adicionales para compilar módulos nativos, no son necesarias para este bloque.</li><li>Termina la instalación. Cierra TODAS las ventanas Git Bash y abre una nueva desde Inicio.</li></ol>",
          "code": "# Verifica la instalación en una ventana NUEVA\nnode --version\nnpm --version\n\n# Comprueba que Node ejecuta JavaScript\nnode -e \"console.log('Node listo para Festival Control')\"",
          "expected": "node muestra v22.x.x; npm muestra una versión y aparece Node listo para Festival Control.",
          "help": [
            [
              "Node muestra 18, 20, 24 u otra línea",
              "Estás usando otra instalación. Ejecuta where.exe node para localizarla y pide al profesor unificar el equipo con Node 22 antes de continuar."
            ],
            [
              "node o npm no se encuentra",
              "Cierra todas las terminales y abre Git Bash. Si persiste, repara Node con la opción Add to PATH."
            ],
            [
              "npm.ps1 o execution policy",
              "Has abierto PowerShell. Abre Git Bash; no cambies la política de ejecución para resolver este paso."
            ]
          ],
          "check": "CHECKPOINT: Node 22 y npm responden. SIGUIENTE: instala el editor."
        }
      ]
    },
    {
      "type": "wizard",
      "label": "FASE 2 · CONFIGURA TU PUESTO DE TRABAJO",
      "title": "Editor, carpetas, terminal y cliente HTTP",
      "steps": [
        {
          "shortTitle": "VS Code",
          "title": "Instala Visual Studio Code y habilita code",
          "learn": "El comando code . abrirá el editor en la carpeta actual; el punto significa aquí.",
          "text": "<ol><li>Entra en <a href=\"https://code.visualstudio.com/download\" target=\"_blank\" rel=\"noopener noreferrer\">la descarga oficial de VS Code</a> y elige Windows User Installer x64.</li><li>Ejecuta el instalador. Conserva la opción Add to PATH; puedes marcar Abrir con Code para carpetas si aparece.</li><li>Finaliza. Si el equipo sólo permite una instalación gestionada, pide al profesor la instalación correspondiente.</li><li>Cierra y vuelve a abrir Git Bash; comprueba el comando inferior.</li></ol>",
          "code": "# Comprueba que Windows localiza el editor\ncode --version",
          "expected": "Aparece la versión de VS Code y no command not found.",
          "help": [
            [
              "code: command not found",
              "Reabre Git Bash después de instalar. Si continúa, revisa Add to PATH en el instalador de Windows."
            ],
            [
              "¿Necesito Visual Studio?",
              "El producto es Visual Studio Code. No descargues el entorno Visual Studio en su lugar."
            ]
          ],
          "check": "CHECKPOINT: code responde. SIGUIENTE: crea la carpeta donde trabajarás."
        },
        {
          "shortTitle": "Workspace",
          "title": "Crea D:\\DEVOPS\\04-PILARES-SERVERLESS y ábrela",
          "learn": "En Git Bash la unidad D: se escribe /d. mkdir -p crea carpetas y conserva las que ya existen; cd cambia la carpeta actual; pwd muestra dónde estás.",
          "text": "<ol><li>Abre Git Bash desde Inicio.</li><li>Ejecuta cada comando por separado y observa el resultado.</li><li>Cuando se abra VS Code, comprueba que su Explorador muestra 04-PILARES-SERVERLESS.</li><li>Si VS Code solicita confianza, confirma sólo si es la carpeta que acabas de crear tú.</li></ol>",
          "code": "# Crea el workspace del alumno\nmkdir -p /d/DEVOPS/04-PILARES-SERVERLESS\n\n# Entra antes de abrir el editor\ncd /d/DEVOPS/04-PILARES-SERVERLESS\npwd\n\n# Abre ESTA carpeta en VS Code\ncode .",
          "expected": "pwd muestra /d/DEVOPS/04-PILARES-SERVERLESS y VS Code abre esa carpeta.",
          "help": [
            [
              "La carpeta ya tiene archivos de otra práctica",
              "Revisa con el profesor antes de reutilizarla. Empezar desde cero no significa borrar trabajo anterior."
            ],
            [
              "No existe /d",
              "Regresa al paso Windows y acuerda la ruta con el profesor."
            ],
            [
              "VS Code abre otra carpeta",
              "Utiliza Archivo → Abrir carpeta y selecciona D:\\DEVOPS\\04-PILARES-SERVERLESS."
            ]
          ],
          "check": "CHECKPOINT: editor y terminal apuntan al mismo workspace. SIGUIENTE: configura la terminal integrada."
        },
        {
          "shortTitle": "Terminal",
          "title": "Haz que VS Code abra Git Bash por defecto",
          "learn": "Abrir VS Code desde Git Bash no garantiza que su terminal integrada use Bash. Elegimos el perfil explícitamente.",
          "text": "<ol><li>En VS Code pulsa Ctrl+Shift+P.</li><li>Busca Terminal: Select Default Profile (Terminal: Seleccionar perfil predeterminado).</li><li>Elige Git Bash. Cierra las terminales anteriores con el icono de papelera.</li><li>Abre Terminal → Nuevo terminal. En el selector de terminal debe aparecer bash o Git Bash.</li><li>Ejecuta las comprobaciones inferiores en esa terminal integrada.</li></ol>",
          "code": "# Terminal integrada de VS Code: perfil Git Bash\ncd /d/DEVOPS/04-PILARES-SERVERLESS\npwd\ngit --version\nnode --version\nnpm --version",
          "expected": "La terminal integrada usa Git Bash, pwd muestra el workspace y Node sigue mostrando v22.",
          "help": [
            [
              "Git Bash no aparece en la lista",
              "Cierra VS Code por completo y vuelve a abrirlo después de instalar Git. Comprueba antes que Git Bash abre desde Inicio."
            ],
            [
              "El prompt empieza por PS y aparece una ruta C:\\...",
              "Ese perfil es PowerShell. Selecciona Git Bash y crea una terminal nueva."
            ],
            [
              "Node funciona fuera del editor pero aquí no",
              "VS Code conserva el PATH antiguo. Cierra todas sus ventanas y ábrelo otra vez."
            ]
          ],
          "check": "CHECKPOINT: ejecutaré los comandos del cuaderno en esta terminal Bash. SIGUIENTE: instala Thunder Client."
        },
        {
          "shortTitle": "Thunder",
          "title": "Instala Thunder Client dentro de VS Code",
          "learn": "Una extensión añade funciones al editor. Thunder Client nos permitirá elegir método HTTP, URL y cuerpo y leer la respuesta.",
          "text": "<ol><li>Pulsa Ctrl+Shift+X para abrir Extensiones.</li><li>Busca Thunder Client. Comprueba el autor Ranga Vadhineni y el identificador rangav.vscode-thunder-client; puedes comparar con <a href=\"https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client\" target=\"_blank\" rel=\"noopener noreferrer\">su ficha oficial</a>.</li><li>Pulsa Install / Instalar y espera a que termine.</li><li>Abre su icono del rayo en la barra lateral y pulsa New Request.</li><li>Localiza el selector GET, la URL y el botón Send. Todavía no envíes una petición a localhost: no hemos creado la API.</li></ol>",
          "expected": "Puedes abrir New Request y localizar Method, URL y Send.",
          "help": [
            [
              "No se ve el icono",
              "Comprueba que la extensión está habilitada y recarga la ventana de VS Code."
            ],
            [
              "ECONNREFUSED al probar localhost",
              "Aún no hay servidor escuchando. En este bloque comprobamos la herramienta; la primera petición llega en el bloque 01."
            ]
          ],
          "check": "CHECKPOINT: tengo preparado el cliente HTTP. SIGUIENTE: completa las herramientas AWS del equipo."
        }
      ]
    },
    {
      "type": "wizard",
      "label": "FASE 3 · PREPARA EL PUENTE HACIA AWS",
      "title": "Instalar una herramienta no es conectar una cuenta",
      "steps": [
        {
          "shortTitle": "AWS CLI",
          "title": "Instala AWS CLI v2 y comprueba su versión",
          "learn": "La CLI es un programa del equipo. Se puede instalar y comprobar sin iniciar Academy ni introducir claves.",
          "text": "<ol><li>Abre <a href=\"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html\" target=\"_blank\" rel=\"noopener noreferrer\">la guía oficial de instalación de AWS CLI</a> y localiza Windows.</li><li>Para tu usuario puedes descargar <a href=\"https://awscli.amazonaws.com/AWSCLIV2-User.msi\" target=\"_blank\" rel=\"noopener noreferrer\">AWS CLI v2 · instalador de usuario</a>. Si el centro requiere instalación para todo el equipo, el profesor utilizará <a href=\"https://awscli.amazonaws.com/AWSCLIV2.msi\" target=\"_blank\" rel=\"noopener noreferrer\">el MSI para todos los usuarios</a> con los permisos necesarios.</li><li>Ejecuta el MSI y completa el asistente.</li><li>Cierra VS Code y Git Bash. Abre de nuevo el workspace y una terminal Git Bash.</li><li>Ejecuta sólo la comprobación de versión.</li></ol>",
          "code": "# Esto no solicita credenciales ni crea recursos AWS\naws --version",
          "expected": "La salida comienza por aws-cli/2. La instalación de la herramienta está comprobada.",
          "help": [
            [
              "aws: command not found",
              "Reabre editor y terminal. Si persiste, revisa que terminó el instalador de AWS CLI."
            ],
            [
              "Veo aws-cli/1",
              "Es la línea antigua. Pide al profesor revisar la coexistencia con CLI v2."
            ],
            [
              "No tengo permiso para instalar",
              "Deja registrada la incidencia para el profesor. Puedes realizar los bloques locales; antes del despliegue deberás completar este paso."
            ]
          ],
          "check": "CHECKPOINT: AWS CLI v2 responde, o la incidencia está registrada para resolver antes del bloque 08. SIGUIENTE: identifica qué cuentas se utilizarán."
        },
        {
          "shortTitle": "Cuentas",
          "title": "Distingue Serverless Framework, GitHub y AWS Academy",
          "learn": "Son servicios diferentes. Sus cuentas y sesiones no son intercambiables.",
          "text": "<ol><li>GitHub se utilizará para guardar y entregar código. Comprueba que puedes acceder a tu cuenta cuando llegue la entrega.</li><li>Serverless Framework v4 puede solicitar autenticación del Framework. El bloque 01 explica el comando de acceso y la vuelta del navegador a la terminal.</li><li>AWS Academy proporcionará más adelante una sesión de laboratorio y credenciales temporales para desplegar.</li><li>No ejecutes todavía aws configure ni aws sts get-caller-identity: no estamos validando una sesión AWS en este bloque.</li></ol>",
          "expected": "Puedes explicar qué programa está instalado en Windows y qué cuenta o sesión necesitarás después.",
          "help": [
            [
              "¿Instalar AWS CLI inicia Learning Lab?",
              "No. El laboratorio se inicia en Academy cuando trabajemos el despliegue."
            ],
            [
              "¿La cuenta Serverless es mi cuenta AWS?",
              "No. La autenticación del Framework y las credenciales de AWS son independientes."
            ]
          ],
          "check": "CHECKPOINT: no confundo instalación, autenticación y despliegue. SIGUIENTE: comprueba el conjunto y pasa al primer backend."
        }
      ]
    },
    {
      "type": "code",
      "label": "STOP · PRUEBA EL EQUIPO COMPLETO",
      "title": "Última comprobación en la terminal integrada",
      "filename": "VS Code → Terminal → Git Bash",
      "text": "Ejecuta desde una ventana nueva de VS Code. Si una orden falla, vuelve al paso que instala esa herramienta. No avances al backend con Node o npm sin resolver.",
      "code": "cd /d/DEVOPS/04-PILARES-SERVERLESS\npwd\ngit --version\nnode --version\nnpm --version\ncode --version\ncurl --version\naws --version",
      "after": {
        "title": "QUÉ DEBERÍAS VER",
        "text": "Ruta correcta; versiones de Git, Node 22, npm, VS Code y curl; AWS CLI v2 instalada o incidencia registrada. Thunder Client abre New Request."
      }
    },
    {
      "type": "checklist",
      "title": "CHECKPOINT · ordenador preparado desde cero",
      "items": [
        "Tengo Windows y una ruta de trabajo acordada.",
        "He instalado Git y puedo abrir Git Bash.",
        "Node muestra v22.x.x y npm responde.",
        "He instalado VS Code y code funciona.",
        "VS Code abre D:\\DEVOPS\\04-PILARES-SERVERLESS.",
        "La terminal integrada utiliza Git Bash por defecto.",
        "Thunder Client está instalado y abre New Request.",
        "AWS CLI v2 responde o he registrado la incidencia para el bloque de despliegue.",
        "Sé que Serverless se instala localmente al crear backend en el bloque 01.",
        "Sé distinguir cuenta GitHub, autenticación de Serverless y sesión Academy."
      ]
    },
    {
      "type": "success",
      "title": "Equipo configurado · siguiente: 01 · Primer Serverless",
      "text": "Abre 01 · Primer Serverless en el menú lateral. Allí crearás backend, inicializarás npm e instalarás Serverless Framework y serverless-offline con los comandos completos. Después construirás la primera función. Conserva este workspace; no reinstales los programas en cada bloque."
    }
  ]
};
