import { Component }        from '@angular/core';
import { Player }           from '../models/player';
import { PlayerProperties } from '../models/playerProperties'
import { ApiService }       from '../api.service';
import { OnInit }           from '@angular/core';
import { Router }           from '@angular/router'

@Component({
    //selector: 'whatever',
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {

    players : Player[] = [];
    selectedPlayer : Player;
    playerProperties : PlayerProperties;

    constructor(
        private apiService : ApiService,
        private router : Router
    ){}

    ngOnInit(): void {
        this.apiService.getPlayers().then(allPlayers => {
            this.players = allPlayers;
            this.selectedPlayer = this.players[0];
            this.playerProperties = new PlayerProperties(this.selectedPlayer);
        });
    }

    onSelect(player : Player) : void {
        this.selectedPlayer = player;
        this.playerProperties = new PlayerProperties(player);
    }

    // gotoDetail() : void {
    //   let link = ['/detail', this.selectedPlayer.id];
    //   this.router.navigate(link);
    // }

}
