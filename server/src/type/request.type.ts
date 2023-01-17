import { Request } from 'express';
import { User } from '@prisma/client';
export interface RequestModel extends Request {
  fileValidationError: string;
  user: User;
}
