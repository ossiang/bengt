import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location }               from '@angular/common'
import { PlayerService }          from '../player.service'
import { Player }                 from '../models/player';

@Component({
  selector: 'player-detail',
  moduleId: module.id,
  templateUrl: 'player.detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
    player: Player;

    constructor(
      private playerService : PlayerService,
      private route : ActivatedRoute,
      private location : Location
    ) {

    }

    ngOnInit() : void {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        //this.playerService.getPlayer(id).then(result => this.player = result);
      })
    }

    save() : void {
      // this.playerService.update(this.player).then(() => this.goBack())
    }

    goBack() : void {
      this.location.back();
    }
}