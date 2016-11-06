import { Component, OnInit }    from '@angular/core'
import { Player }               from '../models/player'
import { Training }             from '../models/training'
import { PlayerService }        from '../player.service'

@Component({
  moduleId: module.id,
  templateUrl: 'training.section.component.html'
})
export class TrainingSectionComponent implements OnInit {

    selectedTraining : Training;
    selectedPlayer : Player;

    allPlayers : Player[] = [];
    trainings : Training[] = [];

    attending : Player[] = [];
    notAttending : Player[] = [];
    notAnswered : Player[] = [];

    constructor(
        private playerService : PlayerService
    ){
    }

    ngOnInit() : void {
        let p1 = this.playerService.getPlayers().then(allPlayers => {
            this.allPlayers = allPlayers;
        });
        let p2 = this.playerService.getTrainings().then(trainings => {
            this.trainings = trainings;
            this.selectedTraining = trainings[0];
        });
        Promise.all([p1, p2]).then(() => this.salmon());
    }

    register() {
        this.playerService.register(this.selectedTraining, this.selectedPlayer, "1").then(r => this.salmon());
    }

    registerDisabled() {
        return !this.selectedPlayer || this.attending.some(p => p.id === this.selectedPlayer.id);
    }

    unregister() {
        this.playerService.register(this.selectedTraining, this.selectedPlayer, "0").then(r => this.salmon());
    }

    unregisterDisabled() {
        return !this.selectedPlayer || this.notAttending.some(p => p.id === this.selectedPlayer.id);
    }

    private salmon() {
        this.playerService.getTrainingRegistrations(this.selectedTraining).then(result => {
            this.attending = [];
            this.notAttending = [];
            this.notAnswered = [];

            for (var i = 0; i < this.allPlayers.length; i++) {
                let player = this.allPlayers[i];

                let response = result.find(tr => tr.name === player.id)

                if (!response) {
                    this.notAnswered.push(player);
                } else if (response.status === "1") {
                    this.attending.push(player);
                } else if (response.status === "0") {
                    this.notAttending.push(player);
                }
            }
        });
    }
}