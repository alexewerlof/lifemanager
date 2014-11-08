'use strict';

var cors       = require('cors'),
    config     = require('./server.json'),
    helmet     = require('helmet'),
    express    = require('express'),
    bodyParser = require('body-parser');

//initialize the app
var app = express();
app.use(cors());
//github.com/evilpacket/helmet
app.use(helmet({
    crossdomain: false,
    csp: false
}));
//serve static files from www
app.use(express.static(config['staticRoot']));
//&&&&&&&&app.use("/static", express.static('./srv/www/'));

//parse any json data that may come in the body
app.use(bodyParser.json());

//this default error handler should be the last call in the chain so if nothing takes care of the request it will reply
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//initialize the server by passing all command line arguments to the start function
var port = process.env.PORT || config['port'];
app.listen(parseInt(port));
console.info('Server listening on port ' + port + '...');
