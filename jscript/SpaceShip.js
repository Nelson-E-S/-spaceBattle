class SpaceShip {
    constructor(){
        this.type = "";
        this.id = "";
        this.faction = "";
        this.hull = 0;
        this.baseHull = 0;
        this.shield = 0;
        this.baseShield = 0;
        this.firepower = 0;
        this.accuracy = 0.0;
    };
    getType(){
        return this.type;
    }
    getID(){
        return this.id;
    }
    getFaction(){
        return this.faction;
    }
    getHull(){
        return this.hull;
    }
    getBaseHull(){
        return this.baseHull;
    }
    getShield(){
        return this.shield;
    }
    getBaseShield(){
        return this.baseShield;
    }
    getFirepower(){
        return this.firepower;
    }
    getAccuracy(){
        return this.accuracy;
    }
    setType(t){
        this.type = t;
    }
    setID(i){
        this.id = i;
    }
    setFaction(ft){
        this.faction = ft;
    }
    setHull(h){
        this.hull = h;
    }
    setBaseHull(h){
        this.baseHull = h;
    }
    setShield(s){
        this.shield = s;
    }
    setBaseShield(s){
        this.baseShield = s;
    }
    setFirepower(f){
        this.firepower = f;
    }
    setAccuracy(a){
        this.accuracy = a;
    }
}