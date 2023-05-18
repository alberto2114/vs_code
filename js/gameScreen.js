
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let gameState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let platform;
let threads;
let threads_inclined;
let thread_changer;
let x_thread = 800/n_webs;

let thread_pos_array;
let thread_inclined_array_ini;
let thread_inclined_array_fin;
let character;
let characterIndex;
let freeInput = true;
let gameEnd = false;
let cursors;
let mouseX;

const DISPAROS_GROUP_SIZE = 10;
let disparos;
const VELOCIDAD_DISPARO = 200;
let fireButton;

let enemies;


const NUM_LEVELS = 3;
const LEVEL_ENEMY_SPAWN_PROB =[0.5, 0.75, 1];
const LEVEL_ENEMY_VELOCITY =[200, 300, 350];
const SCORE_TO_NEXT_LEVEL = 50;
let heartLives;
const ASTEROID_VEL = 200;

var tiempoTexto;
var tiempoTranscurrido = 0;
var puntuaje = 0;
let healthBar = document.getElementById("healthBar");
let health = 100;
var textoParte;
var textoLevel;
let level = 1;


var crono = setInterval(actualizarCronometro, 1000);

game.state.add('menu', startState);
game.state.add('game', gameState);
game.state.add('final', finalState);
//game.state.add('options', optionState);

game.state.start('final');

