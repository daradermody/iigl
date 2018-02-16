import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {NotificationService} from '../../services/notification.service';
import {Tournament} from '../../data_types/tournament';
import {Clipboard} from 'clipboard';
require('clipboard')

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Array<Tournament>;

  constructor(private notifier: NotificationService,
              private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentService.getTournamenets().subscribe(
      (data) => this.tournaments = Tournament.fromBattlefyResponse(data).sort((a, b) => +(a.start > b.start)),
      (error) => this.notifier.emitError(error)
    );
  }

  open(url) {
    window.open(url, '_blank');
  }

  getJoinCode(tournament: Tournament) {
    this.tournamentService.getJoinCode(tournament._id).subscribe(
      (data) => {
        tournament.joinCode = data['code'];
        const copyText = document.getElementById('myInput');
        copyText.select();
        document.execCommand('Copy');
      },
          (error) => this.notifier.emitError(error.error);
      }
    )
  }
}
