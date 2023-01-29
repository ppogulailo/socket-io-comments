import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootReducer } from '../redux/store';

export const useTypeSelector: TypedUseSelectorHook<RootReducer> = useSelector;
