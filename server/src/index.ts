import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('🦖');
});

//const db = require('./models/db.js');

async function bootstrap() {
  try {
    //await db.sequelize.sync();
    //console.log('DB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('Error starting the server:', err);
  }
}

bootstrap();
