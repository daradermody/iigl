import app from './server';

if (process.env.NODE_ENV === 'production') {
  app.startServer(443);
} else {
  app.startServer(4000);
}


