import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan
app.use(morgan('dev'));

// Routes
app.get("/api", routes);

// Catch-all route
app.get('*', (req, res) => {
  res.status(200).send('Hello, World!');
});