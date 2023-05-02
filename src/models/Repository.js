import mongoose from "mongoose"

const repositorySchema = new mongoose.Schema(
    {
        //Campos
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String, 
            required: true,
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        //Configuração do model
        timestamps: true
    }
)

export default mongoose.model("Repository", repositorySchema)