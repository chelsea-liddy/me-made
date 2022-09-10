const express = require('express')
const db = require('../db/db')
const router = express.Router()

//GET /v1/projects (all projects)
router.get('/', (req, res) => {
  db.getProjects()
    .then((projects) => {
      res.json(projects)
    })
    .catch((err) => {
      console.error(err.mesage)
      res.status(500).send("That's a server error!")
    })
})

//GET /v1/projects (project by id)
router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getProject(id)
    .then((project) => {
      res.json(project)
    })
    .catch((err) => {
      console.error(err.mesage)
      res.status(500).send("That's a server error!")
    })
})

//POST /v1/projects (add a project)

router.post('/', (req, res) => {
  const project = req.body
  db.addProject(project)
    .then((ids) => {
      const id = ids[0]
      const newProject = { id, ...project }
      res.json(newProject)
    })
    .catch((err) => {
      console.error(err.mesage)
      res.status(500).send("That's a server error!")
    })
})

//GET /v1/projects (project updates by project id)
router.get('/updates/:projectId', (req, res) => {
  const projectId = req.params.projectId
  db.getProjectUpdates(projectId)
    .then((updates) => {
      res.json(updates)
    })
    .catch((err) => {
      console.error(err.mesage)
      res.status(500).send("That's a server error!")
    })
})

//PATCH /v1/projects

//DELETE /v1/projects

module.exports = router
