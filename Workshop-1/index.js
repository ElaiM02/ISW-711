require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes)

app.get('/test', (req, res) => {
    res.json({ message: 'API works' });
});
//routes
app.get('/tipocambio', function (req, res) {
    let response = {};
    switch (req.query.type) {
        case 'usd':
            response = {
                "TipoCompraDolares": "498",
                "TipoVentaDolares": "500"
            }
            break;
        case 'eur':
            response = {
                "TipoCompraEuros": "576.85",
                "TipoVentaEuros": "598.9"
            }
            break;
        default:
            response = {
                "TipoCompraDolares": "621",
                "TipoVentaDolares": "621",
                "TipoCompraEuros": "576.85",
                "TipoVentaEuros": "598.9"
            }
            break;
    }
    res.status(200).json(response);
});

app.get('/tipocambio-usd', function (req, res) {
    let response = {};
    response = {
        "TipoCompraDolares": "498",
        "TipoVentaDolares": "500"
    }
    res.status(200).json(response);
});

app.get('/tipocambio-eur', function (req, res) {
    let response = {};
    response = {
        "TipoCompraEuros": "576.85",
        "TipoVentaEuros": "598.9"
    }
    res.json(response);
});

app.listen(3000, () => {

    console.log('Server Started at ${ 3000}')
})

app.post('/tipocambio', (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({
            message: 'Currency type is required'
        });
    }

    let response = {};

    switch (type) {
        case 'usd':
            response = {
                TipoCompraDolares: "498",
                TipoVentaDolares: "500"
            };
            break;

        case 'eur':
            response = {
                TipoCompraEuros: "576.85",
                TipoVentaEuros: "598.9"
            };
            break;

        case 'all':
            response = {
                TipoCompraDolares: "498",
                TipoVentaDolares: "500",
                TipoCompraEuros: "576.85",
                TipoVentaEuros: "598.9"
            };
            break;

        default:
            return res.status(400).json({
                message: 'Invalid currency type'
            });
    }

    res.status(200).json(response);
});
