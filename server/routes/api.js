const express = require('express');
const router = express.Router();
const storage = require('../database/storage')


router.post('/teams', (req, res) => {
  try {
    storage.addTeam(req.body);
  } catch(err) {
    res.status(400).json({
      message: err
    })
  }
  res.status(201).json();
});

router.get('/teams', (req, res) => {
  res.json(storage.getTeams())
});

router.get('/teams/:name', (req, res) => {
  try {
    res.json(storage.getTeam(req.params.name))
  } catch(err) {
    res.status(400).json({
      message: err
    })
  }
});

module.exports = router;
