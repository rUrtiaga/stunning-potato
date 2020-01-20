# Mascotas

# MOVIDO A : https://gitlab.com/rurtiaga/Mascotas

aplicación para encontrar mascotas perdidas

## Levantar la aplicación

### Develop :dragon:

Para levantar el entorno de desarrollo debemos contar con:

- MongoDB (ver. 4.2.X) en nuestra maquina corriendo en el puerto por defecto (27017)
- NodeJS (ver. 10.X.X)

Clonamos el repositorio.

    git clone direcciónDelRepositorio

accedemos a la carpeta, aquí se encuentran dos carpetas _"server"_ y _"client"_, vamos a correr ambos en consolas diferentes, arrancaremos por el **server**, entramos en la carpeta server y corremos lo siguiente:

    npm install && npm run dev

dejamos esta consola abierta y abrimos otra, ahora ejecutaremos el servidor de **cliente**, posicionados en la carpeta del cliente corremos el siguiente comando:

    npm install && npm start

se abrirá un navegador con la aplicación en modo de desarrollo.
