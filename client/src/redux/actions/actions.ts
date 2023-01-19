import { AnyAction } from '@reduxjs/toolkit';
import { PendingAction } from '../store';

export function isError(action: AnyAction): boolean {
  return action.type.endsWith('/rejected');
}

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
