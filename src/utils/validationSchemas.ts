import * as yup from 'yup';
import {
    Credentials,
    ForgotPasswordBody,
    SignUpBody,
    UpdateAccountBody,
    UpdatePasswordBody,
    UpdateProfileBody,
} from '../types/request.types';

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

export const signUpSchema: yup.SchemaOf<SignUpBody> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe doit faire au minimum 6 caractères')
        .max(40, 'Le mot de passe doit faire au maximum 20 caractères'),
});

export const signInSchema: yup.SchemaOf<Credentials> = yup.object().shape({
    email: emailValidation,
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe est invalide')
        .max(40, 'Le mot de passe est invalide'),
});

export const updateAccountSchema: yup.SchemaOf<UpdateAccountBody> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
});

export const updateProfileSchema: yup.SchemaOf<UpdateProfileBody> = yup.object().shape({
    avatar: yup.string(),
});

export const updatePasswordSchema: yup.SchemaOf<UpdatePasswordBody> = yup.object().shape({
    currentPassword: yup
        .string()
        .required('Mot de passe incorrect')
        .min(6, 'Mot de passe incorrect')
        .max(40, 'Mot de passe incorrect'),
    newPassword: yup
        .string()
        .notOneOf([yup.ref('currentPassword')], 'Le nouveau mot de passe doit être diffèrent du mot de passe actuel')
        .required('Le nouveau mot de passe est requis')
        .min(6, 'Le mot de passe est invalide')
        .max(40, 'Le mot de passe est invalide'),
    confirmPassword: yup
        .string()
        .required('La confirmation du mot de passe est requise')
        .oneOf([yup.ref('newPassword')], 'Les mots de passe ne sont pas identique'),
});

export const forgotPasswordSchema: yup.SchemaOf<ForgotPasswordBody> = yup.object().shape({
    email: emailValidation,
});
