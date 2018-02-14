//yield being the amount of whatever resource the farm produces
//harvestTime relates to how many gameticks occur before the farm harvests
var growSpeed = 1; //Integers only!
function farming(img, game, x, y) {
    this.game = game;
    this.img = img;
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

farming.prototype = new Entity();
farming.prototype.constructor = farming;

farming.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);
    this.growTime += this.game.clockTick;
    harvestCheck = Math.floor(this.game.timer.gameTime) % this.harvestTime;

    if (!this.harvested && harvestCheck == 0 && this.game.timer.gameTime >= growSpeed * 6) {
        this.harvested = true;
        if ( Math.floor(this.growTime) < this.harvestTime) {
            this.yield -= (5 - Math.floor(this.growTime)) * 50;
        }
        this.genWalker();

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
var found = [];
farming.prototype.genWalker = function () {

    //for each granary building on the map, if there is one:
    for (let i = 0; i < this.game.industries.length; i++) { // just a test
        //check Granary has capacity to cut down a bit on calculations 
        for (let j = 0; j < this.roadTiles.length; j++) {
            for (let k = 0; k < this.game.industries[i].roadTiles.length; k++) {
                let indie = this.game.industries[i];
                let that = this;
                this.easyStar.findPath(this.roadTiles[j][0], this.roadTiles[j][1], indie.roadTiles[k][0], indie.roadTiles[k][1], function (path) {
                    if (path == null) {
                       // console.log("Gen Walkers: No Path");
                        return false;
                    } else {
                        //console.log("gen walkers: path");
                        found.push([that.roadTiles[j][0], that.roadTiles[j][1], indie.roadTiles[k][0], indie.roadTiles[k][1]]);
                        return true;
                    }

                });
                this.easyStar.calculate();
            }
        }
    }
    //if (found.length > 0) {
    //    var gcm = new grCartMan(this.game, ASSET_MANAGER.getAsset('./img/grainCartMan.png'), walkerMap, found[0][0], found[0][1]);
    //    gcm.destX = found[0][2];
    //    gcm.destY = found[0][3];
    //    this.game.addWalker(gcm);

    //} else {
    //    console.log("No path to that buildin'")
    //}
    
}


function grainFarm(img, game, x, y) {
    farming.call(this, img, game, x, y);
    this.animHarvest = new Animation(img, 0, 2, 178, 91, 6, growSpeed, 6, true);
    this.yield = 500;
    this.maxYield = 500;

}

grainFarm.prototype = new farming();
grainFarm.prototype.constructor = grainFarm;

function barFarm(img, game, x, y) {
    farming.call(this, img, game, x, y);
    this.animHarvest = new Animation(img, 0, 1, 178, 91, 6, growSpeed, 6, true);
    this.yield = 400;
    this.maxYield = 400;
}

barFarm.prototype = new farming();
barFarm.prototype.constructor = barFarm;


function flaxFarm(img, game, x, y) {
    farming.call(this, img, game, x, y);
    this.animHarvest = new Animation(img, 0, 3, 178, 91, 6, growSpeed, 6, true);
    this.yield = 400;
    this.maxYield = 400;
}

flaxFarm.prototype = new farming();
flaxFarm.prototype.constructor = flaxFarm;