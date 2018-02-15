resSpeed = .10; 

function resourceBuild(game, x, y) {
    this.game = game;
    this.img = null;
    this.bWidth = 2;
    this.bHeight = 2;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.renderX = 0;
    this.renderY = 0;
    this.numEmployed = 0;
    this.numEmpNeeded = null;
    this.placeCost = null;
    this.resType = "";
    this.prodTime = 0;
    this.buffer = { x: x - 1, y: y - 1, width: this.bWidth + 1, height: this.bHeight + 1 };
    this.roadTiles = [];
    Entity.call(this, game, x, y);
}

resourceBuild.prototype = new Entity();
resourceBuild.prototype.constructor = resourceBuild;

resourceBuild.prototype.update = function () {
    this.roadTiles = findRoad(this.buffer);

    if (this.numEmployed < this.numEmpNeeded) {
        this.currAnim = this.closedAnim;

    } else {
        this.currAnim = this.openAnim;
        if (this.game.timer.gameTime - this.workTime >= this.prodTime) {
            this.workTime = this.game.timer.gameTime;
            //Generate a walker to deliver the resource accordingly.
        }
    }
    Entity.prototype.update.call(this);
}

resourceBuild.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
} 

function goldMine(game, x, y) {
    resourceBuild.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset('./img/GoldMine.png');
    this.workTime = game.timer.gameTime;
    this.closedAnim = new Animation(this.img, 0, 0, 118, 63, 1, resSpeed, 1, true);
    this.openAnim = new Animation(this.img, 0, 1, 118, 63, 9, resSpeed, 17, true);
    this.currAnim = this.closedAnim;
    this.resType = "gold";
    this.prodTime = 30;
    this.numEmpNeeded = 16;
    this.renderX = 25;
    this.renderY = 5;
    this.placeCost = 75;
    //FORTESTING
    this.numEmployed = 16;

}

goldMine.prototype = new resourceBuild();
goldMine.prototype.constructor = goldMine;

function clayPit(game, x, y){
    resourceBuild.call(this, game, x, y);
    this.img = ASSET_MANAGER.getAsset('./img/ClayThingy.png');
    this.workTime = game.timer.gameTime;
    this.closedAnim = new Animation(this.img, 0, 0, 118, 77, 1, resSpeed, 1, true);
    this.openAnim = new Animation(this.img, 0, 1, 118, 77, 8, resSpeed, 24, true);
    this.currAnim = this.closedAnim;
    this.resType = "clay";
    this.prodTime = 20;
    this.numEmpNeeded = 14;
    this.renderX = 29;
    this.renderY = 9;
    this.placeCost = 20;
    //FOR TESTING
    this.numEmployed = 14;

}

clayPit.prototype = new resourceBuild();
clayPit.prototype.constructor = clayPit;

//Possibly Hunting Lodge? Extend the update behavior to deal with returning hunters. 