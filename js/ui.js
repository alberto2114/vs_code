/*var options;
var optionsMenu;
var sliderCheck;
var sliderBar;
var menuBox;

var music;
var musicButton;

function loadAssets() {
    game.load.image('options', 'assets/ui/options.png');

    game.load.image('optionsmenu', 'assets/ui/red_panel.png');
    game.load.image('sliderBox', 'assets/ui/red_button10.png')
    game.load.image('sliderBar', 'assets/ui/grey_sliderHorizontal.png');
    game.load.image('sliderCheck', 'assets/ui/grey_sliderDown.png');

    //Music in the background thanks to https://www.FesliyanStudios.com
    //Tittle: Retro Platforming - David Fesliyan
    game.load.audio('music', ['assets/music/platformer.mp3']);
}
// a lo mejor si le meto game como parametro de la funcion tira
//del palo initialiseGame(game) XD
function initialiseGame(game){
    options = game.add.sprite(game.world.width -42, 8, 'options'); //options icon
    options.scale.setTo(0.5);
    options.inputEnabled = true;
    options.events.onInputDown.add(showMenu, this);

    optionsMenu = game.add.sprite(game.world.width/2, game.world.height/2, 'optionsmenu');
    optionsMenu.scale.setTo(3);
    optionsMenu.anchor.set(0.5, 0.5);
    optionsMenu.visible = true;

    menuBox = game.add.sprite(game.world.width/2 - 135, game.world.height/2 - 120, 'menuBox');
    menuBox.scale.setTo(1.4, 1);

    sliderBar = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 100, 'sliderBar');
    sliderBar.scale.setTo(1.3, 1);
    sliderBar.visible = true;

    sliderCheck = game.add.sprite(game.world.width/2 - 130, game.world.height/2 - 110, 'sliderCheck');
    sliderCheck.scale.setTo(0.7);
    sliderCheck.inputEnabled = true;
    sliderCheck.events.onInputDown.add(slideCheck, this);

    music = game.add.audio('music');
    music.play();
    
    sliderCheck.visible = true;
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
/*
function slideCheck() {
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

    var someText = game.add.text(x_limit - 130, sliderCheck.y - 30, 'Number of webs',
        {font: '16px Fantasy',
        fill: '#FFFFFF',
        align: 'center'});

    sliderValueText = game.add.text(x_limit - 10, sliderCheck.y + 40, new_n_webs - 1,
        {font: '32px Fantasy',
        fill: '#FFFFFF',
        backgroundColor: '#e86a17',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'});

    thread_creator(new_n_webs);
    //console.log(game.n_webs);
  }*/