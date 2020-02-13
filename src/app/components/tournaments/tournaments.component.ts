import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {NotificationService} from '../../services/notification.service';
import {Tournament} from '../../data_types/tournament';
import {ClipboardService} from 'ngx-clipboard';
import * as moment from 'moment';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  upcomingTournaments: Array<Tournament>;
  pastTournaments: Array<Tournament>;

  constructor(private notifier: NotificationService,
              private tournamentService: TournamentService,
              private clipboard: ClipboardService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
        if (!this.upcomingTournaments) {
          this.upcomingTournaments = [];
          throw new Error('Could not get tournaments for some unknown reason. :(');
        }
      }, 10000
    );

    this.tournamentService.getTournamenets().subscribe(
      (data) => {
        const tournaments = Tournament.fromBattlefyResponse(data).sort((a, b) => +(a.start > b.start));
        this.upcomingTournaments = tournaments.filter(tournament => tournament.start.isAfter(moment().subtract(1, 'week')));
        this.pastTournaments = tournaments.filter(tournament => tournament.start.isBefore(moment().subtract(1, 'week')));
      },
      (error) => {
        this.upcomingTournaments = [];
        this.pastTournaments = [];
        throw error;
      }
    );
  }
}
