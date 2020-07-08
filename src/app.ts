/* eslint-disable no-console */
import app from './server';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Run weather api in the port ${port}`);
});
