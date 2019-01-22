import app from './app';
const port : string = process.env.PORT || '4300';

app.listen(port, () => {
     console.log(`View the app running in the browser here http://localhost:${port}`);
});