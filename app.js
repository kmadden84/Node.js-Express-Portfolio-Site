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

setInterval(function() {
    http.get("https://kevin-madden-portfolio.herokuapp.com");
}, 300000); // every 5 minutes (300000)

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
