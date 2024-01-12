import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ip = process.env.IPS.split(' ');

export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return next(boom.unauthorized('Tienes que estar autenticado'));
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return next(boom.unauthorized('Token no valido'));

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return next(boom.unauthorized('Token no valido'));

    return next();
  });
};

export const validIp = (req, res, next) => {
  if (ip.includes(req.socket.remoteAddress)) {
    console.log('Tienes acceso');

    return next();
  } else {
    return res.send('no estas autorizado');
  }
};
