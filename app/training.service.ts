import { Injectable }               from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Rx'
import { Training }                 from './models/training'
import { Player }                   from './models/player'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrainingService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getPlayers(): Promise<Player[]> {
        return this.http.get('app/players')
            .toPromise()
            .then(response => response.json().data as Player[])
            .catch(this.handleError);
    }

    getTrainings(): Promise<string[]> {
        return this.http.get('app/trainings')
            .toPromise()
            .then(response => response.json().data as string[])
            .catch(this.handleError);
    }
    
    getTraining(training : string) : Promise<string> {
        return this.getTrainings().then(result => result.find(t => t === training));
    }

    getTrainingWithPlayers(date : string) : Promise<Training> {
        return this.getTrainingsWithPlayers().then(result => result.find(t => t.date === date));
    }

    registerPlayer(player : Player, date : string, status : string) : Promise<void> {
        var data = {
            date: date,
            playerId: player.id,
            status: status
        };
        return this.http
            .post("app/trainingOccasions", JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private getTrainingsWithPlayers() : Promise<Training[]> {
        return this.http.get('app/trainingOccasions')
            .toPromise()
            .then(response => response.json().data as Training[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}


// this.http.get('./customer.json').map((res: Response) => {
//                    this.customer = res.json();
//                    return this.customer;
//                 })
//                 .flatMap((customer) => this.http.get(customer.contractUrl)).map((res: Response) => res.json())
//                 .subscribe(res => this.contract = res);

// //parallel
// import {Observable} from 'rxjs/Observable';
// Observable.forkJoin(
//   this.http.get('./friends.json').map((res: Response) => res.json()),
//   this.http.get('./customer.json').map((res: Response) => res.json())
// ).subscribe(res => this.combined = {friends:res[0].friends, customer:res[1]});