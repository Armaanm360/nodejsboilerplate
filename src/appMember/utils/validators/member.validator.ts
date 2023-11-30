import { body } from 'express-validator';

class MemberValidator {
  // change password validator
  public changePassword() {
    return [
      body('old_password', 'Provide valid old password.')
        .isString()
        .isLength({ min: 8 }),
      body('new_password', 'Provide valid new password.')
        .isString()
        .isLength({ min: 8 }),
    ];
  }
}

export default MemberValidator;
