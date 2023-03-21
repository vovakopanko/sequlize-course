import JWTUtils from '../../src/utils/jwt-utils';
import jwt from 'jsonwebtoken';

describe('jwt utils', () => {
  test('should return an access token', () => {
    const payload = { email: 'test@mail.com' };
    expect(JWTUtils.generateAccessToken(payload, { expiresIn: '1d' })).toEqual(
      expect.any(String)
    );
  });

  test('should return an refresh token', () => {
    const payload = { email: 'test@mail.com' };
    expect(
      JWTUtils.generateRefreshToken(payload, { expiresIn: '15min' })
    ).toEqual(expect.any(String));
  });

  test('should verify that the access token is valid', () => {
    const payload = { email: 'test@mail.com' };
    const jwt = JWTUtils.generateAccessToken(payload, { expiresIn: '1d' });
    expect(JWTUtils.verifyAccessToken(jwt)).toEqual(
      expect.objectContaining(payload)
    );
  });

  test('should verify that the refresh token is valid', () => {
    const payload = { email: 'test@mail.com' };
    const jwt = JWTUtils.generateRefreshToken(payload, { expiresIn: '15min' });
    expect(JWTUtils.verifyRefreshToken(jwt)).toEqual(
      expect.objectContaining(payload)
    );
  });

  test('should error if the access token is invalid', () => {
    expect(() => JWTUtils.verifyAccessToken('invalidT.token')).toThrow(
      jwt.JsonWebTokenError
    );
  });

  test('should error if the refresh token is invalid', () => {
    expect(() => JWTUtils.verifyRefreshToken('invalidT.token')).toThrow(
      jwt.JsonWebTokenError
    );
  });
});
