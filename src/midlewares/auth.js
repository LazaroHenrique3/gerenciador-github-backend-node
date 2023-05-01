import jwt from "jsonwebtoken"
import authConfig from "../config/auth"
import {promisify} from "util"

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    //Verifica se o header foi enviado
    if(!authHeader) {
        return res.status(401).json({msg: "Token was not provided."})
    }

    //Bearer XXXXX
    const [, token] = authHeader.split(' ')

    try {
        //Comparadno os tokens
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)

        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({msg: "invalid token."})
    }
}