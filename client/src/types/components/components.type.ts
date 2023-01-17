import {ReactNode} from "react";

//Modal
export interface IModalProp {
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
    isLoading?: boolean | null;
}