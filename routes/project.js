const express = require('express');
const router = express.Router();
const { data } = require('../data/projectData.json');
const { projects } = data;

const app = express();


router.get('/', (req, res) => {
  const numberOfProjects = projects.length;
  const projectId = Math.floor(Math.random() * numberOfProjects);
  res.redirect(`/project/${projectId}`)
});



router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  var ids = [];
  for (i = 0; i < projects.length; i++) {
    var arrayId = projects[i].id;
    ids.push(arrayId);
  }
  if (ids.indexOf(id) !== -1 && !isNaN(id)) {
  const projName = projects[id].project_name;
  const description = projects[id].description;
  const tech = projects[id].tech;
  const imgs = projects[id].image_urls;
  const gitHub = projects[id].github_link;
  const liveLink = projects[id].live_link;
  const templateData = { id, projName, description, tech, imgs, gitHub, liveLink };
  res.render('project', templateData)
  } else {
    return res.redirect('/')
  }
});
module.exports = router;