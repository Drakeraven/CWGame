var wageRate = 30; //annually removed, change to percentage of pop?
var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.
var merchStep = 100; //how much of an item is created at the end of a buidl cycle 

function arrived(rect1, r2X, r2Y) {
    //return (rect1.x < rect2X + 0) &&
    //    (rect1.x + rect1.width > r2X && rect1.y < r2Y + 0) &&
    //    (rect1.height + rect1.y > r2);
    return (r2X < rect1.x + rect1.width && r2X > rect1.x) &&
        (r2Y < rect1.y + rect1.height && r2Y > rect1.y);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function industry(img, game, x, y, bWidth, bHeight) {
    this.game = game;
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.numEmployed = 0;
    this.numEmpNeeded = null;
    this.placeCost = null;
    this.numResources = 0;
    this.resType = "";
    this.numMerch = 0;
    this.workTime = game.timer.gameTime;
    this.buffer = { x: x - 1, y: y - 1, width: bWidth + 1, height: bHeight + 1};
    Entity.call(this, game, x, y);
}

industry.prototype = new Entity();
industry.prototype.constructor = industry;

industry.prototype.update = function () {

    if (getRandomInt(1, 101) <= fireResist) {
        //Catches on fire
        return;
    }

    if (getRandomInt(1, 101) <= collapseResist) {
        //collapses
        return;
    }

    //if out of employees or no resources, close operation
    if (this.numEmployed == 0 || this.numResources == 0) {
        this.currAnim = this.closedAnim;
    } else {
        if (this.game.timer.gameTime - this.workTime >= 10) {
            this.workTime = this.game.gameTime;
            numMerch += merchStep;
        }
        for (var i = 0; i < this.game.walkers.length; i++) {//loop through walkers 
            if (arrived(this.buffer, this.game.walkers[i].x, this.game.walkers[i].y)) {
                if (this.game.walkers[i].loadType == this.resType) {
                    this.numResources += this.game.walkers[i].loadCount;  
                }

                if (this.game.walkers[i].loadType == "buyer") {
                    this.game.walkers[i].funds -= 50;
                    this.numMerch -= this.game.walkers[i].loadCount; //TODO: Bazaar lady is gonna be more unique.
                }
            }
        }   
    }
    Entity.prototype.update.call(this);
}

industry.prototype.draw = function (ctx) {
    //this.currAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//For each industry, define a resource type as a string.
function Weaver(img, game, x, y, bWidth, bHeight) {
    this.openAnim = new Animation(img, 0, 1, 118, 100, 6, .15, 12, true);
    this.closedAnim = new Animation(img, 0, 0, 118, 100, 1, .15, 1, true); // maybe set false??
    this.resType = "linen";
    this.numEmpNeeded = 12;
    this.placeCost = 50;
    industry.call(this, img, game, x, y, bWidth, bHeight);

}

Weaver.prototype = new industry();
Weaver.prototype.constructor = Weaver;