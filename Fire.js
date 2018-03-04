function Fire(game, x, y) {
    this.img;
    this.bWidth = 1;
    this.bHeight = 1;
    this.renderX = 30;
    this.renderY = 21;
    //this.openAnim = new Animation(this.img, 0, 1, 35, 35, 8, .15, 12, true);

    Entity.call(this, game, x, y);
}

Fire.prototype = new Entity();
Fire.prototype.constructor = Fire;