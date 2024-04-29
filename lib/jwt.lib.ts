import jwt from 'jsonwebtoken'

const secretKey = 'En!gmaA!D3N';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secretKey, { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
}