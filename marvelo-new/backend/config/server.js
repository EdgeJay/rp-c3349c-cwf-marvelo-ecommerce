module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '3325f7d389da26fa071c32a272490520'),
    },
  },
  settings: {
    cors: {
      enabled: true,
      origin: ['*']
    },
  },
});
