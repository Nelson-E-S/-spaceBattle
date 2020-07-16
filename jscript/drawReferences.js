/*ship references*/
var playerShipHTML = 
    `<div class="player" id="<id>">
        <div id="pic"></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
var enemyShipHTML = 
    `<div class="enemy" id="<id>">
        <div id="pic"></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
/*control references*/
var startBtnHTML = 
    `<button id="game_start">Start</button>`;
var playBtnsHTML = 
    `<button id="battle_attack">Attack</button>
    <button id="battle_retreat">Retreat</button>`;
/*message log references*/
var startRound =
    `<span class="round">Round <x></span><br>`;
var playerAcc = 
    `<span class="player_attack player_acc">Player <h/m>!</span><br>`;
var playerDmg =
    `<span class="player_attack enemy_dmg">Player hits for <x> damage</span><br>`;
var destroyedEnemy =
    `<span class="destroyedship enemy_ship">Player destroys <enemyid></span><br>`;
var playerWon = 
    `<span class="player_won">Game Won!<br>Hit Start to try again.</span><br>`;
var halfRound = 
    `<span class="round">Round <x>.5</span><br>`;
var enemyAcc =
    `<span class="enemy_attack enemy_acc">Enemy <h/m>!</span><br>`;
var enemyDmg = 
    `<span class="enemy_attack player_dmg">Enemy hits for <x> damage</span><br>`;
var destroyedPlayer = 
    `<span class="destroyedship player_ship">Enemy destroys Player Ship!</span><br>`;
var playerLost = 
    `<span class="player_lost">Game Over!<br>Hit Start to try again.</span><br>`;