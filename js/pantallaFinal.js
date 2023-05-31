

let finalState = {
    preload:preloadAssets,
    create:initializeGame,
};

let survivedTime;
let survivedPoints;

let leaderboard = [];

function preloadAssets() {
    game.load.image('background', 'assets/sky2.png')
    game.load.image('panel', 'assets/ui/red_panel.png');
    game.load.image('smallpanel', 'assets/ui/red_button11.png');
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

    var pos1 = game.add.sprite(game.world.width/2 - 50, 275, 'boton1');
    pos1.anchor.setTo(0.5);
    pos1.scale.setTo(0.8);
    var pos2 = game.add.sprite(game.world.width/2 - 50, 350, 'boton2');
    pos2.anchor.setTo(0.5);
    pos2.scale.setTo(0.8);
    var pos3 = game.add.sprite(game.world.width/2 - 50, 425, 'boton3');
    pos3.anchor.setTo(0.5);
    pos3.scale.setTo(0.8);

    var panelButton = game.add.sprite(135, 222, 'smallpanel');
    panelButton.anchor.setTo(0.5);
    panelButton.scale.setTo(1.05, 0.8);

    var panelButton2 = game.add.sprite(135, game.world.height/2 - 5, 'smallpanel');
    panelButton2.anchor.setTo(0.5);
    panelButton2.scale.setTo(1.05, 0.8);

    var panelButton3 = game.add.sprite(135, game.world.height/2 + 65, 'smallpanel');
    panelButton3.anchor.setTo(0.5);
    panelButton3.scale.setTo(1.05, 0.8);

    var enterText = game.add.text(135, 220, 'Press ENTER to restart',
        {font: '16px Fantasy',
        fill: '#000000',
        align: 'center'});
    enterText.anchor.setTo(0.5);
    enterText.scale.setTo(1, 1);

    var creditsText = game.add.text(135, game.world.height/2 - 5, 'Credits',
        {font: '16px Fantasy',
        fill: '#000000',
        align: 'center'});
    creditsText.anchor.setTo(0.5);
    creditsText.scale.setTo(1, 1);

    var exitText = game.add.text(135, game.world.height/2 + 65, 'Exit',
        {font: '16px Fantasy',
        fill: '#000000',
        align: 'center'});
    exitText.anchor.setTo(0.5);
    exitText.scale.setTo(1, 1);

    survivedTime = game.add.text(game.world.width/2 + 70, 180, 'Final Time',
    {font: '16px Fantasy',
    fill: '#000000',
    align: 'center'});
    survivedTime.anchor.setTo(0.5);

    survivedPoints = game.add.text(game.world.width/2 + 190, 180, 'Final Points',
    {font: '16px Fantasy',
    fill: '#000000',
    align: 'center'});
    survivedPoints.anchor.setTo(0.5);

    //mostrarLeaderboard();
    actualizarLeaderboard(tiempoTexto.text);
    captureEnterKey();
}

function actualizarLeaderboard(tiempo){
    if (leaderboard.length == 0) {
        leaderboard.push(tiempo);
    } 
    else {
        for (let i = 0; i < leaderboard.length; i++) {
            if (tiempo > leaderboard[i]) {
                leaderboard.splice(i, 0, tiempo);
                break;}
        }
        if (leaderboard.length > 3) {
            leaderboard.pop(); // Limitar el leaderboard a los primeros tres tiempos
        }
    }
    mostrarLeaderboard();
}

function mostrarLeaderboard(){
    for (let i = leaderboard.length - 1; i >= 0; i--) {
        let time = game.add.text(game.world.width/2 + 70, 275 + i * 75, leaderboard[i], {
            font: '16px Fantasy',
            fill: '#000000',
            align: 'center'});
        time.anchor.setTo(0.5);
    }
}

function captureEnterKey() {
    let enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(function() {
        game.state.start('menu');
    }, this);
}