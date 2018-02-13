function resourceBuild(img, game, x, y, bWidth, bHeight) {
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.numEmployed = 0;
    this.numEmpNeeded = null;
    this.placeCost = null;
    this.storage = [];
    Entity.call(this, game, x, y);
}

resourceBuild.prototype = new Entity();
resourceBuild.prototype.constructor = resourceBuild;

resourceBuild.prototype.update = function () {
 /*detect that someone has come by. Determine
    purchasing/taking or storage/retrieval.
    may not even require that? update storage counts and remove money as needed.
    */
}