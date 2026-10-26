# Revisión de cuadernos por lotes

El bloque 01 en TypeScript es la referencia de trabajo. La validación del docente fija su enfoque pedagógico, didáctico y visual antes de extenderlo al resto. Una prueba técnica superada no sustituye esa validación.

## Lo que se reutiliza

- Motor de fases, navegación, guardado, progreso y revisión de contenidos por versión.
- Componentes de objetivos/destino, conceptos, preparación, archivos completos, explicación, modificación, preguntas y cierre.
- Identidad azul/cian/blanco del cuaderno y negra/rosa del producto.
- TypeScript como conocimiento previo; código completo y comandos comprobables.
- Pruebas existentes de navegador, compilación, tipado y respuestas de ejemplo.

La interfaz compartida ya admite distintos números y títulos de bloque, resultados esperados y mensajes de cierre. Cada nuevo bloque se describe con datos; no se vuelve a escribir su interfaz ni su CSS.

## Secuencia de trabajo

1. **Fijar la referencia validada.** Registrar qué aspectos han sido aprobados. Cambiar ese patrón requiere una razón explícita; mejorar un contenido no autoriza a variar su gramática visual.
2. **Auditar todos los bloques en una pasada.** `npm run audit` señala carencias estructurales y mantiene separadas las comprobaciones manuales. `npm run audit -- --json` permite procesar el inventario como datos.
3. **Preparar una matriz de continuidad.** Para cada bloque: entrada, incremento aprendido, archivos completos, comandos, contrato HTTP, resultado, diagnóstico, modificación, comprensión y evidencia. Antes de redactar, resolver contradicciones entre bloques consecutivos.
4. **Adaptar el contenido por lotes.** Backend 02–04; cliente e integración 05–07; despliegue y cloud 08–09. Conservar la preparación 00 y el entrenamiento como perfiles propios. No mezclar sus requisitos con los de una función HTTP.
5. **Aplicar el contrato automáticamente a cada bloque adaptado.** `node scripts/audit-lessons.cjs --strict primer-serverless,get,post` exige que los bloques nombrados cubran su estructura. El modo estricto falla si falta un criterio o el ID no existe. Los bloques todavía no adaptados aparecen como pendientes en el inventario general.
6. **Verificar el lote completo una vez.** Ejecutar compilación, tipado, casos de uso y pruebas de navegador. Añadir sólo las pruebas de los comportamientos nuevos. Si aparece un fallo, corregirlo y verificar lo afectado; repetir la comprobación común cuando sea necesario por esos cambios.
7. **Revisión pedagógica y visual dirigida.** Comprobar la coherencia con el patrón y los casos específicos del lote. Revisar capturas, rutas, archivos, explicaciones y secuencia; no volver a auditar el cuaderno desde cero en cada iteración.
8. **Publicar el lote y comprobar sus enlaces.** Un punto de publicación por lote, con resultado técnico y pendientes reales. No afirmar una instalación Windows o un despliegue AWS que no se hayan ejecutado.

## Contrato de aceptación

| Dimensión | Comprobación obligatoria |
| --- | --- |
| Orientación | Objetivo, conocimientos previos reales, resultado visible y siguiente paso |
| Conceptos | Explicar antes de usar; recuperar TypeScript sin tratarlo como lenguaje nuevo |
| Preparación | Directorio, comandos, qué generan y estructura resultante |
| Construcción | Archivos completos; ruta, responsabilidad, sintaxis explicada y copia |
| Pruebas | Acción → respuesta concreta → evidencia → diagnóstico dirigido |
| Comprensión | Correspondencia código/comportamiento; predicción y explicación |
| Transferencia guiada | Cambio pequeño, condiciones, resultado y comprobación |
| Cierre | Evidencia, documentación breve, versión recuperable y continuidad |
| Uso | Fases, navegación persistente, progreso real, guardado y teclado |
| Visual | Patrón validado, lectura compacta, código legible y móvil sin desbordamiento |
| Evaluación | Sólo Venue Control es evaluable; mantener transferencia sin receta |

La auditoría automática comprueba presencia, forma y algunas condiciones objetivas. No demuestra que una explicación sea buena, que una petición y su diagnóstico sean coherentes o que el entorno de aula funcione. Estas decisiones se revisan usando la matriz y las pruebas pertinentes. “ESTRUCTURA OK” nunca significa “100 % certificado”.

## Perfiles que requieren comprobaciones propias

- **00, preparación:** instalación, PATH, permisos, ruta de trabajo y entorno real de Windows.
- **Backend 01–04:** tipos, compilación, handlers, YAML y casos HTTP; distinguir simulación de persistencia.
- **Cliente e integración 05–07:** TSX, ejecución de Expo, estados de carga/error, red y correspondencia con el contrato backend.
- **AWS y cloud 08–09:** sesión, perfil, región, rol autorizado, despliegue y endpoint comprobado en el laboratorio. No convertir una limitación de acceso en un fallo del alumno.
- **Entrenamiento:** requisitos, evidencia y rúbrica; no introducir archivos solución ni procedimientos asistidos.

Se conserva el proyecto acumulativo del cuaderno. La regla genérica de ejercicios independientes se adapta mediante hitos recuperables; no se impone una nueva arquitectura de entregas sin necesidad.

## Comandos del mecanismo

```bash
# Inventario de todo el cuaderno, sin modificar contenidos
npm run audit

# Comprobación obligatoria de la referencia
npm run audit:reference

# Auditoría estructural de la referencia + pruebas técnicas y de navegador
npm run verify
```

Los criterios proceden de PROMPT-CUADRNOS.txt, VISUAL.txt y visual-2.txt, junto con el contexto específico de este proyecto. El mecanismo evita repetir decisiones de diseño y comprobaciones manuales que ya cubren las herramientas; no reduce la exigencia de aceptación.

## Aplicación al cuaderno completo

La adaptación 00–09 está registrada en [REVISION-COMPLETA.md](REVISION-COMPLETA.md). `npm run audit:all` exige cobertura de los once perfiles; `npm run verify` agrega los contratos compilados y el cliente exportado. Se conserva audit:reference para comprobar aisladamente el patrón original.
