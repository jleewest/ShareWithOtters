import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import router from './router';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(router);

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('Error starting the server:', err);
  }
}

bootstrap();
