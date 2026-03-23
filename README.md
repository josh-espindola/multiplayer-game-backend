# API REST - Users + Auth
Node.js + Express + MongoDB + JWT

## Stack
- Node.js / Express
- MongoDB / Mongoose  
- JWT + bcrypt
- Socket.io

## Endpoints
POST /api/auth/login
POST /api/users/register
GET /api/users
PATCH /api/user:id
DELETE /api/user:id

## Sockets
Servidor WebSocket integrado con Express.

### Rooms
- `global` — todos los usuarios conectados al iniciar sesión
- `mapa-{id}` — usuarios conectados a un mapa específico

### Eventos
| Evento | Dirección | Descripción |
|--------|-----------|-------------|
| `joinMap` | cliente → servidor | unirse a un mapa |
| `msj` | bidireccional | mensaje al chat global |
| `msgOnMap` | bidireccional | mensaje al chat del mapa |

