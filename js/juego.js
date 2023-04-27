
let juego = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let mainstate = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

juego.state.add('main', mainSatate);

juego.state.start('main');