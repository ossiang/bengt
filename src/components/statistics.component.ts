import { Component }      from '@angular/core';
import { Player }         from '../models/player';
import { ApiService }     from '../api.service';
import { OnInit }         from '@angular/core';
import { Router }         from '@angular/router'

@Component({
    //selector: 'whatever',
    templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {

    trainingLeague : any[];
    bringAFriendLeague : any[];
    numTrainings : number;
    numCancelledTrainings : number;
    averageAttending : number;
    averageAttendingGuest : number;

    constructor(
        private apiService : ApiService,
        private router : Router
    ){}

    ngOnInit(): void {
        this.apiService.getStatistics().then(statistics => {
            this.trainingLeague = statistics["trainingLeague"];
            this.bringAFriendLeague = statistics["bringAFriendLeague"];
            this.numTrainings = statistics.seasonStatistics["numTrainings"];
            this.numCancelledTrainings = statistics.seasonStatistics["numCancelledTrainings"];
            this.averageAttending = statistics.seasonStatistics["averageAttending"];
            this.averageAttendingGuest = statistics.seasonStatistics["averageAttendingGuest"];
        });
    }

    // gotoDetail() : void {
    //   let link = ['/detail', this.selectedPlayer.id];
    //   this.router.navigate(link);
    // }

}
