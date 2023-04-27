const { Button } = require("phaser-ce");

//let GAME_AREA_WIDTH = window.innerWidth * window.devicePixelRatio;
//let GAME_AREA_HEIGHT = window.innerHeight * window.devicePixelRatio;


let juego = new Phaser.Game(800, 600, Phaser.AUTO, 'juego');


let initialState = {
    preload:preloadAssets,
    create:initializeGame,
    update:updateGame,
};

game.state.add('menu', initialState);
game.state.add('game', gameState);
game.state.add('final', finalState);
game.state.add('options', optionState);

game.state.start('menu');

///PRELOAD///

function preloadAssets(){
    game.load.spritesheet('playButton', 'assets/playButton.png', 336, 158, 2);
}

function initializeGame(){
    buttonPlay = new Button(0.5,0.45,'playButton', changePlay);
}

function changePlay(){
game.state.start('main');
}

function updateGame(){

}