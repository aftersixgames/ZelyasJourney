var menu = function(game){}
var thumbRows = 3;
var thumbCols = 3;
var thumbWidth = 64;
var thumbHeight = 64;
var thumbSpacing = 32;
// array with finished levels and stars collected.
// 0 = playable yet unfinished level
// 1, 2, 3 = level finished with 1, 2, 3 stars
// 4 = locked
var starsArray = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
var pages = starsArray.length/(thumbRows*thumbCols);
var levelThumbsGroup;
var currentPage = 0;
var leftArrow;
var rightArrow;
var levelManager = {1: 'tile01'}

menu.prototype = {
  preload: function(){
    this.game.load.spritesheet("levels", "images/levels.png", 64, 64);
    this.game.load.spritesheet("level_arrows", "images/level_arrows.png", 48, 48);
  },
  create: function(){
    this.game.add.sprite(0, 0, 'sky');
    // this.goFullScreen();
  // placing left and right arrow buttons, will call arrowClicked function when clicked
    leftArrow = this.game.add.button(50,420,"level_arrows",this.arrowClicked);
    leftArrow.anchor.setTo(0.5);
    leftArrow.frame = 0;
    leftArrow.alpha = 0.3;
    rightArrow = this.game.add.button(270,420,"level_arrows",this.arrowClicked);
    rightArrow.anchor.setTo(-8,0.5);
    rightArrow.frame = 1;
    // creation of the thumbails group
    levelThumbsGroup = this.game.add.group();
    // determining level thumbnails width and height for each page
    var levelLength = thumbWidth*thumbCols+thumbSpacing*(thumbCols-1);
    var levelHeight = thumbWidth*thumbRows+thumbSpacing*(thumbRows-1);
    // looping through each page
    for(var l = 0; l < pages; l++){
      // horizontal offset to have level thumbnails horizontally centered in the page
      var offsetX = (this.game.width-levelLength)/2+this.game.width*l;
      // I am not interested in having level thumbnails vertically centered in the page, but
      // if you are, simple replace my "20" with
      // (this.game.height-levelHeight)/2
      var offsetY = (this.game.height-levelHeight)/2;
      // looping through each level thumbnails
      for(var i = 0; i < thumbRows; i ++){
        for(var j = 0; j < thumbCols; j ++){
            // which level does the thumbnail refer?
            var levelNumber = i*thumbCols+j+l*(thumbRows*thumbCols);
          // adding the thumbnail, as a button which will call thumbClicked function if clicked
          var levelThumb = this.game.add.button(offsetX+j*(thumbWidth+thumbSpacing), offsetY+i*(thumbHeight+thumbSpacing), "levels", this.thumbClicked, this);
          // shwoing proper frame
          levelThumb.frame=starsArray[levelNumber];
          // custom attribute
          levelThumb.levelNumber = levelNumber+1;
          // adding the level thumb to the group
          levelThumbsGroup.add(levelThumb);
          // if the level is playable, also write level number
          if(starsArray[levelNumber]<4){
            var style = {
              font: "18px Arial",
              fill: "#ffffff"
            };
            var levelText = this.game.add.text(levelThumb.x+5,levelThumb.y+5,levelNumber+1,style);
            // levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
            levelThumbsGroup.add(levelText);
          }
        }
      }
    }

  },
  goFullScreen: function (){
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setScreenSize(true);
  },
  thumbClicked: function(button){
    // the level is playable, then play the level!!
    console.log(levelManager);
    if(button.frame < 4){
      this.game.state.start(levelManager[button.levelNumber]);
    }
    // else, let's shake the locked levels
    else{
      var buttonTween = this.game.add.tween(button)
      buttonTween.to({
        x: button.x+thumbWidth/15
      }, 20, Phaser.Easing.Cubic.None);
      buttonTween.to({
        x: button.x-thumbWidth/15
      }, 20, Phaser.Easing.Cubic.None);
      buttonTween.to({
        x: button.x+thumbWidth/15
      }, 20, Phaser.Easing.Cubic.None);
      buttonTween.to({
        x: button.x-thumbWidth/15
      }, 20, Phaser.Easing.Cubic.None);
      buttonTween.to({
        x: button.x
      }, 20, Phaser.Easing.Cubic.None);
      buttonTween.start();
    }
  },
  arrowClicked: function(button){
    // touching right arrow and still not reached last page
    if(button.frame==1 && currentPage<pages-1){
      leftArrow.alpha = 1;
      currentPage++;
      // fade out the button if we reached last page
      if(currentPage == pages-1){
        button.alpha = 0.3;
      }
      // scrolling level pages
      var buttonsTween = this.game.add.tween(levelThumbsGroup);
      buttonsTween.to({
        x: currentPage * this.game.width * -1
      }, 500, Phaser.Easing.Cubic.None);
      buttonsTween.start();
    }
    // touching left arrow and still not reached first page
    if(button.frame==0 && currentPage>0){
      rightArrow.alpha = 1;
      currentPage--;
      // fade out the button if we reached first page
      if(currentPage == 0){
        button.alpha = 0.3;
      }
      // scrolling level pages
      var buttonsTween = this.game.add.tween(levelThumbsGroup);
      buttonsTween.to({
        x: currentPage * this.game.width * -1
      }, 400, Phaser.Easing.Cubic.None);
      buttonsTween.start();
    }
  }
}
