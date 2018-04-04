import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {NotificationService} from '../../services/notification.service';
import {Tournament} from '../../data_types/tournament';
import {ClipboardService} from 'ngx-clipboard';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Array<Tournament>;

  constructor(private notifier: NotificationService,
              private tournamentService: TournamentService,
              private clipboard: ClipboardService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
        if (!this.tournaments) {
          this.tournaments = [];
          throw new Error('Could not get tournaments for some unknown reason. :(');
        }
      }, 10000
    );

    this.tournamentService.getTournamenets().subscribe(
      (data) => this.tournaments = Tournament.fromBattlefyResponse(data).sort((a, b) => +(a.start > b.start)),
      (error) => {
        this.tournaments = [];
        throw error;
      }
    );
  }

  open(url) {
    window.open(url, '_blank');
  }

  getJoinCode(tournament: Tournament) {
    if (!this.isLoggedIn()) {
      throw new Error('You must login to join a tournament!');
    }

    this.tournamentService.getJoinCode(tournament._id).subscribe(
      (data) => {
        tournament.joinCode = data['code'];
        this.notifier.emitMessage('Click the code to copy to clipboard');
      }
    );
  }

  copyJoinCodeToClipboard(tournament: Tournament) {
    if (tournament.joinCode !== 'Copied!') {
      this.clipboard.copyFromContent(tournament.joinCode);
      const code = tournament.joinCode;
      tournament.joinCode = 'Copied!';
      setTimeout(() => tournament.joinCode = code, 1000);
    }
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }
}
