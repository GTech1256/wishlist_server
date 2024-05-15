import { Request as RequestType } from 'express';
import { RequestUser } from 'src/auth/types';

export type RequestGuard = RequestType & { user: RequestUser };
