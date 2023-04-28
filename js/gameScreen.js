
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

var options;
var optionsMenu;
var sliderCheck;
var sliderBar;

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

    game.load.image('options', 'assets/ui/options.png');
    game.load.image('optionsmenu', 'assets/ui/red_panel.png');
    game.load.image('sliderBox', 'assets/ui/red_button10.png')
    game.load.image('sliderBar', 'assets/ui/grey_sliderHorizontal.png');
    game.load.image('sliderCheck', 'assets/ui/grey_sliderDown.png');
}
function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    threads = game.add.group();
    threads.enableBody = true;
    thread_creator(n_webs);

    platform = game.add.group();
    platform.enableBody = true;
    
    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;

    options = game.add.sprite(game.world.width -42, 8, 'options'); //options icon
    options.scale.setTo(0.5);
    options.inputEnabled = true;
    options.events.onInputDown.add(showMenu, this);

    optionsMenu = game.add.sprite(game.world.width/2, game.world.height/2, 'optionsmenu');
    optionsMenu.scale.setTo(3);
    optionsMenu.anchor.set(0.5, 0.5);
    optionsMenu.visible = true;

    sliderBar = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 100, 'sliderBar');
    sliderBar.scale.setTo(1.3, 1)
    sliderBar.visible = true;

    sliderCheck = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 110, 'sliderCheck');
    sliderCheck.scale.setTo(0.7);
    sliderCheck.inputEnabled = true;
    sliderCheck.events.onInputDown.add(slideCheck, this);
    
    //sliderCheck.input.addMoveCallBack(slideCheck, this);
    
    sliderCheck.visible = true;
}

function gameUpdate(){
    
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

function showMenu(){
    console.log('muestra menu');

    if(optionsMenu.visible == true){
        optionsMenu.visible = false;
        sliderCheck.visible = false;
        sliderBar.visible = false;
    }
    else{
        optionsMenu.visible = true;
        sliderCheck.visible = true;
        sliderBar.visible = true;
    }
}

function slideCheck(){
    console.log('me muevo?');
    var x_limit = game.world.width/2

    sliderCheck.input.draggable = true;
    sliderCheck.input.allowVerticalDrag = false;

    if(sliderCheck.position.x < (x_limit - 130)){
        sliderCheck.position.x = x_limit - 130;
    } 
    else if(sliderCheck.position.x > (x_limit)){
        slideCheck.position.x = x_limit;
    }
}