var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function bazaar(game, img, x, y, bWidth, bHeight) {
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = new Animation(img, 0, 1, 118, 82, 4, .15, 12, true);
    this.closedAnim = new Animation(img, 0, 0, 118, 82, 1, .15, 1, true);
    this.destroyedAnim = null;
    this.currAnim = new Animation(img, 0, 0, 118, 82, 1, .15, 1, true);
    this.animFrame = [];        
    this.numEmployed = 0;
    this.maxEmployed = 20;
    this.placeCost = 50;
    this.foodLevel = 0;
    this.weaverLevel = 0; 
    this.potterLevel = 0; 
    this.brewerLevel = 0; 
    Entity.call(this, game, x, y);
}

bazaar.prototype = new Entity();
bazaar.prototype.constructor = bazaar;

bazaar.prototype.update = function () {
    Entity.prototype.update.call(this);
    //console.log("Inside update")
    if (getRandomInt(1, 101) <= fireResist) {
        //Catches on fire
        return;
    }

    if (getRandomInt(1, 101) <= collapseResist) {
        //collapses
        return;
    }
    if (this.numEmployed === this.maxEmployed) { 
        this.currAnim = this.openAnim;
    } else { 
        this.currAnim = this.closedAnim;
    }

    //do this at a set time, 
    for (i = 0; i < this.game.housingArr.length; i++) { 
        //for any house in the area, push food to them 
        //set amount to each place - 2 per person? idk housing level * amt 
        //sell stock of items 
        //gain money from general fund (item cost * items sold)
    }


}

bazaar.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = twodtoisoX(this.x, this.y);
    pt2 = twodtoisoY(this.x, this.y);
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}
