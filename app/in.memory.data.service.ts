import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let players = [
      {id: 1, name: 'Adam'},
      {id: 2, name: 'Daniel R'},
      {id: 3, name: 'Einar'},
      {id: 4, name: 'Jakob'},
      {id: 5, name: 'Mattias'},
      {id: 6, name: 'Micke'},
      {id: 7, name: 'Ossian'},
      {id: 8, name: 'Papi'},
      {id: 9, name: 'Robin'},
      {id: 10, name: 'Samir'},
      {id: 11, name: 'Ali'},
      {id: 12, name: 'Jon'},
      {id: 13, name: 'Kalle'},
      {id: 14, name: 'Perra'},
      {id: 15, name: 'Robert'},
    ];

    let trainings = [
      "2016-10-10",
      "2016-10-17",
      "2016-10-24",
      "2016-10-31",
      "2016-11-07",
      "2016-11-14",
    ];

    let trainingOccasions = [
      { date: "2016-10-10", attending: [4, 5, 9],  notAttending: [7, 10] },
      { date: "2016-10-17", attending: [],  notAttending: [] },
      { date: "2016-10-24", attending: [],  notAttending: [] },
      { date: "2016-10-31", attending: [],  notAttending: [] },
      { date: "2016-11-07", attending: [],  notAttending: [] },
      { date: "2016-11-14", attending: [],  notAttending: [] },
    ];

    return {
      players,
      trainings,
      trainingOccasions
    };
  }
}