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

            this.decorateWithPosition(this.trainingLeague);
            this.decorateWithPosition(this.bringAFriendLeague);
        });
    }

    decorateWithPosition(array : any[]) : void {
        var position = 0;
            var current = -1;
            for (var i = 0; i < array.length; i++) {
                var x = array[i];
                var count = x.count - 0;
                if (i == 0) {
                    position++;
                    current = count;
                    array[i].position = position + "" + ".";
                } else {
                    if (current > count) {
                        position = i + 1;
                        current = count;
                        array[i].position = position + "" + ".";
                    } else {
                        array[i].position = "";
                    }
                }
            }
    }

    goToDetail(item : any) : void {
        this.apiService.getPlayerByUsername(item.username).then(p => {
            let link = ['/players', p.id];
            this.router.navigate(link);
        })
    }
}
