import { Component, Input }       from '@angular/core';
import { Player }                 from '../models/player';
import { PlayerProperties }       from '../models/playerProperties';

@Component({
  selector: 'player-detail',
  templateUrl: './player.detail.component.html'
})
export class PlayerDetailComponent {
    @Input()
    player: Player;

    @Input()
    playerProperties: PlayerProperties
}
