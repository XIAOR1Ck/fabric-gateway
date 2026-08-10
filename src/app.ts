import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { voteService } from './gateway';

const app = express();

app.use(express.json());


app.use(
cors({
  origin: "*",
credentials: true,
})
);


app.get("/", (_req, res) => {
  res.json({
  success: true,
  message: "Fabric Gateway API running"
});
});

async function startServer() {
  try {
    await voteService.init('pollingStation');

    console.log('Connected to Hyperledger Fabric');

    const server = app.listen(process.env.APP_PORT, () => {
      console.log(`Server running on port ${process.env.APP_PORT}`);
    });

    const shutdown = () => {
      console.log('Shutting down...');

      voteService.close();

      server.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to connect to Fabric:', error);
    process.exit(1);
  }
}

startServer();
