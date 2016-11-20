import { Injectable }           from '@angular/core';
import { Http }                 from '@angular/http';
import { Player }               from './models/player';
import { Training }             from './models/training';
import { TrainingRegistration } from './models/trainingRegistration';
import { Comment }              from './models/comment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    // private url = 'http://localhost:8080/bengt/api.php?f=';  // URL to web api
    private url = 'http://bengtfotboll.se/api/api.php?f=';  // URL to web api

    constructor(private http: Http) { }

    getPlayers() : Promise<Player[]> {
        return this.get('getActivePlayers')
            .then(data => data as Player[]);
    }

    getTrainings() : Promise<Training[]> {
        return this.get('getTrainings')
            .then(data => data as Training[]);
    }

    getTrainingRegistrations(training: Training) : Promise<TrainingRegistration[]> {
        return this.get(`getTrainingRegistrations&trainingId=${training.id}`)
            .then(data => data as TrainingRegistration[]);
    }

    getPlayer(id : string) : Promise<Player> {
        return this.getPlayers().then(result => result.find(p => p.id === id));
    }

    getMessages(training : Training) : Promise<Comment[]> {
        return this.get(`getMessages&trainingId=${training.id}`)
            .then(data => data as Comment[]);
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
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
