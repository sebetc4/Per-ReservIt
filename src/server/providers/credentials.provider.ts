import { CustomError } from "../../types/api.types";
import { Credentials } from "../../types/request.types";
import { signInSchema } from "../../utils/validationSchemas";
import dbConnect from "../config/db.config";
import { findUserByEmail } from "../queries/user.queries";


const validCredentials = async (credentials: Credentials) => {
    const { email, password } = credentials;
    if (!(await signInSchema .isValid({ email, password }))) {
        throw new Error(CustomError.BAD_REQUEST.message);
    }
    return credentials;
};

export const handleCredentialsProvider = async (credentials: Credentials) => {
    await dbConnect();
    const { email, password } = await validCredentials(credentials);
    const user = await findUserByEmail(email);
    if (user.authProvider !== 'credentials') {
        throw new Error(CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message)
    }
    if (!(await user.isValidPassword(password))) {
        throw new Error(CustomError.WRONG_PASSWORD.message);
    }
    return user;
}
