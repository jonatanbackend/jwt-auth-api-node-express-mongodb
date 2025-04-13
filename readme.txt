# API de Autenticación con JWT y Roles

Esta es una API de autenticación construida con Node.js, Express y JWT, que incluye rutas para el registro, inicio de sesión, perfil de usuario y administración de usuarios. La API implementa roles de usuario (`usuario`, `admin`) y protege ciertas rutas con autenticación.

## Características

- **Registro de usuario**: Permite registrar un nuevo usuario con un `username`, `email` y `password`.
- **Login**: Permite iniciar sesión con `email` y `password`, generando un token JWT para acceder a rutas protegidas.
- **Logout**: Cierra la sesión del usuario, invalidando su token JWT.
- **Perfil de usuario**: Permite obtener y actualizar el perfil del usuario autenticado.
- **Administración de usuarios**: Los administradores pueden obtener todos los usuarios y eliminar usuarios por ID.

## Tecnologías

- **Node.js**: Entorno de ejecución JavaScript.
- **Express**: Framework para construir la API.
- **JWT (JSON Web Token)**: Para autenticar y autorizar usuarios.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios y sesiones.
- **Swagger**: Para la documentación interactiva de la API.

## Requisitos

- **Node.js**: Asegúrate de tener Node.js instalado. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **MongoDB**: Necesitarás una base de datos MongoDB. Puedes usar MongoDB Atlas para crear una base de datos en la nube.

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/nombre-del-repositorio.git
   cd nombre-del-repositorio
Instala las dependencias:

bash
Copiar
Editar
npm install
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega tus variables de entorno:

bash
Copiar
Editar
PORT=5000
MONGO_URI=mongodb://localhost:27017/mi-base-de-datos
JWT_SECRET=tu-secreto-jwt
Inicia el servidor:

bash
Copiar
Editar
npm start
El servidor debería estar corriendo en http://localhost:5000.

Rutas de la API
Registro de usuario
POST /api/auth/register

Body:

json
Copiar
Editar
{
  "username": "tuusername",
  "email": "tuemail@dominio.com",
  "password": "tuContraseña"
}
Respuesta:

201: Usuario registrado exitosamente.

400: Error en los datos enviados.

Iniciar sesión
POST /api/auth/login

Body:

json
Copiar
Editar
{
  "email": "tuemail@dominio.com",
  "password": "tuContraseña"
}
Respuesta:

200: Login exitoso, devuelve el token JWT.

401: Credenciales incorrectas.

Obtener perfil del usuario autenticado
GET /api/auth/profile

Autenticación: Requiere un token JWT en el header Authorization: Bearer <token>.

Respuesta:

200: Perfil del usuario.

401: No autorizado.

Actualizar perfil del usuario autenticado
PUT /api/auth/profile

Body:

json
Copiar
Editar
{
  "username": "nuevoUsername",
  "email": "nuevoEmail@dominio.com"
}
Respuesta:

200: Perfil actualizado.

400: Datos inválidos.

Obtener todos los usuarios (solo admin)
GET /api/auth/users

Autenticación: Requiere un token JWT con rol de admin.

Respuesta:

200: Lista de usuarios.

403: Acceso prohibido.

Eliminar un usuario (solo admin)
DELETE /api/auth/users/{id}

Parámetros:

id: ID del usuario a eliminar.

Autenticación: Requiere un token JWT con rol de admin.

Respuesta:

200: Usuario eliminado.

404: Usuario no encontrado.

Documentación Swagger
La API está documentada usando Swagger. Para ver la documentación interactiva de la API, abre http://localhost:5000/api-docs después de iniciar el servidor.

Contribuciones
Si deseas contribuir, por favor realiza un fork del repositorio, crea una nueva rama para tus cambios y envía un pull request.

Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

markdown
Copiar
Editar

### Pasos siguientes:

1. **Guardar el archivo**: Guarda este contenido como `README.md` en la raíz de tu repositorio.
2. **Sube tu proyecto**: Si no lo has hecho ya, sube tu proyecto al repositorio de GitHub.
3. **Verifica el README**: Cuando tu repositorio esté en GitHub, podrás ver el archivo README directamente en la página principal de tu repositorio.
