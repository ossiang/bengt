import { Player } from '../models/player'
export class Attendee {
  player: Player;
  ts: string;
  guest: string;

  constructor(player: Player, ts: string, guest: string) {
    this.player = player;
    this.ts = ts;
    this.guest = guest;
  }

  public isGuest() : boolean {
    if (this.guest) {
      return true;
    }
    return false;
  }
}