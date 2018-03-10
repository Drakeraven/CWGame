function Fire(game, x, y) {
    this.img = ASSET_MANAGER.getAsset("./img/Fire.PNG");
    this.bWidth = 1;
    this.bHeight = 1;
    this.renderX = -12;
    this.renderY = 12;
    this.currAnim = new Animation(this.img, 0, 0, 35, 35, 280, .15, 8, true);

    Entity.call(this, game, x, y);
}


Fire.prototype = new Entity();
Fire.prototype.constructor = Fire;

Fire.prototype.draw = function (ctx) {
    pt1 = this.game.twodtoisoX(this.x, this.y) - this.renderX;
    pt2 = this.game.twodtoisoY(this.x, this.y) - this.renderY;
    this.currAnim.drawFrame(this.game.clockTick, ctx, pt1, pt2);
    Entity.prototype.draw.call(this);
}
