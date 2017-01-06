import { Component }              from '@angular/core';
import { Player }                 from '../models/player';
import { PlayerProperties }       from '../models/playerProperties'
import { ApiService }             from '../api.service';
import { OnInit }                 from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

@Component({
    //selector: 'whatever',
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {

    players : Player[] = [];
    player : Player;
    playerProperties : PlayerProperties;
    editMode : boolean;

    constructor(
        private apiService : ApiService,
        private route : ActivatedRoute
    ){
        this.editMode = false;
    }

    ngOnInit(): void {
        this.apiService.getPlayers().then(allPlayers => {
            this.players = allPlayers;
            this.route.params.forEach((params: Params) => {
                let id = params['id'];
                if (id) {
                    this.apiService.getPlayer(id).then(result => {
                        this.player = result;
                        this.playerProperties = new PlayerProperties(result);
                    });
                }
            });
        });
    }

    onSelect(p : Player) : void {
        this.editMode = false;
        this.player = p;
        this.playerProperties = new PlayerProperties(p);
    }

    isActive(p : Player) : boolean {
        return p && this.player && p.id === this.player.id;
    }

    updateProperties(properties : PlayerProperties) : void {
        this.editMode = false;
        this.playerProperties = properties;
    }
}
