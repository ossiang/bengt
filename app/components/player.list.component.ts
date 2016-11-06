import { Component, Input } from '@angular/core'
import { Player } from '../models/player'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  templateUrl: 'player.list.component.html',
  selector: 'player-list'
})
export class PlayerList {
    @Input()
    players : Player[];

    @Input()
    title : string;
    
    constructor(
        private router : Router
    ){
    }

    gotoDetail(player : Player) : void {
        let link = ['/detail', player.id];
        this.router.navigate(link);
    }
}