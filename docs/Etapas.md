5 slot 5 semanas:

# ETAPAS:

## Etapa 1:

- [x] Crear Repositorio Git
- [x] Crear Proyecto node con:
      Express, Jest, jwt, MongoDB
- [x] Log in con JWT
- [x] Manejo de imágenes

---

##### Al Finalizar esta etapa:

Debería poder hacer las siguientes llamadas mediante API
(las respuestas están detalladas en el archivo consultas.json)
se comprobará mediante test que estén andando estas funciones.

- [x] GET /api/lostpets?location="client_location"

**Login:**

- [x] POST /api/users/id?user:''

alta usuario:

- [x] POST /api/users

---

## Etapa 2:

- [x] Manejo de SMTP Para recuperar contraseña

Al Finalizar esta etapa:
Debería poder hacer las siguientes llamadas mediante API
se comprobará mediante test que estén andando estas funciones.
Mascotas:

- [x] GET /api/pets/id/search
- [x] GET /api/pets/id/contact logeado
- [x] POST /api/users/id/pets
- [x] POST /api/users/id/pets/id/searchs

_Usuarios_:

- [x] PUT /api/users/id/pass restablecer contraseña

modificacion y obtencion de datos:

- [x] GET/PUT /api/users/id (ID SOLO LOGEADO) // REMPLAZADO POR ME

_Mascotas:_

- [x] GET /api/users/id/pets (ID SOLO LOGEADO)
- [x] DELETE /api/users/id/pets/id
- [x] GET /api/users/id/pets/id (ID SOLO LOGEADO)
- [x] PUT /api/users/id/pets/id (ID SOLO LOGEADO)
      reemplazado POST
- [x] DELETE /api/users/id/pets/id/pics/index? (ID SOLO LOGEADO)
      reemplazado por id ../pics/id
- [x] GET /api/lostpets?location="client_location"

---

## Etapa 3:

- Interfaz react
  - [ ] Buscar mascotas mediante una ubicación
  - [ ] Mostrar una mascota
  - [ ] datos de mascota
- [ ] agregar travis para que corra los test automaticos

---

## Etapa 4:

Al finalizar esta etapa deben estar andando las pantallas

- [ ] Registrar y login
- [ ] Perfil de un usuario
- [ ] mascotas usuario
- [ ] editar mascota usuario
- [ ] Cargar mascota

---

## Etapa 5:

- [ ] notificaciones

- [ ] i18n agregar idiomas
- [ ] Levantar la aplicacion en server QA
- [ ] Estabilizacion

---

---

**MAQUETADO DE PANTALLAS**

dev:
https://xd.adobe.com/spec/f4ec8892-16ea-4484-574b-5692b9e964ec-82dd/

view:
https://xd.adobe.com/view/2ab5c1c5-9469-435c-50da-afea2a70f84b-5c84/
