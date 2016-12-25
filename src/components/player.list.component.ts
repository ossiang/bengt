import { Component, Input } from '@angular/core'
import { Attendee } from '../models/attendee'
import { Router } from '@angular/router'

@Component({
  templateUrl: './player.list.component.html',
  selector: 'player-list'
})
export class PlayerList {
    @Input()
    attendees : Attendee[];

    @Input()
    title : string;

    constructor(
        private router : Router
    ){
    }

    goToDetail(attendee : Attendee) : void {
        let link = ['/players', attendee.player.id];
        this.router.navigate(link);
    }
}
