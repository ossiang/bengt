import { Player } from '../models/player'
import { TrainingStatus } from '../models/trainingStatus'

export class Attendee {
  player: Player;
  ts: string;
  guest: string;
  status: TrainingStatus;

  constructor(player: Player, ts: string, guest: string, status: string) {
    this.player = player;
    this.ts = ts;
    this.guest = guest;
    switch(status){
      case "0":
        this.status = TrainingStatus.WillNotAttend;
        break;
      case "1":
        this.status = TrainingStatus.IntendsToAttend;
        break;
      case "2":
        this.status = TrainingStatus.DidAttend;
        break;
      default:
        this.status = TrainingStatus.HaveNotAnswered;
        break;
    } 
  }

  public isGuest() : boolean {
    if (this.guest) {
      return true;
    }
    return false;
  }
}