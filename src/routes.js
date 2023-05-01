import {Router} from "express"

import auth from "./midlewares/auth"

import SessionsController from "./controllers/SessionsController"
import UserController from "./controllers/UserController"
import RepositoriesController from "./controllers/RepositoriesController"

const routes = new Router()

//Rotas públicas
routes.post('/sessions', SessionsController.create)

//Midleware que irá proteger as demais rotas
routes.use(auth)

//Rotas privadas
//Users
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

//Repositories
routes.get('/users/:user_id/repositories', RepositoriesController.index)
routes.post('/users/:user_id/repositories', RepositoriesController.create)
routes.delete('/users/:user_id/repositories/:id', RepositoriesController.destroy)

export default routes