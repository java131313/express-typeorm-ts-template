import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../core/user';
import { ErrorHandler } from '../../util/error-handler';

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      throw new Error('Invalid password.');
    }

    return res.status(200).json({
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '12h',
        issuer: 'https://api.REPLACE_ME.com',
      }),
      user: {
        firstName: user.firstName,
        id: user.id,
      },
      expiresIn: '12h',
    });
  } catch (error) {
    next(error);
  }
}

export async function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  try {
    const authHeader: any = req.headers.authorization;
    if (!authHeader) {
      throw new ErrorHandler({ status: 401, message: 'No Access Token' }).dev();
    }

    const token: any = authHeader.replace('Bearer ', '');
    if (!token) {
      res.statusCode = 401;
      throw new Error('Invalid Token');
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error('Invalid user token');
    }

    const user = await User.findOne({ id: decoded.userId });
    if (!user) {
      throw new Error('User does not exist.');
    }

    next();
  } catch (error) {
    next(error);
  }
}

export const authorizeRequest = async (
  _req: Request,
  _res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
