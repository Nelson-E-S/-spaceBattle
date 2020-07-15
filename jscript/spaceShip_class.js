class SpaceShip {
    constructor(){
        this.hull = 0;
        this.firepower = 0;
        this.accuracy = 0.0;
    };
    getHull(){
        return this.hull;
    }
    getFirepower(){
        return this.firepower;
    }
    getAccuracy(){
        return this.accuracy;
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