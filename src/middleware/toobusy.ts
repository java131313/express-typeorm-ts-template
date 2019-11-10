import { NextFunction, Request, Response } from 'express';
import * as toobusy from 'toobusy-js';

export const tooBusy = (_: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production' && toobusy()) {
    return res.status(502).json({
      success: false,
      message: `It looks like our server became a little tired! It's taking a nap while our engineers are hard at work waking it up!`,
    });
  } else {
    return next();
  }
};
