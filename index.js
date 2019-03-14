let express = require("express");
let mongoose = require('mongoose');
let morgan = require("morgan");
let bodyParser = require("body-parser");
let app = express();
let port = process.env.port || 3000;
const programRoutes = require('./src/routes/programing')

var uri = "mongodb://node-shop:node-shop@node-edmt-shard-00-00-vxdga.mongodb.net:27017,node-edmt-shard-00-01-vxdga.mongodb.net:27017,node-edmt-shard-00-02-vxdga.mongodb.net:27017/class?ssl=true&replicaSet=node-edmt-shard-0&authSource=admin&retryWrites=true"

mongoose.connect(uri, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;
    console.log("Connect Database");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/pragraming', programRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(port, () => {
    console.log("Start Api " + port);
});
