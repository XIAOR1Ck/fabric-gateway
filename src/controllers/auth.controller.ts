import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const login = (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    if (
      email !== env.adminEmail ||
      password !== env.adminPassword
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const token = jwt.sign(
      {
        email,
        role: 'admin',
      },
      env.jwtSecret,
      {
        expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
      },
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
