import {Component} from '@angular/core';

@Component({
  selector: 'app-wall-of-fame',
  templateUrl: './wall-of-fame.component.html',
  styleUrls: ['./wall-of-fame.component.css']
})
export class WallOfFameComponent {
  games = [
    {
      name: 'Rocket League',
      clicked: true,
      wallOfFameImage: 'assets/img/rocket_league_wall.png'
    }, {
      name: 'League of Legends',
      clicked: false,
      wallOfFameImage: 'assets/img/lol_wall.png'
    }, {
      name: 'Overwatch',
      clicked: false,
      wallOfFameImage: 'assets/img/overwatch_wall.png'
    }, {
      name: 'Hearthstone',
      clicked: false,
      wallOfFameImage: 'assets/img/hearthstone_wall.png'
    }
  ];

  selectedGame = {};
}
