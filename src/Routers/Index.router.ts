import { Router } from 'express';
import boom from '@hapi/boom';

const app = Router();

app.get('/', (req, res) => {
  res.json({
    data: 'Bienveido a la API!',
  });
});

app.get('*', (req, res, next) => {
  return next(boom.notFound('La pagina que buscas no existe'));
});
export default app;
