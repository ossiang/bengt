import { Component, OnInit }    from '@angular/core'
import { Player }               from '../models/player'
import { Attendee }             from '../models/attendee'
import { Training }             from '../models/training'
import { Comment }              from '../models/comment'
import { ApiService }           from '../api.service'

@Component({
  templateUrl: './training.section.component.html'
})
export class TrainingSectionComponent implements OnInit {

    showGuestForm : boolean = false;

    selectedTraining : Training;
    selectedPlayer : Player;

    guest : string;

    commentName : string;
    commentMessage : string;

    comments : Comment[];

    allPlayers : Player[] = [];
    trainings : Training[] = [];

    attending : Attendee[] = [];
    notAttending : Attendee[] = [];
    notAnswered : Attendee[] = [];

    constructor(
        private apiService : ApiService
    ){
    }

    ngOnInit() : void {
        let selectedPlayerId = localStorage.getItem('selectedPlayerId');
        let p1 = this.apiService.getPlayers().then(allPlayers => {
            this.allPlayers = allPlayers;
            if(selectedPlayerId) {
                this.selectedPlayer = this.allPlayers.find(p => p.id === selectedPlayerId);
            } else if (this.allPlayers.length > 0) {
                this.selectedPlayer = this.allPlayers[0];
            }
        });
        let p2 = this.apiService.getTrainings().then(trainings => {
            this.trainings = trainings;
            this.selectedTraining = trainings[0];
        });
        Promise.all([p1, p2]).then(() => {
            this.getTrainingSpecifics();
        });
    }

    register() {
        localStorage.setItem('selectedPlayerId', this.selectedPlayer.id);
        this.apiService.register(this.selectedTraining, this.selectedPlayer, "1").then(r => this.getAttendeeOverview());
    }

    registerDisabled() {
        return !this.selectedPlayer || this.attending.some(a => !a.isGuest() && a.player.id === this.selectedPlayer.id);
    }

    unregister() {
        localStorage.setItem('selectedPlayerId', this.selectedPlayer.id);
        this.apiService.register(this.selectedTraining, this.selectedPlayer, "0").then(r => this.getAttendeeOverview());
    }

    unregisterDisabled() {
        return !this.selectedPlayer || this.notAttending.some(a => !a.isGuest() && a.player.id === this.selectedPlayer.id);
    }

    registerGuest() {
        this.apiService.registerGuest(this.selectedTraining, this.guest, this.selectedPlayer, "1").then(r => this.getAttendeeOverview());
    }

    registerGuestDisabled() {
        return !this.selectedPlayer || 
               !this.guest || 
               this.attending.some(attendee => attendee.guest === this.guest);
    }

    unregisterGuest() {
        this.apiService.registerGuest(this.selectedTraining, this.guest, this.selectedPlayer, "0").then(r => this.getAttendeeOverview());
    }

    unregisterGuestDisabled() {
        return !this.selectedPlayer || 
               !this.guest ||
               this.notAttending.some(attendee => attendee.guest === this.guest);
    }

    addComment() {
        this.apiService.createMessage(this.selectedTraining, this.commentName, this.commentMessage).then(result => {
            if (result == true) {
                this.commentName = "";
                this.commentMessage = "";
                this.getMessages();
            } else {
                // todo: handle error
            }
        });
    }

    commentDisabled() {
        return !this.commentName || !this.commentMessage;
    }

    getTrainingSpecifics() {
        this.getAttendeeOverview();
        this.getMessages();
    }

    getMessages() {
        this.apiService.getMessages(this.selectedTraining).then(result => {
            this.comments = result;
        });
    }

    private getAttendeeOverview() {
        this.apiService.getTrainingRegistrations(this.selectedTraining).then(result => {
            this.attending = [];
            this.notAttending = [];
            this.notAnswered = [];

            for (var i = 0; i < this.allPlayers.length; i++) {
                let player = this.allPlayers[i];

                let response = result.find(tr => tr.guest == null && tr.name === player.id)

                if (!response) {
                    this.notAnswered.push(new Attendee(player, "", null));
                } else if (response.status === "1") {
                    this.attending.push(new Attendee(player, response.ts, null));
                } else if (response.status === "0") {
                    this.notAttending.push(new Attendee(player, response.ts, null));
                }
            }

            var attendingGuests = result.filter(r => r.guest != null && r.status === "1");
            for (var i = 0; i < attendingGuests.length; i++) {
                var g = attendingGuests[i];
                this.attending.push(new Attendee(this.allPlayers.find(p => p.id === g.name), g.ts, g.guest));
            }

            var tsCompare = function(a, b){
                if (a.ts > b.ts) {
                    return 1;
                }
                return -1;
            };

            this.attending.sort(tsCompare);
            this.notAttending.sort(tsCompare);
        });
    }
}
