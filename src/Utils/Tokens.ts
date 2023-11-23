import crypto from 'crypto';

const gererateToken = () => {
  let d = new Date().getTime();
  const uuid = 'zxxx-exxx-exxx-wxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
};

const tokens = () => {
  const buf = crypto.randomBytes(16);

  console.log(buf[6], buf[6] & 0x0f, 0x40);

  buf[6] = (buf[6] & 0x0f) | 0x40; // Version 4
  buf[8] = (buf[8] & 0x3f) | 0x80; // RFC4122

  console.log(buf.slice(10).toString('hex'));
  return [
    buf.slice(0, 4).toString('hex'),
    buf.slice(4, 6).toString('hex'),
    buf.slice(6, 8).toString('hex'),
    buf.slice(8, 10).toString('hex'),
    buf.slice(10).toString('hex'),
  ].join('-');
};
