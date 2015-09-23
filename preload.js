var preload = function(game){}

preload.prototype = {
	preload: function(){
    this.game.load.image('ground', 'images/platform.png');
    this.game.load.image('sky', 'images/sky.png');
    // game.load.spritesheet('ze', 'images/ze_elias.png', 64, 64);
    this.game.load.spritesheet('ze', 'images/ze.png', 64, 47);
    this.game.load.audio('zesound', 'sounds/zelias_pesadelo.wav');

		this.game.load.image("gametitle","images/zelyas.png");
		this.game.load.image("play","images/play.png");
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
