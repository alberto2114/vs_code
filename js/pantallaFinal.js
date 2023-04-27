

let finalState = {
    preload:preloadAssets,
    create:initialiseGame,
};


function initialiseGame(){

}

function menuScreen(){
    game.state.start('menu');
}