
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let gameState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let platform;
let threads;
let n_webs = 10;
let x_thread = 800/n_webs;
//Alberto
var tiempoTexto;
var tiempoTranscurrido = 0;
var puntuaje = 0;
let healthBar = document.getElementById("healthBar");
let health = 100;
var textoParte;
var textoLevel;
let level = 1;
document.getElementById("botonVida").addEventListener("click", decreaseHealthBar);
document.getElementById("botonPuntos").addEventListener("click", sumarPuntos);

game.state.add('menu', startState);
game.state.add('game', gameState);
//game.state.add('final', finalState);
//game.state.add('options', optionState);

game.state.start('game');

function loadAssets() {
    console.log('arrancando');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('thread', 'assets/string.png');
}


function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    platform = game.add.group();
    platform.enableBody = true;
    
    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;

    threads = game.add.group();
    threads.enableBody = true;

    thread_creator(n_webs);
//Alberto
    tiempoTexto = this.add.text(3,10, "00:00:00", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoPuntuaje = this.add.text(3,40, "Points: 0", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoParte = this.add.text(739,10, "Part A", {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});
    textoLevel = this.add.text(746,40, "Lvl " + level, {font: "20px Arial", fill: "white", stroke: "black", strokeThickness:4});

}

//Alberto
function actualizarCronometro(){
    tiempoTranscurrido++;
    var horas = Math.floor(tiempoTranscurrido/3600);
    var minutos = Math.floor((tiempoTranscurrido-(horas * 3600))/60);
    var segundos = Math.floor(tiempoTranscurrido - (horas*3600)-(minutos * 60));
    var tiempoTextoFormateado = horas.toString().padStart(2, "0")+":"+minutos.toString().padStart(2, "0")+":"+segundos.toString().padStart(2, "0");
    tiempoTexto.setText(tiempoTextoFormateado);
}

var crono = setInterval(actualizarCronometro, 1000);

function updateHealthBar() {
    healthBar.querySelector('.bar').style.width = health + '%';
}
function decreaseHealthBar() {
    health-=20;
    if (health<=0){
        health = 0;
        clearInterval(crono);
        alert("Has durado: " + tiempoTexto.text + " y has conseguido " + puntuaje + " puntos");
        console.log("Has durado: " + tiempoTexto.text);
        console.log("Has conseguido " + puntuaje + " puntos");
    }
    updateHealthBar();
    console.log("la barra de vida tiene " + health);
}



function update(){
    
}
function gameUpdate(){
    
}

//Alberto
function sumarPuntos(){
    puntuaje +=10;
    textoPuntuaje.setText("Points: "+puntuaje);

}

function subirLevel(){
    level+=1
    //textoLevel.setText('Lvl '+ level);
}

function thread_creator(n_webs){
    let thread_pos = game.world.width/n_webs;
    let thread_pos_array = [thread_pos];

    for (let i = 1; i < n_webs; i++) {
        const actual_thread = i;
        
        let web_thread = threads.create(thread_pos, 0, 'thread');
        web_thread.body.immovable = true;

        thread_pos = thread_pos + (game.world.width/n_webs);
        thread_pos_array.push(thread_pos);
    }
    console.log(thread_pos_array);
}

//Cuando vidas 0 colocaremos clearInterval(crono); y se pausara el crono
//Cuando destruyamos algo usamos la funcion sumarPuntos() y sumara 10 puntos el juego.