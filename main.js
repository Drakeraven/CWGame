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

function twodtoisoX(x,y) {
  return ((x - y) * 29);
}
function twodtoisoY(x,y) {
  return  (x + y) * 15;
}
function isototwodX(x,y) {
  return ((x + y ) / 29 - 10) ;
}
function isototwodY(x,y) {
  return ((x - y ) / 15 + 1) ;
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

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

// tiling going down
function Tile(game, tileType, x, y) {
  this.animation = new Animation(ASSET_MANAGER.getAsset("./img/grass.png"), 0, 0, 58, 30, 1, .15, 1, true);
  this.game = game;
  this.x = x;
  this.y = y;
  this.tileType = tileType;
}

Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.draw = function(ctx) {
    console.log(this.x + ' ' + this.y);
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Map(gameEngine) {
    this.game = gameEngine;
    this.mapList = new Array(12);
    this.mapArray = [[0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0]];
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.readMap = function(mapData) {
    for(i = 0; i < 12; i++) {
        for(j = 0; j < 12; j++) {
          this.mapList[i] = new Array(12);
            x = j + 10;
            y = i - 1;
            tileType = mapData[i][j];
            var tile = new Tile(this.game, tileType, twodtoisoX(x,y), twodtoisoY(x,y) );
            this.mapList[i][j] = tile;
            this.game.addEntity(this.mapList[i][j]);
        }
    }
}


// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Weaver.png");
ASSET_MANAGER.queueDownload("./img/grass.png");
ASSET_MANAGER.queueDownload("./img/emptyCartMan.png");
ASSET_MANAGER.queueDownload("./img/barleyCartMan.png");
ASSET_MANAGER.queueDownload("./img/beerCartMan.png");
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
//TODO: add in imgs for fixed walkers

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var map =  new Map(gameEngine);

    var weaver = new Weaver(gameEngine, ASSET_MANAGER.getAsset("./img/Weaver.png"));
    var archbuild = new ArchBuild(gameEngine, ASSET_MANAGER.getAsset("./img/ArchBuild-1.png"));
    var bazaar = new Bazaar(gameEngine, ASSET_MANAGER.getAsset("./img/Bazaar.png"));
    var copstore = new CopStore(gameEngine, ASSET_MANAGER.getAsset("./img/COPS-1.png"));
    var brewery = new Brewery(gameEngine, ASSET_MANAGER.getAsset("./img/Brewery.png"));
    var firehouse = new Firehouse(gameEngine, ASSET_MANAGER.getAsset("./img/Firehouse-1.png"));
    var goldmine = new Goldmine(gameEngine, ASSET_MANAGER.getAsset("./img/GoldMine.png"));
    var housingalone = new Housing(gameEngine, ASSET_MANAGER.getAsset("./img/HousingAlone.png"));
    var huntinglodge = new HuntingLodge(gameEngine, ASSET_MANAGER.getAsset("./img/HuntingLodge.png"));
    var mansion = new Mansion(gameEngine, ASSET_MANAGER.getAsset("./img/mansion.png"));
    var potter = new Potter(gameEngine, ASSET_MANAGER.getAsset("./img/Potter.png"));
    var workcamp = new WorkCamp(gameEngine, ASSET_MANAGER.getAsset("./img/farm1.png"));
    var taxhouse = new TaxHouse(gameEngine, ASSET_MANAGER.getAsset("./img/taxHouse.png"));
    var palace = new Palace(gameEngine, ASSET_MANAGER.getAsset("./img/palace.png"));
    var barley = new Barley(gameEngine, ASSET_MANAGER.getAsset("./img/FarmPlots.png"));
    var ecm = new eCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/emptyCartMan.png"), 0, 750);
    var barcm = new barCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/barleyCartMan.png"), 20, 750);
    var becm = new beCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/beerCartMan.png"), 60, 750);
    var ccm = new cCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/clayCartMan.png"), 100, 750);
    var fcm = new fCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/flaxCartMan.png"), 140, 750);
    var glcm = new glCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), 180, 750);
    var grcm = new grCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/grainCartMan.png"), 220, 750);
    var lcm = new lCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/linenCartMan.png"), 260, 750);
    var mcm = new mCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/meatCartMan.png"), 300, 750);
    var pcm = new pCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/potsCartMan.png"), 340, 750);
    var wm = new watahMan(gameEngine, ASSET_MANAGER.getAsset("./img/WatahMan.png"), 390, 750);
    //TODO: add in entities and vars for fixed walkers
    gameEngine.addEntity(ecm);
    gameEngine.addEntity(barcm);
    gameEngine.addEntity(becm);
    gameEngine.addEntity(ccm);
    gameEngine.addEntity(fcm);
    gameEngine.addEntity(glcm);
    gameEngine.addEntity(grcm);
    gameEngine.addEntity(lcm);
    gameEngine.addEntity(mcm);
    gameEngine.addEntity(pcm);
    gameEngine.addEntity(wm);
    //gameEngine.addEntity(bg);
    gameEngine.addEntity(weaver);
    gameEngine.addEntity(archbuild);
    gameEngine.addEntity(bazaar);
    gameEngine.addEntity(copstore);
    gameEngine.addEntity(brewery);
    gameEngine.addEntity(firehouse);
    gameEngine.addEntity(goldmine);
    gameEngine.addEntity(housingalone);
    gameEngine.addEntity(huntinglodge);
    gameEngine.addEntity(mansion);
    gameEngine.addEntity(potter);
    gameEngine.addEntity(workcamp);
    gameEngine.addEntity(taxhouse);
    gameEngine.addEntity(palace);
    gameEngine.addEntity(barley);

    gameEngine.init(ctx);
        map.readMap(map.mapArray);
    gameEngine.start();
});
