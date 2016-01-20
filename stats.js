var x = 800;
var y = 600;


var game = new Phaser.Game(x, y, Phaser.CANVAS, '')
game.state.add("GameTitle",gameTitle);
game.state.add("Preload",preload);
game.state.add("boot",boot);
game.state.add("menu",menu);
game.state.add("tutorial",tutorial);
game.state.add("teste01",teste01);
game.state.add("tile01",tile01);
game.state.start("boot");
