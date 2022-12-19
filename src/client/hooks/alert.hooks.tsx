import { useContext } from "react";
import { AlertContextType } from "../../types/alert.types";
import { AlertContext } from "../providers/AlertProvider";

export function useAlert(): AlertContextType {
    return useContext(AlertContext);
}