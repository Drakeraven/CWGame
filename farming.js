//yield being the amount of whatever resource the farm produces
//harvestTime relates to how many gameticks occur before the farm harvests
var growSpeed = 5; //Integers only!
function farming(game, x, y) {
    this.game = game;
    this.img = ASSET_MANAGER.getAsset("./img/FarmPlots.png");
    this.animGrow = null;
    this.animHarvest = null;
    this.bWidth = 3;
    this.bHeight = 3;
    this.renderX = 57;
    this.renderY = 0;
    this.yield = 0;
    this.maxYield = 0;
    this.harvested = false;
    this.growTime = 0;
    this.harvestTime = growSpeed * 6; //** CHANGE WHEN ShEET IS UPDATED**
    this.costToPlace = 30;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    this.easyStar = new EasyStar.js();
    this.easyStar.setGrid(walkerMap);
    this.easyStar.setAcceptableTiles([1]);
    this.easyStar.disableCornerCutting();
    Entity.call(this, game, x, y);

}

farming.prototype = Object.create(Entity.prototype);
farming.prototype.constructor = farming;

farming.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);
    //if (this instanceof grainFarm) console.log("grainssss");
    //if (this instanceof barFarm) console.log("barleeyyy");
    this.growTime += this.game.clockTick;
    harvestCheck = Math.floor(this.game.timer.gameTime) % this.harvestTime;

    if (!this.harvested && harvestCheck == 0 && this.game.timer.gameTime >= growSpeed * 6) {
        this.harvested = true;
        if (Math.floor(this.growTime) < this.harvestTime) {
            this.yield = this.maxYield - ((this.harvestTime - this.growTime) * 50);

        }
        if (this instanceof grainFarm) {
            this.genWalker(this.game.granaries);
        } else {
            this.genWalker(this.game.yards);
        }

        //this.genWalker(this.game.industries);

        this.animHarvest.elapsedTime = 0;
        this.growTime = 0;
        this.yield = this.maxYield;
    }
    if (this.animHarvest.currentFrame() > 0) this.harvested = false;
    Entity.prototype.update.call(this);
}

farming.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.animHarvest.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

farming.prototype.genWalker = function (destBuild) {
    found = false;

    for (let i = 0; i < destBuild.length; i++) {
        let indie = destBuild[i];
        //WADDUP BETCH
        let canWalk = generateWalker(this.roadTiles, indie.roadTiles);
        if (canWalk != null) {
            found = true;
            if (found) {
                this.pushBoi(canWalk);
            } 
        }
        if (found) break; 
    }
}

farming.prototype.pushBoi = function (canWalk) {

}

function grainFarm(game, x, y) {
    farming.call(this, game, x, y);
    this.animHarvest = new Animation(this.img, 0, 2, 178, 91, 6, growSpeed, 6, true);
    this.yield = 500;
    this.maxYield = 500;

}

grainFarm.prototype = Object.create(farming.prototype);
grainFarm.prototype.constructor = grainFarm;

grainFarm.prototype.pushBoi = function (canWalk) {
    var gcm = new grCartMan(this.game, ASSET_MANAGER.getAsset('./img/grainCartMan.png'), walkerMap, canWalk[0], canWalk[1]);
    gcm.loadCount = this.yield;
    gcm.destX = canWalk[2];
    gcm.destY = canWalk[3];
    this.game.addWalker(gcm);
    farming.prototype.pushBoi.call(this);
}

function barFarm(game, x, y) {
    farming.call(this, game, x, y);
    this.animHarvest = new Animation(this.img, 0, 1, 178, 91, 6, growSpeed, 6, true);
    this.yield = 400;
    this.maxYield = 400;
}

barFarm.prototype = new farming();
barFarm.prototype.constructor = barFarm;

barFarm.prototype.pushBoi = function (canWalk) {
    var bcm = new barCartMan(this.game, ASSET_MANAGER.getAsset('./img/barleyCartMan.png'), walkerMap, canWalk[0], canWalk[1]);
    bcm.loadCount = this.yield;
    bcm.destX = canWalk[2];
    bcm.destY = canWalk[3];
    bcm.game.addWalker(bcm);
    farming.prototype.pushBoi.call(this);
}

function flaxFarm(game, x, y) {
    farming.call(this, game, x, y);
    this.animHarvest = new Animation(this.img, 0, 3, 178, 91, 6, growSpeed, 6, true);
    this.yield = 400;
    this.maxYield = 400;
}

flaxFarm.prototype = new farming();
flaxFarm.prototype.constructor = flaxFarm;

flaxFarm.prototype.pushBoi = function (canWalk) {
    var fcm = new fCartMan(this.game, ASSET_MANAGER.getAsset('./img/flaxCartMan.png'), walkerMap, canWalk[0], canWalk[1]);
    fcm.loadCount = this.yield;
    fcm.destX = canWalk[2];
    fcm.destY = canWalk[3];
    this.game.addWalker(fcm);
    farming.prototype.pushBoi.call(this);
}