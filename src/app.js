import express from "express"
import cors from "cors"

import routes from "./routes"

//Ja foi executado durante a exportação
import "./database"

class App{
    constructor(){
        this.server = express()
        this.middlewares()
        this.routes()
    }

    //Midleares são funções que vão ser executada até chegar na nota
    middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server