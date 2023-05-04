
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

let gameState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let platform;
let threads;
let n_webs = 6;
let x_thread = 800/n_webs;
let thread_pos_array;
let character;
let characterIndex;
let freeInput = true;
let gameOver;
let cursors;
let mouseX;

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
    game.load.image('character', 'assets/descarga.png');
}
function initialiseGame(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    
    //esconder raton
    //this.input.mouse.disableContextMenu();
    this.input.mouse = this.input.mousePointer = this.input.addPointer(1);

    platform = game.add.group();
    platform.enableBody = true;
    
    let ground = platform.create(0, game.world.height - 32, 'ground');
    ground.body.immovable = true;

    threads = game.add.group();
    threads.enableBody = true;

    thread_creator(n_webs);

    characterIndex = 0;
    
    character = game.add.sprite(thread_pos_array[characterIndex],game.world.height - 32,'character');
    character.scale.setTo(2,2);
    game.physics.arcade.enable(character);

    cursors = game.input.keyboard.createCursorKeys();
    
}

function gameUpdate(){
    /*
    //movimiento con flchas
    if(cursors.left.isDown && characterIndex > 0 && freeInput ==true){
        //left movement
        console.log('left');
        characterIndex--;
        character.body.position.setTo(thread_pos_array[characterIndex],game.world.height - 32 );
        freeInput=false;
        game.time.events.add(200, inputChorno,this);
    } else if(cursors.right.isDown && characterIndex < n_webs-2 && freeInput ==true){
        //right movement
        console.log('right');
        characterIndex++;
        character.body.position.setTo(thread_pos_array[characterIndex],game.world.height - 32 );
        freeInput=false;
        game.time.events.add(400, inputChorno,this);

    }*/
    

    //movimiento con raton
    mouseX = game.input.mousePointer.x;
    let relativePos = mouseX - thread_pos_array[characterIndex];
    if (relativePos < 0){
        if(characterIndex > 0 ){      
            characterIndex--;
            character.body.position.setTo(thread_pos_array[characterIndex],game.world.height - 32 );

            
        }
    }
    else if( relativePos > (thread_pos_array[characterIndex + 1] - thread_pos_array[characterIndex])){
        if(characterIndex < n_webs -2) {
        characterIndex++;
        character.body.position.setTo(thread_pos_array[characterIndex],game.world.height - 32 );

        }
    }
    else{

    }
   
}

function inputChorno(){
freeInput = true;
}

function thread_creator(n_webs){
    let thread_pos = game.world.width/n_webs - 16;
    thread_pos_array = [thread_pos];

    for (let i = 1; i < n_webs; i++) {
        const actual_thread = i;
        
        let web_thread = threads.create(thread_pos, 0, 'thread');
        web_thread.body.immovable = true;

        thread_pos = thread_pos + (game.world.width/n_webs);
        thread_pos_array.push(thread_pos);
    }
    console.log(thread_pos_array);
}