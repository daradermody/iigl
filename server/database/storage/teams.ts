import * as fs from 'fs';
import {Team} from '../../../src/app/data_types/team';
import { GameScore } from '../../../src/app/data_types/game-score';

export class Teams {
  private static teamsFile = Teams.getTeamsFile();

  static addTeam(team: Team) {
    const teams = Teams.getTeams();
    if (Teams.getTeamFromTeams(team.name, teams)) {
      throw new Error('Team already exists');
    }

    teams.push(team);
    fs.writeFileSync(Teams.teamsFile, JSON.stringify(teams, null, 2), 'utf-8');
  }

  private static getTeamsFile(): string {
    console.log("Reading teams file")
    const teamsFile = 'server/database/data_files/teams.json';
    if (!fs.existsSync(teamsFile)) {
      console.log("Couldn't find Teams file, creating.")
      fs.writeFileSync(teamsFile, JSON.stringify([]));
    }
    console.log("End teams file")

    return teamsFile;
  }

  static getTeams(): Array<Team> {
    console.log("Getting teams")
    return JSON.parse(<string>fs.readFileSync(Teams.teamsFile, 'utf-8'));
  }

  static getGameScore(name, gameName): number {
    console.log("Getting Game Score")

    var gameScore = null
    var teamsBlob = JSON.parse(<string>fs.readFileSync(Teams.teamsFile, 'utf-8'));
    teamsBlob.forEach((team) => {
      if(team.name === name){
        team.gameScores.forEach(game => {
          if(game.name === gameName){
            gameScore = game.score
          }  
        });
      }
    });
    console.log("Returning " + gameScore )
    return gameScore
  }

  static getGameScores(): Array<GameScore> {
    console.log("Getting Game Scores")

    var gameScores = new Array<GameScore>()
    var teamsBlob = JSON.parse(<string>fs.readFileSync(Teams.teamsFile, 'utf-8'));
    console.log(teamsBlob)
    teamsBlob.forEach((team) => {
      //if(team.name === name){
/*       team.gameScores.forEach(gameScore => {
      }); */
      /* var teamScores = team.gameScores as Array<GameScore> */
      /* var teamScores = new Array<GameScore>() */
      Object.assign(new Array<GameScore>(), team.gameScores)
      console.log("team gamescores: " + team.gameScores)
      gameScores.push(team.gameScores)
      //}
    });
    console.log("Returning " + gameScores[0] )
    return gameScores
  }

  static teamExists(name: string): boolean {
    return Teams.getTeam(name) != null;
  }

  private static getTeamFromTeams(name: string, teams: Array<Team>): Team {
    console.log("Get Team From Teams")
    for (const team of teams) {
      if ('name' in team && team.name === name) {
        return team;
      }
    }
  }

  static getTeam(name): Team {
    console.log("Get Team")
    return Teams.getTeamFromTeams(name, Teams.getTeams());
  }

  static updateTeam(updatedTeam: Team) {
    const teams = Teams.getTeams();
    Teams.getTeams().find((team, index) => {
      if (team.name === updatedTeam.name) {
        teams[index] = updatedTeam;
      }
      return team.name === team.name;
    });
    fs.writeFileSync(Teams.teamsFile, JSON.stringify(teams, null, 2), 'utf-8');
  }
}
