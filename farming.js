//yield being the amount of whatever resource the farm produces
//harvestTime relates to how many gameticks occur before the farm harvests

function farming(img, game, x, y, bWidth, bHeight) {
    this.game = game;
    this.img = img;
    this.animGrow = null;
    this.animHarvest = null;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.yield = 0;
    this.harvestTime = 0;
    this.costToPlace = 0;
    Entity.call(this, game, x, y);

}

farming.prototype = new Entity();
farming.prototype.constructor = farming;

farming.prototype.update = function () {
    /*Tracks the time, marking its growth and updating
    animation as needed. When its harvest time, yield
    will be delivered to the granary/storage yard by a walker.
    reset growing cycle.*/

    Entity.prototype.update.call(this);
}

farming.prototype.draw = function (ctx) {
    pt1 = twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}


function grainFarm(img, game, x, y, bWidth, bHeight) {
    farming.prototype.call(this, img, game, x, y, bWidth, bHeight);
}

grainFarm.prototype = new farming();
grainFarm.prototype.constructor = grainFarm;

function barFarm(img, game, x, y, bWidth, bHeight) {
    farming.prototype.call(this, img, game, x, y, bWidth, bHeight);
}

barFarm.prototype = new farming();
barFarm.prototype.constructor = barFarm;


function flaxFarm(img, game, x, y, bWidth, bHeight) {
    farming.prototype.call(this, img, game, x, y, bWidth, bHeight);

}

flaxFarm.prototype = new farming();
flaxFarm.prototype.constructor = flaxFarm;