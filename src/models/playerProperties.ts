export class PlayerProperties {
    attack: number;
    defence: number;
    passing: number;
    shooting: number;
    speed: number;
    stamina: number;
    strength: number;
    technique: number;

    constructor(player : any) {
        this.attack = this.transform(player.attack);
        this.defence = this.transform(player.defence);
        this.passing = this.transform(player.passing);
        this.shooting = this.transform(player.shooting);
        this.speed = this.transform(player.speed);
        this.stamina = this.transform(player.stamina);
        this.strength = this.transform(player.strength);
        this.technique = this.transform(player.technique);
    }

    transform(value : any) : number {
        let num = (value == null) ? 3 : value - 0;
        return num;
    }
}