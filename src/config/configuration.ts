export default () => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'default_secret',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        resetSecret: process.env.JWT_RESET_SECRET,
        resetExpiresIn: process.env.JWT_RESET_EXPIRES_IN,
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        from: process.env.MAIL_FROM
    }
});