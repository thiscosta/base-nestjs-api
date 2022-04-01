export default () => ({
  database: {
    provider: process.env.DATABASE_PROVIDER,
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    rounds: process.env.SALT_ROUNDS,
    expire: process.env.JWT_EXPIRE,
  },
});
