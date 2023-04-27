

//let GAME_AREA_WIDTH = window.innerWidth * window.devicePixelRatio;
//let GAME_AREA_HEIGHT = window.innerHeight * window.devicePixelRatio;


let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');


let initialState = {
    preload: preloadAssets,
    create: initializeGame,
    update: updateGame,
};

game.state.add('menu', initialState);
game.state.add('game', gameState);
game.state.add('final', finalState);
game.state.add('options', optionState);

game.state.start('menu');



function preloadAssets() {
    game.load.image('sky', 'assets/sky.png');
    //game.load.spritesheet(juego.world.centerX,juego.world.centerY ,'playButton', 'assets/playButton.png',336, 158, 2);
}

function initializeGame() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    //buttonPlay = new Button(0.5,0.45,'playButton', changePlay);
    //playButton = game.add.button(game.world.centerX, game.world.centerY, 'playButton', this.changePlay, this);
}

function changePlay() {
    game.state.start('game');
}

function updateGame() {

}