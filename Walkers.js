function Walker4(game, imgNE, imgNW, imgSE, imgSW, imgD, lX, lY) {
    this.animationNE = imgNE;
    this.animationNW = imgNW;
    this.animationSE = imgSE;
    this.animationSW = imgSW;
    this.animationDead = imgD;
    Entity.call(this, lX, lY);

    //TODO complete construction
}

Walker4.prototype = new Entity();
Walker4.prototype.constructor = Walker4;

Walker4.prototype.update = function () {
    //TODO: generalized behavior
    Entity.prototype.update.call(this);
}

Walker4.prototype.draw = function () {
    //TODO: generalized drawing 
    Entity.prototype.draw.call(this);
}

function Walker8(game, imgNE, imgNW, imgSE, imgSW, imgD, imgN, imgS, imgE, imgW, lX, lY) {
    Walker4.call(game, imgNE, imgNW, imgSE, imSW, imgD, lX, lY);
    this.animationN = imgN;
    this.animationS = imgS;
    this.animationE = imgE;
    this.animationW = imgW;
}

Walker8.prototype = new Walker4();
Walker8.prototype.constructor = Walker8;

Walker8.prototype.update = function () {
    //TODO Generalized Updating
    Walker4.prototype.update.call(this);
}

Walker8.prototype.draw = function () {
    //TODO Generalized Drawing
    Walker4.prototype.draw.call(this);
}

