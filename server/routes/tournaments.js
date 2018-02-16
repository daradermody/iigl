const express = require('express');
const axios = require('axios');
var cheerio = require('cheerio');

// POST: https://api.battlefy.com/tournaments/5a31817dc48d9203522220d7/join-codes
// BODY: {"numberOfCodes":1}
// RESPONSE: [{"code":" ","createdAt":"2018-02-06T14:39:17.101Z","tournamentID":"5a31817dc48d9203522220d7","_id":"5a79be15828e4c037d2f1945"}]
//
// POST: https://api.battlefy.com/tournaments/5a31817dc48d9203522220d7/join-with-code/zdtybyV
// RESPONSE: Created

const router = new express.Router();

axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhdHRsZWZ5LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YTgzMDViNjRlYTcxOTI4NWY4NTQ3YmUiLCJhdWQiOiJHQkd5WGxIVWg1T2hxYmRTR2s1SUdqYVR4aDdSMnh5SCIsImlhdCI6MTUxODYxNTUxNCwiZXhwIjoxNTE5ODI1MTE0fQ.FalpPErzt7oboDIDrKMBcEdUokC4sXGAOTvqrj--HGg';

const battlefyConfig = {
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhdHRsZWZ5LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YTgzMDViNjRlYTcxOTI4NWY4NTQ3YmUiLCJhdWQiOiJHQkd5WGxIVWg1T2hxYmRTR2s1SUdqYVR4aDdSMnh5SCIsImlhdCI6MTUxODYxNTUxNCwiZXhwIjoxNTE5ODI1MTE0fQ.FalpPErzt7oboDIDrKMBcEdUokC4sXGAOTvqrj--HGg',
  },
};

// TODO: Protect with authentication
router.get('/getJoinCode/:tournamentId', (req, res) => {
  // TODO: Uncomment when completing markup
  // axios.post(`https://api.battlefy.com/tournaments/${req.params.tournamentId}/join-codes`, {'numberOfCodes': 1}, battlefyConfig
  // ).then((response) => {
  //   console.log('all ok');
  //   res.status(201).json({code: response.data[0]['code']});
  // }).catch((error) => {
  //   console.log(error.response);
  //   res.status(error.response.status).send(error.response.data);
  // });
  res.status(201).json({code: 'KrkfpMU'});
});

module.exports = router;
