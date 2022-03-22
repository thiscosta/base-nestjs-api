export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    provider: process.env.DATABASE_PROVIDER,
    url: process.env.DATABASE_URL,
  },
});
