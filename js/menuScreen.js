

//let GAME_AREA_WIDTH = window.innerWidth * window.devicePixelRatio;
//let GAME_AREA_HEIGHT = window.innerHeight * window.devicePixelRatio;





let startState = {
    preload: preloadAssets,
    create: initializeGame,
};

function preloadAssets() {
    //game.load.image('sky', 'assets/sky.png');
    //game.load.spritesheet(juego.world.centerX,juego.world.centerY ,'playButton', 'assets/playButton.png',336, 158, 2);
}

function initializeGame() {

    game.input.enabled = true;
    game.stage.backgroundColor = "#fa0";

    let button = game.add.button(130, 200, '', changePlay);
    button.addChild(game.add.text(0, 0, "START GAME", {fontSize: '32px', fill: '#FFFFFF', backgroundColor: '#ADD8E6', hoverColor: '#87CEFA', padding:{x: 16, y: 8}}));
    
    
    //game.add.sprite(0, 0, 'sky');
    //buttonPlay = new Button(0.5,0.45,'playButton', changePlay);
    //playButton = game.add.button(game.world.centerX, game.world.centerY, 'playButton', this.changePlay, this);
}

function changePlay() {
    game.state.start('game');
}

