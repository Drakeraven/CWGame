// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = .05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.buildings = []; //add general buildings here (cop, fire, well, water)
    this.housingArr = []; //add houses here
    this.walkers = []; //Add Walkers to this ONLY
    this.industries = []; //Add Industries to this ONLY
    this.yards = [];
    this.granaries = [];
    this.map;
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.gameWorld = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    this.cameraoffX = 0;
    this.cameraoffY = 0;
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}
GameEngine.prototype.twodtoisoX = function (x,y) {
  return (((x - y) + this.cameraoffX) * 29 );
}
GameEngine.prototype.twodtoisoY = function (x,y) {
  return (((x + y)-this.cameraoffY)) * 15 ;
}
GameEngine.prototype.isototwodX = function (x,y) {
  return Math.floor((((x / 29) - this.cameraoffX) + ((y / 15) + this.cameraoffY )) / 2) - 1;
}
GameEngine.prototype.isototwodY = function (x,y) {
  return Math.floor((((y /15) + this.cameraoffY) - ((x / 29) - this.cameraoffX)) /2);
}
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    this.ctx.canvas.addEventListener("click", function(event) {
        that.buildOnCanvas(event.clientX, event.clientY);
        fixX = event.clientX - (event.clientX % 29);
        fixY = event.clientY - (event.clientY % 15);
        console.log("canvas has been left-clicked at " + event.clientX + ", " + event.clientY + '(board coord at )' + that.isototwodX(fixX, fixY) + ' ' + that.isototwodY(fixX, fixY));
        //copstore = new Weaver(ASSET_MANAGER.getAsset('./img/Weaver.png'), that, that.isototwodX(fixX, fixY), that.isototwodY(fixX, fixY), 2, 2);
        copstore = new barFarm(that, that.isototwodX(fixX, fixY), that.isototwodY(fixX, fixY));
        that.map.addThing(copstore, that.isototwodX(fixX, fixY), that.isototwodY(fixX, fixY));
    });
    //hotkey
    this.ctx.canvas.addEventListener("keydown", function(event) {
        if (event.code === "KeyH") {
            setButton("Housing");
        } else if (event.code === "KeyF") {
            setButton("Food and Farm");
        } else if (event.code === "ArrowRight") {
            that.cameraoffX += 1;
        }else if (event.code === "ArrowLeft") {
            that.cameraoffX -= 1;
        }else if (event.code === "ArrowUp") {
            that.cameraoffY += 1;
        }else if (event.code === "ArrowDown") {
            that.cameraoffY -= 1;
        }
        //console.log("the following key was pressed: " + event.code + "cam off x: " + that.cameraoffX + " cam off y: " + that.cameraoffY);

    });

    console.log('Input started');
}

function setButton(titleOfCurrentButtonSelection) {
    $('.pharoh-button').removeClass('selected');
    $('.pharoh-button[title="' + titleOfCurrentButtonSelection + '"]').addClass('selected');
    var buttonPaneTitle = titleOfCurrentButtonSelection;
    if (buttonPaneTitle == 'Messages') buttonPaneTitle = 'Default';
    $('.button-pane img').hide();
    $('.button-pane img[title="' + buttonPaneTitle + '"]').show();
}