function loadAssets() {
    console.log('arrancando');
    game.load.image('sky', 'assets/sky1.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('thread', 'assets/string.png');
    game.load.image('purple', 'assets/trajectory_changer.png');
    //game.load.image('character', 'assets/spriteCharacter.png');
    game.load.spritesheet('character', 'assets/spriteSheet.png', 198.5, 211 );


    game.load.image('disparo', 'assets/ammo.png');
    game.load.image('asteroid', 'assets/asteroid_test.png');
    game.load.image("heart", "assets/heart.png");
}



function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    
    //esconder raton
    //this.input.mouse.disableContextMenu();
   // this.input.mouse = this.input.mousePointer = this.input.addPointer(1);

    platform = game.add.group();
    platform.enableBody = true;
    
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;

    threads = game.add.group();
    threads.enableBody = true;
    thread_creator(n_webs);

    threads_inclined = game.add.group();
    //threads_inclined.enableBody = true;

    thread_changer = game.add.group();
    thread_changer.enableBody = true;

    thread_creator_V2();

    characterIndex = 0;

    
    
    character = game.add.sprite(thread_pos_array[characterIndex]-37,game.world.height - 101,'character');
    character.scale.setTo(0.5,0.5);
    game.physics.arcade.enable(character);
    
    character.animations.add('idle', [0, 1], 2.5, true);

    tiempoTexto = this.add.text(3,10, "00:00:00", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoPuntuaje = this.add.text(3,40, "Points: 0", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoParte = this.add.text(739,10, "Part A", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoLevel = this.add.text(746,40, "Lvl " + level, {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});

    crearDisparos(DISPAROS_GROUP_SIZE);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 1, spawnEnemies, this);

    heartLives = game.add.group();
    heartLives.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 21, spawnLives, this);

    healthBar.style.display = "block";
    health = 100;
    puntuaje = 0;
    updateHealthBar();
    tiempoTranscurrido = 0;
    crono = setInterval(actualizarCronometro, 1000);
}
function spawnEnemies() {
    if(Math.random() < LEVEL_ENEMY_SPAWN_PROB[level-1]){
        let randomIndex = Math.floor(Math.random() * (n_webs-1));
    let randomThread = thread_pos_array[randomIndex];

    let enemy = enemies.create(randomThread, 0, 'asteroid');
    enemy.scale.setTo(1, 1);
    enemy.anchor.setTo(0.5, 0.5);
    
    enemy.body.velocity.y = LEVEL_ENEMY_VELOCITY[level-1];
    }
    
    //enemy.body.angularVelocity = 150;
}

function spawnLives() {
    let randomIndex = Math.floor(Math.random() * (n_webs-1));
    let randomThread = thread_pos_array[randomIndex];

    let lives = heartLives.create(randomThread, 0, 'heart');
    lives.scale.setTo(0.02, 0.02);
    lives.anchor.setTo(0.10, 0.5);
    
    lives.body.velocity.y = ASTEROID_VEL;
}

function crearDisparos(num){
    disparos = game.add.group();
    disparos.enableBody = true;
    disparos.createMultiple(num,'disparo');
    //disparos.callAll('events.onOutofBounds.add','events.onOutOfBounds',resetMember);
    disparos.forEach(function(disparo){
        disparo.scale.setTo(0.25,0.25);
    });
    
    
    disparos.setAll('outOfBoundsKill',true);
    disparos.setAll('checkWorldBounds',true);
}

function resetMember(item) {
    item.kill();
    }

function actualizarCronometro(){
    tiempoTranscurrido++;
    var horas = Math.floor(tiempoTranscurrido/3600);
    var minutos = Math.floor((tiempoTranscurrido-(horas * 3600))/60);
    var segundos = Math.floor(tiempoTranscurrido - (horas*3600)-(minutos * 60));
    var tiempoTextoFormateado = horas.toString().padStart(2, "0")+":"+minutos.toString().padStart(2, "0")+":"+segundos.toString().padStart(2, "0");
    tiempoTexto.setText(tiempoTextoFormateado);
}



    

function updateHealthBar() {
    healthBar.querySelector('.bar').style.width = health + '%';

}
function decreaseHealthBar(enemy) {
    enemy.kill();
    health-=20;
    var damageAudio = new Audio("assets/songs/damage.mp3");
    var failAudio = new Audio("assets/songs/Fail.mp3");
    if (health<=0){
        damageAudio.play();
        gameEnd = true;
    }
    else{
        damageAudio.play();
        updateHealthBar();
        console.log("la barra de vida tiene " + health);
    }

}


function gameUpdate(){
    //collisions
    game.physics.arcade.overlap(enemies,disparos,enemyHit,null,this);
    game.physics.arcade.overlap(enemies,platform,decreaseHealthBar,null,this);
    game.physics.arcade.overlap(heartLives,character,liveHit,null,this);
    
    character.animations.play('idle');

    if(boolmouse){
        //movimiento con raton
            mouseX = game.input.mousePointer.x;
            let relativePos = mouseX - thread_pos_array[characterIndex]+(x_thread/2);
            if (relativePos < 0){
                if(characterIndex > 0 ){      
                    characterIndex--;
                    character.body.position.setTo(thread_pos_array[characterIndex]-37,game.world.height - 101 );


                }
            }
            else if( relativePos > (thread_pos_array[characterIndex + 1] - thread_pos_array[characterIndex])){
                if(characterIndex < n_webs -2) {
                characterIndex++;
                character.body.position.setTo(thread_pos_array[characterIndex]-37,game.world.height - 101 );

                }
            }
    }
    //movimiento con flchas
    else{
        if(cursors.left.isDown && characterIndex > 0 && freeInput ==true){
            //left movement
            console.log('left');
            characterIndex--;
            character.body.position.setTo(thread_pos_array[characterIndex]-37,game.world.height - 101 );

            freeInput=false;
            game.time.events.add(200, inputChorno,this);
        } else if(cursors.right.isDown && characterIndex < n_webs-2 && freeInput ==true){
            //right movement
            console.log('right');
            characterIndex++;
            character.body.position.setTo(thread_pos_array[characterIndex]-37,game.world.height - 101 );
            character.animations.play('character2');
            freeInput=false;
            game.time.events.add(200, inputChorno,this);
    
        }
    } 
    manageShots();
    if(gameEnd){
        gameOver();
    }
}

function gameOver(){

    health = 0;
    clearInterval(crono);
    updateHealthBar();
    console.log("Has durado: " + tiempoTexto.text);
    console.log("Has conseguido " + puntuaje + " puntos");
    //alert("Has durado: " + tiempoTexto.text + " y has conseguido " + puntuaje + " puntos");
    music.stop();
    level = 1;
    gameEnd = false;
    game.state.start('menu');
}

function enemyHit(enemy,disparo){
    disparo.kill();
    enemy.kill();
    sumarPuntos();
    var boomAudio = new Audio("assets/songs/boom.mp3");
    boomAudio.play();

    if(level < NUM_LEVELS && puntuaje== level*SCORE_TO_NEXT_LEVEL){
        subirLevel();
    }

}

function liveHit(lives,character){
    character.kill();
    health = 100;
    updateHealthBar();
    var liveAudio = new Audio("assets/songs/Health.mp3");
    liveAudio.play();

}

function manageShots(){
    if(fireButton.justDown && !boolmouse){
        fireShot();
    }

    else if(game.input.mousePointer.leftButton.justPressed(30) && boolmouse){
        fireShot();
    }
}

function fireShot(){
    let shotX = character.x+9 + character.width/4;
    let shotY = character.y+-32;
    let shotVel = -VELOCIDAD_DISPARO;
    let shot = kaboom(shotX, shotY,shotVel);
    var shootAudio = new Audio("assets/songs/Shoot.mp3");
    shootAudio.play();
}

function kaboom(x,y,vel){
    let shot = disparos.getFirstExists(false);
    if(shot){
        shot.reset(x,y);
        shot.body.velocity.y = vel;
    }
    return shot;
}

function inputChorno(){
freeInput = true;
}

//Alberto
function sumarPuntos(){
    puntuaje +=10;
    textoPuntuaje.setText("Points: "+puntuaje);
    
}

function subirLevel(){
    level+=1
    textoLevel.setText('Lvl '+ level);
    var levelAudio = new Audio("assets/songs/levelUp.mp3");
    levelAudio.play();
}

function thread_creator(n_webs){
    let thread_pos = game.world.width/n_webs;
    thread_pos_array = [thread_pos];

    for (let i = 1; i < n_webs; i++) {
        let web_thread = threads.create(thread_pos, 0, 'thread');
        web_thread.anchor.setTo(0.5, 0);
        web_thread.body.immovable = true;

        thread_pos = thread_pos + (game.world.width/n_webs);
        thread_pos_array.push(thread_pos);
    }
    console.log(n_webs);
}

function thread_creator_V2(){
    let catetoX = 800/n_webs;
    let catetoY;
    thread_inclined_array_ini = [];
    thread_inclined_array_fin = [];

    for (let i = 0; i < n_webs-2; i++) {
        let randomY = Math.floor(Math.random() * (400 - 40 + 1)); //puntoY del hilo1
        let randomY2 = Math.floor(Math.random() * (200 - 40 + 1)) + randomY/2; //puntoY del hilo2
        catetoY = randomY2 - randomY;

        let web_inclined_thread = game.add.graphics(0, 0);
        web_inclined_thread.lineStyle(3, 0x800080);
        web_inclined_thread.moveTo(thread_pos_array[i], randomY); //thread_pos_array[i] es el puntoX del hilo1
        web_inclined_thread.lineTo(thread_pos_array[i] + catetoX, randomY2); //thread_pos_array[i] + catetoX es el puntoX del hilo2

        let point_ini = thread_changer.create(thread_pos_array[i], randomY, 'purple'); //generar los puntos de inicio y final de hilos (sprites)
        point_ini.anchor.setTo(0.5);
        point_ini.scale.setTo(0.5);
        let point_fin = thread_changer.create(thread_pos_array[i] + catetoX, randomY2,'purple');
        point_fin.anchor.setTo(0.5);
        point_fin.scale.setTo(0.5);

        thread_inclined_array_ini.push([thread_pos_array[i], randomY]); //guardamos el PUNTO donde EMPIEZAN los hilos
        thread_inclined_array_fin.push([thread_pos_array[i] + catetoX, randomY2]); //guardamos el PUNTO donde TERMINAN los hilos
    }
}