import {Component} from '@angular/core';
import {WallOfFameGame} from '../../data_types/wall-of-fame-game';

@Component({
  selector: 'app-wall-of-fame',
  templateUrl: './wall-of-fame.component.html',
  styleUrls: ['./wall-of-fame.component.css']
})
export class WallOfFameComponent {
  games = [
    new WallOfFameGame('Rocket League', '/assets/img/wall_of_fame/placeholder.jpg'),
  ];

  selectedGame: WallOfFameGame;
}
