import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gameIcons = [
    '/assets/img/game_logos/league_of_legends.webp',
    '/assets/img/game_logos/overwatch.webp',
    '/assets/img/game_logos/rocket_league.webp',
    '/assets/img/game_logos/hearthstone.webp',
    '/assets/img/game_logos/dota.webp',
    '/assets/img/game_logos/starcraft.webp'
  ];
}
