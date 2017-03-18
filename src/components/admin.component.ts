import { Component }      from '@angular/core';
import { Player }         from '../models/player';
import { Attendee }       from '../models/attendee';
import { Training }       from '../models/training';
import { TrainingStatus } from '../models/trainingStatus';
import { ApiService }     from '../api.service';
import { OnInit }         from '@angular/core';

@Component({
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    currentUserIsAdmin : boolean = null;
    selectedTraining : Training;
    selectedTrainingCancelledDisabled : boolean = false;
    trainings : Training[] = [];
    newTraining : string = "";
    allPlayers : Player[] = [];
    allPlayersWithStatus : Attendee[];
    saveInProgress : boolean = false;

    constructor(
        private apiService : ApiService
    ){
    }

    ngOnInit() : void {
        this.apiService.getSeasonTrainings().then(trainings => {
            this.trainings = trainings;
        });
        this.apiService.getPlayers().then(result => {
            this.allPlayers = result;
            let selectedPlayerId = localStorage.getItem('selectedPlayerId');
            if(selectedPlayerId) {
                var p = this.allPlayers.find(p => p.id === selectedPlayerId);
                if (p != null) {
                    this.currentUserIsAdmin = p.admin === "1";
                }
            }
        });
    }

    addTraining() : void {
        this.apiService.addTraining(this.newTraining).then(result => {
            this.trainings.push(result);
            this.newTraining = "";
        });
    }

    disableAddButton() : Boolean {
        if (this.newTraining.length != 10) {
            return true;
        }

        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        return this.newTraining.match(regEx) == null;
    }

    getTrainingSpecifics() : void {
        this.apiService.getTrainingRegistrations(this.selectedTraining).then(result => {
            this.allPlayersWithStatus = [];
            for (var i = 0; i < this.allPlayers.length; i++) {
                let player = this.allPlayers[i];
                let response = result.find(tr => tr.guest == null && tr.name === player.id)
                if (response) {
                    this.allPlayersWithStatus.push(new Attendee(player, response.ts, null, response.status));
                } else {
                    this.allPlayersWithStatus.push(new Attendee(player, null, null, "-1"));
                }
            }

            var claimedAttendingGuests = result.filter(r => r.guest != null && r.status === "1");
            for (var i = 0; i < claimedAttendingGuests.length; i++) {
                var g = claimedAttendingGuests[i];
                this.allPlayersWithStatus.push(new Attendee(this.allPlayers.find(p => p.id === g.name), g.ts, g.guest, "1"));
            }

            var verifiedAttendingGuests = result.filter(r => r.guest != null && r.status === "2");
            for (var i = 0; i < verifiedAttendingGuests.length; i++) {
                var g = verifiedAttendingGuests[i];
                this.allPlayersWithStatus.push(new Attendee(this.allPlayers.find(p => p.id === g.name), g.ts, g.guest, "2"));
            }
        });
    }

    toggleCancelled() : void {
        this.selectedTraining.cancelled = (this.selectedTraining.cancelled === "0") ? "1" : "0";
        this.selectedTrainingCancelledDisabled = true;
        this.apiService.cancelTraining(this.selectedTraining).then(result => {
            this.selectedTrainingCancelledDisabled = false;
        });
    }

    setStatus(attendee : Attendee, value : TrainingStatus) {
        let x : Attendee;
        if (attendee.guest) {
            x = this.allPlayersWithStatus.find(a => a.player.id === attendee.player.id && a.guest === attendee.guest);
        }
        else {
            x = this.allPlayersWithStatus.find(a => a.player.id === attendee.player.id && !a.guest);
        }

        x.status = value;
    }

    verifyRegisteredDisabled() : boolean {
        return this.allPlayersWithStatus && !this.allPlayersWithStatus.some(attendee => attendee.status === TrainingStatus.IntendsToAttend);
    }

    verifyRegistered() : void {
        this.allPlayersWithStatus.forEach(function(attendee : Attendee) {
            if (attendee.status === TrainingStatus.IntendsToAttend) {
                attendee.status = TrainingStatus.DidAttend;
            }
        });
    }

    save() : void {
        this.saveInProgress = true;
        var promises = [];
        for (var i = 0; i < this.allPlayersWithStatus.length; i++) {
            let attendee = this.allPlayersWithStatus[i];
            if (attendee.status === TrainingStatus.DidAttend) {
                if (attendee.guest) {
                    promises.push(this.apiService.updateTrainingRegistrationGuest(this.selectedTraining, attendee.guest, attendee.player, "2"));
                } else {
                    promises.push(this.apiService.updateTrainingRegistration(this.selectedTraining, attendee.player, "2"));
                }
            } else if (attendee.status === TrainingStatus.WillNotAttend) {
                if (attendee.guest) {
                    promises.push(this.apiService.updateTrainingRegistrationGuest(this.selectedTraining, attendee.guest, attendee.player, "0"));
                } else {
                    promises.push(this.apiService.updateTrainingRegistration(this.selectedTraining, attendee.player, "0"));
                }
            }
        }

        if (promises.length > 0) {
            Promise.all(promises).then(() => {
                console.log("finished!");
                this.saveInProgress = false;
            });
        } else {
            this.saveInProgress = false;
        }
    }

    saveDisabled() : boolean {
        if (!this.allPlayersWithStatus) {
            return true;
        }
        let value = this.allPlayersWithStatus.some(attendee => attendee.status === TrainingStatus.IntendsToAttend);
        return value;
    }
}
