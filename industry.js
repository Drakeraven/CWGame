var wageRate = 30; //annually removed, change to percentage of pop?
var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.
var merchStep = 100; //how much of an item is created at the end of a buidl cycle 

function industry(img, game, x, y, bWidth, bHeight) {
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
    this.numMerch = 0;
    this.workTime = this.game.timer.gameTime;
    Entity.call(this, game, x, y);
}

industry.prototype = new Entity();
industry.prototype.constructor = industry;

industry.prototype.update = function () {
    //if out of employees or no resources, close operation
    if (this.numEmployed == 0 || this.numResources == 0) {
        this.currAnim = this.closedAnim;
    } else {
        if (this.game.timer.gameTime - this.workTime >= 10) {
            this.workTime = this.game.gameTime;
            numMerch += merchStep;
        }

        
        
    }
    //if you detect a walker arrived with resources, up your resources
    //if you detect a lady came by to buy your shit, sell your shit.
    //Roll chance for destruction :))
    Entity.prototype.update.call(this);

}

industry.prototype.draw = function (ctx) {
    //simple draw? just gotta draw open/close, or nothing if it blew up.
    Entity.prototype.update.draw.call(this);
}