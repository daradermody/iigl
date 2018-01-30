import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Array<Tournament>;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentService.getTournamenets().subscribe(
      (data) => this.tournaments = data,
      (error) => this.globals.emitError(error)
    );
  }
}
