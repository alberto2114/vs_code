
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let gameState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

game.state.add('menu', startState);
game.state.add('options', optionState);
game.state.add('game', gameState);
game.state.add('final', finalState);


game.state.start('menu');

function loadAssets() {

}
function initialiseGame(){

}

function gameUpdate(){
    
}