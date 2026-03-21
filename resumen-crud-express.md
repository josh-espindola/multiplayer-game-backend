# Resumen — CRUD Express sin DB

## 1. Estructura de carpetas (por feature)

```
project/
├── users/
│   ├── users.controller.js
│   ├── users.router.js
│   ├── users.service.js
│   ├── users.schema.js
│   └── users.validation.js
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
└── index.js
```

**Regla:** todo lo específico de un recurso va junto en su carpeta.
`utils/` es solo para herramientas genéricas que cualquier recurso puede usar.

---

## 2. La cadena siempre es la misma

```
Request → index.js → router → [validator] → controller → service → response
```

Cada capa tiene una sola responsabilidad:

| Capa | Responsabilidad |
|------|----------------|
| `index.js` | Middlewares globales + montar routers |
| `router` | Definir rutas y conectar middlewares/controllers |
| `validator` | Validar req.body con Zod antes de llegar al controller |
| `controller` | Leer req → llamar service → enviar res.json() |
| `service` | Lógica pura — manipula datos, lanza errores |

---

## 3. De dónde viene cada dato en el controller

```js
const { id } = req.params      // /users/:id  → la URL
const { email, password } = req.body   // JSON del request body
const { page } = req.query     // /users?page=2 → query string
```

**Siempre desestructuras** — `req.params` es un objeto, no un string directo.

---

## 4. Pasar datos al service — objetos siempre

```js
// Controller
const { id } = req.params
const { email, password } = req.body
const user = await editUserByIdService({ id, email, password })  // objeto

// Service
const editUserByIdService = async ({ id, email, password }) => { // desestructura
    // lógica
}
```

**Por qué objetos:** el orden no importa, y si agregas campos nuevos no rompes nada.

---

## 5. asyncHandler — para no repetir try/catch

```js
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        next(err)  // manda el error al error handler global
    }
}
```

Todos los controllers van envueltos en asyncHandler:
```js
const getUser = asyncHandler(async (req, res, next) => {
    // si esto lanza error, asyncHandler lo atrapa y lo manda al global handler
})
```

---

## 6. AppError — errores controlados

```js
throw new AppError("Usuario no encontrado", 404)
```

El error handler global en `index.js` lo atrapa y responde:
```js
app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    res.status(status).json({ message: err.message })
})
```

**Regla de status codes:**
- `400` → petición malformada (datos inválidos, usuario ya existe)
- `404` → recurso no encontrado
- `500` → error inesperado del servidor

---

## 7. Validaciones en el service — siempre antes de operar

```js
// Antes de buscar por id
const user = users.find(u => u.id === id)
if (!user) throw new AppError("Usuario no encontrado", 404)

// Antes de eliminar
const index = users.findIndex(u => u.id === id)
if (index === -1) throw new AppError("Usuario no encontrado", 404)

// Antes de crear — evitar duplicados
if (users.find(u => u.email === email)) throw new AppError("Email ya existe", 400)
```

---

## 8. Mutar arrays en memoria

```js
// Agregar
users.push(nuevoUsuario)

// Modificar — directo sobre el objeto, no reasignar
const user = users.find(u => u.id === id)
user.email = nuevoEmail        // modifica el objeto original en el array
user.password = nuevaPassword

// Eliminar — splice muta el array directo, sin reasignar
const index = users.findIndex(u => u.id === id)
users.splice(index, 1)         // no necesitas users = users.splice(...)
```

---

## 9. Content-Type en Postman

Siempre que mandes body → agregar header:
```
Content-Type: application/json
```

Sin este header, `express.json()` no parsea el body y llega `undefined`.

---

## 10. Endpoints REST del CRUD

| Método | Ruta | Qué hace |
|--------|------|----------|
| `GET` | `/users` | Listar todos |
| `GET` | `/users/:id` | Obtener uno |
| `POST` | `/users` | Crear |
| `PATCH` | `/users/:id` | Actualizar parcial |
| `DELETE` | `/users/:id` | Eliminar |

**PUT vs PATCH:** PUT reemplaza todo el objeto. PATCH solo actualiza los campos que mandas.

---

## Próximo tema: MongoDB y Mongoose

Lo que cambia: solo el **service** — en vez de manipular un array en memoria, haces queries a la DB.
El controller, router, validator y asyncHandler no se tocan.
