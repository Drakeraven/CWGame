var wageRate = 30; //annually removed, change to percentage of pop?
var fireResist = 5; // percent chance of burning? lowerable
var collapseResist = 3; //percent chance of collapse? lowerable.

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
    Entity.call(this, game, x, y);
}

industry.prototype = new Entity();
industry.prototype.constructor = industry;

industry.prototype.update = function () {
    //if out of employees, close operation
    //if out of resources, close operation
    //if you detect a walker arrived with resources, up your resources
    //if you detect a lady came by to buy your shit, sell your shit.
    //Roll chance for destruction :))

}

industry.prototype.draw = function () {
    //simple draw? just gotta draw open/close, or nothing if it blew up.
}