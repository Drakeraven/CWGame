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
    this.buffer = { x: x - 1, y: y - 1, width: bWidth + 1, height: bHeight + 1};
    Entity.call(this, game, x, y);
}

bubbleBuilding.prototype = new Entity();
bubbleBuilding.prototype.constructor = bubbleBuilding;

bubbleBuilding.prototype.update = function () {
    //detect who within your radius
    //impart reduced/improved affect onto the buildings in turn.

    /*for (i = 0; i < this.game.housingArr.length; i++) { 
        if ( ) { 
    }*/

}

bubbleBuilding.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
    pt1 = this.game.twodtoisoX(this.x, this.y);
    pt2 = this.game.twodtoisoY(this.x, this.y);
    ctx.fillRect(pt1, pt2, 5, 5);
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
}

//well/water supply > tax house > fire house > cop house

function Well (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, game, img, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 5;
}

function WaterSupply (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, game, img, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 10; 
}

function TaxHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, game, img, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 15; 
}

function FireHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, game, img, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 10;
}

function CopHouse (img, game, x, y, bWidth, bHeight) { 
    bubbleBuilding.call(this, game, img, x, y, bWidth, bHeight);
    this.workTime = game.timer.gameTime;
    radius = 10; 
}