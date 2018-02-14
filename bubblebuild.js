function bubbleBuilding(img, game, x, y, bWidth, bHeight) {
    this.game = game;
    this.img = img;
    this.bWidth = bWidth;
    this.bHeight = bHeight;
    this.openAnim = null;
    this.closedAnim = null;
    this.currAnim = null;
    this.renderX = 0;
    this.renderY = 0;
    //this.numEmployed = 0;
    //this.numEmpNeeded = null;
    this.placeCost = 10;
    this.prodTime = 0;
    this.workTime = 0;
    this.buffer = { x: x - 1, y: y - 1, width: bWidth + 1, height: bHeight + 1};
    Entity.call(this, game, x, y);
}

bubbleBuilding.prototype = new Entity();
bubbleBuilding.prototype.constructor = bubbleBuilding;

bubbleBuilding.prototype.update = function () {
    Entity.prototype.update.call(this);
    //detect who within your radius
    //impart reduced/improved affect onto the buildings in turn.

    /*for (i = 0; i < this.game.housingArr.length; i++) { 
        if ( ) { 
    }*/

}

bubbleBuilding.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}

function Well (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, img, game, x, y, bWidth, bHeight);
    workTime = game.timer.gameTime;
    radius = 5;
    this.renderX = 0;
    this.renderY = -8;
    this.currAnim = new Animation(img, 0, 0, 58, 51, 1, 0.15, 1, true);
}

Well.prototype = new bubbleBuilding();
Well.prototype.constructor = Well;

function WaterSupply (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, img, game, x, y, bWidth, bHeight);
    workTime = game.timer.gameTime;
    radius = 10; 
    this.currAnim = new Animation(img, 0, 0, 118, 77, 1, 0.15, 1, true);
}

WaterSupply.prototype = new bubbleBuilding();
WaterSupply.prototype.constructor = WaterSupply;

function TaxHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, img, game, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 15; 
    this.renderX = 28;
    this.renderY = 35;
    this.currAnim = new Animation(img, 0, 1, 118, 96, 8, 0.15, 8, true);
}

TaxHouse.prototype = new bubbleBuilding();
TaxHouse.prototype.constructor = TaxHouse;

function FireHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, img, game, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    this.radius = 10;
    this.renderX = 0;
    this.renderY = 40;
    this.currAnim = new Animation(img, 0, 1, 58, 100, 6, .15, 12, true);
}

FireHouse.prototype = new bubbleBuilding();
FireHouse.prototype.constructor = FireHouse;

function CopHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, img, game, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    this.radius = 10; 
    this.renderX = 0; 
    this.renderY = 40;
    this.currAnim = new Animation(img, 0, 1, 58, 102, 6, .15, 12, true);
}

CopHouse.prototype = new bubbleBuilding();
CopHouse.prototype.constructor = CopHouse;