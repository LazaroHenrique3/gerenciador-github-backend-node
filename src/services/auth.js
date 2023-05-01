import bcrypt from "bcrypt";

export const createPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

export const checkPassword = (user, password) => bcrypt.compare(password, user.password)

