import { Component, Input } from '@angular/core';
import { Tournament } from '../../data_types/tournament';
import { NotificationService } from '../../services/notification.service';
import { TournamentService } from '../../services/tournament.service';
import { ClipboardService } from 'ngx-clipboard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent {
  @Input() tournaments: Array<Tournament>;
  @Input() areOpenToEntry = true;
  @Input() emptyMessage: string;

  constructor(private notifier: NotificationService,
              private tournamentService: TournamentService,
              private clipboard: ClipboardService) {
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
