# movies.js
  version       : 0.0.0
  author         : Alfonso Figueroa Rojas
  description : Trabajo práctico de la primera semana del curso de MongoDB para node.js es un catálogo de películas,
                         usa la bd video, y la collection movies, que tiene los campos ["title","year","value"].

# contenido
  ./package.json                            ** fichero de dependencias del node.js
  ./moviesedit.js                            ** fichero javascript con la lógica node.js
  ./htmlviews/movies.html          ** plantilla con el listado de las películas en la base de datos
  ./htmlviews/insertmovie.html  ** plantilla con el formulario para registrar una película nueva.
  ./dump/video/                             ** volcado con unos valores de muestra para la base de datos de películas

# Instrucciones de uso
  - Descargar todo a un directorio local
  - Ejecutar en mongod si no está ya corriendo
  - Abrir un terminal de comandos
  - Desplazarse al directorio moviecatalog  en un shell y ejecutar el comando:
            mongorestore --collection movies --db video ./dump/video/movies.bson          
  - Desplazarse al directorio moviecatalog  en un shell y ejecutar el comando:
            npm install
  - Desplazarse al directorio moviecatalog  en un shell y ejecutar el comando:
            node ./moviesedit.js
  - Se recibirá la siguiente respuesta: "Express server listening on port 3000"
  - Acceder a la dirección localhost:3000 o bien <hostname>:3000 si estamos accediendo desde otro dispositivo de la red

# Prerrequisitos
  - Disponer de node.js instalado
  - Tener el servidor de mongod funcionando y aceptando peticiones
  - Conexión a internet para que funcionen los links a www.imdb.com
