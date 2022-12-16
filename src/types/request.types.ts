// SingnUp
export interface SignUpBody {
    username: string;
    email: string;
    password: string;
}
 
// Login
export type Credentials = {
    email: string;
    password: string;
}

// Update User
export interface UpdateGeneralSettingsBody {
    username: string;
    email: string;
}