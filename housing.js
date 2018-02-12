var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function house(game, img, x, y, bWidth, bHeight) {
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.level = 0;
    this.destroyedAnim = null;
    this.currAnim = null;
    this.numHoused = 0;
    this.placeCost = null;
    this.waterLevel = false;
    this.foodLevel = false;
    this.weaverLevel = false; 
    this.potterLevel = false; 
    this.brewerLevel = false; 
    Entity.call(this, game, x, y);
}

house.prototype = new Entity();
house.prototype.constructor = house;

house.prototype.update = function () {
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

    //if (!this.waterLevel) { 
    //    this.currAnim = change back to init
    //} 
    if (this.waterLevel) { 
        //this.currAnim = new Animation(this.img, this.x, this.y, 118, 97, 1, 0, 1, true);
    }
    this.waterLevel = true;
    //detect who within your radius
    //check if a goal has been met 
    //change the current animation
    //if you lose a goal, downgrade a level - 
    //downgrade to the level before the one that required goal to build
    
    //UPDATE Pop: 
    //Iterate over all buildings in array, add/subtract difference between gameWorld pop and array pop
}

house.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = twodtoisoX(this.x, this.y);
    pt2 = twodtoisoY(this.x, this.y);
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}


function Housing(game, img, x, y, bWidth, bHeight) {
    house.call(this, game, img, x, y, bWidth, bHeight);
    this.img = img;
    this.level = 1;
    //this.destroyedAnim = null;
    this.currAnim = new Animation(img, 0, 0, 118, 97, 1, 0.15, 1, true);
    this.numHoused = 50;    
}

Housing.prototype = new house();
Housing.prototype.constructor = Housing;