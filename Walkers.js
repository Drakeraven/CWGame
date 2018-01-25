function Walker4(game, img, lX, lY, speed) {
    this.img = img;
    this.x = lX;
    this.y = lY;
    this.speed = speed;
    Entity.call(this, lX, lY);
}

Walker4.prototype = new Entity();
Walker4.prototype.constructor = Walker4;

Walker4.prototype.update = function () {
    this.lX = this.game.clockTick * this.speed;
    if (this.lX > 800) {
        this.lX = -100;
    }
    Entity.prototype.update.call(this);
}

Walker4.prototype.draw = function () {
    this.currentAnimation.drawFrame(this.game.clockTick, this.lX, this.lY);
    Entity.prototype.draw.call(this);
}

function eCartMan(game, img, lX, lY, speed) {
    this.animation = new Animation(img, 400, 400, 49, 38, 12, .2, 12, true);
    Walker4.call(this, game, img, lX, lY, speed);
}

eCartMan.prototype = new Walker4();
eCartMan.prototype.constructor = eCartMan;


//function Walker8(game, imgNE, imgNW, imgSE, imgSW, imgD, imgN, imgS, imgE, imgW, lX, lY) {
//    Walker4.call(game, imgNE, imgNW, imgSE, imSW, imgD, lX, lY);
//    this.animationN = imgN;
//    this.animationS = imgS;
//    this.animationE = imgE;
//    this.animationW = imgW;
//}

//Walker8.prototype = new Walker4();
//Walker8.prototype.constructor = Walker8;

//Walker8.prototype.update = function () {
//    //TODO Generalized Updating
//    Walker4.prototype.update.call(this);
//}

//Walker8.prototype.draw = function () {
//    //TODO Generalized Drawing
//    Walker4.prototype.draw.call(this);
//}

