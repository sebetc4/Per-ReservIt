import { createContext, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AlertContextType, AlertState } from '../../types/alert.types';

export const AlertContext = createContext<AlertContextType>({} as any);

const initialState: AlertState = {
    open: false,
    type: null,
    message: '',
};

export default function AlertContextProvider({ children }: PropsWithChildren) {
    
    // State
    const [state, setState] = useState<AlertState>(initialState);

    const setAlert = ({ type, message }: Alert) => {
        setState({
            open: true,
            type,
            message,
        });
    };

    const closeAlert = () => {
        setState((prev) => ({
            ...prev,
            open: false,
        }));
    };

    const removeAlert = () => {
        setState(initialState);
    };

    return (
        <AlertContext.Provider
            value={{
                state,
                setAlert,
                closeAlert,
                removeAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
}
