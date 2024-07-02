const express = require('express');
const ProjectApi = require('../api/project');

const router = express.Router();

router.get('/', ProjectApi.findProjectsAll)
router.get('/:id', ProjectApi.findProjects)
router.post('/', ProjectApi.createProject)
router.put('/:id', ProjectApi.updateProject)
router.delete('/:id', ProjectApi.deleteProject)

module.exports = router;