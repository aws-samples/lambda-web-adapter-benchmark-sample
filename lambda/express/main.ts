import app from './app';

const port = 8080;

process.on('SIGTERM', () => {
  process.exit(0);
});

app.listen(port, () => {
  console.log(`start listening on ${port}`);
});