GameEngine.prototype.buildOnCanvas = function(x, y) {
    let selection = "";
    //Will return nothing if no buttons are selected
    let selectedButton = $('.pharoh-button.selected');
    //this is check, so we don't call .attr on null
    if (selectedButton.length > 0) {
        selection = selectedButton.attr('title');
    }
    let offsetX = 0;
    let offsetY = 0;
    let entity = null;

    switch (selection){
        case "Housing":
            console.log("itahouse");
            entity = new Housing(
                this,
                ASSET_MANAGER.getAsset("./img/HousingAlone.png"),
                x,
                y,
            );
            offsetX = entity.animation.frameWidth / 2
            offsetY = entity.animation.frameHeight / 2
            entity.x = x - offsetX;
            entity.y = y - offsetY;
            this.addEntity(
                entity
            );
            
            break;
        case "Food and Farm":
            console.log("itfuud");
            entity = new Barley(
                this,
                ASSET_MANAGER.getAsset("./img/FarmPlots.png"),
                x,
                y,
            );
            offsetX = entity.animation.frameWidth / 2
            offsetY = entity.animation.frameHeight / 2
            entity.x = x - offsetX;
            entity.y = y - offsetY;
            this.addEntity(
                entity
            );
            $("title").attr('src','./img/FoodAndFarmPane.png')
            break;
        default :
            console.log('nuthin2seahear')
            break
    }
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.addHouse = function (entity) {
    console.log('added house');
    this.housingArr.push(entity);
}

GameEngine.prototype.addBuilding = function (entity) {
    console.log('added building');
    this.buildings.push(entity);
}

GameEngine.prototype.addWalker = function (walker) {
    console.log("added walker");
    this.walkers.push(walker);
}

GameEngine.prototype.addIndustry = function (industry) {
    console.log("added industry");
    this.industries.push(industry);
}

GameEngine.prototype.addGranary = function (granary) {
    console.log("added Granary");
    this.granaries.push(granary);
}

GameEngine.prototype.addYard = function (yard) {
    console.log("added Storage Yard");
    this.yards.push(yard);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for(var i = 0; i < this.map.mapList.length; i++) {
      for(var j = 0; j < this.map.mapList[1].length; j++) {
        this.map.mapList[i][j].draw(this.ctx);
      }
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }

    for(var i = 0; i < this.housingArr.length; i++) { 
        this.housingArr[i].draw(this.ctx);
    }

    for (var i = 0; i < this.industries.length; i++) {
        this.industries[i].draw(this.ctx);
    }

    for (var i = 0; i < this.granaries.length; i++) {
        this.granaries[i].draw(this.ctx);
    }

    for (var i = 0; i < this.yards.length; i++) {
        this.yards[i].draw(this.ctx);
    }

    for (var i = 0; i < this.walkers.length; i++) {
        this.walkers[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    var working = this.gameWorld.workForce + 100; 
    //give industry employees here :D 

    for (var i = 0; i < this.industries.length; i++) {
        var industry = this.industries[i];
        if (working > industry.numEmpNeeded && industry.numResources > 0) {
            industry.numEmployed = industry.numEmpNeeded;
            working -= industry.numEmpNeeded;
        } 
        //console.log(working);
        //console.log()
    }

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = 0; i < this.industries.length; i++) {
        var industry = this.industries[i];

        if (!industry.removeFromWorld) {
            industry.update();
        }
    }

    for (var i = 0; i < this.granaries.length; i++) {
        var granary = this.granaries[i];
        if (!granary.removeFromWorld) {
            granary.update();
        }
    }

    for (var i = 0; i < this.yards.length; i++) {
        var yard = this.yards[i];
        if (!yard.removeFromWorld) {
            yard.update();
        }
    }

    for (var i = 0; i < this.walkers.length; i++) {
        var walker = this.walkers[i];

        if (!walker.removeFromWorld) {
            walker.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }

    for (var i = 0; i < this.housingArr.length; i++) {
        var myHouse = this.housingArr[i];
        if (!myHouse.removeFromWorld) {
            //console.log("Updating building")
            myHouse.update();
        }
    }

    for (var i = this.housingArr.length - 1; i >= 0; --i) {
        if (this.housingArr[i].removeFromWorld) {
            this.housingArr.splice(i, 1);
        }
    }

    for (var i = this.industries.length - 1; i >= 0; --i) {
        if (this.industries[i].removeFromWorld) {
            this.industries.splice(i, 1);
        }
    }

    for (var i = this.granaries.length - 1; i >= 0; --i) {
        if (this.granaries[i].removeFromWorld) {
            this.granaries.splice(i, 1);
        }
    }

    for (var i = this.yards.length - 1; i >= 0; --i) {
        if (this.yards[i].removeFromWorld) {
            this.yards.splice(i, 1);
        }
    }

    for (var i = this.walkers.length - 1; i >= 0; --i) {
        if (this.walkers[i].removeFromWorld) {
            this.walkers.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

