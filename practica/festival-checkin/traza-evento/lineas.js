// Una explicación por cada línea no vacía de los fragmentos, en el mismo orden.
export const explicaciones = [
  [
    'Registra la función crearEvento dentro de functions. Es el identificador que usa Serverless en este archivo.',
    'Compone el nombre real. self:service lee service en este YAML. sls:stage pide a Serverless el entorno que está usando. En el ejemplo combina festival-check-in y equipo01 para formar festival-check-in-equipo01-crearEvento.',
    'Indica qué ejecutar. La ruta lleva a handler.mjs y el último .handler selecciona la función exportada dentro del archivo.'
  ],
  [
    'Importa crearEvento del archivo service.mjs, que está en la misma carpeta. Así el punto de entrada puede delegar el trabajo.',
    'export expone la función a Lambda. Las llaves extraen eventId y title del objeto de entrada. = {} permite entrar aunque se invoque sin argumento.',
    'Pasa los dos valores al service y devuelve su resultado. Con el ejemplo, llama a crearEvento(3, "Concierto de aula").',
    'Cierra el cuerpo del handler. La llamada de la línea anterior determina la respuesta.'
  ],
  [
    'Trae guardarEvento del repository. El service puede pedir que se guarde el evento mediante esa función.',
    'Declara y exporta el caso de uso con sus dos parámetros. async permite esperar la escritura y devolver el resultado cuando termine.',
    'Number.isSafeInteger comprueba que el ID sea un entero representable con precisión. ! invierte la comprobación y || significa «o». También se rechaza un ID menor que 1.',
    'throw detiene la función y devuelve un error a quien la invocó. En este camino no se llama al repository.',
    'Cierra la comprobación del ID. Si el ID es válido, la ejecución continúa con el título.',
    'Primero comprueba que title sea texto. Si lo es, trim() quita los espacios de los extremos para detectar un título compuesto solo por espacios.',
    'Detiene el alta con este mensaje si el título está vacío o tiene otro tipo. Pruébalo en el selector de la ilustración.',
    'Cierra la validación del título. Para llegar a la llamada siguiente, los dos valores deben ser válidos.',
    'Entrega ID y título al repository. await espera a que termine la escritura. Si falla, el código no alcanza el return.',
    'Devuelve un objeto con el mismo ID y título que recibió. { eventId, title } es la forma abreviada de escribir ambos nombres y valores.',
    'Cierra crearEvento. Los caminos terminan devolviendo el evento o lanzando un error.'
  ],
  [
    'Importa la acción de DynamoDB Toolbox que construye una escritura PutItem.',
    'Importa el modelo Evento. ../ sube una carpeta para localizar el archivo que define los atributos y la tabla.',
    'Declara la función que llama el service. Recibe los dos datos validados y usa async para esperar el resultado de DynamoDB.',
    'Empieza a construir el objeto JavaScript que se entregará al modelo.',
    'La propiedad eventId toma el valor del parámetro eventId. En el ejemplo vale 3.',
    'La propiedad title toma el valor del parámetro title. En el ejemplo vale «Concierto de aula».',
    'Cierra el objeto. Aún es una ficha con nombres de JavaScript.',
    'Crea una acción de escritura para la entidad Evento. A partir del modelo, Toolbox conoce la tabla y cómo preparar sus atributos.',
    'Adjunta a la acción el objeto evento que acabas de construir.',
    'Abre el objeto de opciones de escritura. Aquí se incluye la regla que protege la clave.',
    'Pide a DynamoDB que escriba si la clave del ítem aún no existe. El modelo transforma eventId a EVENT_ID. DynamoDB comprueba la condición al escribir.',
    'Cierra las opciones y termina de preparar el comando. Todavía falta enviarlo.',
    'Envía el comando y espera la respuesta. Si el ID ya existe, DynamoDB rechaza la escritura y conserva el título original.',
    'Cierra guardarEvento. Si la escritura terminó bien, el control vuelve al service.'
  ],
  [
    'Importa Entity, la pieza de Toolbox que describe un tipo de ítem.',
    'Importa Table, que conecta el modelo con una tabla de DynamoDB.',
    'Importa item, que agrupa los atributos que forman el esquema del evento.',
    'Importa string, con el que el esquema declara atributos de texto.',
    'Importa number, con el que el esquema declara atributos numéricos.',
    'Importa el cliente compartido db y el nombre de tabla que recibe Lambda en su entorno.',
    'Empieza a definir la tabla que utilizará el modelo.',
    'Usa el nombre de tabla del despliegue. Para equipo01, el ejemplo es FCI_EVENTOS_equipo01.',
    'Indica a Toolbox que envíe sus operaciones a través del cliente compartido.',
    'Configura EVENT_ID como clave de partición numérica. El nombre y el tipo deben coincidir con serverless.yml.',
    'Cierra la definición de la tabla. Aquí se configura el acceso desde el código. La infraestructura se crea al desplegar el YAML.',
    'Crea y exporta el modelo que importa el repository.',
    'Da a la entidad el nombre Evento dentro de Toolbox.',
    'Vincula la entidad con la tabla que acabas de definir.',
    'Desactiva el atributo interno que Toolbox puede guardar para identificar el tipo de entidad.',
    'Desactiva las fechas automáticas de creación y actualización del modelo.',
    'Abre el esquema donde se declaran los atributos que entiende el código.',
    'eventId es numérico, admite BigInt y forma la clave. savedAs indica que se guarda con el nombre EVENT_ID.',
    'title es texto. savedAs indica que el nombre de la columna en DynamoDB es TITLE.',
    'Cierra el esquema de los atributos de Evento.',
    'Cierra la configuración de la entidad. El repository ya puede utilizar este modelo para construir el PutItem.'
  ],
  [
    'Obtiene los milisegundos de la hora actual como número y los guarda en evento_id para esta prueba.',
    'Imprime el ID para que puedas relacionar la invocación con la lectura posterior.',
    'Inicia una invocación directa de Lambda mediante AWS CLI. La barra al final continúa el comando en la línea siguiente.',
    'Construye el nombre de la función usando el mismo código de equipo con el que desplegaste.',
    'Selecciona las credenciales del laboratorio y la región donde está la función.',
    'Indica a AWS CLI v2 que el contenido de --payload se introduce directamente en JSON.',
    'Entrega a Lambda los dos datos que espera el handler. El ID viaja como número y el título como texto.',
    'Guarda el cuerpo de respuesta en un archivo. && ejecuta cat si el comando AWS CLI termina bien. Revisa además si la invocación muestra FunctionError.',
    'Muestra lo que devolvió el handler. Comprueba el ID y el título.'
  ],
  [
    'Solicita a DynamoDB un único ítem por su clave primaria.',
    'Indica el nombre de la tabla de eventos del equipo.',
    'Selecciona la misma sesión y región del despliegue.',
    'Busca por EVENT_ID. N indica que la clave es numérica, aunque AWS CLI represente el número entre comillas en este formato.',
    'Pide una lectura consistente, muestra solo Item y presenta la salida en JSON.'
  ]
];
