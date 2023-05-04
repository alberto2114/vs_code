let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let gameState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let platform;
let threads;
let x_thread = 800/new_n_webs;

var options;

game.state.add('menu', startState);
game.state.add('game', gameState);
//game.state.add('final', finalState);
//game.state.add('ui', uiState);

game.state.start('menu');

function loadAssets() {
    console.log('arrancando');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('thread', 'assets/string.png');
}
function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    threads = game.add.group();
    threads.enableBody = true;
    thread_creator(new_n_webs);

    platform = game.add.group();
    platform.enableBody = true;
    
    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;
}

function gameUpdate(){
    
}

function thread_creator(n_webs){
    let thread_pos = game.world.width/n_webs;
    let thread_pos_array = [thread_pos];

    for (let i = 1; i < n_webs; i++) {
        let web_thread = threads.create(thread_pos, 0, 'thread');
        web_thread.body.immovable = true;

        thread_pos = thread_pos + (game.world.width/n_webs);
        thread_pos_array.push(thread_pos);
    }
    console.log(n_webs);
}