export interface IAlertState {
    open: boolean;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info' | null;
}