import { Request } from 'express';
export interface RequestModel extends Request {
  fileValidationError: string;
  user: any;
}
