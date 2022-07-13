import express, {Request, Response} from 'express';
import router from './routes';
const app = express();

const port = 3000;

app.get('/', () => (req: Request, res: Response) => {
  res.send('to get image visit /image');
});
app.use('/image', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`the application is connected on port ${port}`);
});

export default app;
