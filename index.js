const express = require('express');
const helmet = require('helmet');
const carsRouter = require('./router/carsRouter');

const server = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(express.json());

server.use('/cars', carsRouter);

server.use((req, res) => {
    res.status(404).json({ message: "404 page not found." })
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" })
})

server.listen(port, host, () => {
    console.log(`\n Running on http://${host}:${port}\n`)
})