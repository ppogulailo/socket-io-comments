export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type dispatchAction<T> = (body: T) => void;

export interface IRegistration {
    toggle: boolean;
    setToggle: setState<boolean>;
}
