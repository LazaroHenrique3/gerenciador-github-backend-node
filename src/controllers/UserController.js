import User from "../models/User"
import { createPasswordHash } from "../services/auth"

class UsersController {

    async index(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            //Caso não encontre o usuário
            if (!user) {
                return res.status(404).json()
            }

            return res.status(200).json(user)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async create(req, res) {
        try {
            const { email, password } = req.body

            //Validando se o email já existe
            const user = await User.findOne({ email })

            if (user) {
                return res.status(422).json({ message: `User ${email} already exists.` })
            }

            //Criptografando a senha
            const passwordHash = await createPasswordHash(password)

            //Caso eu não queira retornar tudo eu posso desestruturar 
            const newUser = await User.create({ email, password: passwordHash })

            return res.status(201).json(newUser)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { email, password} = req.body

            //verificando se o usuário existe
            const user = await User.findById(id)

            if(!user){
                return res.status(404).json()
            }

            //Criptografando a nova senha
            const passwordHash = await createPasswordHash(password)

            await user.updateOne({email, password: passwordHash})
            return res.status(200).json({msg: "user updated successfully!"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            //Verificando se o usuario existe
            if(!user){
                return res.status(404).json()
            }

            await user.deleteOne()
            return res.status(200).json({msg: "successfully deleted user"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}

export default new UsersController()