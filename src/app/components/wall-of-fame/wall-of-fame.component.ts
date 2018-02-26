import {Component} from '@angular/core';
import {WallOfFameGame} from '../../data_types/wall-of-fame-game';

@Component({
  selector: 'app-wall-of-fame',
  templateUrl: './wall-of-fame.component.html',
  styleUrls: ['./wall-of-fame.component.css']
})
export class WallOfFameComponent {
  games = [
    new WallOfFameGame('Rocket League', '/assets/img/wall_of_fame/rocket_league_wall.png'),
    new WallOfFameGame('League of Legends', '/assets/img/wall_of_fame/lol_wall.png'),
    new WallOfFameGame('Overwatch', '/assets/img/wall_of_fame/overwatch_wall.png'),
    new WallOfFameGame('Hearthstone', '/assets/img/wall_of_fame/hearthstone_wall.png')
  ];

  selectedGame: WallOfFameGame;
}
