import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Listen on a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
