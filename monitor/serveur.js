var express = require('express')
var app = express()

const PORT = 8000

const URL_API = process.env.URL_API || 'localhost'
const URL_API_PORT = process.env.URL_API_PORT || 8080

module.exports = {
  URL_API: URL_API,
  URL_API_PORT: URL_API_PORT
}

// set the view engine to ejs
app.set('view engine', 'ejs');

const routes = require("./routes/")

// use res.render to load up an ejs view file
app.use('/', routes);

app.listen(PORT);
console.log("URL du moniteur : http://"+URL_API+":"+PORT)
var path = require('path');
var appDir = path.dirname(require.main.filename);
console.log('server root:', appDir)

app.use(express.static('electron/renderer-process'));
app.use(express.static('views'));
