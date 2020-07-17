class BossShip extends SpaceShip{
    constructor(){
        super();
        this.firePodHealth = [];
    };
    getFirePodHealth(){
        return this.firePodHealth;
    };
    setFirePodHealth(f){
        this.firePodHealth = f;
    }
}