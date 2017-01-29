import { Injectable }           from '@angular/core';
import { Http }                 from '@angular/http';
import { Player }               from './models/player';
import { PlayerProperties }     from './models/playerProperties';
import { Attendee }             from './models/attendee';
import { Training }             from './models/training';
import { TrainingRegistration } from './models/trainingRegistration';
import { Comment }              from './models/comment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    // private url = 'http://localhost:8080/bengt/api.php?f=';
    private url = 'http://bengtfotboll.se/api/api.php?f='; 

    constructor(private http: Http) { }

    getPlayers() : Promise<Player[]> {
        return this.get('getActivePlayers')
            .then(data => data as Player[]);
    }

    getTrainings() : Promise<Training[]> {
        return this.get('getRemainingTrainings')
            .then(data => data as Training[]);
    }

    getSeasonTrainings() : Promise<Training[]> {
        return this.get('getSeasonTrainings')
            .then(data => data as Training[]);
    }

    getTrainingRegistrations(training: Training) : Promise<TrainingRegistration[]> {
        return this.get(`getTrainingRegistrations&trainingId=${training.id}`)
            .then(data => data as TrainingRegistration[]);
    }

    getPlayer(id : string) : Promise<Player> {
        return this.getPlayers().then(result => result.find(p => p.id === id));
    }

    getPlayerByUsername(username : string) : Promise<Player> {
        return this.getPlayers().then(result => result.find(p => p.username === username));
    }

    getMessages(training : Training) : Promise<Comment[]> {
        return this.get(`getMessages&trainingId=${training.id}`)
            .then(data => data as Comment[]);
    }

    getStatistics() : Promise<any> {
        return this.get(`getStatistics`).then(data => data as any);
    }

    createMessage(training : Training, name : string, message : string) : Promise<boolean> {
        let body = {
            training: training.id,
			name: name,
			message: message
        };
        return this.post('createMessage', body).then(result => {
            return result.messageSent
        });
    }

    register(training : Training, player : Player, status) : Promise<boolean> {
        let body = {
            training: training.id,
			player: player.id,
			status: status
        };
        return this.post('register', body).then(result => {
            return result.registrationCompleted
        });
    }

    registerGuest(training : Training, guest : string, friendOf : Player, status) : Promise<boolean> {
        let body = {
            training: training.id,
            guest: guest,
			player: friendOf.id,
			status: status
        };
        return this.post('registerGuest', body).then(result => {
            return result.registrationCompleted
        });
    }

    updateTrainingRegistration(training : Training, player : Player, status) : Promise<boolean> {
        let body = {
            training: training.id,
			player: player.id,
			status: status
        };
        return this.post('updateTrainingRegistration', body).then(result => {
            return result;
        });
    }

    updateTrainingRegistrationGuest(training : Training, guest : string, friendOf : Player, status) : Promise<boolean> {
        let body = {
            training: training.id,
            guest: guest,
			player: friendOf.id,
			status: status
        };
        return this.post('updateTrainingRegistrationGuest', body).then(result => {
            return result;
        });
    }

    updatePlayer(player : Player, properties : PlayerProperties) : Promise<boolean> {
        let body = {
            player: player.id,
            attack: properties.attack,
            defence: properties.defence,
            strength: properties.strength,
            speed: properties.speed,
            stamina: properties.stamina,
            technique: properties.technique,
            passing: properties.passing,
            shooting: properties.shooting
        };
        return this.post('updatePlayer', body).then(result => {
            return result.playerUpdated
        });
    }

    addTraining(date : string) : Promise<Training> {
        let body = {
            date: date
        };
        return this.post('addTraining', body).then(data => data as Training);
    }

    cancelTraining(training : Training) : Promise<Training> {
        let body = {
            training: training.id 
        };
        return this.post('cancelTraining', body).then(data => data as Training);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private get(func: string) {
        return this.http.get(`${this.url}${func}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private post(func: string, body : any) {
        return this.http.post(`${this.url}${func}`, body)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}
