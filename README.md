# 04-PILARES-SERVERLESS

Cuaderno web de aprendizaje **Festival Control · Serverless Learning Tour**.

## Objetivo
Aprender desarrollo Serverless desde VS Code siguiendo una progresión: Node.js → Serverless Framework → serverless-offline → Thunder Client/curl → React Native/Expo → AWS Academy.

## Metodología
10 bloques asistidos (00–09) + **Entrenamiento no asistido**, única parte evaluable.

La web docente se publica mediante GitHub Pages. El proyecto que construye el alumno se trabaja aparte en `D:\DEVOPS\04-PILARES-SERVERLESS\backend` y posteriormente `mobile`.

## Preparar un Windows desde cero

El bloque **00 · Preparación** guía la descarga e instalación de Git/Git Bash, Node 22, VS Code, la carpeta del alumno, el perfil Git Bash de la terminal integrada, Thunder Client y AWS CLI v2. Cada paso incluye resultado esperado, diagnóstico y checkpoint. Requiere Windows ya instalado, Internet y los permisos del aula; si falta D: se acuerda la ruta con el profesor.

El bloque **01 · Primer Serverless** instala `serverless@4.45.0` y `serverless-offline@14.8.4` localmente, configura TypeScript estricto, compilación y módulos ESM, y explica la autenticación del Framework, independiente de AWS Academy. Las credenciales de Academy se preparan al trabajar el despliegue.

Verificación del 26/10/2026: sintaxis JavaScript, recorrido de los nueve pasos, diagnósticos, pestañas maximizadas, navegación y vista móvil comprobados en Chromium. Paquetes instalados y versión de Serverless comprobados con Node 22 en macOS. Los asistentes de instalación de Windows y el inicio de sesión del alumno requieren validación en el ordenador del aula.

## Bloque 01 · recorrido didáctico por fases

[Empezar el bloque 01](https://albertohdezakkari.github.io/04-PILARES-SERVERLESS/#primer-serverless/destino).

El bloque se organiza en **Destino → Prepara → Construye → Prueba → Entiende → Modifica → Comprueba → Cierra**. Cada fase tiene enlace propio y navegación inferior. Los archivos completos muestran ruta, responsabilidad y explicación, con copia y modo maximizado. Incluye modificación guiada del handler TypeScript, tres preguntas formativas, README, gitignore y punto de recuperación en GitHub.

El navegador conserva fase actual, pasos comprobados, casillas y respuestas. El progreso global cuenta **bloques asistidos completados de los diez existentes**; los pasos internos del 01 se muestran aparte. La evaluación sigue siendo únicamente Venue Control. Las comprobaciones son declaraciones del alumno: la web docente no ejecuta su proyecto ni valida automáticamente Windows, sus cuentas o su backend.

La modificación guiada puede conservarse al pasar al bloque 02: mantiene GET /hello y su handler. El siguiente bloque añadirá una función diferente.

## Verificar esta web docente (mantenimiento)

El package.json de este repositorio sólo contiene herramientas de prueba de la web. No es el package.json del backend que construye el alumno en su workspace.

Con Node 22:

```bash
npm ci
npx playwright install chromium
npm run verify
npm run preview
```

La previsualización abre un servidor local en `http://127.0.0.1:4184`. Las pruebas usan otro puerto, 4185. La web publicada sigue siendo HTML/CSS/JS estáticos; GitHub Pages no necesita instalar estas herramientas.

Las comprobaciones incluyen sintaxis, comprobación de tipos, compilación y ejecución del handler TypeScript inicial y modificado, recorrido completo de las fases, persistencia, recuperación de estado, preguntas y reintentos, copia, teclado, modo maximizado, navegación de los demás bloques y lectura sin desbordamiento horizontal a 320, 390 y 1440 px. Los perfiles móviles son emulación de Chromium, no una certificación en dispositivos físicos. GitHub Actions ejecuta la misma verificación.

## TypeScript es el lenguaje de partida

El alumnado ya utiliza TypeScript. El bloque 01 recupera ese conocimiento: `src/hello.ts` tipa la entrada REST con `APIGatewayProxyEvent` y la respuesta con `APIGatewayProxyResult`. `@types/aws-lambda` aporta declaraciones y no instala un SDK de AWS.

El proyecto del alumno incorpora `tsconfig.json` estricto y tres scripts: `typecheck` comprueba sin emitir, `build` genera `dist/hello.js` y `start` compila antes de ejecutar Offline. El YAML apunta a `dist/hello.handler`. El JavaScript generado no se edita ni se versiona. Los bloques 02–09 conservan este entorno TypeScript. React Native utiliza App.tsx y su propia configuración Expo.

La revisión TypeScript del bloque 01 registra comprobaciones propias. Los registros anteriores se conservan, pero no dan por comprobado automáticamente el contenido adaptado.

## Revisión eficiente por lotes

El [protocolo de revisión](docs/REVISION-POR-LOTES.md) fija el patrón del bloque 01 como referencia validable, una matriz de continuidad y los criterios de aceptación. `npm run audit` inventaría todos los bloques; `npm run verify` comprueba todos los bloques y ejecuta las pruebas de contenido, navegador y proyectos del alumno en una pasada. El informe estructural conserva por separado la revisión pedagógica y la validación del entorno real.

## Cuaderno completo revisado · 26/10/2026

Los bloques 01–09 comparten el recorrido de ocho fases validado. El 00 conserva su perfil de instalación desde cero, repartido en cinco fases; Venue Control conserva requisitos y rúbrica sin archivos solución. Todos los ejemplos de trabajo utilizan TypeScript/TSX.

La [matriz de continuidad y comprobaciones](docs/REVISION-COMPLETA.md) registra el resultado por bloque, los contratos y los límites de lo ejecutado. La vía común del cliente es React Native Web en el ordenador del aula, con Expo SDK 54 y versiones fijadas. La API es deliberadamente simulada y no persiste escrituras.

`npm run verify:course` reconstruye los proyectos desde las mismas pestañas copiables que ve el alumno: comprueba y compila los hitos backend, comprueba los cuatro hitos TSX, exporta el cliente web y ejecuta sus cinco métodos contra los handlers reales compilados mediante un harness HTTP. No utiliza credenciales ni sustituye una prueba real de Serverless Offline/AWS. La primera ejecución instala las dependencias del cliente en node_modules/.cache; requiere conexión.
