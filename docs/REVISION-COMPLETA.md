# Revisión completa del cuaderno · 26/10/2026

## Referencia y alcance

Se aplica a todos los bloques el enfoque validado del 01 y las instrucciones docentes del proyecto: conceptos antes del código, archivos completos y explicados, prueba por capas, diagnóstico, modificación pequeña, comprensión y cierre recuperable. La identidad del cuaderno sigue siendo azul/cian/blanco; la interfaz de Festival Control, negra/rosa.

Los bloques 01–09 usan Destino → Prepara → Construye → Prueba → Entiende → Modifica → Comprueba → Cierra. El 00 usa cinco fases adecuadas a instalar y configurar Windows; conserva los nueve pasos de preparación. Venue Control mantiene su perfil de transferencia, referencia visual y rúbrica de 100 puntos, sin receta ni archivos solución.

No se crea una aplicación dentro de la web docente. Los archivos mostrados pertenecen al proyecto acumulativo del alumno: D:\DEVOPS\04-PILARES-SERVERLESS, con backend y mobile separados. No se modifica el producto independiente Festival Control Amplify.

## Matriz de continuidad

| Bloque | Entrada → incremento | Archivos y contrato de salida | Comprobación o cambio guiado |
| --- | --- | --- | --- |
| 00 | Windows → herramientas y puesto de trabajo | Git/Bash, Node 22, npm, VS Code, carpeta, terminal, Thunder, AWS CLI v2 | Versiones, PATH, carpeta y distinción entre cuentas |
| 01 | Puesto preparado → primera Lambda local | hello.ts, tsconfig, scripts y YAML con dist/hello.handler | GET /hello, compilación, modificación tipada y preguntas |
| 02 | Backend 01 → parámetro dinámico | getEvent.ts y YAML acumulado | Dos ids reflejados; tercer id como cambio. La ficha sigue simulada |
| 03 | GET de 02 → JSON de entrada | createEvent.ts y YAML; 201 o 400 | JSON roto, campos ausentes, hora y estado inválidos; no almacena POST |
| 04 | Backend 03 → contrato CRUD organizado | events/model.ts + seis handlers; siete funciones incluido hello | Catálogo EVT-101/102, 400/404, PUT completo, PATCH sólo status, OPTIONS y CORS |
| 05 | API 04 → cliente local TSX | package/app/tsconfig, types.ts, App.tsx, gitignore | Dos tarjetas locales, selección y reinicio del estado; sin HTTP |
| 06 | Cliente 05 + API 04 → GET integrado | api.ts y App.tsx | Network 200, caída/recuperación de backend y ruta errónea |
| 07 | GET 06 → cuatro acciones de escritura | api.ts completo y App.tsx completo | POST 201; PUT/PATCH/DELETE 200; resultado visible y catálogo fijo |
| 08 | Backend 04 + puesto completo → despliegue | YAML acumulado con región, servicio individual y rol existente | Perfil temporal academy, STS, paquete, deploy, endpoint y logs |
| 09 | Cliente 07 + endpoint 08 → integración cloud | api.ts completo con URL base sustituible; App.tsx conservado | Cinco métodos en Network, Offline detenido y trazas cloud |
| Entrenamiento | Tour completo → Venue Control | Nuevo dominio /zones; tipos y decisiones del alumno | Contrato, referencia de cuatro vistas, evidencias y rúbrica, sin solución |

En 04 el GET deja de reflejar cualquier identificador: busca en el catálogo fijo y devuelve 404 si no existe. También pasa a exigirse status en POST y PUT. Estos cambios están anunciados antes de utilizarse y se conservan en el cliente. Se mantienen los archivos antiguos de 02–03 como evidencia, aunque el nuevo YAML invoca los handlers organizados.

Las escrituras de 04–09 son simuladas. Devuelven el resultado de la operación sin modificar catalog. El frontend muestra ese resultado y conserva las tarjetas: no finge persistencia con cambios locales. El entrenamiento admite el mismo alcance, declarado y defendido.

Cada bloque 02–09 añade su evidencia en evidencias/NN/README.md y comandos Git con rutas concretas. Se conserva el README inicial y todo el historial. El progreso sólo registra bloques comprobados por el alumno; la web no ejecuta ni certifica su proyecto.

