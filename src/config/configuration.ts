export default () => ({
  database: {
    provider: process.env.DATABASE_PROVIDER,
    url: process.env.DATABASE_URL,
  },
});
