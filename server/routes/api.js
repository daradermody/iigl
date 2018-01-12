const express = require('express');
const jwt = require('jsonwebtoken');
const storage = require('../database/storage');
const users = require("../database/storage/users");


const router = express.Router();

router.post('/teams', (req, res) => {
  try {
    const team = req.body;
    team.company = users.getUser(team.contactEmail).company;
    storage.teams.addTeam(req.body);
  } catch (err) {
    res.status(400).json({
      message: err
    })
  }
  res.status(201).json();
});

router.get('/teams', (req, res) => {
  res.json(storage.teams.getTeams());
});

router.get('/teams/:name', (req, res) => {
  try {
    res.json(storage.teams.getTeam(req.params.name));
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
});

router.get('/join/:name', (req, res) => {
  const token = (req.body.token || req.query.token || req.headers.get('authorization')).replace('Bearer ', '');
  res.json(storage.teams.addUserToTeam(jwt.decode(token).sub, req.params.name));
});

router.get('/leave/:name', (req, res) => {
  const token = (req.body.token || req.query.token || req.headers.get('authorization')).replace('Bearer ', '');
  res.json(storage.teams.removeUserFromTeam(jwt.decode(token).sub, req.params.name));
});


module.exports = router;
