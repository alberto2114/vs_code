

let finalState = {
    preload:preloadAssets,
    create:initializeGame,
};

function preloadAssets() {
    game.load.image('background', 'assets/sky2.png')
    game.load.image('panel', 'assets/ui/red_panel.png');
    game.load.image('barrasHorizontal', 'assets/ui/barsHorizontal.png');
    game.load.image('boton1', 'assets/ui/button1.png');
    game.load.image('boton2', 'assets/ui/button2.png');
    game.load.image('boton3', 'assets/ui/button3.png');
    game.load.image('leader', 'assets/ui/leaderboardsComplex.png')
    game.load.image('trofeo', 'assets/ui/trophy.png');

    //Music in the background thanks to ---
    //Tittle: --- - ---
    //game.load.audio('music', ['assets/music/platformer.mp3']);
}

function initializeGame() {

    var fondo = game.add.sprite(0, 0, 'background');
    fondo.z = -1;

    var panel = game.add.sprite(game.world.width/2 + 80, game.world.height/2, 'panel');
    panel.anchor.setTo(0.5);
    panel.scale.setTo(4, 4);

    var barrasH = game.add.sprite(125, game.world.height/2, 'barrasHorizontal');
    barrasH.anchor.setTo(0.5);
    barrasH.scale.setTo(3);

    var leaderB = game.add.sprite(game.world.width/2 - 100, 120, 'leader');
    //var 
}