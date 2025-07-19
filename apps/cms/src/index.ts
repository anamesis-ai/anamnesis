import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'CMS API is running' });
});

app.listen(port, () => {
  console.log(`CMS server running on port ${port}`);
});

export default app;
