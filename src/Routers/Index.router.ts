import { Router } from 'express';

const app = Router();

app.get('/', (req, res) => {
  res.json({
    data: 'Bienveido a la API!',
    Ip: req.socket.remoteAddress,
  });
});

app.get('*', (req, res, next) => {
  return res.json({
    message: 'La pagina que buscas no existe',
  });
});
export default app;
