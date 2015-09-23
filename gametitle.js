var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
      this.game.add.sprite(0, 0, 'sky');
  		var gameTitle = this.game.add.sprite(400,300,"gametitle");
  		gameTitle.anchor.setTo(0.5,0.5);
  		var playButton = this.game.add.button(400,500,"play", this.playTheGame,this);
  		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("tutorial" );
	}
}
