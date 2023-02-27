
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.JWT_SECRET;

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     try {
//       const decodedToken = jwt.verify(token, secretKey) as { userId: string };
//       req.userId = decodedToken.userId;
//       next();
//     } catch (error) {
//       res.status(401).send('Invalid token');
//     }
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };
