let partCState = {
    preload: loadAssetsC,
    create: initialiseGameC,
    update: gameUpdateC
};

//game.state.add('partC', partCState);

function loadAssetsC() {
    console.log('arrancando C');
    game.load.image('sky', 'assets/sky1.png');
    game.load.image('thread', 'assets/string.png');
    game.load.spritesheet('character', 'assets/spriteSheet.png', 198.5, 211);

    game.load.image("finalBoss", "assets/boss.png");
    game.load.image("finalBoss1", "assets/bossLife/boss1.png");
    game.load.image("finalBoss2", "assets/bossLife/boss2.png");
    game.load.image("finalBoss3", "assets/bossLife/boss3.png");
    game.load.image("finalBoss4", "assets/bossLife/boss11.png");
    game.load.image("finalBoss5", "assets/bossLife/boss12.png");
    game.load.image("finalBoss6", "assets/bossLife/boss13.png");
    game.load.image("finalBoss7", "assets/bossLife/boss21.png");
    game.load.image("finalBoss8", "assets/bossLife/boss22.png");
}

function initialiseGameC() {
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    level=4;

    platform = game.add.group();
    platform.enableBody = true;

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;

    threads = game.add.group();
    threads.enableBody = true;
    thread_creator(n_webs);

    characterIndex = 0;

    character = game.add.sprite(thread_pos_array[characterIndex] - 50, game.world.height - 101, 'character');
    character.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(character);
    character.animations.add('idle', [0, 1], 2.5, true);

    tiempoTexto = this.add.text(3, 10, "00:00:00", { font: "20px Arial", fill: "white", stroke: "black", strokeThickness: 4 });
    textoPuntuaje = this.add.text(3, 40, "Points: 0", { font: "20px Arial", fill: "white", stroke: "black", strokeThickness: 4 });
    textoPuntuaje.setText("Points: " + puntuaje);
    textoParte = this.add.text(739, 10, "Part B", { font: "20px Arial", fill: "white", stroke: "black", strokeThickness: 4 });
    textoLevel = this.add.text(746, 40, "Lvl " + level, { font: "20px Arial", fill: "white", stroke: "black", strokeThickness: 4 });

    crearDisparos(DISPAROS_GROUP_SIZE);

    enemies = game.add.group();
    enemies.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 1, spawnEnemies, this);

    heartLives = game.add.group();
    heartLives.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 21, spawnLives, this);

    healthBar.style.display = "block";
    health = 100;
    updateHealthBar();
}

function gameUpdateC(){}