var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
game.state.add("GameTitle",gameTitle);
game.state.add("Preload",preload);
game.state.add("main",main);
game.state.add("boot",boot);
game.state.add("menu",menu);
game.state.add("tutorial",tutorial);
game.state.start("boot");
