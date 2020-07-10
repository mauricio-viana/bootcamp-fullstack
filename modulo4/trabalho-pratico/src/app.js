import express from 'express';
import swaggerUi from 'swagger-ui-express';
import database from './config/database.js';
import { accountsRouter } from './routes/accountsRouter.js';
import { document } from './document.js';

const app = express();

app.use(express.json());
accountsRouter(app);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(document));

(async () => {
  await database.connect();
  app.listen(process.env.PORT);
})();
