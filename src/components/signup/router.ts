import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { controller } from './controller';
import { emailPattern } from '../../helpers/emailPattern';

const signupRoute: ServerRoute = {
  method: 'GET',
  path: '/signup',
  handler: controller.signup,
};
const newUserRoute: ServerRoute = {
  method: 'POST',
  path: '/new-user',
  handler: controller.newUser,
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().pattern(emailPattern),
        password: Joi.string().required().min(6),
      }),
    },
  },
};

export { signupRoute, newUserRoute };
