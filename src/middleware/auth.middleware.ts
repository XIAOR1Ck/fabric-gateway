import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    role: string;
  };
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Authentication token required',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("JWT token", token);
    const decoded = jwt.verify(token, env.jwtSecret);

    if (typeof decoded === 'string') {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });
      return;
    }

    req.user = {
      email: decoded.email as string,
      role: decoded.role as string,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
