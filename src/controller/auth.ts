import { BaseContext } from 'koa';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { getManager, Repository, Not, Equal, Like } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import {
  request,
  summary,
  path,
  body,
  responsesAll,
  tagsAll,
} from 'koa-swagger-decorator';
import Emails from '../lib/emails';
import { User } from '../entity/user';

const signupSchema = {
  firstName: { type: 'string', required: true, example: 'John' },
  lastName: { type: 'string', required: true, example: 'Doe' },
  email: { type: 'string', required: true, example: 'john@doe.com' },
  password: { type: 'string', required: true, example: 'password' },
};

const loginSchema = {
  email: signupSchema.email,
  password: signupSchema.password,
};

const confirmEmailSchema = {
  token: {
    type: 'string',
    required: true,
    example: 'gjkalg92841mlk42l14kl1k41',
  },
};

@responsesAll({
  200: { description: 'success' },
  400: { description: 'bad request' },
  401: { description: 'unauthorized, missing/wrong jwt token' },
})
@tagsAll(['User'])
export default class UserController {
  @request('post', '/auth/signup')
  @summary('Signup')
  @body(signupSchema)
  public static async signup(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const userToBeSaved: User = new User();
    userToBeSaved.firstName = ctx.request.body.firstName;
    userToBeSaved.lastName = ctx.request.body.lastName;
    userToBeSaved.email = ctx.request.body.email;
    userToBeSaved.password = bcrypt.hashSync(ctx.request.body.password, 10);
    userToBeSaved.confirmationToken = crypto
      .createHash('md5')
      .update(userToBeSaved.id + userToBeSaved.email + new Date())
      .digest('hex');

    const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        errors: [
          {
            key: 'all',
            message: 'Please enter all data',
          },
        ],
        success: false,
      };
    } else if (await userRepository.findOne({ email: userToBeSaved.email })) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        errors: [
          {
            message: 'The specified e-mail address already exists',
            key: 'email',
          },
        ],
      };
    } else {
      await userRepository.save(userToBeSaved);

      await Emails.sendWelcomeEmail(userToBeSaved);
      ctx.status = 200;
      ctx.body = {
        success: true,
        message:
          'Confirmation link sent to your email. Please confirm your account.',
      };
    }
  }

  @request('post', '/auth/login')
  @summary('Login')
  @body(loginSchema)
  public static async login(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const { email, password } = ctx.request.body;

    const user = await userRepository.findOne({ email });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        errors: [
          {
            message: 'Wrong email or password',
            key: 'login',
          },
        ],
      };
      return false;
    }

    const correct = bcrypt.compareSync(password, user.password);

    if (correct) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        },
      );
      ctx.status = 200;
      ctx.body = { accessToken: accessToken };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        errors: [
          {
            message: 'Wrong email or password',
            key: 'login',
          },
        ],
      };
    }
  }

  @request('post', '/auth/confirm-email')
  @summary('Confirm email')
  @body(confirmEmailSchema)
  public static async confirmEmail(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const { token } = ctx.request.body;

    const user = await userRepository.findOne({ confirmationToken: token });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        errors: [
          {
            message:
              'Confirmation token invalid. Please try clicking on the link in your email again.',
            key: 'confirmationToken',
          },
        ],
      };
    } else {
      user.confirmed = true;
      await userRepository.save(user);
      ctx.status = 200;
      ctx.body = {
        success: true,
        message:
          'You have confirmed your email. You can login now into Teachur.',
      };
    }
  }
}
