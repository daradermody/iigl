import {Component, OnInit} from '@angular/core';
import {Team} from '../team';
import {TeamService} from '../team.service';
import {AuthService} from "../auth.service";
import {Globals} from "../globals";

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  team = new Team('', '', this.getEmail(), [this.getEmail()]);
  teams: Team[];

  constructor(private teamService: TeamService,
              private authService: AuthService,
              public globals: Globals) {
  }

  ngOnInit(): void {
    this.updateTeams();
  }

  createNewTeam(newTeam) {
    // TODO: Handle error better
    this.teamService.createNewTeam(newTeam).subscribe(
      null,
      (response) => alert('Error! ' + response.error.message)
    );
    this.updateTeams();
  };

  updateTeams() {
    this.teamService.getTeams().subscribe(
      (teams: Team[]) => this.teams = teams
    );
  };

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  joinTeam(teamName: string) {
    this.teamService.joinTeam(teamName).subscribe(
      () => {
        this.globals.emitError('Team joined');
        this.updateTeams();
      },
      (error) => {
        console.dir(error);
        this.globals.emitError(error.message);
      }
    );
  }

  getEmail() {
    return this.authService.getEmail()
  }

  leaveTeam(teamName: string) {
    this.teamService.leaveTeam(teamName).subscribe(
      () => {
        this.globals.emitError('Team left. What are they gonna do without you!');
        this.updateTeams();
      },
      (error) => {
        console.dir(error);
        this.globals.emitError(error.message);
      }
    );
  }
}
