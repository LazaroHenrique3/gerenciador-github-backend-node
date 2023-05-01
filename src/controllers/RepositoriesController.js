import User from "../models/User"
import Repository from "../models/Repository"

class RepositoriesController {

    async index(req, res) {
        try {
            const { user_id } = req.params
            const { q } = req.query

            const user = await User.findById(user_id)

            //Verificando se o usuário existe
            if (!user) {
                return res.status(404).json()
            }

            //Configurando a busca
            let query = {}

            if(q){
                query = {url: {$regex: q}}
            }

            //Buscando os repositórios
            const repositories = await Repository.find({
                userId: user_id,
                ...query
            })

            return res.json(repositories)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params
            const { name, url } = req.body

            //Verificando se o usuário existe
            const user = await User.findById(user_id)
            
            if (!user) {
                return res.status(404).json()
            }

            //Verificando se o repositório já existe
            const repository = await Repository.findOne({
                userId: user_id,
                url
            })

            if (repository) {
                return res.status(422).json({ msg: `Repository ${name} already exists.` })
            }

            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            })

            return res.status(201).json(newRepository)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async destroy(req, res) {
        try {

            const { user_id, id } = req.params

            //Verificando se o usuário existe
            const user = await User.findById(user_id)

            if (!user) {
                return res.status(404).json()
            }

            //Verificando se o repositório já existe
            const repository = await Repository.findOne({
                userId: user_id,
                _id: id
            })

            if (!repository) {
                return res.status(404).json()
            }

            await repository.deleteOne()
            return res.status(200).json({msg: "successfully deleted repository"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

}

export default new RepositoriesController()
