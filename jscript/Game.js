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
        return this.game_state;
    };
    getEnemy(){
        return this.game_state;
    };
    setGameState(g){
        this.game_state = g;
        updateControls(this);
    };
    addPlayerShips(){
        this.player.push(loadPlayer());
    };
    drawPlayerShips(){
        drawShip(this.player[0]);
    };
    erasePlayerShips(){
        removeShip(this.player[0]);
    };
    clearPlayerShips(){
        this.player.shift();
    };
    updatePlayerShipVisual(){
        updateShip(this.player[0]);
    };
    updatePlayerShipData(h){
        this.player[0].setHull(h);
    }
    addEnemyShipSet(){
        this.enemy = loadEnemySet(6);
    };
    drawEnemyShips(){
        drawShip(this.enemy[0]);
    };
    eraseEnemyShips(){
        removeShip(this.enemy[0]);
    };
    clearEnemyShips(){
        this.enemy.shift();
    };
    updateEnemyShipVisual(){
        updateShip(this.enemy[0]);
    };
    updateEnemyShipData(h){
        this.enemy[0].setHull(h);
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
            if(this.attack(this.player[0])){
                this.enemy[0].setHull(this.enemy[0].getHull() - this.player[0].getFirepower());
                this.updateEnemyShipVisual();
                if(this.enemy[0].hull <= 0){
                    this.eraseEnemyShips();
                    this.clearEnemyShips();
                    if(this.enemy.length !== 0)
                        this.drawEnemyShips();
                    enemyDown = true;
                }
            }
            if(!enemyDown){
                if(this.attack(this.enemy[0])){
                    this.player[0].setHull(this.player[0].getHull() - this.enemy[0].getFirepower());
                    this.updatePlayerShipVisual();
                    if(this.player[0].hull <= 0){
                        this.erasePlayerShips();
                        this.clearPlayerShips();
                        playerDown = true;
                    }
                }
            }
            if(playerDown || (this.enemy.length === 0))
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