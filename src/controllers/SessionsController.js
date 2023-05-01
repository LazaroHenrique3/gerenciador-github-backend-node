import jwt from "jsonwebtoken"

import User from "../models/User"
import { checkPassword } from "../services/auth";

import authConfig from "../config/auth"

class SessionController {
    async create(req, res) {

        //Vindos do form de login
        const {email, password} = req.body

        //Carregando o usuario
        const user = await User.findOne({email})

        //Verificando se o usuario foi encontrado
        if(!user){
            return res.status(401).json({msg: "User / password invalid."})
        }
        
        //verificando se a senha está correta
        const isPassword = await checkPassword(user, password)

        if(!isPassword){
            return res.status(401).json({msg: "User / password invalid."})
        }

        //Resgatando o id do usuario
        const { id } = user

        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();