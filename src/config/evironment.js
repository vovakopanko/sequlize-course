export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET || 'ac849cbed10d42829281815be6089853',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || '2bad382a709c4264b66df9ccccee5eeb',
};
