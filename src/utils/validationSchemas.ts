import * as yup from 'yup';
import { ISignInBody, ISignUpBody } from '../types/request.types';

const usernameValidation = yup
    .string()
    .strict(false)
    .trim()
    .required('Le pseudo est requis')
    .min(6, 'Le pseudo doit faire au minimum 6 caractères')
    .max(20, 'Le pseudo doit faire au maximum 20 caractères');

const emailValidation = yup
    .string()
    .strict(false)
    .trim()
    .required("L'adresse e-mail est requise")
    .email('Adresse e-mail non valide');

export const signUpSchema: yup.SchemaOf<ISignUpBody> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe doit faire au minimum 6 caractères')
        .max(40, 'Le mot de passe doit faire au maximum 20 caractères'),
});

export const signInSchema: yup.SchemaOf<ISignInBody> = yup.object().shape({
    email: emailValidation,
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe est invalide')
        .max(40, 'Le mot de passe est invalide'),
});
