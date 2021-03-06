// var game = new Phaser.Game(1800, 600, Phaser.AUTO, '');
var tile01 = function(game){}
var cursors;
var player;
var map;
var coins;
var layer;
var fredy;
var bullets;
var ze_bullets;

var fireRate = 2000;
var nextFire = 10;
var ze_fireRate = 750;
var ze_nextFire = 0;
var fireButton

var lifes
var lifes_enemy
var number_of_coins


tile01.prototype = {

  preload: function(){
    this.game.load.tilemap('map', 'assets/tilemaps/maps/teste01.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    // this.game.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    // this.game.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');

    this.game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
    fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  create: function(){
    lifes = 3
    lifes_enemy = 15
    number_of_coins = 0

    this.gameSound = this.game.add.audio('zesound');
    this.gameSound.play();
    this.gameSound.loopFull(1);

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    // map.addTilesetImage('walls_1x2');
    // map.addTilesetImage('tiles2');

    map.setCollisionBetween(1, 12);

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

      //  Here we create our coins group
      coins = game.add.group();
      coins.enableBody = true;

      //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
      map.createFromObjects('objetos', 26, 'coin', 0, true, false, coins);

      //  Add animations to all of the coin sprites
      coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
      coins.callAll('animations.play', 'animations', 'spin');

      player = this.game.add.sprite(32, this.game.world.height - 150, 'ze');
      fredy = this.game.add.sprite(this.game.world.width - 150, this.game.world.height - 190, 'fredy');
      fredy.can_shot = false;
      // fredy = this.game.add.sprite(150, this.game.world.height - 190, 'fredy');
      fredy_luva = this.game.add.sprite(fredy.x, this.game.world.height + 190, 'fredy_luva');
      furadeira = this.game.add.sprite(fredy.x, this.game.world.height + 190, 'furadeira');

      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;

      bullets.createMultiple(10, 'fredy_luva');
      bullets.setAll('checkWorldBounds', true);
      bullets.setAll('outOfBoundsKill', true);



      ze_bullets = game.add.group();
      ze_bullets.enableBody = true;
      ze_bullets.physicsBodyType = Phaser.Physics.ARCADE;

      ze_bullets.createMultiple(10, 'furadeira');
      ze_bullets.setAll('checkWorldBounds', true);
      ze_bullets.setAll('outOfBoundsKill', true);

      game.physics.arcade.enable(player);
      game.physics.arcade.enable(fredy);
      game.physics.arcade.enable(fredy_luva);
      game.physics.arcade.enable(furadeira);

      player.body.setSize(10, 40, 0, 0);
      player.body.bounce.y = 0.2;
      player.body.gravity.y = gravidade;
      player.body.collideWorldBounds = true;
      player.anchor.set(0.5);

      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);
      fredy.animations.add('idle', [0,1], 10, true);
      fredy_luva.animations.add('luva', [0,2], 10, true);
      furadeira.animations.add('furar', [0,1], 10, true);


      fredy.body.setSize(32, 32, 0, 0);
      fredy.body.bounce.y = 0.2;
      fredy.body.gravity.y = gravidade;
      fredy.body.collideWorldBounds = true;
      fredy.anchor.set(0.5);


      game.camera.follow(player);

      cursors = game.input.keyboard.createCursorKeys();
      zeJump = -150;

    },

    update: function(){
      game.physics.arcade.collide(ze_bullets, layer, this.ze_bullets_miss, null, this);
      game.physics.arcade.collide(ze_bullets, bullets, this.bullets_hit, null, this);
      game.physics.arcade.collide(ze_bullets, fredy, this.hit_enemy, null, this);
      game.physics.arcade.collide(player, layer, this.hit, null, this);
      game.physics.arcade.overlap(bullets, player, this.die, null, this);
      game.physics.arcade.collide(fredy, layer);
      game.physics.arcade.overlap(player, coins, this.collectCoin, null, this);

      player.body.velocity.x = 0;
      fredy.body.velocity.x = 0;
      zeSpeed = parseInt($('#zespeed').val());
      zeJump = parseInt($('#zejump').val());
      fredy_luva.animations.play('luva');
      furadeira.animations.play('furar');



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

      if (fredy.can_shot){
        this.fire();
      }

      if (fireButton.isDown)
      {
        this.ze_fire();
      }


      zeJump = parseInt($('#zejump').val());
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.blocked.down)
    {
      player.body.velocity.y = -zeJump;
    }

  },
  startEnemy: function(){
    fredy.animations.play('idle');
    fredy.can_shot = true;
  },
  die: function(player, bullet) {
    lifes = lifes - 1;
    bullet.kill();
    if (lifes == 0) {
      this.game.state.start("GameTitle");
    }
  },
  hit_enemy: function(fredy, bullet) {
    lifes_enemy = lifes_enemy - 1;
    bullet.kill();
    if (lifes_enemy == 0) {
      this.game.state.start("GameTitle");
    }
  },
  collectCoin: function(player, coin) {
    coin.kill();
    number_of_coins ++;
  },
  ze_bullets_miss: function(ze_bullet, player) {
    ze_bullet.kill();

  },
  bullets_hit: function(ze_bullet, bullet) {
    ze_bullet.kill();
    bullet.kill();
  },
  hit: function(player, object) {
    if (object.properties.name == 'start_enemy'){
      this.startEnemy();
    }
  },

  ze_fire: function () {


    if (game.time.now > ze_nextFire && ze_bullets.countDead() > 0)
    {
      ze_nextFire = game.time.now + ze_fireRate;

      var ze_bullet = ze_bullets.getFirstDead();
      ze_bullet.reset(player.x , player.y - 10);
      ze_bullet.body.acceleration.x = 1000;
      ze_bullet.animations.add('furar', [0,1], 15, true);
      ze_bullet.animations.play('furar');
    }

  },

  fire: function () {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
      nextFire = game.time.now + fireRate;

      var bullet = bullets.getFirstDead();
      bullet.reset(fredy.x -40, fredy.y - 30);
      bullet.animations.add('luva', [0,1], 10, true);
      bullet.animations.play('luva');

      game.physics.arcade.moveToXY(bullet, player.x, player.y -30, 150);
    }

  },
  render: function() {

    game.debug.text("Vidas do zé: " + lifes, 32, 32);
    game.debug.text("Vidas do Fredy: " + lifes_enemy, 32, 64);
    game.debug.text("Moedas: " + number_of_coins, 32, 86);

    // game.debug.body(layer);
    // game.debug.bodyInfo(fredy, 32, 32);
    // game.debug.bodyInfo(fredy_luva, 32, 150);

  }

}
