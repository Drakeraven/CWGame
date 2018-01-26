
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
function Weaver(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Weaver.png"), 0, 1, 118, 100, 6, .15, 12, true);
    Entity.call(this, game, 0, 400);

}

Weaver.prototype = new Entity();
Weaver.prototype.constructor = Weaver;

Weaver.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Weaver.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Weaver.png");
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
ASSET_MANAGER.queueDownload("./img/Architect.png");
ASSET_MANAGER.queueDownload("./img/actualcop.png");
ASSET_MANAGER.queueDownload("./img/actuallyfarmer.png");
ASSET_MANAGER.queueDownload("./img/FireDude1.png");
ASSET_MANAGER.queueDownload("./img/gazelle.png");
ASSET_MANAGER.queueDownload("./img/emigrant.png");
ASSET_MANAGER.queueDownload("./img/TaxCollector.png");




ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    var bg = new Background(gameEngine);
    var weaver = new Weaver(gameEngine);
    var ecm = new eCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/emptyCartMan.png"), 0, 300);
    var barcm = new barCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/barleyCartMan.png"), 0, 350);
    var becm = new beCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/beerCartMan.png"), 0, 400);
    var ccm = new cCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/clayCartMan.png"), 0, 450);
    var fcm = new fCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/flaxCartMan.png"), 0, 500);
    var glcm = new glCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/goldCartMan.png"), 0, 550);
    var grcm = new grCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/grainCartMan.png"), 0, 600);
    var lcm = new lCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/linenCartMan.png"), 0, 650);
    var mcm = new mCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/meatCartMan.png"), 0, 700);
    var pcm = new pCartMan(gameEngine, ASSET_MANAGER.getAsset("./img/potsCartMan.png"), 0, 750);
    var wm = new watahMan(gameEngine, ASSET_MANAGER.getAsset("./img/WatahMan.png"), 0, 780);
    var archi = new architect(gameEngine, ASSET_MANAGER.getAsset("./img/Architect.png"), 0, 250);
    var copi = new cop(gameEngine, ASSET_MANAGER.getAsset("./img/actualcop.png"), 0, 200);
    var farmi = new farmer(gameEngine, ASSET_MANAGER.getAsset("./img/actuallyfarmer.png"), 200, 200);
    var firei = new fireMan(gameEngine, ASSET_MANAGER.getAsset("./img/FireDude1.png"), 0, 150);
    var gaz = new gazelle(gameEngine, ASSET_MANAGER.getAsset("./img/gazelle.png"), 300, 300);
    var emi = new emigrant(gameEngine, ASSET_MANAGER.getAsset("./img/emigrant.png"), 400, 400);
    var tax = new taxMan(gameEngine, ASSET_MANAGER.getAsset("./img/TaxCollector.png"), 500, 500);

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
    gameEngine.addEntity(archi);
    gameEngine.addEntity(copi);
    gameEngine.addEntity(farmi);
    gameEngine.addEntity(firei);
    gameEngine.addEntity(gaz);
    gameEngine.addEntity(emi);
    gameEngine.addEntity(tax);
    //gameEngine.addEntity(bg);
    //gameEngine.addEntity(weaver);
 
});
