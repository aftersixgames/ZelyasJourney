var preload = function(game){}
var map;
var tileset;
var layer;
var player;
var cursors;
var gravidade;
var zeJump;
var zeSpeed;
var fredy;

preload.prototype = {
	preload: function(){
    this.game.load.image('ground', 'images/platform.png');
    this.game.load.image('sky', 'images/sky.png');
    // game.load.spritesheet('ze', 'images/ze_elias.png', 64, 64);
    this.game.load.spritesheet('ze', 'images/ze.png', 64, 47);
    this.game.load.spritesheet('fredy', 'images/fredy.png', 70, 60);
    this.game.load.spritesheet('fredy_luva', 'images/freddy_luva.png', 58, 50);
    this.game.load.audio('zesound', 'sounds/zelias_pesadelo.wav');

	this.game.load.image("gametitle","images/zelyas.png");
	this.game.load.image("play","images/play.png");
    this.game.load.tilemap("tile01", "tile01.json", null, Phaser.Tilemap.TILED_JSON);
    gravidade = 900;

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
