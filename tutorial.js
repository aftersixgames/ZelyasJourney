var tutorial = function(game){}

var player;
var platforms;
var cursors;
var zeJump;
var zeSpeed;


tutorial.prototype = {
    create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.gameSound = this.game.add.audio('zesound');
    this.gameSound.play();
    this.gameSound.loopFull(1);


    //  A simple background for our game
this.    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, this.game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = this.game.add.sprite(32, this.game.world.height - 150, 'ze');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = gravidade;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = this.game.input.keyboard.createCursorKeys();

    zeJump = -150;
    game.camera.follow(player);
  },
  update: function(){

    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    zeSpeed = parseInt($('#zespeed').val());

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -zeSpeed;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = zeSpeed;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    zeJump = parseInt($('#zejump').val());
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -zeJump;
    }

}
}
