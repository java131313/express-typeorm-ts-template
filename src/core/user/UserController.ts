import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../entity/UserEntity';

export const allUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const usersAndCount = await User.findAndCount();
    const [users, count] = usersAndCount;

    return res.status(200).json({
      success: true,
      data: {
        users,
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const singleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const user = await User.findOne(null, { where: { id } });

    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = User.create({
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      issuer: 'https://api.REPLACE_ME.com',
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      data: {
        // Return the User object and omit the `password` field.
        user: { ...user, password: null },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const updatedUser = await User.update({ id }, { ...req.body });

    return res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description updates the user's `status` column to indicate that the user was archived.
 * This does not delete the User.
 *
 * @param req
 * @param res
 * @param next
 */
export const archiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const updatedUser = await User.update({ id }, { status: 'archived' });

    return res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const updatedUser = await User.delete({ id });

    return res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
