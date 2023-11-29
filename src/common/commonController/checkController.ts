import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import checkService from '../commonService/checkService';

class checkController extends AbstractController {
  private checkService = new checkService();
  constructor() {
    super();
  }

  public postcheckGo = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.checkService.checService(req);
      res.status(code).json(rest);
    }
  );
}

export default checkController;
