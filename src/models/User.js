import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        //Campos
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String, 
            required: true
        }
    },
    {
        //Configuração do model
        timestamps: true
    }
)

export default mongoose.model("User", userSchema)