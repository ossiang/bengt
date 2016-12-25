import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location }               from '@angular/common'
import { ApiService }             from '../api.service'
import { Player }                 from '../models/player';
import { PlayerProperties }       from '../models/playerProperties';

@Component({
  selector: 'player-detail',
  templateUrl: './player.detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
    @Input()
    player: Player;

    @Input()
    playerProperties: PlayerProperties

    constructor(
      private apiService : ApiService,
      private route : ActivatedRoute,
      private location : Location
    ) {

    }

    ngOnInit() : void {
    }

    save() : void {
      // this.apiService.update(this.player).then(() => this.goBack())
    }

    goBack() : void {
      this.location.back();
    }
}
