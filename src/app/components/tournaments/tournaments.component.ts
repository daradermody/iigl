import {Component, EventEmitter, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {NotificationService} from '../../services/notification.service';
import {Tournament} from '../../data_types/tournament';
import {ClipboardService} from 'ngx-clipboard';
import {AuthService} from '../../services/auth.service';

require('clipboard');

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Array<Tournament>;
  update = new EventEmitter<string>();

  constructor(private notifier: NotificationService,
              private tournamentService: TournamentService,
              private clipboard: ClipboardService) {
    this.update.subscribe();
  }

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
    if (!this.isLoggedIn()) {
      this.notifier.emitError('You must login to join a tournament!');
      return;
    }

    this.tournamentService.getJoinCode(tournament._id).subscribe(
      (data) => {
        tournament.joinCode = data['code'];
        this.notifier.emitMessage('Click the code to copy to clipboard');
      },
        (error) => this.notifier.emitError(error.error.message)
    );
  }

  copyJoinCodeToClipboard(tournament: Tournament) {
    this.clipboard.copyFromContent(tournament.joinCode);
    const code = tournament.joinCode;
    tournament.joinCode = 'Copied!';
    setTimeout(() => tournament.joinCode = code, 1000);
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }
}
