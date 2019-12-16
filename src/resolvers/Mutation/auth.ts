import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import {Context, findUserByEmail, updateUserResetToken} from '../../utils'
import { v4 as uuid } from 'uuid';
const nodemailer = require("nodemailer");


export const auth = {
  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10);
    const emailConfirmToken = uuid();
    const user = await ctx.prisma.createUser({ ...args,password, emailConfirmToken,
      email:args.email,
      emailConfirmed: false
       });
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'norbinatali@gmail.com',
        pass: 'NataliBear3'
      }
    });

    transporter.sendMail({
          template: 'confirmEmail',
          from:"norbinatali@gmail.com",
          to:user.email,
          subject: `Confirm your email on Metrologist`,
          text: "Hi,\n" +
              "You sign up on Metrologist. Confirm your email:\n" +
              "\n" +
              'http://localhost:3000/confirm-email?email='+user.email+'&emailConfirmToken='+emailConfirmToken+ '\n',

        },
        function (err, info, response) {
          console.log(user.email);
          if(err)
            console.log(err);
          else
            response.redirect('http://localhost:3000/');
        });
    return {
      token: jwt.sign({ userId: user.id }, "jwtsecret123"),
      user,
    }
  },
  async confirmEmail(parent: any, { emailConfirmToken, email }: { emailConfirmToken: string; email: string },
      ctx: Context
  ) {
    if (!emailConfirmToken || !email) {
      throw new Error('no mail and token');
    }
    const user = await ctx.prisma.user({ email});
    if (!user) {
      throw new Error('no user found');
    }
    if (user.emailConfirmToken !== emailConfirmToken || user.emailConfirmed) {
      throw new Error('no right token or email');
    }

    await updateUserResetToken(
        ctx,
        user.email,
        {
          emailConfirmToken: '',
          emailConfirmed: true
        }
    );

    return {
      token: jwt.sign({ userId: user.id }, "jwtsecret123"),
      user
    };
  },

  async login(parent, {email, password }, ctx: Context) {

    const user = await ctx.prisma.user({ email});

    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password')
    }
    if (
        user.emailConfirmed == false
    ) {
      throw new Error('please confirm your email');
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
};
