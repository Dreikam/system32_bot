import { Router } from 'express';
import { db } from '@Services/db';

const app = Router();

app.get('/', async (req, res) => {
  //const members = await db.members.findMany();

  res.json({
    data: 'Ok!',
  });
});

export default app;
