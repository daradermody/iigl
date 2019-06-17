import {Component, OnInit} from '@angular/core';
import {Team} from '../../data_types/team';
import {TeamService} from '../../services/team.service';
import {NotificationService} from '../../services/notification.service';
import {GameScore} from '../../data_types/game-score';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  teams: Array<Team>;
  gameScores: Array<GameScore>;
  gameScore: number;

  constructor(private teamService: TeamService,
              private notifier: NotificationService) { }

  ngOnInit(): void {
    console.log('Init Leaderboard');
    setTimeout(() => {
        if (!this.teams) {
          this.teams = [];
          throw new Error('Could not get teams for some unknown reason. :(');
        }
      }, 10000
    );

    this.teamService.getTeams().subscribe(
      (teams) => this.teams = teams.sort((a) => a.isActive ? -1 : 1),
      (error) => {
        this.teams = [];
        throw error;
      }
    );

    this.teamService.getGameScores().subscribe(
      (gameScores) => this.gameScores = gameScores,
      (error) => {
        this.gameScores = null;
        throw error;
      }
    );
  }

  open(url) {
    window.open(url, '_blank');
  }

/*   updateTeamScore(name: string, gameScores: GameScore) {
    this.teamService.updateTeam(name, {gameScores}).subscribe(
      () => this.notifier.emitMessage('Updated!')
    );
  } */

  getGameScore(name: string, game: string) {
    this.teamService.getGameScore(name, game).subscribe();
  }

  getGameScores() {
    this.teamService.getGameScores().subscribe();
  }

  setActive(name: string, isActive: boolean) {
    this.teamService.updateTeam(name, {isActive}).subscribe(
      () => this.notifier.emitMessage('Updated!')
    );
  }

  setEmailVerified(email: string, isActive: boolean) {
    this.teamService.updateTeam(name, {isActive}).subscribe(
      () => this.notifier.emitMessage('Updated!')
    );
  }
}
