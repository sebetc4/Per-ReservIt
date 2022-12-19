import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { CustomError } from "../../types/api.types"
import { UserInstance } from "../../types/user.types"
import { User } from "../models/User.model"

export const authUser = async (req: NextApiRequest) => {
    const token = await getToken({req})
    if(!token) {
        throw CustomError.UNAUTHORIZED
    } 
    const user: UserInstance | null = await User.findById(token.sub)
    if(!user) {
        throw CustomError.INVALID_TOKEN
    } 
    return user
}