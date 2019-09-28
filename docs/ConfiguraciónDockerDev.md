## Mongo

Para tener siempre la ultima version de mongo sin complicaciones y en cualquier maquina se presenta la forma de instalarlo mediante contenedores.
Hay que tener docker instalado e instalar mongo

     docker pull mongo

para correr el contenedor en el puerto por defecto en la maquina realizamos el siguiente comando, con el -v se especifica el directorio en la maquina actual y donde va a montarlo dentro del contenedor.

     docker run --name mongo4.2 -p 27017:27017 -v /home/urti/db/mascotasDockerDB:/data/db -d mongo

cualquier problema: https://hub.docker.com/_/mongo?tab=description
