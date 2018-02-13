//yield being the amount of whatever resource the farm produces
//harvestTime relates to how many gameticks occur before the farm harvests

function resource(img, game, x, y, bWidth, bHeight) {
    this.game = game;
    this.img = img;
    this.animation = null;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.yield = 0;
    this.harvestTime = 0;
    this.costToPlace = 0;
    this.storage = [];
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
    //Simple draw as needed.
    Entity.prototype.draw.call(this);
}
