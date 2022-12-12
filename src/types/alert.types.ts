export type AlertState = {
    open: boolean;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info' | null;
}