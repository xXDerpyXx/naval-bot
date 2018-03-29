module.exports = class boat{
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.type = type;
        this.hp = 0; //hits that can be taken
        this.range = 0; //how far it can attack
        this.dodge = 0; // how likely to miss (1 to 10)
        this.attack = 0; //amount of damage per successful hit
        switch(this.type){
            case "submarine":
                this.hp = 5
                this.dodge = 5;
                this.range = 3;
                this.attack = 1;
            break;
            case "convoy":
                this.hp = 3;
                this.dodge = 1;
                this.range = 2;
                this.attack = 3;
            break;
            case "destroyer":
                this.hp = 10;
                this.dodge = 0;
                this.range = 5;
                this.attack = 2;
            break;
            case "cruiser":
                this.hp = 6;
                this.dodge = 3;
                this.range = 7;
                this.attack = 1;
            break;
        }
    }
}
