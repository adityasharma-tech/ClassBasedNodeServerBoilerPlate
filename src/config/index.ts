import 'dotenv/config'

const config = {
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
  };

  export default config