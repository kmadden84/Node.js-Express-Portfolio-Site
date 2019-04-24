const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

const { data } = require('./data/projectData.json');
const { projects } = data;


app.get('/', (req, res) => {
    res.render('index', { projects });

});
app.get('/about', (req, res) => {
    res.render('about');

});

app.get('/project', (req, res) => {
    const numberOfProjects = projects.length;
    const projectId = Math.floor(Math.random() * numberOfProjects);
    res.redirect(`/project/${projectId}`)
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const thisproject = projects[id];
    const description = thisproject.description;
    const tech = thisproject.tech;
    const imgs = thisproject.image_urls;
    const templateData = { id, thisproject, description, tech, imgs };
    res.render('project', templateData);

});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});