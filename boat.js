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

            break;
        }
    }
}
