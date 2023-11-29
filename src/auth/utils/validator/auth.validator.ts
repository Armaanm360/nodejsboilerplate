import { body } from 'express-validator';
import ResMsg from '../../../utils/miscellaneous/responseMessage';

class AuthValidator {
  // member reg validator
  public registrationMemberValidator() {
    return [
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty()
        .isString(),
      body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty()
        .isEmail(),
      body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password length min 8'),
      body('mobileNumber')
        .isString()
        .isLength({ min: 14, max: 14 })
        .custom((value) => {
          if (!value.startsWith('+88')) {
            return false;
          } else {
            return true;
          }
        }),
    ];
  }

  public loginValidator() {
    return [
      body('email', 'Enter valid email or phone').exists().isEmail(),
      body('password', 'Enter valid password minimun length 8')
        .exists()
        .isString()
        .isLength({ min: 8 }),
    ];
  }
  public adminValidator() {
    return [
      // body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
      // body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
    ];
  }
}

export default AuthValidator;
