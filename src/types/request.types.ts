// SingnUp
export type SignUpBody = {
    username: string;
    email: string;
    password: string;
};

// Login
export type Credentials = {
    email: string;
    password: string;
};

// Update User
export type UpdateAccountBody = {
    username: string;
    email: string;
};

export type UpdateProfileBody = {
    avatar?: string
}

export type UpdatePasswordBody = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export type ForgotPasswordBody = {
    email: string
}