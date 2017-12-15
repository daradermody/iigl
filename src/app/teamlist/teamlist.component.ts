import {Component, OnInit} from '@angular/core';
import {Team} from '../team';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  team = new Team('', '', '', '');
  teams: Team[];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.updateTeams();
  }

  createNewTeam = function (newTeam) {
    // TODO: Handle error better
    this.teamService.createNewTeam(newTeam).subscribe(
      null,
      (response) => alert('Error! ' + response.error.message)
    );
    this.updateTeams();
  };

  updateTeams = function () {
    this.teamService.getTeams().subscribe(
      (teams: Team[]) => this.teams = teams
    );
  };
}