## Pruebas reproducibles

Con Node 22, npm ci y Chromium de Playwright instalado: `npm run verify`.

- Auditoría estricta de los once perfiles: cobertura de estructura y componentes, con preparación y evaluación tratadas por separado.
- Pruebas de contenido: estructura, detección de omisiones, tipado, compilación, ejecución y rechazo de tipos incorrectos en el bloque de referencia.
- Veinte pruebas de navegador: escritorio y emulación móvil; navegación, versiones del progreso, guardado, preguntas/reintentos, copia, teclado, maximizado y todos los nuevos recorridos. Referencia a 320/390/1440 px; nuevos bloques a 390/1440 px.
- Reconstrucción del proyecto a partir de los archivos completos de Construye: no hay una copia alternativa mantenida a mano.
- Backend 02, 03, 04 y 08: TypeScript estricto, compilación y parseo YAML; correspondencia entre handler y archivo generado; siete funciones acumuladas en 04/08.
- Ejecución de contratos: GET lista/detalle, id ausente/desconocido, creación, sustitución, cambio parcial, eliminación, JSON roto, formas incorrectas, hora/estado/campos inválidos y catálogo intacto tras escrituras.
- Cliente 05, 06, 07 y 09: comprobación de tipos TSX sobre los archivos exactos de sus pestañas.
- Cliente final: exportación Expo Web, carga de tarjetas, cinco métodos mediante navegador contra handlers compilados, respuestas en pantalla, CORS, red caída y ancho móvil. Para esta prueba se sustituye exclusivamente API_URL por un servidor HTTP de verificación.

El servidor de verificación adapta peticiones HTTP a eventos de los handlers; no ejecuta Serverless Offline, no comprueba su autenticación y no despliega AWS. La prueba CORS del harness comprueba el cliente y los headers de los handlers; el preflight real de Offline/API Gateway debe ejecutarse siguiendo Prueba del bloque 04/09.

## Validación que requiere el aula

Antes de la clase, el profesor debe comprobar un puesto Windows y una sesión del laboratorio con estas mismas instrucciones:

1. Instalaciones permitidas, unidad D: o ruta acordada, Node 22.13+ de la rama 22, PATH y Git Bash integrado.
2. Descarga de dependencias y autenticación/licencia aplicable de Serverless Framework v4. La cuenta Framework es independiente de AWS Academy.
3. `npm start` y peticiones de Prueba en 01/04, incluido preflight OPTIONS. El firewall o proxy del centro puede afectar instalaciones y conexiones.
4. Start Lab, credenciales actuales, cuenta y región correctas, rol Lambda existente y autorizado. El Arn de STS no es el ARN del rol de ejecución.
5. Permisos reales del lab para CloudFormation, S3, Lambda, API Gateway, CloudWatch y pasar el rol. Un lab Academy concreto puede restringirlos; una identidad STS válida no prueba esos permisos.
6. Package → deploy → info → curl/Thunder → React Native Web → logs con el servicio y código de alumno correctos.

No se han ejecutado instaladores Windows ni despliegues en la cuenta Academy del aula desde esta revisión. Estas comprobaciones no se presentan como superadas. Los bloques incluyen resultado, diagnóstico y punto de parada para cada dependencia externa. No se solicitan claves por chat ni se incorporan al cliente o al repositorio.

La ejecución principal del cliente es React Native Web en el PC, con versiones fijadas de Expo SDK 54. Un teléfono es opcional: necesita cliente compatible, URL LAN del PC y conectividad permitida; localhost en el teléfono no apunta al ordenador.

## Fuentes técnicas contrastadas

- [Expo: desarrollo web, dependencias, arranque y exportación](https://docs.expo.dev/workflow/web/).
- [AWS CLI: archivos de configuración y perfiles temporales](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).
- [Serverless Framework: funciones y rol IAM existente](https://www.serverless.com/framework/docs/providers/aws/guide/functions).

El mecanismo reduce decisiones repetidas y ejecuta el lote completo, conservando revisión didáctica, visual y límites de evidencia. Una estructura completa o una prueba del harness no equivalen a certificar un laboratorio externo.
