import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gameIcons = [
    '/assets/img/game_logos/league_of_legends.png',
    '/assets/img/game_logos/overwatch.png',
    '/assets/img/game_logos/rocket_league.png',
    '/assets/img/game_logos/hearthstone.png',
    '/assets/img/game_logos/dota.png',
    '/assets/img/game_logos/starcraft.png'
  ];
}
