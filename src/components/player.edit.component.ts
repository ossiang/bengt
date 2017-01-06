import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../models/player';
import { PlayerProperties } from '../models/playerProperties';
import { ApiService } from '../api.service';

@Component({
  selector: 'player-edit',
  templateUrl: './player.edit.component.html'
})
export class PlayerEditComponent implements OnInit {
    @Input()
    player: Player;

    @Input()
    playerProperties: PlayerProperties

    @Output()
    propertiesChanged = new EventEmitter();

    options = [1, 2, 3, 4, 5];

    newProperties : PlayerProperties;

    constructor(private apiService : ApiService) {
    }

    ngOnInit() : void {
      this.newProperties = new PlayerProperties(this.playerProperties);
    }

    save() : void {
      this.apiService.updatePlayer(this.player, this.newProperties).then(result => {
        this.propertiesChanged.emit(this.newProperties);
      });
    }

    cancel() : void {
      this.propertiesChanged.emit(this.playerProperties);
    }
}
