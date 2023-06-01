let partCState = {
    preload: loadAssetsC,
    create: initialiseGameC,
    update: gameUpdateC
};

let bosses;
let vidaBoss;
let deadBoss = false;

function loadAssetsC() {
    console.log('arrancando C');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('sky', 'assets/sky1.png');
    game.load.image('thread', 'assets/string.png');
    game.load.spritesheet('character', 'assets/spriteSheet.png', 198.5, 211);
    game.load.image('disparo', 'assets/ammo.png');
    game.load.image('asteroid', 'assets/enemy1.png');
    game.load.image("heart", "assets/heart.png");

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
    vidaBoss=100;

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

    bosses = game.add.group(); //parte c
    bosses.enableBody = true;



    healthBar.style.display = "block";
    health = 100;
    updateHealthBar();

    spawnBoss();
}

function gameUpdateC(){
    game.physics.arcade.overlap(bosses,disparos,bossLive,null,this); //parte c
    game.physics.arcade.overlap(bosses,platform,decreaseBoss,null,this);
    character.animations.play('idle');

    if (boolmouse) {
        //movimiento con raton
        mouseX = game.input.mousePointer.x;
        let relativePos = mouseX - thread_pos_array[characterIndex] + (x_thread / 4);
        if (relativePos < 0) {
            if (characterIndex > 0) {
                characterIndex--;
                character.body.position.setTo(thread_pos_array[characterIndex] - 50, game.world.height - 101);
            }
        }
        else if (relativePos > (thread_pos_array[characterIndex + 1] - thread_pos_array[characterIndex])) {
            if (characterIndex < n_webs - 2) {
                characterIndex++;
                character.body.position.setTo(thread_pos_array[characterIndex] - 50, game.world.height - 101);

            }
        }
    }
    //movimiento con flchas
    else {
        if (cursors.left.isDown && characterIndex > 0 && freeInput == true) {
            //left movement
            console.log('left');
            characterIndex--;
            character.body.position.setTo(thread_pos_array[characterIndex] - 50, game.world.height - 101);

            freeInput = false;
            game.time.events.add(650/n_webs, inputChorno, this);
        } else if (cursors.right.isDown && characterIndex < n_webs - 2 && freeInput == true) {
            //right movement
            console.log('right');
            characterIndex++;
            character.body.position.setTo(thread_pos_array[characterIndex] - 50, game.world.height - 101);
            character.animations.play('character2');
            freeInput = false;
            game.time.events.add(650/n_webs, inputChorno, this);

        }
    }
    manageShots();
    if (gameEnd) {
        gameOver();
    }

    if(deadBoss){
        game.state.start('final');
    }
}
function spawnBoss() {
    let randomIndex = Math.floor(Math.random() * (n_webs-1));
    let randomThread = thread_pos_array[randomIndex];

    var bossSpawn = new Audio("assets/songs/Boss.mp3");
    bossSpawn.play();

    let boss = bosses.create(randomThread, 0, 'finalBoss');
    boss.scale.setTo(0.4, 0.4);
    boss.anchor.setTo(0.5, 0.5);
    
    boss.body.velocity.y = 20;
    boss.body.angularVelocity = 150;
}

function bossLive(boss,disparo){
    vidaBoss-=1;
    var hitBoss = new Audio("assets/songs/hitBoss.mp3");
    if(vidaBoss<=0){
        deadBoss = true;
        boss.kill();
    }
    if(vidaBoss<=90){boss.loadTexture("finalBoss1");}
    if(vidaBoss<=80){boss.loadTexture("finalBoss2");}
    if(vidaBoss<=70){boss.loadTexture("finalBoss3");}
    if(vidaBoss<=60){boss.loadTexture("finalBoss4");}
    if(vidaBoss<=50){boss.loadTexture("finalBoss5");}
    if(vidaBoss<=40){boss.loadTexture("finalBoss6");}
    if(vidaBoss<=30){boss.loadTexture("finalBoss7");}
    if(vidaBoss<=20){boss.loadTexture("finalBoss8");}
    disparo.kill();
    
    hitBoss.play();
    
}
function decreaseBoss(boss) {
    boss.kill();
    health-=100;
    var damageAudio = new Audio("assets/songs/damage.mp3");
    var failAudio = new Audio("assets/songs/Fail.mp3");
    damageAudio.play();
    failAudio.play();
    deadBoss = true;
}