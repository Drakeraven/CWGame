function bubbleBuilding(img, game, x, y, bWidth, bHeight) {
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.numEmployed = 0;
    this.numEmpNeeded = null;
    this.placeCost = null;
    this.radius = 0;
    this.buildings = [];
    Entity.call(this, game, x, y);
}

bubbleBuilding.prototype = new Entity();
bubbleBuilding.prototype.constructor = bubbleBuilding;

bubbleBuilding.prototype.update = function () {
    //detect who within your radius
    //impart reduced/improved affect onto the buildings in turn.
}

bubbleBuilding.prototype.draw = function (ctx) {
    //simple drawing depending on employment.
}