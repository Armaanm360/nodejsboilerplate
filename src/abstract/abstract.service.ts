import { db, pool } from '../app/database';
import Models from '../models/rootModels';
import ManageFile from '../utils/lib/manageFile';
import ResMsg from '../utils/miscellaneous/responseMessage';
import Schema from '../utils/miscellaneous/schema';
import StatusCode from '../utils/miscellaneous/statusCode';

abstract class AbstractServices {
  protected db = db;
  protected manageFile = new ManageFile();
  protected ResMsg = ResMsg;
  protected StatusCode = StatusCode;
  protected Model = new Models(this.db);
  protected pool = pool;
  protected schema = new Schema();

  // insert exception error
  protected async createException(
    endPoint: string | null = null,
    exceptionText: string | null = null,
    errorMsg: string | null = null,
    lineNumber: string | null = null
  ) {
    const client = await this.pool.connect();
    try {
      await client.query(`call dbo."insertExceptionError"($1,$2,$3,$4)`, [
        endPoint,
        exceptionText,
        errorMsg,
        lineNumber,
      ]);

      client.release();
    } catch (err: any) {
      console.log(err.message);
    } finally {
      // if (client) {
      //   client.release();
      // }
    }
  }
}

export default AbstractServices;
