import express from 'express';
import routesGrades from './routes/grades.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './document.js';

const app = express();

app.use(express.json());
app.use('/grades', routesGrades);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333);
