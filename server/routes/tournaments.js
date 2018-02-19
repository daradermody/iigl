const express = require('express');
const axios = require('axios');
const storage = require('../database/storage');
const auth = require('./auth');

const router = new express.Router();

const battlefyConfig = {
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhdHRsZWZ5LmF1dGgwLmNvbS8iLCJ' +
    'zdWIiOiJhdXRoMHw1YTgzMDViNjRlYTcxOTI4NWY4NTQ3YmUiLCJhdWQiOiJHQkd5WGxIVWg1T2hxYmRTR2s1SUdqYVR4aDdSMnh5SCIsImlhdCI' +
    '6MTUxODYxNTUxNCwiZXhwIjoxNTE5ODI1MTE0fQ.FalpPErzt7oboDIDrKMBcEdUokC4sXGAOTvqrj--HGg',
  },
};

router.get('/getJoinCode/:tournamentId', auth.verifyUser, (req, res) => {
  const code = storage.tournamentCodes.getCode(req.params['tournamentId'], req['email']);

  if (code) {
    res.status(201).json({code: code});
  } else {
    const data = {'numberOfCodes': 1};
    axios.post(`https://api.battlefy.com/tournaments/${req.params.tournamentId}/join-codes`, data, battlefyConfig
    ).then((response) => {
      storage.tournamentCodes.cacheCode(req.params['tournamentId'], req['email'], response.data[0]['code']);
      res.status(201).json({code: response.data[0]['code']});
    }).catch((error) => {
      console.log(error.response);
      res.status(error.response.status).send(error.response.data);
    });
  }
});

module.exports = router;
