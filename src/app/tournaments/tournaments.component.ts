import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {Globals} from '../globals';
import {Tournament} from '../tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Array<Tournament>;

  constructor(private globals: Globals,
              private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentService.getTournamenets().subscribe(
      (data) => this.tournaments = Tournament.fromBattlefyResponse(data).sort((a, b) => +(a.start > b.start)),
      (error) => this.globals.emitError(error)
    );
  }

  open(url) {
    window.open(url, '_blank');
  }
}
