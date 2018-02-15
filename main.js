function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop) {
    this.spriteSheet = spriteSheet;
    this.startX = startX * frameWidth;
    this.startY = startY * frameHeight;
    this.frameWidth = frameWidth;
    this.sheetWidth = sheetWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

    var colIndex = this.currentFrame() % this.sheetWidth
    var rowIndex = Math.floor(this.currentFrame() / this.sheetWidth);

    if ((colIndex + 1) * this.frameWidth > this.spriteSheet.width) {
        rowIndex++;
    }

    ctx.drawImage(this.spriteSheet, colIndex * this.frameWidth + this.startX,
        rowIndex * this.frameHeight + this.startY, this.frameWidth,
        this.frameHeight, x, y, this.frameWidth, this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function getTileInfo(x, y, game) {
    return game.map.mapList[x][y];
}


function getNeighbors(x, y, game) {
    neighbors = [];
    neighbors["above"] = game.map.mapList[x - 1][y];
    neighbors["below"] = game.map.mapList[x + 1][y];
    neighbors["left"] = game.map.mapList[x][y - 1];
    neighbors["right"] = game.map.mapList[x][y + 1];
    return neighbors;
}

// tiling going down
function Tile(game, tileType, x, y) {
  //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/grass.png"), 0, 0, 58, 30, 1, .15, 1, true);
  this.gfxString = '';
  if (tileType === 0) {
      this.gfxString = "./img/grass.png";
  } else {
      this.gfxString = "./img/Land1a_00002.png";
  }
  this.thing;
  this.image = new Image();
  this.image.src = this.gfxString;
  this.game = game;
  this.x = x;
  this.y = y;
  this.tileType = tileType;
}

Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.getThing = function() {
  return this.thing;
}
Tile.prototype.draw = function(ctx) {
      ctx.drawImage(
        this.image,
        this.game.twodtoisoX(this.x, this.y),
        this.game.twodtoisoY(this.x, this.y)
      );
}

function Map(gameEngine) {
    this.game = gameEngine;
    this.mapList = [];
    // Note: not needed when you give mapData.
    this.mapArray = Array(30).fill(Array(30).fill(0));
}
Map.prototype.constructor = Map;

Map.prototype.addThing = function(thing, x, y) {
  if(this.mapList[y][x].thing == null) {
    this.mapList[y][x].thing = thing;
    thing.x = x;
    thing.y = y;
    this.game.addEntity(thing);

    if(thing.dimensionX > 1) {
      console.log('hi')
          for(i = x + 1; i < x + thing.dimensionX; i++) {
            this.mapList[y][i].thing = thing;
            console.log(this.mapList[y][i].thing)
          }
    }
    if(thing.dimensionY > 1) {
          for(i = y + 1; i < y + thing.dimensionY; i++) {
            this.mapList[i][x].thing = thing;
          }
    }
  }
}
Map.prototype.readMap = function(mapData) {

    for (i = 0; i < mapData.length; i++) {
        this.mapList[i] = new Array(mapData.length);
        for (j = 0; j < mapData[i].length; j++) {
            x = j;
            y = i;
            tileType = mapData[i][j];
            //console.log(mapData[i][j]);
            //console.log(twodtoisoX(x, y) + ' '+ twodtoisoY(x, y));
            var tile = new Tile(this.game, tileType, x, y );
            //this.game.addEntity(tile);
            this.mapList[i][j] = tile;
        }
    }
}

//need an instance at start. we can adjust values as needed.
function GameWorld() {
    this.prosperity = 0;
    this.population = 0;
    this.workForce = 0;
    this.taxRev = .10;
    this.funds = 1000;
    this.goals = [];
}

GameWorld.prototype.addPop = function (num) {
    this.population += num;
}

GameWorld.prototype.remPop = function (num) {
    this.population -= num;
}

GameWorld.prototype.getWorkForce = function () {
    return Math.floor(this.population * .40); //40% population is work force, change how I'm doing it??
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Weaver.png");
ASSET_MANAGER.queueDownload("./img/grass.png");
ASSET_MANAGER.queueDownload("./img/Land1a_00002.png");
ASSET_MANAGER.queueDownload("./img/emptyCartMan.png");
ASSET_MANAGER.queueDownload("./img/barleyCartMan.png");
ASSET_MANAGER.queueDownload("./img/beerCartMan.png");
ASSET_MANAGER.queueDownload("./img/clayCartMan.png");
ASSET_MANAGER.queueDownload("./img/flaxCartMan.png");
ASSET_MANAGER.queueDownload("./img/goldCartMan.png");
ASSET_MANAGER.queueDownload("./img/grainCartMan.png");
ASSET_MANAGER.queueDownload("./img/linenCartMan.png");
ASSET_MANAGER.queueDownload("./img/meatCartMan.png");
ASSET_MANAGER.queueDownload("./img/potsCartMan.png");
ASSET_MANAGER.queueDownload("./img/WatahMan.png");
ASSET_MANAGER.queueDownload("./img/Weaver.png");
ASSET_MANAGER.queueDownload("./img/ArchBuild-1.png");
ASSET_MANAGER.queueDownload("./img/Bazaar.png");
ASSET_MANAGER.queueDownload("./img/COPS-1.png");
ASSET_MANAGER.queueDownload("./img/Brewery.png");
ASSET_MANAGER.queueDownload("./img/Firehouse-1.png");
ASSET_MANAGER.queueDownload("./img/GoldMine.png");
ASSET_MANAGER.queueDownload("./img/HousingAlone.png");
ASSET_MANAGER.queueDownload("./img/HuntingLodge.png");
ASSET_MANAGER.queueDownload("./img/mansion.png");
ASSET_MANAGER.queueDownload("./img/Potter.png");
ASSET_MANAGER.queueDownload("./img/farm1.png");
ASSET_MANAGER.queueDownload("./img/taxHouse.png");
ASSET_MANAGER.queueDownload("./img/palace.png");
ASSET_MANAGER.queueDownload("./img/FarmPlots.png");
ASSET_MANAGER.queueDownload("./img/bazaarLady 22x42.png");
ASSET_MANAGER.queueDownload("./img/FireDude1.png")
ASSET_MANAGER.queueDownload("./img/Firedude2.png");
ASSET_MANAGER.queueDownload("./img/Hunter1.5.png");
ASSET_MANAGER.queueDownload("./img/Hunter2.png");
ASSET_MANAGER.queueDownload("./img/immig.png");
ASSET_MANAGER.queueDownload("./img/smallWell.png");
ASSET_MANAGER.queueDownload("./img/bigWell.png"); 

//TODO: add in imgs for fixed walkers

//var easyStar = new EasyStar.js();

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    gameEngine.gameWorld = new GameWorld(); 

    gameEngine.map = new Map(gameEngine);
    gameEngine.init(ctx);
    gameEngine.map.readMap(new mapData().testMap);
    //var gameWorld = new gameWorld();
    var walkerMap = new mapData().testMap

    gameEngine.start();
});
