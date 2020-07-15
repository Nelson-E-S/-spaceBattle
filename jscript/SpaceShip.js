class SpaceShip {
    constructor(){
        this.type = "";
        this.id = "";
        this.hull = 0;
        this.firepower = 0;
        this.accuracy = 0.0;
    };
    getType(){
        return this.type;
    }
    getID(){
        return this.id;
    }
    getHull(){
        return this.hull;
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
    setHull(h){
        this.hull = h;
    }
    setFirepower(f){
        this.firepower = f;
    }
    setAccuracy(a){
        this.accuracy = a;
    }
}