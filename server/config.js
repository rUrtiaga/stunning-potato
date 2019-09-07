module.exports = {
  SESSION_SECRET_TOKEN: process.env.SESSION_SECRET_TOKEN || "some",
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1/pets',
  PORT: process.env.PORT || 8000,
  JWT_TOKEN: process.env.JWT_TOKEN || "TOKEN",
  sendingBlue: {
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDING_BLUE_USER,
      pass: process.env.SENDING_BLUE_PASS
    }
  },
  gmail: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_MASCOTAS_USER,
      pass: process.env.GMAIL_MASCOTAS_PASS
    }
  }
}