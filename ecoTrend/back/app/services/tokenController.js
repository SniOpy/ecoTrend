const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenController = {
  createToken: (id, role = 'user') => {
    const payload = {
      id,
      role,
    };
    const SECRET_KEY = process.env.SECRET_KEY;
    const options = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    const token = jwt.sign(payload, SECRET_KEY, options);
    return token;
  },
};

module.exports = tokenController;
