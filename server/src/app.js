const express = require('express');
const app = express();
const port = 3000;
import path from 'path';
import morgan from 'morgan';

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'node', 'client', 'dist', 'static')));

app.get('/', (req, res) => res.sendfile(path.join(__dirname, 'node', 'client', 'dist', 'templates', 'index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))