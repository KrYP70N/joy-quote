import jwt from 'jsonwebtoken'

const secretKey = 'En!gmaA!D3N';

export const generateToken = (payload: any, expiresIn: string = '30d') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}