import {} from '';
import { IAdmin, IMember } from './src/common/types/commonTypes';

declare global {
  namespace Express {
    interface Request {
      admin: IAdmin;
      member: IMember;
      upFiles: string[];
    }
  }
}
