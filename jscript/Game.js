class Game{
    constructor(){
        this.game_state = "start";
        this.player = [];
        this.enemy = [];
    };
    getGameState(){
        return this.game_state;
    };
    getPlayer(){
        return this.player;
    };
    getEnemy(){
        return this.enemy;
    };
    setGameState(g){
        this.game_state = g;
        updateControls(this);
    };
    addPlayerShips(){
        this.player.push(loadPlayer());
    };
    drawPlayerShips(){
        drawShip(this.getPlayer()[0]);
    };
    erasePlayerShips(){
        removeShip(this.getPlayer()[0]);
    };
    clearPlayerShips(){
        this.getPlayer().shift();
    };
    updatePlayerShipVisual(){
        updateShip(this.getPlayer()[0]);
    };
    updatePlayerShipData(h){
        this.getPlayer()[0].setHull(h);
    }
    addEnemyShipSet(){
        this.enemy = loadEnemySet(6);
    };
    drawEnemyShips(){
        drawShip(this.getEnemy()[0]);
    };
    eraseEnemyShips(){
        removeShip(this.getEnemy()[0]);
    };
    clearEnemyShips(){
        this.getEnemy().shift();
    };
    updateEnemyShipVisual(){
        updateShip(this.getEnemy()[0]);
    };
    updateEnemyShipData(h){
        this.getEnemy()[0].setHull(h);
    }
    updateGameControls(){
        updateControls(this);
    };
    attack(ship){
        let atkRoll = Math.random();
        if (atkRoll <= ship.getAccuracy())
            return true;
        return false;
    }
    attackPhase(){
        if(this.getGameState() === "battle"){
            let enemyDown = false;
            let playerDown = false;
            if(this.attack(this.getPlayer()[0])){
                this.getEnemy()[0].setHull(this.getEnemy()[0].getHull() - this.getPlayer()[0].getFirepower());
                this.updateEnemyShipVisual();
                if(this.getEnemy()[0].hull <= 0){
                    this.eraseEnemyShips();
                    this.clearEnemyShips();
                    if(this.getEnemy().length !== 0)
                        this.drawEnemyShips();
                    enemyDown = true;
                }
            }
            if(!enemyDown){
                if(this.attack(this.getEnemy()[0])){
                    this.getPlayer()[0].setHull(this.getPlayer()[0].getHull() - this.getEnemy()[0].getFirepower());
                    this.updatePlayerShipVisual();
                    if(this.player[0].hull <= 0){
                        this.erasePlayerShips();
                        this.clearPlayerShips();
                        playerDown = true;
                    }
                }
            }
            if(playerDown || (this.getEnemy().length === 0))
                this.setGameState("game_completed");
            this.updateGameControls(this);
        }
    }
    retreatPhase(){
        this.erasePlayerShips();
        this.clearPlayerShips();
        this.setGameState("game_completed");
        this.updateGameControls(this);
    }
}