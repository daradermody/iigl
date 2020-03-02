import {Component} from '@angular/core';
import {WallOfFameGame} from '../../data_types/wall-of-fame-game';

@Component({
  selector: 'app-wall-of-fame',
  templateUrl: './wall-of-fame.component.html',
  styleUrls: ['./wall-of-fame.component.css']
})
export class WallOfFameComponent {
  games = [
    new WallOfFameGame('Rocket League', '/assets/img/wall_of_fame/rocket_league_placeholder.jpg'),
    new WallOfFameGame('League of Legends', '/assets/img/wall_of_fame/lol_placeholder.jpg')
    new WallOfFameGame('Smash Ultimate', '/assets/img/wall_of_fame/smash_ultimate.png')
  ];

  selectedGame: WallOfFameGame;
  gameDisplayed: WallOfFameGame;

  curtainsOpen = false;

  selectGame(game: WallOfFameGame) {
    if (this.selectedGame !== game) {
      this.selectedGame = game;
      if (this.curtainsOpen) {
        this.curtainsOpen = false;
        setTimeout(() => this.setGame(game), 1500);
      } else {
        this.setGame(game);
      }
    }
  }

  setGame(game: WallOfFameGame) {
    this.gameDisplayed = game;
    this.curtainsOpen = true;
  }
}
