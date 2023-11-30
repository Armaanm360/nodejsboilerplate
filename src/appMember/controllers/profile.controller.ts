import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import profileService from './../services/profile.service';

class ProfileController extends AbstractController {
  private ProfileService = new profileService();
  constructor() {
    super();
  }

  // change password
  public changePassword = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.ProfileService.changePassword(req);
      res.status(code).json(data);
    }
  );
}

export default ProfileController;
