import jwt from 'jsonwebtoken';
import environment from '../config/evironment';

export default class JWTUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = '1d' } = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, {
      expiresIn,
    });
  }

  static generateRefreshToken(payload, options = {}) {
    const { expiresIn = '15min' } = options;
    return jwt.sign(payload, environment.jwtRefreshTokenSecret, {
      expiresIn,
    });
  }

  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
  }

  static verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, environment.jwtRefreshTokenSecret);
  }
}