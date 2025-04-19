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

  checkTokenMember: (req, res, next) => {
    const tokenFromCookie = req.cookies?.access_token?.split(' ')[1];

    if (!tokenFromCookie) {
      return res.status(401).json({ message: 'Pas de token dans les cookies' });
    }

    try {
      const decoded = jwt.verify(tokenFromCookie, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  },
};

module.exports = tokenController;
