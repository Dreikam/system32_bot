const ip = process.env.IPS.split(' ');

export const valid = (req, res, next) => {
  if (ip.includes(req.socket.remoteAddress)) {
    return next();
  } else {
    return res.send('no estas autorizado');
  }
};
