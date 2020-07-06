import express from 'express';
import database from './config/database.js';
import { accountsRouter } from './routes/accountsRouter.js';

const app = express();

app.use(express.json());
accountsRouter(app);

app.get('/', (_, res) =>
  res.status(200).send('Started API - Connection to database MongoDB Atlas')
);

(async () => {
  await database.connect();
  app.listen(process.env.PORT, () =>
    console.log(`Started API - port: ${process.env.PORT}`)
  );
})();
