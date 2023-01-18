import {AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {AppDispatch, PendingAction} from "../store";

export function isError(action: AnyAction) {
    return action.type.endsWith('/rejected');
}

export function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
