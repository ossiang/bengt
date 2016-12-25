import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location }               from '@angular/common'
import { ApiService }             from '../api.service'
import { Player }                 from '../models/player';

@Component({
  selector: 'player-detail',
  templateUrl: './player.detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
    player: Player;

    constructor(
      private apiService : ApiService,
      private route : ActivatedRoute,
      private location : Location
    ) {

    }

    ngOnInit() : void {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        //this.apiService.getPlayer(id).then(result => this.player = result);
      })
    }

    save() : void {
      // this.apiService.update(this.player).then(() => this.goBack())
    }

    goBack() : void {
      this.location.back();
    }
}
