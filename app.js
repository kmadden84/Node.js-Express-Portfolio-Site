const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const http = require("http");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const projRoutes = require('./routes/project');
const aboutRoutes = require('./routes/about');

app.use(mainRoutes);
app.use('/project', projRoutes);
app.use('/about', aboutRoutes);


function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'kevin-madden-portfolio.herokuapp.com',
            port: port,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(( err, req, res, next ) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
  res.render('error');
});
app.listen(port, () => {
    console.log("App is running on port " + port);
});
