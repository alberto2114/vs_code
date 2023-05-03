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
var menuBox;
var someText;

var music;
var musicButton;
var someMusicText;

var moveWASD;
var moveMOUSE;

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
    game.load.image('sliderBox', 'assets/ui/red_button10.png');
    game.load.image('menuBox', 'assets/ui/red_button11.png');
    game.load.image('sliderBar', 'assets/ui/grey_sliderHorizontal.png');
    game.load.image('sliderCheck', 'assets/ui/grey_sliderDown.png');

    game.load.image('buttonCheck_NO', 'assets/ui/grey_boxCheckmark.png');
    game.load.image('buttonCheck_YES', 'assets/ui/red_boxCheckmark.png');

    game.load.image('selectorOFF', 'assets/ui/grey_circle.png');
    game.load.image('selectorON', 'assets/ui/red_boxTick.png');

    //Music in the background thanks to https://www.FesliyanStudios.com
    //Tittle: Retro Platforming - David Fesliyan
    game.load.audio('music', ['assets/music/platformer.mp3']);
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

    //gear button
    options = game.add.sprite(game.world.width -42, 8, 'options'); //options icon
    options.scale.setTo(0.5);
    options.inputEnabled = true;
    //options.events.onInputOver.loadTexture('menuBox'); trying some thing XD
    options.events.onInputDown.add(showMenu, this);
    //options panel
    optionsMenu = game.add.sprite(game.world.width/2, game.world.height/2, 'optionsmenu');
    optionsMenu.scale.setTo(3);
    optionsMenu.anchor.set(0.5, 0.5);
    optionsMenu.visible = false;
    //options extra box
    menuBox = game.add.sprite(game.world.width/2 - 135, game.world.height/2 - 120, 'menuBox');
    menuBox.scale.setTo(1.4, 1);
    menuBox.visible = false;
    //options slider-bar
    sliderBar = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 100, 'sliderBar');
    sliderBar.scale.setTo(1.3, 1);
    sliderBar.visible = false;
    //options slider
    sliderCheck = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 110, 'sliderCheck');
    sliderCheck.scale.setTo(0.7);
    sliderCheck.inputEnabled = true;
    sliderCheck.events.onInputUp.add(handleSliderCheck, this);;
    sliderCheck.visible = false;
    //text corresponding to the number of webs showing
    someText = game.add.text((game.world.width / 2) - 130, sliderCheck.y - 30, 'Number of webs',
        {font: '16px Fantasy',
        fill: '#FFFFFF',
        align: 'center'});
    someText.visible = false;

    
    //some music
    music = game.add.audio('music');
    //music.play(); DECOMMENT BEFORE PUSH **************************
    //buttons corresponding to turning on/off music
    musicButton = game.add.sprite(game.world.width/2 - 40, game.world.height/2 - 20, 'buttonCheck_YES');
    musicButton.inputEnabled = true;
    musicButton.events.onInputDown.add(turnMusic, this);
    musicButton.visible = false;
    //some text corresponding to the music
    someMusicText = game.add.text((game.world.width / 2) - 130, game.world.height/2 - 20, 'Music:',
        {font: '32px Fantasy',
        fill: '#FFFFFF',
        align: 'center'});
    someMusicText.visible = false;

    //selectable movement WASD
    moveWASD = game.add.sprite(game.world.width/2 - 60, game.world.height/2 + 50, 'selectorON');
    moveWASD.inputEnabled = true;
    moveWASD.events.onInputDown.add(playWASD, this);
    moveWASD.visible = false;
    //selectable movement MOUSE
    moveMOUSE = game.add.sprite(game.world.width/2, game.world.height/2 + 50, 'selectorOFF');
    moveMOUSE.inputEnabled = true;
    moveMOUSE.events.onInputDown.add(playMOUSE, this);
    moveMOUSE.visible = false;
}

function gameUpdate(){
    
}

function thread_creator(n_webs){
    threads.removeAll();
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
        menuBox.visible = false;
        someText.visible = false;

        musicButton.visible = false;
        someMusicText.visible = false;

        moveWASD.visible = false;
        moveMOUSE.visible = false;
    }
    else{
        optionsMenu.visible = true;
        sliderCheck.visible = true;
        sliderBar.visible = true;
        menuBox.visible = true;
        someText.visible = true;

        musicButton.visible = true;
        someMusicText.visible = true;

        moveWASD.visible = true;
        moveMOUSE.visible = true;
    }
}

function handleSliderCheck() {
    var x_limit = game.world.width / 2;
    var n_webs_min = 4;
    var n_webs_max = 10;
    var sliderValueText;
  
    sliderCheck.input.draggable = true;
    sliderCheck.input.allowVerticalDrag = false;

    if (sliderCheck.position.x < (x_limit - 130)) {
        sliderCheck.position.x = x_limit - 130;
    }
    if (sliderCheck.position.x > (x_limit + 100)) {
        sliderCheck.position.x = x_limit + 100;
    }

    // map the x-coordinate of the sprite to a range of values for new_n_webs
    var x = Phaser.Math.clamp(sliderCheck.x, x_limit - 130, x_limit + 100);
    var range = x_limit + 900;
    var n_webs_normalized = (x - (x_limit - 130)) / range;
    var new_n_webs = Phaser.Math.clamp(Phaser.Math.linearInterpolation(
        [n_webs_min, n_webs_max],
        n_webs_normalized * (n_webs_max - n_webs_min)
        ),
        n_webs_min,
        n_webs_max
    );

    new_n_webs = Math.round(new_n_webs);

    sliderValueText = game.add.text(x_limit - 10, sliderCheck.y + 40, new_n_webs - 1,
        {font: '32px Fantasy',
        fill: '#FFFFFF',
        backgroundColor: '#e86a17',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'});

    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        sliderValueText.destroy();});

    thread_creator(new_n_webs);
    //console.log(game.n_webs);
  }

  function turnMusic(){
    if(music.isPlaying == true){
        music.fadeOut(); 
        musicButton.loadTexture('buttonCheck_NO');
    }
    else{
        music.fadeIn();
        musicButton.loadTexture('buttonCheck_YES');
    }
  }

  function playWASD(){
    moveWASD.loadTexture('selectorON');
    moveMOUSE.loadTexture('selectorOFF');
    //insert code WASD here

  }

  function playMOUSE(){
    moveMOUSE.loadTexture('selectorON');
    moveWASD.loadTexture('selectorOFF');
    //insert code MOUSE here

  }