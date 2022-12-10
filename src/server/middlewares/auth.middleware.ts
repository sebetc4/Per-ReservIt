import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"
import { HttpErrors } from "../../types/api.types"

export const authUser = async (req: NextApiRequest) => {
    const session = await getSession({req})
    if(!session) {
        throw HttpErrors.UNAUTHORIZED
    }
    return session.user
}