/*ship references*/
var playerShipHTML = 
    `<div class="player" id="<id>">
        <div id="pic"><span>Missiles:<input type="checkbox" id="missile_1" class="missileSelector" value="missile" onchange="sendMissileChoice(this)"><input type="checkbox" id="missile_2" class="missileSelector" onchange="sendMissileChoice(this)"><input type="checkbox" id="missile_3" class="missileSelector" onchange="sendMissileChoice(this)"></span></div>
        <div id="shield"><shield></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
var enemyShipHTML = 
    `<div class="enemy" id="-id-">
        <div id="pic"><input type="checkbox" id="-i-" value="-id-" class="enemySelector" onchange="sendPlayerChoice(this)">:id:</div>
        <div id="shield"><shield></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
var enemyBossShipHTML = 
    `<div class="enemy" id="enemy_boss">
        <div id="pic"><input type="checkbox" id="-i-" value="-id-" class="enemySelector" onchange="sendPlayerChoice(this)">:id:</div>
        <div id="shield"><shield></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div class="fire">-fp-</div>
            <div class="fire">-fp-</div>
            <div class="fire">-fp-</div>
            <div class="fire">-fp-</div>
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
    `<span class="enemy_attack enemy_acc">-id- <h/m>!</span><br>`;
var enemyDmg = 
    `<span class="enemy_attack player_dmg">-id- hits for <x> damage</span><br>`;
var destroyedPlayer = 
    `<span class="destroyedship player_ship">-id- destroys Player Ship!</span><br>`;
var playerLost = 
    `<span class="player_lost">Game Over!<br>Hit Start to try again.</span><br>`;
var infoEnemyChoice = 
    `<span class="info">You can choose which enemy to attack: by default you'll attack the left most enemy</span><br>`;
var infoMissiles = 
    `<span class="info">You can choose to use a single missile for your attack instead of your ship's firepower.<br>Once a missile is used it will no longer be avialable.<br>Missiles always hit and for 10 damage.</span><br>`;
var infoBoss = 
    `<span class="info">This is a boss. It's health is the number of firepods and itself shared evenly.<br>As you fire and destroy firepods it will attack with any remaining pods.<br>Good luck!</span><br>`;