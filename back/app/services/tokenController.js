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
      return res.status(401).json({ message: 'Aucun token dans le cookie' });
    }

    try {
      const decoded = jwt.verify(tokenFromCookie, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  },

  checkTokenRemove: (req, res) => {
    res
      .clearCookie('access_token', {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000,
        secure: process.env.NODE_ENV,
      })
      .json('Supression du cookie');
  },
};

module.exports = tokenController;
