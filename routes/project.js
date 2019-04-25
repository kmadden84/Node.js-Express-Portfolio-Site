const express = require('express');
const router = express.Router();
const { data } = require('../data/projectData.json');
const { projects } = data;

router.get('/project', (req, res) => {
    const numberOfProjects = projects.length;
    const projectId = Math.floor(Math.random() * numberOfProjects);
    res.redirect(`/project/${projectId}`)
});

router.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const thisproject = projects[id];
    const description = thisproject.description;
    const tech = thisproject.tech;
    const imgs = thisproject.image_urls;
    const templateData = { id, thisproject, description, tech, imgs };
    res.render('project', templateData);

});
module.exports = router;