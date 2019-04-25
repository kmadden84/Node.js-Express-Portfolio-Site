const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

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


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(port, () => {
    console.log("App is running on port " + port);
});